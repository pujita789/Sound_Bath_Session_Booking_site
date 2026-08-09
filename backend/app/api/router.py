"""Single registry for all version-one route modules."""
from fastapi import APIRouter
from .routes import assistant, assistance, attendees, facilitator, health, recommendations, sessions

api_router = APIRouter(prefix="/api")
for router in [health.router, sessions.router, attendees.router, recommendations.router, assistant.router, assistance.router, facilitator.router]:
    api_router.include_router(router)
