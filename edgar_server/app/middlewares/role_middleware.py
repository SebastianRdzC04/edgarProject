from fastapi import HTTPException
from fastapi.params import Depends

from ..dependencies.rol_dependency import get_role_repository
from ..repositories.role_repository import RoleRepository


def verify_role(role:str, role_expected:str, repository:RoleRepository = Depends(get_role_repository)):
    """
    Verify if the user has the expected role.
    """
    role = repository.get_role_by_id(role)
    if role.name != role_expected:
        raise HTTPException(status_code=404, detail="Role not found")


