"""SQLite connection lifecycle and schema initialization."""
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from typing import Iterator

from .config import settings


@contextmanager
def connection() -> Iterator[sqlite3.Connection]:
    """Open a transaction and always close it after commit or rollback."""
    database = sqlite3.connect(settings.resolved_database_path)
    database.row_factory = sqlite3.Row
    database.execute("PRAGMA foreign_keys = ON")
    try:
        yield database
        database.commit()
    except Exception:
        database.rollback()
        raise
    finally:
        database.close()


def utc_now() -> str:
    """Create a timezone-aware ISO timestamp for database records."""
    return datetime.now(timezone.utc).isoformat()


def initialize_database() -> None:
    """Create local tables. Production should replace this with migrations."""
    statements = [
        """CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, name TEXT NOT NULL, starts_at TEXT NOT NULL, location TEXT NOT NULL, facilitator TEXT NOT NULL, capacity INTEGER NOT NULL)""",
        """CREATE TABLE IF NOT EXISTS attendees (id TEXT PRIMARY KEY, session_id TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, frequency TEXT NOT NULL, experience_level TEXT, session_goal TEXT, sound_intensity TEXT, sound_sensitivity TEXT, comfort_requirement TEXT, status TEXT NOT NULL DEFAULT 'CONFIRMED', created_at TEXT NOT NULL, FOREIGN KEY(session_id) REFERENCES sessions(id))""",
        """CREATE TABLE IF NOT EXISTS assistance_requests (id TEXT PRIMARY KEY, attendee_id TEXT, session_id TEXT NOT NULL, attendee_name TEXT NOT NULL, request_type TEXT NOT NULL, message TEXT, priority TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'OPEN', created_at TEXT NOT NULL, resolved_at TEXT)""",
        """CREATE TABLE IF NOT EXISTS conversations (id TEXT PRIMARY KEY, role TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL)""",
    ]
    with connection() as database:
        for statement in statements:
            database.execute(statement)
