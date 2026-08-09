"""Environment-backed application configuration.

Add new runtime settings here so the rest of the codebase does not read
environment variables directly.
"""
import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

BACKEND_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BACKEND_DIR / ".env")


@dataclass(frozen=True)
class Settings:
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "").strip()
    openai_model: str = os.getenv("OPENAI_MODEL", "gpt-5.6")
    frontend_origin: str = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
    session_capacity: int = int(os.getenv("SESSION_CAPACITY", "30"))
    database_path: Path = Path(os.getenv("DATABASE_PATH", "./stillform.db"))

    @property
    def resolved_database_path(self) -> Path:
        """Return an absolute database path relative to the backend folder."""
        return self.database_path if self.database_path.is_absolute() else BACKEND_DIR / self.database_path


settings = Settings()
