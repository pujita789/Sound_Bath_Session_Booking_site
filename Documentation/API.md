[API.md](https://github.com/user-attachments/files/30877502/API.md)
# Stillform — API Reference

The frontend communicates with the FastAPI backend through:

```text
http://127.0.0.1:8000/api
```

The frontend API client is:

```text
frontend/src/lib/api.ts
```

## Main Endpoints

### Attendees

Create an attendee booking:

```http
POST /api/attendees
```

Retrieve registered attendees:

```http
GET /api/attendees
```

### Recommendation

Get a personalized recommendation:

```http
POST /api/recommendation
```

### Lumi

Send a chat message:

```http
POST /api/assistant/chat
```

### Facilitator

Get the session summary:

```http
GET /api/facilitator/session-summary
```

### Assistance

Retrieve requests:

```http
GET /api/assistance
```

Create a request:

```http
POST /api/assistance
```

Acknowledge a request:

```http
PATCH /api/assistance/{id}
```

## Request Flow

```text
React UI
   ↓
src/lib/api.ts
   ↓
FastAPI
   ↓
Application / Repository Layer
   ↓
SQLite
```

For Lumi:

```text
React UI
   ↓
FastAPI
   ↓
OpenAI API
   ↓
FastAPI
   ↓
React UI
```

## Swagger

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```
