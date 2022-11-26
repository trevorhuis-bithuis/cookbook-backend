from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.contrib.postgres.fields import ArrayField


class User(models.Model):
    id = fields.data.UUIDField(pk=True)
    username = fields.TextField(unique=True)
    password = fields.TextField()    
    first_name = fields.TextField()
    last_name = fields.TextField()
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

class Recipe(models.Model):
    id = fields.data.UUIDField(pk=True)
    owner_id = fields.ForeignKeyField("models.User", related_name="recipes")
    title = fields.TextField()
    description = fields.TextField()
    steps_array = ArrayField(element_type="text")
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    
class Ingredient(models.Model):
    id = fields.data.UUIDField(pk=True)
    recipe_id = fields.ForeignKeyField("models.Recipe", related_name="ingredients")
    name = fields.TextField()
    unit = fields.TextField()
    quantity = fields.DecimalField()
    
