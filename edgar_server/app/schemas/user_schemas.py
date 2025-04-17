from typing import Optional

from pydantic import BaseModel
from uuid import UUID


class UserBase(BaseModel):
    username: str
    email: str


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    username: str | None = None




class UserOut(UserBase):
    id: UUID

    class Config:
        from_attributes = True  # Versión actualizada de orm_mode



class UserWithRol(BaseModel):
    id: UUID
    username: str
    email: str
    role_id: Optional[UUID] = None