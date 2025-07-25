"""
Models package initialization for IAP Connect application.
Imports all database models for easy access.
"""

from ..config.database import Base
from .user import User, UserType
from .post import Post
from .comment import Comment
from .like import Like
from .comment_like import CommentLike
from .share import Share
from .bookmark import Bookmark  # NEW: Import Bookmark model
from .follow import Follow

__all__ = [
    "Base",
    "User",
    "UserType", 
    "Post",
    "Comment",
    "Like",
    "CommentLike",
    "Share",
    "Bookmark",  # NEW: Add to exports
    "Follow"
]