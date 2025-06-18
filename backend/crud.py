from typing import List
import asyncpg
from .models import Project

async def get_projects(conn) -> List[dict]:
    rows = await conn.fetch("SELECT * FROM projects ORDER BY id;")
    return [dict(row) for row in rows]

async def add_project(conn, project: Project):
    await conn.execute(
        "INSERT INTO projects (title, type, description) VALUES ($1, $2, $3);",
        project.title, project.type, project.description
    )

async def update_project(conn, project_id: int, project: Project):
    await conn.execute(
        "UPDATE projects SET title=$1, type=$2, description=$3 WHERE id=$4;",
        project.title, project.type, project.description, project_id
    )

async def delete_project(conn, project_id: int):
    await conn.execute("DELETE FROM projects WHERE id=$1;", project_id)
