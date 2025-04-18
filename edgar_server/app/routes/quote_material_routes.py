from fastapi import APIRouter, Depends

from ..dependencies.quote_material_dependency import get_quote_material_service
from ..schemas.quote_material_schema import QuoteMaterial
from ..services.quote_material_service import QuoteMaterialService

router = APIRouter(prefix="/quote-materials", tags=["quote_materials"])

@router.get("/{id}")
def get_all_quote_materials_by_quote_id(
    id: str,
    service: QuoteMaterialService = Depends(get_quote_material_service),
):
    """
    Get all quote materials for a given quote ID.
    """
    return service.get_quote_materials_by_quote_id(id)

@router.post("/", response_model=QuoteMaterial)
def create_quote_material(
    quote_material: QuoteMaterial,
    service: QuoteMaterialService = Depends(get_quote_material_service),
):
    """
    Create a new quote material.
    """
    return service.create_quote_material(quote_material)