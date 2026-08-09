"""Validated public request models for the Stillform API."""
from typing import Literal
from pydantic import BaseModel, Field


class BookingRequest(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: str = Field(min_length=5, max_length=160)
    session_id: str = "deep-rest-0814"
    frequency: Literal["Low", "Middle", "High"]
    experience_level: str | None = None
    session_goal: str | None = None
    sound_intensity: str | None = None
    sound_sensitivity: str | None = None
    comfort_requirement: str | None = None


class RecommendationRequest(BaseModel):
    experience_level: str = "First time"
    sound_intensity: str = "Gentle"
    sound_sensitivity: str = "Slightly sensitive"
    session_goal: str = "Relaxation"


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=1000)


class AssistanceRequestCreate(BaseModel):
    attendee_id: str | None = None
    attendee_name: str = Field(min_length=2, max_length=80)
    request_type: str
    message: str = ""
    priority: Literal["NORMAL", "MEDIUM", "HIGH"] = "NORMAL"
    session_id: str = "deep-rest-0814"
