"""ASGI entrypoint.

Keep this file intentionally small. Application configuration and behavior live
inside the ``app`` package so tests and other runners can reuse the factory.
"""
"""ASGI entrypoint."""

from fastapi.middleware.cors import CORSMiddleware

from app.application import create_application

app = create_application()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)