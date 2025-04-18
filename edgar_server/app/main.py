from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import user_routes, auth_routes, material_routes, quote_routes, quote_material_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los orígenes (puedes restringirlo a dominios específicos)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP
    allow_headers=["*"],  # Permite todas las cabeceras
)

app.include_router(user_routes.router)
app.include_router(auth_routes.router)
app.include_router(material_routes.router)
app.include_router(quote_routes.router)
app.include_router(quote_material_routes.router)