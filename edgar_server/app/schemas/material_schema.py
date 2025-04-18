from uuid import UUID

from pydantic import BaseModel

from ..db.models import QuoteStatusEnum


class MaterialBase(BaseModel):
    name: str
    description: str | None = None

    class Config:
        from_attributes = True

class MaterialOut(MaterialBase):
    id: UUID


class MaterialUpdate(MaterialBase):
    name: str | None = None


class MaterialInQuote(BaseModel):
    name: str
    description: str | None = None
    quantity: int = 0
    price: int = 0

    class Config:
        from_attributes = True


class QuoteWithMaterials(BaseModel):
    quote_id: UUID
    title: str
    text: str
    address: str
    status: QuoteStatusEnum
    price: int = 0
    materials: list[MaterialInQuote] = []
