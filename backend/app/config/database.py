"""
Database configuration for IAP Connect application.
Handles PostgreSQL connection and session management.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .settings import settings

# Create database engine
engine = create_engine(
    settings.database_url,
    echo=True,  # Set to False in production
    pool_size=20,
    max_overflow=0
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for models
Base = declarative_base()


def get_db():
    """
    Database dependency for FastAPI routes.
    Creates and closes database sessions automatically.
    
    Yields:
        db: SQLAlchemy database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()