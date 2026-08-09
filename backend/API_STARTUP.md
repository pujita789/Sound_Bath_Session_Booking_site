# Stillform Backend

Backend API for the Stillform session booking application.

The backend is built with FastAPI and uses SQLite for local persistence.

---

## Prerequisites

Make sure the following are installed:

- Python 3.13
- pip
- Git

Check your Python version:

```powershell
python --version
```

You should see:

```text
Python 3.13.x
```

If multiple Python versions are installed on Windows:

```powershell
py -0p
```

---

# 1. Navigate to the Backend

Open PowerShell and navigate to the backend folder:

```powershell
cd path\to\Session_booking_ui\backend
```

For example:

```powershell
cd C:\Users\Pujita.Chakraborty\Downloads\Session_booking\Session_booking_ui\backend
```

---

# 2. Create a Virtual Environment

Create the virtual environment using Python 3.13:

```powershell
py -3.13 -m venv .venv
```

---

# 3. Activate the Virtual Environment

On Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

After activation, your terminal should show:

```text
(.venv) PS C:\...\backend>
```

Verify Python:

```powershell
python --version
```

You should see:

```text
Python 3.13.x
```

---

# 4. Upgrade pip

```powershell
python -m pip install --upgrade pip --index-url https://pypi.org/simple
```

---

# 5. Install Backend Dependencies

```powershell
python -m pip install -r requirements.txt
```

---

# 6. Configure Environment Variables

The backend requires an OpenAI API key for live AI responses from Lumi.

Create `.env` from the provided example:

```powershell
Copy-Item .env.example .env
```

You should now have:

```text
backend/
├── .env
├── .env.example
├── .venv/
├── app/
├── main.py
└── requirements.txt
```

Open the file:

```powershell
notepad .env
```

Add:

```env
OPENAI_API_KEY=sk-your-real-api-key
OPENAI_MODEL=gpt-5.6
```

Replace `sk-your-real-api-key` with your actual OpenAI API key.

## Important

Never commit your real `.env` file or API key to GitHub.

The `.env.example` file can be committed with placeholders only:

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.6
```

---

# 7. Database

Stillform uses SQLite for local persistence.

The local database file is:

```text
stillform.db
```

The database is initialized automatically when the backend starts.

The application creates the required database tables and initializes the default session if it does not already exist.

You do not need to manually create the SQLite database.

---

# 8. Start the Backend

Make sure the virtual environment is activated:

```powershell
.\.venv\Scripts\Activate.ps1
```

Then:

```powershell
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Expected output includes:

```text
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

Keep this terminal running while using the application.

---

# 9. Open API Documentation

Open:

```text
http://127.0.0.1:8000/docs
```

This opens the FastAPI Swagger UI.

You can use Swagger to test the backend endpoints without the frontend.

---

# 10. Backend API

The API supports functionality such as:

- Session information
- Attendee registration
- Attendee listing
- Session recommendations
- Lumi assistant chat
- Assistance requests
- Facilitator session summary

---

# 11. Run the Backend with the Frontend

The Stillform application has separate frontend and backend applications.

## Terminal 1 — Backend

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

## Terminal 2 — Frontend

Open a second terminal:

```powershell
cd frontend
```

Install frontend dependencies on the first run:

```powershell
npm install
```

Start the frontend:

```powershell
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

The backend will run at:

```text
http://127.0.0.1:8000
```

---

# 12. Typical Project Structure

```text
Session_booking_ui/
│
├── backend/
│   ├── .env
│   ├── .env.example
│   ├── .venv/
│   ├── app/
│   │   ├── ...
│   │   └── ...
│   ├── main.py
│   ├── requirements.txt
│   ├── stillform.db
│   └── README.md
│
└── frontend/
    ├── src/
    ├── package.json
    ├── package-lock.json
    └── ...
```

---

# 13. Troubleshooting

## Python version is incorrect

Check:

```powershell
python --version
```

If it is not Python 3.13:

```powershell
deactivate
```

Then remove the existing environment:

```powershell
Remove-Item -Recurse -Force .venv
```

Create it again:

```powershell
py -3.13 -m venv .venv
```

Activate:

```powershell
.\.venv\Scripts\Activate.ps1
```

---

## PowerShell does not allow activation

If PowerShell blocks the activation script:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then:

```powershell
.\.venv\Scripts\Activate.ps1
```

---

## OpenAI API key error

If Swagger returns:

```json
{
  "detail": "Lumi needs an OPENAI_API_KEY in backend/.env before live AI responses are available."
}
```

Make sure:

```text
backend/.env
```

exists.

Check:

```powershell
dir -Force
```

You should see:

```text
.env
.env.example
```

Make sure `.env` contains:

```env
OPENAI_API_KEY=sk-your-real-api-key
OPENAI_MODEL=gpt-5.6
```

Restart FastAPI after changing `.env`:

```text
Ctrl + C
```

Then:

```powershell
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Safely check whether the key is loaded without printing it:

```powershell
python -c "from app.config import settings; print('KEY LOADED:', bool(settings.openai_api_key)); print('MODEL:', settings.openai_model)"
```

Expected:

```text
KEY LOADED: True
MODEL: gpt-5.6
```

---

## Port 8000 is already in use

Stop the existing Uvicorn process or use another port:

```powershell
uvicorn main:app --reload --host 127.0.0.1 --port 8001
```

If you change the backend port, update the frontend API URL accordingly.

---

## Session not found

If the API returns:

```text
Session not found
```

restart the backend:

```powershell
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

For a completely fresh local database, stop the backend and remove:

```text
stillform.db
```

Then start FastAPI again. The database will be initialized automatically.

---

# 14. Stopping the Backend

To stop the development server:

```text
Ctrl + C
```

To deactivate the virtual environment:

```powershell
deactivate
```

---

# Quick Start

For future runs, once everything is installed and `.env` is configured:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Then open:

```text
http://127.0.0.1:8000/docs
```

For the frontend, open a second terminal:

```powershell
cd frontend
npm run dev
```

Then open the URL shown by Vite, normally:

```text
http://localhost:5173
```
