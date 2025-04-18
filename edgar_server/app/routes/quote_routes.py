from fastapi import APIRouter, Depends

from ..db.models import QuoteStatusEnum
from ..dependencies.quote_dependency import get_quote_service
from ..schemas.material_schema import QuoteWithMaterials
from ..schemas.quote_schema import QuoteCreate, QuoteWithUser, QuoteOut
from ..services.quote_services import QuoteService


router = APIRouter(prefix="/quotes", tags=["quotes"])

@router.post("/", response_model=QuoteOut)
def create_quote(quote: QuoteCreate,
                 service: QuoteService = Depends(get_quote_service)):
    """
    Create a new quote.
    """
    return service.create_quote(quote)


@router.get("/all", response_model=list[QuoteWithUser])
def get_all_quotes(
    service: QuoteService = Depends(get_quote_service)
):
    """
    Get all quotes.
    """
    return service.get_all_quotes_with_user()

@router.get("/{quote_id}", response_model=QuoteWithUser)
def get_quote(
    quote_id: str,
    service: QuoteService = Depends(get_quote_service)
):
    """
    Get a quote by its ID.
    """
    return service.get_quote_by_id_with_user(quote_id)

@router.get("/status/{status}", response_model=list[QuoteWithUser])
def get_quotes_by_status(
    status: QuoteStatusEnum,
    service: QuoteService = Depends(get_quote_service)
):
    """
    Get all quotes by status.
    """
    return service.get_quotes_by_status(status)


#@router.get("/materials/{quote_id}", response_model=QuoteWithMaterials)
#def get_quote_with_materials(
#    quote_id: str,
#    service: QuoteService = Depends(get_quote_service)
#):
#    """
#    Get a quote by its ID with materials.
#    """
#    return service.get_quote_materials_by_id(quote_id)


@router.get("/{quote_id}/materials", response_model=QuoteWithMaterials)
def get_quote_with_materials(
    quote_id: str,
    service: QuoteService = Depends(get_quote_service)
):
    """
    Get a quote by its ID with materials.
    """
    return service.get_quote_materials_by_id(quote_id)

