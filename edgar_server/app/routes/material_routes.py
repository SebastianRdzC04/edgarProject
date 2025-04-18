from typing import List

from fastapi import APIRouter, Depends

from ..dependencies.material_dependency import get_material_service
from ..schemas.material_schema import MaterialOut, MaterialBase, MaterialUpdate
from ..services.material_service import MaterialService

router = APIRouter(prefix="/materials", tags=["materials"])


@router.get("/", response_model=List[MaterialOut])
def get_materials(
    service: MaterialService = Depends(get_material_service),
):
    """
    Get all materials.
    """
    return service.get_all_materials()

@router.post("/", response_model=MaterialOut)
def create_material(
    material: MaterialBase,
    service: MaterialService = Depends(get_material_service),
):
    """
    Create a new material.
    """
    return service.create_material(material)

@router.get("/{material_id}", response_model=MaterialOut)
def get_material_by_id(
    material_id: str,
    service: MaterialService = Depends(get_material_service),
):
    """
    Get a material by its ID.
    """
    return service.get_material_by_id(material_id)

@router.put("/{material_id}", response_model=MaterialOut)
def update_material(
    material_id: str,
    material: MaterialUpdate,
    service: MaterialService = Depends(get_material_service),
):
    """
    Update a material.
    """
    return service.update_material(material, material_id)


@router.delete("/{material_id}", response_model=MaterialOut)
def delete_material(
    material_id: str,
    service: MaterialService = Depends(get_material_service),
):
    """
    Delete a material.
    """
    return service.delete_material(material_id)