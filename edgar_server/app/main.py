from fastapi import FastAPI
from .routes import user_routes, auth_routes, material_routes, quote_routes, quote_material_routes

app = FastAPI()

app.include_router(user_routes.router)
app.include_router(auth_routes.router)
app.include_router(material_routes.router)
app.include_router(quote_routes.router)
app.include_router(quote_material_routes.router)