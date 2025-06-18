# backend/models.py
from pydantic import BaseModel

class Project(BaseModel):
    title: str
    type: str
    description: str

class ProjectInDB(Project):
    id: int
