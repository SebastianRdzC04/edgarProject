from typing import Type

from sqlalchemy.orm import selectinload
from sqlmodel import Session, select
from ..db.models import User


class UserRepository:
    def __init__(self, session:Session):
        self.session = session

    def get_user_by_email(self, email: str) -> User | None:
        """
        Get a user by their email.
        """
        db_user = self.session.exec(select(User).where(User.email == email).where(User.is_deleted == False)).first()
        return db_user

    def get_all_users(self):
        db_user = self.session.exec(select(User).where(User.is_deleted == False)).all()
        return db_user

    def get_user_by_id(self, user_id):
        statement = select(User).where(User.id == user_id).where(User.is_deleted == False)
        result = self.session.exec(statement).first()
        return result

    def create_user(self, user: User):
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)
        return user

    def get_user_quotes(self, user_id: str):
        """
        Get all quotes for a user.
        """
        statement = (
            select(User)
            .where(User.id == user_id)
            .where(User.is_deleted == False)
            .options(selectinload(User.quotes))
        )
        result = self.session.exec(statement)
        return result.first()

    def update_user(self, user: User):
        """
        Update a user.
        """
        db_user = self.session.exec(select(User).where(User.id == user.id)).first()
        if not db_user:
            return None
        db_user.username = user.username
        db_user.email = user.email
        self.session.commit()
        self.session.refresh(db_user)
        return db_user

    def delete_user(self, user_id: str):
        """
        Delete a user.
        """
        db_user = self.session.exec(select(User).where(User.id == user_id)).first()
        if not db_user:
            return None
        db_user.is_deleted = True
        self.session.commit()
        self.session.refresh(db_user)
        return db_user
    
    def convert_user_to_admin(self, user_id: str, role_id: str):
        """
        Convert a user to an admin.
        """
        db_user = self.session.exec(select(User).where(User.id == user_id)).first()
        if not db_user:
            return None
        db_user.role_id = role_id
        self.session.commit()
        self.session.refresh(db_user)
        return db_user