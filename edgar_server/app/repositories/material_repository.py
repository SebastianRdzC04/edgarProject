from sqlalchemy import false
from sqlmodel import Session, select

from ..db.models import Material


class MaterialRepository:
    def __init__(self, session:Session):
        self.session = session

    def create_material(self, material:Material):
        """
        Create a new material.
        """
        db_material = material
        self.session.add(db_material)
        self.session.commit()
        self.session.refresh(db_material)
        return db_material

    def get_material_by_id(self, material_id):
        """
        Get a material by its ID.
        """
        db_material = self.session.exec(select(Material)
                                        .where(Material.id == material_id)
                                        .where(Material.is_deleted == False)).first()
        return db_material

    def get_all_materials(self):
        """
        Get all materials.
        """
        db_materials = self.session.exec(select(Material).where(Material.is_deleted == False)).all()
        return db_materials

    def update_material(self, material: Material):
        """
        Actualiza el material en la base de datos si existe.
        """
        # Primero, buscamos el material por id
        db_material = self.session.exec(select(Material).where(Material.id == material.id)).first()

        if not db_material:
            return None  # Si no se encuentra el material, retornamos None

        # Si el material existe, actualizamos sus valores
        db_material.name = material.name
        db_material.description = material.description
        # Aquí puedes agregar más campos si es necesario

        # Marcamos el material como actualizado (ya está en la sesión)
        self.session.commit()
        self.session.refresh(db_material)

        return db_material

    def delete_material(self, material_id):
        """
        Delete a material.
        """
        db_material = self.session.exec(select(Material)
                                        .where(Material.id == material_id)
                                        .where(Material.is_deleted == False)).first()
        if db_material:
            db_material.is_deleted = True
            self.session.commit()
            return db_material
        return None