from pydantic import BaseModel


class RecipeBase(BaseModel):
    title: str
    time_to_complete: int | None = None
    category: str | None = None


class RecipeCreate(RecipeBase):
    pass


class Recipe(RecipeBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    recipes: list[Recipe] = []

    class Config:
        orm_mode = True
