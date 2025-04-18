from .quote_schema import QuoteWithUser, Quote
from .user_schemas import UserWithQuotes, UserBase
from .quote_material_schema import QuoteMaterialOut
from .material_schema import MaterialBase, MaterialOut, QuoteWithMaterials

QuoteWithUser.model_rebuild()
UserWithQuotes.model_rebuild()
QuoteMaterialOut.model_rebuild()
QuoteWithMaterials.model_rebuild()