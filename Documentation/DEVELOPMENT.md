[DEVELOPMENT.md](https://github.com/user-attachments/files/30877521/DEVELOPMENT.md)
# Stillform — Development Workflow

## Run the Complete Application

Stillform requires two development processes.

### Terminal 1 — Backend

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Terminal 2 — Frontend

```powershell
cd frontend
npm install
npm run dev
```

## Verify Backend

Open:

```text
http://127.0.0.1:8000/docs
```

## Verify Frontend

Open the URL printed by Vite, normally:

```text
http://localhost:5173/
```

## Typical Development Flow

```text
Start Backend
     ↓
Start Frontend
     ↓
Open UI
     ↓
Register Attendee
     ↓
Select Preferences
     ↓
Get Recommendation
     ↓
Complete Booking
     ↓
View Confirmation
     ↓
Check Facilitator Dashboard
```

## Frontend Commands

```powershell
npm install
npm run dev
npm run build
npm run preview
```

## Backend Commands

```powershell
py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```
