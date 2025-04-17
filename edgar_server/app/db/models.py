from enum import Enum
from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
from uuid import UUID, uuid4
from datetime import datetime

class QuoteStatusEnum(str, Enum):
    pendiente = "pendiente"
    pagada = "pagada"
    cotizada = "cotizada"
    cancelada = "cancelada"
    rechazada = "rechazada"


class Role(SQLModel, table=True):
    __tablename__ = "roles"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str
    description: Optional[str] = None

    users: List["User"] = Relationship(back_populates="role")

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    username: str
    email: str
    password: str
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    is_deleted: bool = Field(default=False)
    role_id: Optional[UUID] = Field(default=None, foreign_key="roles.id")

    role: Optional["Role"] = Relationship()
    quotes: List["Quote"] = Relationship(back_populates="user")

class Quote(SQLModel, table=True):
    __tablename__ = "quotes"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    title: str
    text: str
    address: str
    status: QuoteStatusEnum = Field(default=QuoteStatusEnum.pendiente)
    price: int = 0
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    is_deleted: bool = Field(default=False)

    user_id: UUID = Field(foreign_key="users.id")
    user: Optional[User] = Relationship(back_populates="quotes")

    materials: List["QuoteMaterial"] = Relationship(back_populates="quote")

class Material(SQLModel, table=True):
    __tablename__ = "materials"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str
    description: Optional[str] = None
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    is_deleted: bool = Field(default=False)

    quotes: List["QuoteMaterial"] = Relationship(back_populates="material")

class QuoteMaterial(SQLModel, table=True):
    __tablename__ = "quotes_materials"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    quote_id: UUID = Field(foreign_key="quotes.id")
    material_id: UUID = Field(foreign_key="materials.id")
    quantity: int
    price: int = 0
    is_deleted: bool = Field(default=False)

    quote: Optional[Quote] = Relationship(back_populates="materials")
    material: Optional[Material] = Relationship(back_populates="quotes")
