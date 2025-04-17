from typing import List

from fastapi import APIRouter
from fastapi.params import Depends

from ..dependencies.auth_dependency import get_current_user
from ..dependencies.rol_dependency import get_role_repository
from ..dependencies.user_dependency import get_user_service
from ..middlewares.role_middleware import verify_role
from ..repositories.role_repository import RoleRepository
from ..schemas.user_schemas import UserOut, UserCreate, UserWithRol
from ..services.user_services import UserService

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/all", response_model=List[UserOut])
def get_all_users(service: UserService = Depends(get_user_service),
                  current_user: UserWithRol = Depends(get_current_user),
                  role_repository: RoleRepository = Depends(get_role_repository)):
    """
    Get all users.
    """
    verify_role(current_user["role_id"], "user", role_repository)
    return service.get_all_users()

@router.post("/", response_model=UserOut)
def create_user(user: UserCreate, service: UserService = Depends(get_user_service)):
    """
    Create a new user.
    """
    return service.create_user(user)