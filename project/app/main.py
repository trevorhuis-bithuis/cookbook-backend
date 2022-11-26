import logging

from fastapi import FastAPI

from app.api import ping, recipes, users
from app.db import init_db

log = logging.getLogger("uvicorn")


def create_application() -> FastAPI:
    application = FastAPI()
    application.include_router(ping.router)
    application.include_router(recipes.router, prefix="/recipes", tags=["recipes"])
    application.include_router(users.router, prefix="/users", tags=["users"])

    return application


app = create_application()


@app.on_event("startup")
async def startup_event():
    log.info("Starting up...")
    init_db(app)


@app.on_event("shutdown")
async def shutdown_event():
    log.info("Shutting down...")
