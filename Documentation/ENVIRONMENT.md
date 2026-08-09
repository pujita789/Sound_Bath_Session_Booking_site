[ENVIRONMENT.md](https://github.com/user-attachments/files/30877527/ENVIRONMENT.md)
# Stillform — Environment Configuration

## Backend

Create:

```text
backend/.env
```

Example:

```env
OPENAI_API_KEY=your_real_api_key
OPENAI_MODEL=gpt-5.6
DATABASE_PATH=./stillform.db
FRONTEND_ORIGIN=http://localhost:5173
API_HOST=127.0.0.1
API_PORT=8000
SESSION_CAPACITY=30
```

## Variable Reference

| Variable | Purpose | Default |
|---|---|---|
| `OPENAI_API_KEY` | Enables Lumi AI responses | Empty |
| `OPENAI_MODEL` | OpenAI model | `gpt-5.6` |
| `DATABASE_PATH` | SQLite database | `./stillform.db` |
| `FRONTEND_ORIGIN` | Allowed browser origin | `http://localhost:5173` |
| `API_HOST` | API host | `127.0.0.1` |
| `API_PORT` | API port | `8000` |
| `SESSION_CAPACITY` | Maximum session capacity | `30` |

## Frontend

If the UI uses an environment variable, create:

```text
frontend/.env
```

with:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Only variables prefixed with `VITE_` are exposed to the Vite client.

Therefore never place secrets such as `OPENAI_API_KEY` in frontend environment variables.

## Security

Do not commit:

```text
backend/.env
frontend/.env
```

Commit `.env.example` files containing placeholders only.
