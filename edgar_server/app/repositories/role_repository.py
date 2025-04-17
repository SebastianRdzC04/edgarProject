from sqlmodel import Session, select

from ..db.models import Role


class RoleRepository:
    def __init__(self, session:Session):
        self.session = session

    def get_role_by_id(self, role_id: str) -> Role | None:
        """
        Get a role by its ID.
        """
        db_role = self.session.get(Role, role_id)
        return db_role

    def get_role_by_name(self, role_name: str) -> Role | None:
        """
        Get a role by its name.
        """
        db_role = self.session.exec(select(Role).where(Role.name == role_name)).first()
        return db_role