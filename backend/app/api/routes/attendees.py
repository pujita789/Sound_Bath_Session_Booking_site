"""Booking and attendee endpoints."""
from fastapi import APIRouter
from ...repositories.session_repository import create_attendee, list_attendees
from ...schemas import BookingRequest
router = APIRouter(tags=["attendees"])

@router.get("/attendees")
def attendees() -> list[dict]: return list_attendees()

@router.post("/attendees", status_code=201)
def book(payload: BookingRequest) -> dict: return create_attendee(payload)
