from pydantic import BaseModel

class RolBase(BaseModel):
    name: str
    description: str

class RolCreate(RolBase):
    pass

class RolOut(RolBase):
    id: int

    class Config:
        orm_mode = True