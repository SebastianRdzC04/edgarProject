from fastapi.params import Depends
from sqlmodel import Session

from ..db.session import get_session
from ..repositories.role_repository import RoleRepository


def get_role_repository(db: Session = Depends(get_session)) -> RoleRepository:
    return RoleRepository(db)