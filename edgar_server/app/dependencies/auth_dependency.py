from fastapi import Depends, HTTPException, Cookie
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from typing import Optional
from ..config import security

from .user_dependency import get_user_service, get_user_repository
from ..config.security import verify_token
from ..repositories.user_repository import UserRepository
from ..services.auth_services import AuthService

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    This function is a placeholder for the actual implementation of getting the current user.
    In a real application, you would decode the token and retrieve the user information from it.
    """
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload


def get_auth_service(user_repository: UserRepository = Depends(get_user_repository)):
    """
    This function is a placeholder for the actual implementation of getting the auth service.
    In a real application, you would return an instance of the auth service.
    """
    return AuthService(user_repository)



async def get_current_user_from_cookie(
    access_token: Optional[str] = Cookie(None),
    user_repository: UserRepository = Depends(get_user_repository)
):
    """
    Get current user from access_token cookie
    """
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated - No token provided")
    
    try:
        # Decodificar el JWT
        payload = security.verify_token(access_token)
        if payload is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user_id: str = payload.get("id")
        
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")
            
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Obtener el usuario de la base de datos
    user = user_repository.get_user_by_id(user_id)
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
        
    return user