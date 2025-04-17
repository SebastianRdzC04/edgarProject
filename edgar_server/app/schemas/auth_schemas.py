from pydantic import BaseModel


class LoginRequest(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    token: str