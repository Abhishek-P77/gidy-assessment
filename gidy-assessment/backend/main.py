from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker, Session

# --- Database Setup ---
SQLALCHEMY_DATABASE_URL = "sqlite:///./profile.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# SQLAlchemy Model (Database Schema)
class DBProfile(Base):
    __tablename__ = "profiles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, default="Alex Developer")
    bio = Column(String, default="Full-stack engineer passionate about clean code and intuitive UIs.")
    avatar_url = Column(String, default="https://ui-avatars.com/api/?name=Alex+Developer&background=0D8ABC&color=fff&size=128")
    github = Column(String, default="alexdev")
    twitter = Column(String, default="@alexdev")
    skills = Column(String, default="React, Python, Tailwind CSS, FastAPI, SQL") # Stored as a comma-separated string

Base.metadata.create_all(bind=engine)

# --- Pydantic Models (Data Validation) ---
class Socials(BaseModel):
    github: str
    twitter: str

class ProfileResponse(BaseModel):
    name: str
    bio: str
    avatarUrl: str
    socials: Socials
    skills: list[str]

class ProfileUpdate(BaseModel):
    name: str
    bio: str
    github: str
    twitter: str
    skills: str

# --- FastAPI App Setup ---
app = FastAPI()

# Allow React frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, this would be your Vercel/Netlify URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- API Endpoints ---

@app.get("/api/profile", response_model=ProfileResponse)
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(DBProfile).first()
    # Initialize a default profile if the database is completely empty
    if not profile:
        profile = DBProfile()
        db.add(profile)
        db.commit()
        db.refresh(profile)
    
    # Format the data to match exactly what our React frontend expects
    return {
        "name": profile.name,
        "bio": profile.bio,
        "avatarUrl": profile.avatar_url,
        "socials": {"github": profile.github, "twitter": profile.twitter},
        "skills": [s.strip() for s in profile.skills.split(",")] if profile.skills else []
    }

@app.put("/api/profile")
def update_profile(profile_data: ProfileUpdate, db: Session = Depends(get_db)):
    profile = db.query(DBProfile).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    profile.name = profile_data.name
    profile.bio = profile_data.bio
    profile.github = profile_data.github
    profile.twitter = profile_data.twitter
    profile.skills = profile_data.skills
    
    db.commit()
    return {"message": "Profile updated successfully"}

from mangum import Mangum

# ... your existing app = FastAPI() code ...

handler = Mangum(app)