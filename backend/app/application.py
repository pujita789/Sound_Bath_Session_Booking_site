"""FastAPI application factory."""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.router import api_router
from .config import settings
from .database import initialize_database
from .seed import initialize_session


@asynccontextmanager
async def lifespan(_: FastAPI):
    """Initialize local persistence before the first request."""
    initialize_database();  
    initialize_session();
    yield


def create_application() -> FastAPI:
    app = FastAPI(title="Stillform API", version="1.0.0", lifespan=lifespan)
    app.add_middleware(CORSMiddleware, allow_origins=[settings.frontend_origin], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
    app.include_router(api_router)
    return app
# seed_demo_data();