"""Human-assistance workflow persistence."""
from uuid import uuid4
from fastapi import HTTPException
from ..database import connection, utc_now
from ..schemas import AssistanceRequestCreate


def list_requests() -> list[dict]:
    with connection() as database:
        return [dict(row) for row in database.execute("SELECT * FROM assistance_requests ORDER BY created_at DESC").fetchall()]


def create_request(payload: AssistanceRequestCreate) -> dict:
    request_id = f"req-{uuid4().hex[:8]}"
    with connection() as database:
        database.execute("INSERT INTO assistance_requests VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (request_id, payload.attendee_id, payload.session_id, payload.attendee_name, payload.request_type, payload.message, payload.priority, "OPEN", utc_now(), None))
    return {"id": request_id, "status": "OPEN"}


def acknowledge_request(request_id: str) -> dict:
    with connection() as database:
        cursor = database.execute("UPDATE assistance_requests SET status = 'ACKNOWLEDGED' WHERE id = ?", (request_id,))
        if cursor.rowcount == 0: raise HTTPException(404, "Request not found")
    return {"id": request_id, "status": "ACKNOWLEDGED"}
