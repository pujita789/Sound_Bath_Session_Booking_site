"""OpenAI Responses API adapter and Lumi safety prompt."""
import json
import urllib.error
import urllib.request
from uuid import uuid4
from fastapi import HTTPException
from ..config import settings
from ..database import connection, utc_now

SYSTEM_PROMPT = """You are Lumi, a concise wellness-session concierge for Stillform's Deep Rest Sound Bath.
Event facts: Friday August 14, 6:00–7:15 PM, Field House Studio 2, arrive at 5:45 PM, mats are provided, chairs and comfort items are available.
You may explain the session, preparation, available Low/Middle/High experiences, accessibility options, and how to contact staff.
Never diagnose, prescribe, claim sound treats disease, discourage medical care, or infer health conditions. For medical, urgent, safety, distress, or human-support requests, advise contacting a qualified professional or the session team. Keep replies under 90 words."""


def _extract_text(response: dict) -> str:
    """Support both convenience output_text and raw Responses API output."""
    if response.get("output_text"): return response["output_text"]
    return "".join(item.get("text", "") for output in response.get("output", []) for item in output.get("content", []) if item.get("type") == "output_text")


def chat(message: str) -> dict:
    """Send a guarded request to OpenAI and persist the conversation transcript."""
    if not settings.openai_api_key:
        raise HTTPException(503, "Lumi needs an OPENAI_API_KEY in backend/.env before live AI responses are available.")
    body = json.dumps({"model": settings.openai_model, "instructions": SYSTEM_PROMPT, "input": message, "max_output_tokens": 220}).encode("utf-8")
    request = urllib.request.Request("https://api.openai.com/v1/responses", data=body, method="POST", headers={"Authorization": f"Bearer {settings.openai_api_key}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(request, timeout=30) as provider_response:
            reply = _extract_text(json.loads(provider_response.read().decode("utf-8")))
        with connection() as database:
            database.executemany("INSERT INTO conversations VALUES (?, ?, ?, ?)", [(uuid4().hex, "user", message, utc_now()), (uuid4().hex, "assistant", reply, utc_now())])
        return {"reply": reply, "escalation_available": True}
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise HTTPException(502, f"The LLM provider rejected the request: {detail[:300]}") from error
    except Exception as error:
        raise HTTPException(502, "Lumi could not reach the LLM provider. Please try again.") from error
