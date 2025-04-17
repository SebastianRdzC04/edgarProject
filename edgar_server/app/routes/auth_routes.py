from fastapi import APIRouter
from fastapi.params import Depends

from ..dependencies.auth_dependency import get_auth_service
from ..schemas.auth_schemas import LoginRequest, AuthResponse
from ..schemas.user_schemas import UserCreate, UserOut
from ..services.auth_services import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=AuthResponse)
def login(data: LoginRequest, service: AuthService = Depends(get_auth_service)):
    """
    Login a user.
    """
    # This is a placeholder for the actual implementation of the login endpoint.
    # In a real application, you would extract the email and password from the request body
    # and call the login method of the AuthService.
    return service.login(data)

@router.post("/register", response_model=UserOut)
def register(data: UserCreate, service: AuthService = Depends(get_auth_service)):
    """
    Register a new user.
    """
    # This is a placeholder for the actual implementation of the register endpoint.
    # In a real application, you would extract the user details from the request body
    # and call the register method of the AuthService.
    return service.register(data)
