from fastapi import Depends
from sqlmodel import Session

from ..db.session import get_session
from ..repositories.quote_repository import QuoteRepository
from ..services.quote_services import QuoteService


def get_quote_repository(db: Session = Depends(get_session)) -> QuoteRepository:
    """
    Dependency to get the QuoteRepository instance.
    """
    return QuoteRepository(db)

def get_quote_service(quote_repository: QuoteRepository = Depends(get_quote_repository)) -> QuoteService:
    """
    Dependency to get the QuoteService instance.
    """
    return QuoteService(quote_repository)