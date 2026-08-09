"""Session and attendee persistence operations."""
from uuid import uuid4
from fastapi import HTTPException
from ..database import connection, utc_now
from ..schemas import BookingRequest

DEFAULT_SESSION_ID = "deep-rest-0814"


def get_session(session_id: str = DEFAULT_SESSION_ID) -> dict | None:
    with connection() as database:
        row = database.execute("SELECT * FROM sessions WHERE id = ?", (session_id,)).fetchone()
        if not row: return None
        count = database.execute("SELECT COUNT(*) AS count FROM attendees WHERE session_id = ?", (session_id,)).fetchone()["count"]
    return {**dict(row), "booked": count, "remaining": max(0, row["capacity"] - count)}


def list_attendees() -> list[dict]:
    with connection() as database:
        return [dict(row) for row in database.execute("SELECT * FROM attendees ORDER BY created_at DESC").fetchall()]


def create_attendee(payload: BookingRequest) -> dict:
    """Atomically enforce capacity before inserting a confirmed attendee."""
    with connection() as database:
        session = database.execute("SELECT * FROM sessions WHERE id = ?", (payload.session_id,)).fetchone()
        if not session: raise HTTPException(404, "Session not found")
        count = database.execute("SELECT COUNT(*) AS count FROM attendees WHERE session_id = ?", (payload.session_id,)).fetchone()["count"]
        if count >= session["capacity"]: raise HTTPException(409, "This session is full")
        attendee_id = f"att-{uuid4().hex[:10]}"
        database.execute("INSERT INTO attendees VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (attendee_id, payload.session_id, payload.name, payload.email, payload.frequency, payload.experience_level, payload.session_goal, payload.sound_intensity, payload.sound_sensitivity, payload.comfort_requirement, "CONFIRMED", utc_now()))
    return {"id": attendee_id, "booking_reference": attendee_id.upper(), "status": "CONFIRMED"}
