# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Allow your frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://nevenspooner.com"],  # Replace * with your domain later for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Neven's Backend!"}

@app.get("/projects")
def get_projects():
    return {
        "projects": [
            {"title": "Personal Portfolio", "type": "Personal", "description": "Live site with HTML/CSS and dark mode"},
            {"title": "Cybersecurity Blue Team", "type": "Group", "description": "Led 6-member team to find and report vulnerabilities"},
            {"title": "TryHackMe Challenges", "type": "CTFs", "description": "Web exploitation and cryptography challenges"}
        ]
    }
