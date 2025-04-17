from typing import Type

from sqlmodel import Session, select
from ..db.models import User


class UserRepository:
    def __init__(self, session:Session):
        self.session = session

    def get_user_by_email(self, email: str) -> User | None:
        """
        Get a user by their email.
        """
        db_user = self.session.exec(select(User).where(User.email == email)).first()
        return db_user

    def get_all_users(self):
        db_user = self.session.exec(select(User)).all()
        return db_user

    def get_user_by_id(self, user_id):
        db_user = self.session.get(User, user_id)
        return db_user

    def create_user(self, user: User):
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)
        return user