[README.md](https://github.com/user-attachments/files/30877587/README.md)
# Stillform

Stillform is a personalized wellness-session platform combining attendee booking, preferences, explainable recommendations, an AI concierge, human assistance, and facilitator intelligence.

## Project Components

- `frontend/` — React + TypeScript + Vite UI
- `backend/` — Python + FastAPI API
- SQLite — local development persistence
- OpenAI API — Lumi AI concierge

## Documentation

- [Project Overview](PROJECT_OVERVIEW.md)
- [Frontend Setup](FRONTEND_SETUP.md)
- [Backend Setup](BACKEND_SETUP.md)
- [Environment Configuration](ENVIRONMENT.md)
- [API Documentation](API.md)
- [Development Workflow](DEVELOPMENT.md)
- [Troubleshooting](TROUBLESHOOTING.md)
- [Git & GitHub](GIT_GUIDE.md)

## Quick Start

### Backend

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

### Frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite, normally:

```text
http://localhost:5173/
```
