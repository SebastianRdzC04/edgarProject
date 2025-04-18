from sqlalchemy.orm import selectinload
from sqlmodel import Session, select

from ..db.models import QuoteMaterial, Quote
from ..schemas.material_schema import QuoteWithMaterials, MaterialInQuote


class QuoteMaterialRepository:
    def __init__(self, session: Session):
        self.session = session

    def create_quote_material(self, quote_material):
        """
        Create a new quote material.
        """
        db_quote_material = quote_material
        self.session.add(db_quote_material)
        self.session.commit()
        self.session.refresh(db_quote_material)
        return db_quote_material

    def get_quote_material_by_id(self, quote_material_id):
        """
        Get a quote material by its ID.
        """
        db_quote_material = self.session.get(QuoteMaterial, quote_material_id)
        return db_quote_material

    def get_quote_materials_by_quote_id(self, quote_id):
        """
        Get all quote materials by quote ID.
        """
        statement = (
            select(QuoteMaterial)
            .where(QuoteMaterial.quote_id == quote_id)
            .options(selectinload(QuoteMaterial.quote))
            .options(selectinload(QuoteMaterial.material))
        )
        result = self.session.exec(statement).all()
        return result

