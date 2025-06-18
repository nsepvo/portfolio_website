# backend/main.py
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from os import getenv
from .models import Project
from .database import get_db
from . import crud


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://nevenspooner.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def verify_admin(request: Request):
    password = request.headers.get("X-Admin-Password")
    if password != getenv("ADMIN_PASSWORD"):
        raise HTTPException(status_code=401, detail="Unauthorized")

@app.get("/admin/projects")
async def list_projects(request: Request, _: None = Depends(verify_admin)):
    conn = await get_db()
    projects = await crud.get_projects(conn)
    await conn.close()
    return projects

@app.get("/projects")
async def get_public_projects():
    conn = await get_db()
    projects = await crud.get_projects(conn)
    await conn.close()
    return {"projects": projects}

@app.post("/admin/projects")
async def create_project(project: Project, request: Request, _: None = Depends(verify_admin)):
    conn = await get_db()
    await crud.add_project(conn, project)
    await conn.close()
    return {"message": "Project added"}

@app.put("/admin/projects/{project_id}")
async def update(project_id: int, project: Project, request: Request, _: None = Depends(verify_admin)):
    conn = await get_db()
    await crud.update_project(conn, project_id, project)
    await conn.close()
    return {"message": "Project updated"}

@app.delete("/admin/projects/{project_id}")
async def delete(project_id: int, request: Request, _: None = Depends(verify_admin)):
    conn = await get_db()
    await crud.delete_project(conn, project_id)
    await conn.close()
    return {"message": "Project deleted"}
