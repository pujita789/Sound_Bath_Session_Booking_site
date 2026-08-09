# Stillform — Frontend Setup

The frontend is a React + TypeScript application powered by Vite.

## Requirements

- Node.js 22 or newer
- npm
- Git
- Running Stillform backend

Check Node:

```powershell
node --version
```

Check npm:

```powershell
npm --version
```

## 1. Navigate to Frontend

From the project root:

```powershell
cd frontend
```

## 2. Install Dependencies

```powershell
npm install
```

## 3. Configure API URL

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

The frontend API client is:

```text
frontend/src/lib/api.ts
```

Do not put the OpenAI API key in the frontend.

Do not use:

```env
VITE_OPENAI_API_KEY=...
```

The OpenAI key belongs in `backend/.env`.

## 4. Start the Backend

In another terminal:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

## 5. Start the Frontend

From `frontend`:

```powershell
npm run dev
```

Vite normally starts at:

```text
http://localhost:5173/
```

Always use the exact URL printed by Vite.

## If Vite Uses Another Port

Vite may use:

```text
http://localhost:5174/
```

or:

```text
http://localhost:5175/
```

If this happens, make sure that frontend origin is allowed by backend CORS.

## Production Build

```powershell
npm run build
```

Preview:

```powershell
npm run preview
```

The production output is normally:

```text
frontend/dist/
```

Do not commit `dist/`.
