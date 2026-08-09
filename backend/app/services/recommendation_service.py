"""Transparent, deterministic comfort recommendation rules."""
from ..schemas import RecommendationRequest


def recommend_frequency(payload: RecommendationRequest) -> dict:
    """Recommend without assigning; the attendee always keeps final control."""
    if payload.sound_intensity == "Immersive" and payload.sound_sensitivity == "Not sensitive": frequency = "High"
    elif payload.sound_intensity == "Moderate" and payload.sound_sensitivity != "Sensitive to loud sounds": frequency = "Middle"
    else: frequency = "Low"
    reason = f"You selected {payload.sound_intensity.lower()} sound, described your experience as {payload.experience_level.lower()}, and noted that you are {payload.sound_sensitivity.lower()}."
    return {"recommended_frequency": frequency, "reason": reason, "confidence": 0.86, "advisory": "This is a comfort suggestion, not medical advice. You make the final choice."}
