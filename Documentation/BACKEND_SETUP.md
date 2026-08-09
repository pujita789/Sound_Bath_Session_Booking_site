[BACKEND_SETUP.md](https://github.com/user-attachments/files/30877515/BACKEND_SETUP.md)
# Stillform — Backend Setup

The backend is a FastAPI application providing REST APIs for the Stillform UI.

## Requirements

- Python 3.13
- pip
- Git

## 1. Navigate to Backend

```powershell
cd backend
```

## 2. Create Virtual Environment

```powershell
py -3.13 -m venv .venv
```

## 3. Activate Virtual Environment

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Verify:

```powershell
python --version
```

## 4. Upgrade pip

```powershell
python -m pip install --upgrade pip --index-url https://pypi.org/simple
```

## 5. Install Dependencies

```powershell
python -m pip install -r requirements.txt
```

## 6. Configure Environment

Create `.env`:

```powershell
Copy-Item .env.example .env
```

Add your OpenAI configuration:

```env
OPENAI_API_KEY=your_real_api_key
OPENAI_MODEL=gpt-5.6
```

Never commit `backend/.env`.

## 7. Start API

```powershell
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

API:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

## Database

Local development uses:

```text
backend/stillform.db
```

SQLite is suitable for local development and demonstration. A production multi-instance deployment should use a production database such as PostgreSQL.
