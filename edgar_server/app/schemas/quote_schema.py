from typing import TYPE_CHECKING, Optional
from uuid import UUID

from pydantic import BaseModel, Field

from ..db.models import QuoteStatusEnum

if TYPE_CHECKING:
    from .user_schemas import UserBase
    from .material_schema import MaterialOut


class Quote(BaseModel):
    title: str
    text: str
    address: str
    price: int

    class Config:
        from_attributes = True


class QuoteCreate(Quote):
    user_id: UUID

class QuoteUpdate(BaseModel):
    title: str | None
    text: str | None
    address: str | None
    status: QuoteStatusEnum | None
    price: int | None


class QuoteOut(Quote):
    id: UUID
    status: QuoteStatusEnum = QuoteStatusEnum.pendiente



class QuoteWithUser(QuoteOut):
    user: "UserBase" # Referencia como string


