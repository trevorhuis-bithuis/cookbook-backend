from pydantic import BaseModel, Union


class UserPayloadSchema(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str


class UserResponseSchema(UserPayloadSchema):
    id: str


class RecipePayloadSchema(BaseModel):
    owner_id: str
    title: str
    steps: list
    description: Union[str, None] = None


class RecipeResponseSchema(RecipePayloadSchema):
    id: str


class IngredientPayloadSchema(BaseModel):
    name: str
    unit: str
    quantity: float


class IngredientResponseSchema(IngredientPayloadSchema):
    id: int
