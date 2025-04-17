from fastapi import FastAPI
from .routes import user_routes, auth_routes

app = FastAPI()

app.include_router(user_routes.router)
app.include_router(auth_routes.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
