from sqlmodel import Session, select
from sqlalchemy.orm import selectinload

from ..db.models import Quote, QuoteMaterial
from ..schemas.material_schema import MaterialInQuote


class QuoteRepository:
    def __init__(self, session:Session):
        self.session = session

    def create_quote(self, quote_create:Quote):
        """
        Create a new quote.
        """
        db_quote = quote_create
        self.session.add(db_quote)
        self.session.commit()
        self.session.refresh(db_quote)
        return db_quote

    def get_quote_by_id(self, quote_id):
        """
        Get a quote by its ID.
        """
        db_quote = self.session.exec(select(Quote).where(Quote.id == quote_id).where(Quote.is_deleted == False)).first()
        return db_quote



    def get_quote_by_id_with_user(self, quote_id):
        """
        Get a quote by its ID with user.
        """
        statement = (
            select(Quote)
            .where(Quote.id == quote_id)
            .where(Quote.is_deleted == False)
            .options(selectinload(Quote.user))
        )
        result = self.session.exec(statement).first()
        return result

    def get_all_quotes_with_user(self):
        """
        Get all quotes with user.
        """
        statement = (
            select(Quote)
            .where(Quote.is_deleted == False)
            .options(selectinload(Quote.user))
        )
        result = self.session.exec(statement).all()
        return result

    def get_quotes_by_status(self, status):
        """
        Get all quotes by status.
        """
        statement = (
            select(Quote)
            .where(Quote.status == status)
            .where(Quote.is_deleted == False)
        )
        result = self.session.exec(statement).all()
        return result

    def get_quotes_by_user_id(self, user_id):
        """
        Get all quotes by user ID.
        """
        statement = (
            select(Quote)
            .where(Quote.user_id == user_id)
            .where(Quote.is_deleted == False)
            .options(selectinload(Quote.user))
        )
        result = self.session.exec(statement).all()
        return result

    def get_quote_with_materials(self, quote_id):
        quote = self.session.exec(
            select(Quote)
            .where(Quote.id == quote_id)
            .where(Quote.is_deleted == False)
            .options(
                selectinload(Quote.materials).selectinload(QuoteMaterial.material)
            )
        ).first()

        if not quote:
            return None

        material_data = []
        for qm in quote.materials:
            if not qm.is_deleted:
                material_data.append(MaterialInQuote(
                    name=qm.material.name,
                    description=qm.material.description,
                    quantity=qm.quantity,
                    price=qm.price
                ))


        return {
            "id": quote.id,
            "quote_id": quote.id,  # Campo requerido por el esquema
            "title": quote.title,
            "text": quote.text,
            "status": quote.status,
            "address": quote.address,  # Campo requerido por el esquema
            "materials": material_data
        }

    def update_quote(self, quote_id, quote_update):
        """
        Update a quote by its ID.
        """
        db_quote = self.session.get(Quote, quote_id)
        if not db_quote:
            return None
        for key, value in quote_update.dict(exclude_unset=True).items():
            setattr(db_quote, key, value)
        self.session.add(db_quote)
        self.session.commit()
        self.session.refresh(db_quote)
        return db_quote