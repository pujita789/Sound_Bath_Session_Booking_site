[TROUBLESHOOTING.md](https://github.com/user-attachments/files/30877606/TROUBLESHOOTING.md)
# Stillform — Troubleshooting

## UI Does Not Load

Check the Vite terminal:

```powershell
npm run dev
```

Open the exact URL printed by Vite.

Then open browser Developer Tools:

```text
F12 → Console
```

Check for JavaScript, module, or network errors.

## CORS Error

Example:

```text
Access to fetch at 'http://127.0.0.1:8000/api/...'
has been blocked by CORS policy
```

Check:

1. FastAPI is running.
2. The frontend API URL is correct.
3. The current Vite origin is allowed by backend CORS.
4. FastAPI was restarted after CORS changes.

For example, if the UI runs at:

```text
http://localhost:5175
```

the backend must allow:

```text
http://localhost:5175
```

## API `ERR_FAILED`

Example:

```text
POST http://127.0.0.1:8000/api/attendees
net::ERR_FAILED
```

Check:

```text
http://127.0.0.1:8000/docs
```

If Swagger does not load, fix the backend first.

If Swagger works, verify:

```text
frontend/src/lib/api.ts
```

and:

```text
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Lumi Returns 503

If you see:

```json
{
  "detail": "Lumi needs an OPENAI_API_KEY in backend/.env before live AI responses are available."
}
```

configure:

```text
backend/.env
```

with:

```env
OPENAI_API_KEY=your_real_api_key
OPENAI_MODEL=gpt-5.6
```

Restart FastAPI.

Safely verify the key is loaded without printing it:

```powershell
python -c "from app.config import settings; print('KEY LOADED:', bool(settings.openai_api_key)); print('MODEL:', settings.openai_model)"
```

## Session Not Found

Restart FastAPI:

```powershell
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

For a fresh local database:

1. Stop FastAPI.
2. Remove `backend/stillform.db`.
3. Start FastAPI again.

## Registered Attendee Does Not Appear

Check:

1. The registration request succeeds.
2. `POST /api/attendees` returns successfully.
3. `GET /api/attendees` in Swagger contains the new attendee.
4. The facilitator dashboard calls `api.getAttendees()`.
5. Refresh the dashboard.

The facilitator UI should use backend data rather than a hardcoded attendee list.
