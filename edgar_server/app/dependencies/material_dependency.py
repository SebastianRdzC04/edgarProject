from fastapi import Depends
from sqlmodel import Session

from ..db.session import get_session
from ..repositories.material_repository import MaterialRepository
from ..services.material_service import MaterialService


def get_material_repository(db: Session = Depends(get_session)) -> MaterialRepository:
    return MaterialRepository(db)

def get_material_service(material_repository: MaterialRepository = Depends(get_material_repository)):
    return MaterialService(material_repository)