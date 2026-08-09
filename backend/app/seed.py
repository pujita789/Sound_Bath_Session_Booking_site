"""Create the local session required by the application."""

from .config import settings
from .database import connection
from .repositories.session_repository import DEFAULT_SESSION_ID


def initialize_session() -> None:
    """Create the default session if it does not already exist."""

    with connection() as database:
        database.execute(
            """
            INSERT OR IGNORE INTO sessions
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                DEFAULT_SESSION_ID,
                "Deep Rest Sound Bath",
                "2026-08-14T18:00:00",
                "Field House, Studio 2",
                "Maya Chen",
                settings.session_capacity,
            ),
        )