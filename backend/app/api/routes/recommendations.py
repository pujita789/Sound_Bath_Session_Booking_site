"""Explainable recommendation endpoint."""
from fastapi import APIRouter
from ...schemas import RecommendationRequest
from ...services.recommendation_service import recommend_frequency
router = APIRouter(tags=["recommendations"])

@router.post("/recommendation")
def recommendation(payload: RecommendationRequest) -> dict: return recommend_frequency(payload)
