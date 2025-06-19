from fastapi import HTTPException
from passlib.context import CryptContext

from ..db.models import User
from ..schemas.user_schemas import UserOut, UserCreate, UserWithQuotes, UserUpdate

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

    def get_user_quotes(self, user_id: str) -> UserWithQuotes:
        """
        Get all quotes for a user.
        """
        user = self.user_repository.get_user_quotes(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return UserWithQuotes.model_validate(user, from_attributes=True)

    def update_user(self, user: UserUpdate, user_id: str) -> UserOut:
        db_user = self.user_repository.get_user_by_id(user_id)
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found")

        updated_data = user.dict(exclude_unset=True)

        for key, value in updated_data.items():
            setattr(db_user, key, value)


        db_user = self.user_repository.update_user(db_user)
        return UserOut.model_validate(db_user)

    def delete_user(self, user_id: str) -> UserOut:
        """
        Delete a user.
        """
        db_user = self.user_repository.delete_user(user_id)
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found")
        return UserOut.model_validate(db_user)

