from fastapi import APIRouter, Depends
from pydantic import BaseModel

from ..db.models import QuoteStatusEnum
from ..dependencies.auth_dependency import get_current_user_from_cookie
from ..dependencies.quote_dependency import get_quote_service
from ..dependencies.user_dependency import get_user_service
from ..schemas.material_schema import QuoteWithMaterials
from ..schemas.quote_schema import QuoteCreate, QuoteWithUser, QuoteOut
from ..schemas.user_schemas import UserWithRol
from ..services.quote_services import QuoteService
from ..services.user_services import UserService


router = APIRouter(prefix="/quotes", tags=["quotes"])

# New schema for the combined user+quote creation
class QuoteCreateWithUser(BaseModel):
    title: str
    text: str
    address: str
    price: float = 0
    username: str
    email: str

# Schema for creating quotes without user (gets user from cookies)
class QuoteCreateWithoutUser(BaseModel):
    title: str
    text: str
    address: str
    price: float = 0


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


@router.post("/create-with-user", response_model=QuoteOut)
def create_quote_with_user(
    data: QuoteCreateWithUser,
    quote_service: QuoteService = Depends(get_quote_service),
    user_service: UserService = Depends(get_user_service)
):
    """
    Create a new user and quote in a single operation.
    Creates a user with the provided username and email (default password: 123123)
    Then creates a quote for that user.
    """
    # Create the user first
    from ..schemas.user_schemas import UserCreate
    
    # Create a user with default password
    user_data = UserCreate(
        username=data.username,
        email=data.email,
        password="123123"  # This will be hashed by the user service
    )
    
    user = user_service.create_user(user_data)
    
    # Now create the quote with the new user's ID
    quote_data = QuoteCreate(
        title=data.title,
        text=data.text,
        address=data.address,
        price=data.price,
        user_id=user.id
    )
    
    return quote_service.create_quote(quote_data)


@router.post("/create-without-user", response_model=QuoteOut)
def create_quote_without_user(
    data: QuoteCreateWithoutUser,
    current_user: UserWithRol = Depends(get_current_user_from_cookie),
    quote_service: QuoteService = Depends(get_quote_service)
):
    """
    Create a new quote for the currently logged-in user.
    Gets the user from the authentication cookies.
    """
    # Create quote data with the current user's ID
    quote_data = QuoteCreate(
        title=data.title,
        text=data.text,
        address=data.address,
        price=data.price,
        user_id=current_user.id
    )
    
    return quote_service.create_quote(quote_data)

