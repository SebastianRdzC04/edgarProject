from sqlmodel import Session, create_engine
from dotenv import load_dotenv
import os

# Cargar las variables de entorno desde el .env
load_dotenv()

# Obtener la URL de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL no está definida en el archivo .env")

# Crear el engine
engine = create_engine(DATABASE_URL, echo=True)

# Crear la sesión (versión síncrona)
def get_session():
    with Session(engine) as session:
        return session