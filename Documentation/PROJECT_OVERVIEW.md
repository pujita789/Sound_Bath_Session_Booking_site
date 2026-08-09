[PROJECT_OVERVIEW.md](https://github.com/user-attachments/files/30877570/PROJECT_OVERVIEW.md)
# Stillform — Project Overview

## About

Stillform is a personalized wellness-session platform designed to adapt a session experience to each attendee.

The platform connects an attendee booking experience with a facilitator dashboard.

## Attendee Experience

The attendee can:

- Register with name and email
- Select experience level
- Select session goal
- Select sound-frequency preference
- Select sound intensity
- Provide sound-sensitivity information
- Provide comfort requirements
- Receive a personalized recommendation
- Complete a booking
- Receive a booking reference
- Add the session to Google Calendar
- See their profile initials
- Use the Lumi AI concierge

## Facilitator Experience

The facilitator dashboard provides:

- Attendee count
- Session capacity
- Remaining spaces
- First-time attendee information
- Comfort-item information
- Sound-frequency distribution
- Room-preparation information
- Registered attendees
- Open assistance requests
- Assistance acknowledgement
- Session brief

## Main Flow

```text
Attendee
   ↓
Registration
   ↓
Preferences
   ↓
Recommendation
   ↓
Booking
   ↓
Confirmation
   ↓
Google Calendar
```

## Facilitator Flow

```text
Backend Database
   ↓
FastAPI API
   ↓
Facilitator Dashboard
   ↓
Attendees / Summary / Assistance
```

## Lumi

```text
Frontend
   ↓
POST /api/assistant/chat
   ↓
FastAPI
   ↓
OpenAI API
   ↓
Lumi Response
   ↓
Frontend
```

The OpenAI key is kept on the backend and is never exposed to the browser.

## Technology

### Frontend

- React
- TypeScript
- Vite
- CSS
- npm
- Fetch API

### Backend

- Python 3.13
- FastAPI
- Uvicorn
- SQLite

### AI

- OpenAI API
