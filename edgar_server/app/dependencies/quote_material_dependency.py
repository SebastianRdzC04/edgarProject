from fastapi import Depends
from sqlmodel import Session

from ..db.session import get_session
from ..repositories.quote_material_repository import QuoteMaterialRepository
from ..services.quote_material_service import QuoteMaterialService


def get_quote_material_repository(db: Session = Depends(get_session)) -> QuoteMaterialRepository:
    """
    Dependency to get the QuoteMaterialRepository instance.
    """
    return QuoteMaterialRepository(db)

def get_quote_material_service(quote_material_repository: QuoteMaterialRepository = Depends(get_quote_material_repository)) -> QuoteMaterialService:
    """
    Dependency to get the QuoteMaterialService instance.
    """
    return QuoteMaterialService(quote_material_repository)