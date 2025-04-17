from fastapi import HTTPException
from passlib.context import CryptContext

from ..db.models import User
from ..schemas.user_schemas import UserOut, UserCreate


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



class UserService:
    def __init__(self, user_repository):
        self.user_repository = user_repository

    def get_user_by_id(self, user_id)-> UserOut:
        user = self.user_repository.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return UserOut.model_validate(user)

    def get_all_users(self):
        users = self.user_repository.get_all_users()
        if not users:
            raise HTTPException(status_code=404, detail="No users found")
        return [UserOut.model_validate(user) for user in users]

    def create_user(self, user:UserCreate) -> UserOut:
        existing_user = self.user_repository.get_user_by_email(user.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed_password = pwd_context.hash(user.password)

        user = User(
            username=user.username,
            email=user.email,
            password=hashed_password,
        )
        created_user = self.user_repository.create_user(user)
        return UserOut.model_validate(created_user)
