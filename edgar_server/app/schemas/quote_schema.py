from pydantic import BaseModel

class Quote(BaseModel):
    title: str
    