from fastapi import HTTPException

from ..db.models import Material
from ..repositories.material_repository import MaterialRepository
from ..schemas.material_schema import MaterialBase, MaterialOut, MaterialUpdate


class MaterialService:
    def __init__(self, material_repository:MaterialRepository):
        self.material_repository = material_repository

    def create_material(self, material:MaterialBase) -> MaterialOut:
        """
        Create a new material.
        """
        material = Material(
            name=material.name,
            description=material.description,
        )

        db_material = self.material_repository.create_material(material)
        return MaterialOut.model_validate(db_material)

    def get_material_by_id(self, material_id:str) -> MaterialOut:
        """
        Get a material by its ID.
        """
        db_material = self.material_repository.get_material_by_id(material_id)
        if not db_material:
            raise HTTPException(status_code=404, detail="Material not found")
        return MaterialOut.model_validate(db_material)

    def get_all_materials(self) -> list[MaterialOut]:
        """
        Get all materials.
        """
        db_materials = self.material_repository.get_all_materials()
        if not db_materials:
            raise HTTPException(status_code=404, detail="No materials found")
        return [MaterialOut.model_validate(material) for material in db_materials]

    def update_material(self, material_update: MaterialUpdate, material_id: str) -> MaterialOut:
        # Buscamos el material original en la base de datos
        db_material = self.material_repository.get_material_by_id(material_id)
        if not db_material:
            raise HTTPException(status_code=404, detail="Material not found")

        # Creamos un objeto MaterialUpdate con los valores originales
        updated_data = material_update.dict(exclude_unset=True)  # Solo los campos que se actualizarán

        # Combinamos los datos originales con los nuevos datos
        for key, value in updated_data.items():
            setattr(db_material, key, value)  # Actualizamos solo los campos enviados

        # Llamamos al repository para hacer el commit en la base de datos
        db_material = self.material_repository.update_material(db_material)

        # Retornamos el objeto actualizado
        return MaterialOut.model_validate(db_material)

    def delete_material(self, material_id:str) -> MaterialOut:
        """
        Delete a material.
        """
        db_material = self.material_repository.delete_material(material_id)
        if not db_material:
            raise HTTPException(status_code=404, detail="Material not found")
        return MaterialOut.model_validate(db_material)