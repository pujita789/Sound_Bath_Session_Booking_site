"use client";

import { useState } from "react";
import { api } from "../../lib/api";

interface Props { onClose: () => void }
interface Message { role: "user" | "assistant"; content: string }

/** Lumi chat UI. LLM and escalation behavior live behind the API client. */
export function Assistant({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [humanSent, setHumanSent] = useState(false);

  async function ask(question?: string) {
    const content = (question ?? input).trim();
    if (!content || loading) return;
    setInput(""); setLoading(true);
    setMessages(current => [...current, { role: "user", content }]);
    try {
      const result = await api.chat(content);
      setMessages(current => [...current, { role: "assistant", content: result.reply }]);
    } catch (error) {
      setMessages(current => [...current, { role: "assistant", content: error instanceof Error ? error.message : "Lumi is currently unavailable." }]);
    } finally { setLoading(false); }
  }

  async function requestHuman() {
    try {
      await api.createAssistance({ attendee_name: "Guest attendee", request_type: "concierge_escalation", message: "Requested human help from Lumi", priority: "NORMAL" });
      setHumanSent(true);
    } catch (error) {
      setMessages(current => [...current, { role: "assistant", content: error instanceof Error ? error.message : "The session team could not be reached." }]);
    }
  }

  return <aside className="assistant-panel"><div className="assistant-head"><span className="spark">✦</span><p><b>Lumi</b><small>Live AI session concierge</small></p><button onClick={onClose}>×</button></div><div className="assistant-body"><div className="lumi-message">Hi, I’m here to make your session feel easier. What would you like to know?</div>{messages.map((message, index) => <div key={`${message.role}-${index}`} className={message.role === "user" ? "user-message" : "lumi-message"}>{message.content}</div>)}{loading && <div className="lumi-message">Lumi is thinking…</div>}<div className="quick-questions"><button onClick={() => ask("I’m new to sound baths. What should I know?")}>I’m new to sound baths</button><button onClick={() => ask("What should I bring?")}>What should I bring?</button><button onClick={() => ask("Can I use a chair?")}>Can I use a chair?</button></div></div><form className="assistant-input" onSubmit={event => { event.preventDefault(); ask(); }}><input aria-label="Message Lumi" value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about your session…" /><button aria-label="Send message">↑</button></form><button className="human-link" onClick={requestHuman}>{humanSent ? "✓ The session team has been notified" : "Prefer a human? Contact the session team"}</button></aside>;
}
