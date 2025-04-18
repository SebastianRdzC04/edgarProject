from typing import TYPE_CHECKING
from uuid import UUID

from pydantic import BaseModel

if TYPE_CHECKING:
    from .material_schema import MaterialBase
    from .quote_schema import Quote


class QuoteMaterial(BaseModel):
    quote_id: UUID
    material_id: UUID
    quantity: int = 0
    price: int = 0

    class Config:
        from_attributes = True

class QuoteMaterialOut(BaseModel):
    id: UUID
    quote: "Quote"
    material: "MaterialBase"
    quantity: int = 0
    price: int = 0


    class Config:
        from_attributes = True
