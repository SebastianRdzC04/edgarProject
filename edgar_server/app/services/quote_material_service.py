from ..repositories.quote_material_repository import QuoteMaterialRepository
from ..schemas import QuoteMaterialOut
from ..schemas.material_schema import QuoteWithMaterials
from ..schemas.quote_material_schema import QuoteMaterial
from ..db.models import QuoteMaterial as DBQuoteMaterial


class QuoteMaterialService:
    def __init__(self, quote_material_repository: QuoteMaterialRepository):
        self.quote_material_repository = quote_material_repository

    def create_quote_material(self, quote_material:QuoteMaterial) -> QuoteMaterial:
        """
        Create a new quote material.
        """
        quote_material_to_create = DBQuoteMaterial(
            quote_id=quote_material.quote_id,
            material_id=quote_material.material_id,
            quantity=quote_material.quantity,
            price=quote_material.price,
        )

        db_quote_material = self.quote_material_repository.create_quote_material(quote_material_to_create)
        return QuoteMaterial.model_validate(db_quote_material)

    def get_quote_material_by_id(self, quote_material_id:str) -> QuoteMaterialOut:
        """
        Get a quote material by its ID.
        """
        db_quote_material = self.quote_material_repository.get_quote_material_by_id(quote_material_id)
        return QuoteMaterialOut.model_validate(db_quote_material, from_attributes=True)

    def get_quote_materials_by_quote_id(self, quote_id:str) -> list[QuoteMaterialOut]:
        """
        Get all quote materials by quote ID.
        """
        db_quote_materials = self.quote_material_repository.get_quote_materials_by_quote_id(quote_id)
        return [QuoteMaterialOut.model_validate(db_quote_material, from_attributes=True) for db_quote_material in db_quote_materials]

    def get_quote_with_materials(self, quote_id:str) -> QuoteWithMaterials:
        """
        Get a quote by its ID with materials.
        """
        db_quote_material = self.quote_material_repository.get_quote_with_materials(quote_id)
        return QuoteWithMaterials.model_validate(db_quote_material, from_attributes=True)