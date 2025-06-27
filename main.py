from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.middleware.cors import CORSMiddleware
import bcrypt, os
from dotenv import load_dotenv

password = b"6L4*YvJM-QSKimt" 
hashed = bcrypt.hashpw(password, bcrypt.gensalt())
# print(hashed.decode())

load_dotenv()

app = FastAPI()

# CORS setup (if frontend and backend are separate)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBasic()

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")

def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_user = credentials.username == ADMIN_USERNAME
    correct_pass = bcrypt.checkpw(credentials.password.encode(), ADMIN_PASSWORD_HASH.encode())
    if not (correct_user and correct_pass):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return True

@app.get("/admin/projects")
def get_projects(auth=Depends(verify_admin)):
    return [{"title": "Project 1"}, {"title": "Project 2"}]
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.middleware.cors import CORSMiddleware
import bcrypt, os
from dotenv import load_dotenv

password = b"Ninjastar123" 
hashed = bcrypt.hashpw(password, bcrypt.gensalt())
# print(hashed.decode())

load_dotenv()

app = FastAPI()

# CORS setup (if frontend and backend are separate)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBasic()

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")

def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_user = credentials.username == ADMIN_USERNAME
    correct_pass = bcrypt.checkpw(credentials.password.encode(), ADMIN_PASSWORD_HASH.encode())
    if not (correct_user and correct_pass):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return True

@app.get("/admin/projects")
def get_projects(auth=Depends(verify_admin)):
    return [{"title": "Project 1"}, {"title": "Project 2"}]
