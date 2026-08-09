"""Facilitator intelligence assembled from aggregate repository data."""
from ..config import settings
from ..repositories.analytics_repository import session_metrics


def build_summary() -> dict:
    metrics = session_metrics()
    first_time, sensitive = metrics["first_time"], metrics["sound_sensitive"]
    return {**metrics, "capacity": settings.session_capacity, "brief": f"{first_time} guests are attending for the first time. Allow extra time for orientation. {sensitive} guests noted some sound sensitivity; keep transitions gradual and remind everyone that quieter placement is available."}
