from fastapi import HTTPException

from ..db.models import Quote
from ..repositories.quote_repository import QuoteRepository
from ..schemas import QuoteWithMaterials
from ..schemas.quote_schema import QuoteCreate, QuoteOut, QuoteWithUser


class QuoteService:
    def __init__(self, quote_repository: QuoteRepository):
        self.quote_repository = quote_repository

    def create_quote(self, quote_create:QuoteCreate):
        """
        Create a new quote.
        """
        db_quote = Quote(
            title=quote_create.title,
            text=quote_create.text,
            address=quote_create.address,
            status=quote_create.status,
            price=quote_create.price,
            user_id=quote_create.user_id
        )
        self.quote_repository.create_quote(db_quote)
        return db_quote

    def get_quote_by_id(self, quote_id: str)-> QuoteOut:
        """
        Get a quote by its ID.
        """
        db_quote = self.quote_repository.get_quote_by_id(quote_id)
        if not db_quote:
            raise HTTPException(status_code=404, detail="Quote not found")
        return QuoteOut.model_validate(db_quote)

    def get_quote_by_id_with_user(self, quote_id: str) -> QuoteWithUser:
        """
        Get a quote by its ID with user.
        """
        db_quote = self.quote_repository.get_quote_by_id_with_user(quote_id)
        if not db_quote:
            raise HTTPException(status_code=404, detail="Quote not found")
        return QuoteWithUser.model_validate(db_quote)



    def get_all_quotes_with_user(self) -> list[QuoteWithUser]:
        """
        Get all quotes with user.
        """
        db_quotes = self.quote_repository.get_all_quotes_with_user()
        if not db_quotes:
            raise HTTPException(status_code=404, detail="No quotes found")
        return [QuoteWithUser.model_validate(quote) for quote in db_quotes]

    def get_quotes_by_status(self, status: str) -> list[QuoteWithUser]:
        """
        Get all quotes by status.
        """
        db_quotes = self.quote_repository.get_quotes_by_status(status)
        if not db_quotes:
            raise HTTPException(status_code=404, detail="No quotes found")
        return [QuoteWithUser.model_validate(quote) for quote in db_quotes]

    def get_quotes_by_user_id(self, user_id: str) -> list[QuoteWithUser]:
        """
        Get all quotes by user id.
        """
        db_quotes = self.quote_repository.get_quotes_by_user_id(user_id)
        if not db_quotes:
            raise HTTPException(status_code=404, detail="No quotes found")
        return [QuoteWithUser.model_validate(quote) for quote in db_quotes]

    def get_quote_materials_by_id(self, quote_id: str) -> QuoteWithMaterials:
        """
        Get all quotes by user id.
        """
        db_quotes = self.quote_repository.get_quote_with_materials(quote_id)
        if not db_quotes:
            raise HTTPException(status_code=404, detail="No quotes found")
        return QuoteWithMaterials.model_validate(db_quotes)