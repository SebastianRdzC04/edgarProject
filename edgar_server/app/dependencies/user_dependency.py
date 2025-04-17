from fastapi.params import Depends
from sqlmodel import Session

from ..db.session import get_session
from ..repositories.user_repository import UserRepository
from ..services.user_services import UserService

def get_user_repository(db: Session = Depends(get_session)) -> UserRepository:
    return UserRepository(db)

def get_user_service(user_repository: UserRepository = Depends(get_user_repository)):
    return UserService(user_repository)