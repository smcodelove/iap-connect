// services/postService.js - Enhanced Post Service with Comment Features
/**
 * Post service for IAP Connect mobile app
 * Handles all post-related API calls including comments, replies, and likes
 */

import api from './api';

class PostService {
  // Get user feed
  async getFeed(page = 1, size = 20) {
    try {
      const response = await api.get(`/posts/feed?page=${page}&size=${size}`);
      return {
        posts: response.data.posts,
        total: response.data.total,
        hasNext: response.data.has_next,
        success: true
      };
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch feed');
    }
  }

  // Get trending posts
  async getTrendingPosts(page = 1, hoursWindow = 72, size = 20) {
    try {
      console.log(`🔥 Fetching trending posts (${hoursWindow}h window, page ${page})`);
      const response = await api.get(`/posts/trending?page=${page}&size=${size}&hours_window=${hoursWindow}`);
      console.log('✅ Trending posts fetched:', response.data);
      
      return {
        posts: response.data.posts,
        total: response.data.total,
        hasNext: response.data.has_next,
        success: true
      };
    } catch (error) {
      console.error('❌ Error fetching trending posts:', error);
      throw new Error(error.response?.data?.detail || 'Failed to fetch trending posts');
    }
  }

  // Get trending hashtags
  async getTrendingHashtags(limit = 10) {
    try {
      console.log('🏷️ Fetching trending hashtags...');
      const response = await api.get(`/posts/trending/hashtags?limit=${limit}`);
      console.log('✅ Trending hashtags fetched:', response.data);
      
      return {
        hashtags: response.data.trending_hashtags,
        total: response.data.total,
        success: true
      };
    } catch (error) {
      console.error('❌ Error fetching trending hashtags:', error);
      throw new Error(error.response?.data?.detail || 'Failed to fetch trending hashtags');
    }
  }

  // Create new post
  async createPost(postData) {
    try {
      const response = await api.post('/posts', {
        content: postData.content,
        media_urls: postData.media_urls || [],
        hashtags: postData.hashtags || []
      });
      return {
        post: response.data,
        success: true
      };
    } catch (error) {
      console.error('Create post error:', error.response?.data);
      throw new Error(error.response?.data?.detail || 'Failed to create post');
    }
  }

  // Get post by ID
  async getPostById(postId) {
    try {
      const response = await api.get(`/posts/${postId}`);
      return {
        post: response.data,
        success: true
      };
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch post');
    }
  }

  // Like a post
  async likePost(postId) {
    try {
      const response = await api.post(`/posts/${postId}/like`);
      return {
        success: true,
        liked: true,
        likes_count: response.data.likes_count
      };
    } catch (error) {
      console.error('Like post error:', error.response?.data);
      throw new Error(error.response?.data?.detail || 'Failed to like post');
    }
  }

  // Unlike a post
  async unlikePost(postId) {
    try {
      const response = await api.delete(`/posts/${postId}/like`);
      return {
        success: true,
        liked: false,
        likes_count: response.data.likes_count
      };
    } catch (error) {
      console.error('Unlike post error:', error.response?.data);
      throw new Error(error.response?.data?.detail || 'Failed to unlike post');
    }
  }

  // Get post comments with nested replies
  async getPostComments(postId, page = 1, size = 50) {
    try {
      const response = await api.get(`/posts/${postId}/comments?page=${page}&size=${size}`);
      return {
        comments: response.data.comments,
        total: response.data.total,
        success: true
      };
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch comments');
    }
  }

  // Add comment to post (or reply to comment)
  async addComment(postId, content, parentId = null) {
    try {
      const requestData = { content };
      if (parentId) {
        requestData.parent_id = parentId;
      }

      const response = await api.post(`/posts/${postId}/comments`, requestData);
      return {
        comment: response.data,
        success: true
      };
    } catch (error) {
      console.error('Add comment error:', error.response?.data);
      throw new Error(error.response?.data?.detail || 'Failed to add comment');
    }
  }

  // Get replies for a specific comment
  async getCommentReplies(commentId, page = 1, size = 20) {
    try {
      const response = await api.get(`/posts/comments/${commentId}/replies?page=${page}&size=${size}`);
      return {
        comments: response.data.comments,
        total: response.data.total,
        success: true
      };
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch replies');
    }
  }

  // Like a comment
  async likeComment(commentId) {
    try {
      const response = await api.post(`/posts/comments/${commentId}/like`);
      return {
        success: response.data.success,
        liked: response.data.liked,
        likes_count: response.data.likes_count
      };
    } catch (error) {
      console.error('Like comment error:', error.response?.data);
      throw new Error(error.response?.data?.detail || 'Failed to like comment');
    }
  }

  // Unlike a comment
  async unlikeComment(commentId) {
    try {
      const response = await api.delete(`/posts/comments/${commentId}/like`);
      return {
        success: response.data.success,
        liked: response.data.liked,
        likes_count: response.data.likes_count
      };
    } catch (error) {
      console.error('Unlike comment error:', error.response?.data);
      throw new Error(error.response?.data?.detail || 'Failed to unlike comment');
    }
  }

  // Delete comment
  async deleteComment(commentId) {
    try {
      await api.delete(`/posts/comments/${commentId}`);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to delete comment');
    }
  }

  // Share post functionality
  async sharePost(postId) {
    try {
      // This would typically update share count on backend
      // For now, we'll just return success
      console.log(`📤 Sharing post: ${postId}`);
      return {
        success: true,
        shared: true
      };
    } catch (error) {
      console.error('Share post error:', error);
      throw new Error('Failed to share post');
    }
  }

  // Search posts
  async searchPosts(query, page = 1, size = 20) {
    try {
      console.log(`🔍 Searching posts: "${query}" (page ${page})`);
      const response = await api.get(`/posts/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}`);
      console.log('✅ Search results:', response.data);
      
      return {
        posts: response.data.posts,
        total: response.data.total,
        hasNext: response.data.has_next,
        success: true
      };
    } catch (error) {
      console.error('❌ Search error:', error);
      throw new Error(error.response?.data?.detail || 'Failed to search posts');
    }
  }

  // Delete post
  async deletePost(postId) {
    try {
      await api.delete(`/posts/${postId}`);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to delete post');
    }
  }

  // Update post
  async updatePost(postId, postData) {
    try {
      const response = await api.put(`/posts/${postId}`, postData);
      return {
        post: response.data,
        success: true
      };
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update post');
    }
  }

  // Get trending analytics (for admin/insights)
  async getTrendingAnalytics() {
    try {
      console.log('📊 Fetching trending analytics...');
      const response = await api.get('/posts/trending/analytics');
      console.log('✅ Trending analytics fetched:', response.data);
      
      return {
        analytics: response.data,
        success: true
      };
    } catch (error) {
      console.error('❌ Error fetching trending analytics:', error);
      throw new Error(error.response?.data?.detail || 'Failed to fetch trending analytics');
    }
  }

  // Bulk update trending status (admin function)
  async updateTrendingStatus() {
    try {
      console.log('🔄 Updating trending status...');
      const response = await api.post('/posts/trending/update');
      console.log('✅ Trending status updated:', response.data);
      
      return {
        updated_count: response.data.updated_count,
        success: true
      };
    } catch (error) {
      console.error('❌ Error updating trending status:', error);
      throw new Error(error.response?.data?.detail || 'Failed to update trending status');
    }
  }
}

export default new PostService();