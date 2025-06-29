from typing import List

from fastapi import APIRouter, HTTPException
from fastapi.params import Depends

from ..dependencies.auth_dependency import get_current_user, get_current_user_from_cookie
from ..dependencies.rol_dependency import get_role_repository
from ..dependencies.user_dependency import get_user_service
from ..middlewares.role_middleware import verify_role
from ..repositories.role_repository import RoleRepository
from ..schemas.user_schemas import UserOut, UserCreate, UserWithRol, UserWithQuotes, UserUpdate
from ..services.user_services import UserService

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/all", response_model=List[UserOut])
def get_all_users(service: UserService = Depends(get_user_service),
                current_user: UserWithRol = Depends(get_current_user_from_cookie),  
                  role_repository: RoleRepository = Depends(get_role_repository)):
    """
    Get all users.
    """
    return service.get_all_users()


@router.get("/me", response_model=UserWithRol)
def get_current_user_info(current_user: UserWithRol = Depends(get_current_user_from_cookie)):
    """
    Get the current user's information.
    """
    return UserWithRol.model_validate(current_user, from_attributes=True)



@router.get("/me/role")
def get_current_user_role(current_user: UserWithRol = Depends(get_current_user_from_cookie),
                            role_repository: RoleRepository = Depends(get_role_repository)):
    """
    Get the current user's role.
    """
    role = role_repository.get_role_by_id(current_user.role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    return {"role": role.name, "user": current_user}

@router.post("/convert/me/admin")
def convert_current_user_to_admin(current_user: UserWithRol = Depends(get_current_user_from_cookie),
                                  service: UserService = Depends(get_user_service)):
    """
    Convert the current user to an admin.
    """
    if not current_user.role_id:
        raise HTTPException(status_code=400, detail="User does not have a role assigned")
    return service.convert_user_to_admin(current_user.id)
    
   


@router.post("/", response_model=UserOut)
def create_user(user: UserCreate, service: UserService = Depends(get_user_service)):
    """
    Create a new user.
    """
    return service.create_user(user)


@router.get("/{user_id}", response_model=UserOut)
def get_user_quotes(user_id: str, service: UserService = Depends(get_user_service)):
    """
    Get all quotes for a user.
    """
    return service.get_user_by_id(user_id)

@router.get("/quotes/{user_id}", response_model=UserWithQuotes)
def get_user_quotes(user_id: str, service: UserService = Depends(get_user_service)):
    """
    Get all quotes for a user.
    """
    return service.get_user_quotes(user_id)


@router.put("/{user_id}", response_model=UserOut)
def update_user(user_id: str, user: UserUpdate, service: UserService = Depends(get_user_service)):
    """
    Update a user.
    """
    return service.update_user(user, user_id)

@router.delete("/{user_id}", response_model=UserOut)
def delete_user(user_id: str, service: UserService = Depends(get_user_service)):
    """
    Delete a user.
    """
    return service.delete_user(user_id)