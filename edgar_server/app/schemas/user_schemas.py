from typing import Optional, TYPE_CHECKING

from pydantic import BaseModel
from uuid import UUID

if TYPE_CHECKING:
    from .quote_schema import Quote  # Solo para anotaciones


class UserBase(BaseModel):
    username: str
    email: str

    class Config:
        from_attributes = True


class UserUpdate(UserBase):
    username: str | None = None
    email: str | None = None


class UserCreate(UserBase):
    password: str



class UserOut(UserBase):
    id: UUID

     # Versión actualizada de orm_mode



class UserWithRol(BaseModel):
    id: UUID
    username: str
    email: str
    role_id: Optional[UUID] = None


class UserWithQuotes(UserOut):
    quotes: list["Quote"] = []

