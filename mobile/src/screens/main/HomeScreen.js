// screens/main/HomeScreen.js - Updated with Enhanced PostCard
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  RefreshControl,
  Alert,
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../utils/constants';
import api from '../../services/api';

// Enhanced Post Card Component with Save Feature
const PostCard = ({ post, navigation }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [saved, setSaved] = useState(post.is_bookmarked || false); // NEW: Save state

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  // Handle comment navigation
  const handleComment = () => {
    console.log('🏃‍♂️ Navigating to PostDetail for comments...');
    navigation.navigate('PostDetail', { 
      postId: post.id,
      openComments: true 
    });
  };

  // Handle share
  const handleShare = () => {
    console.log('📤 Sharing post:', post.id);
    Alert.alert('Share', 'Share functionality will be implemented soon!');
  };

  // NEW: Handle save/unsave
  const handleSave = async () => {
    const newSaved = !saved;
    setSaved(newSaved);

    try {
      if (newSaved) {
        // Save post
        console.log('💾 Saving post:', post.id);
        await api.post(`/posts/${post.id}/bookmark`);
        Alert.alert('Saved!', 'Post saved to your bookmarks');
      } else {
        // Unsave post
        console.log('🗑️ Unsaving post:', post.id);
        await api.delete(`/posts/${post.id}/bookmark`);
        Alert.alert('Removed', 'Post removed from bookmarks');
      }
    } catch (error) {
      // Revert on error
      setSaved(!newSaved);
      console.error('Save error:', error.response?.data);
      Alert.alert('Error', error.response?.data?.detail || 'Failed to save post');
    }
  };

  // Handle user press
  const handleUserPress = () => {
    console.log('👤 Navigating to user profile:', post.author.id);
    // navigation.navigate('UserProfile', { userId: post.author.id });
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMs = now - postTime;
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins}m`;
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInDays < 7) return `${diffInDays}d`;
    
    return postTime.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  // Render hashtags
  const renderContent = (content) => {
    if (!content) return null;
    
    const parts = content.split(/(#[\w]+)/g);
    return (
      <Text style={styles.postContent}>
        {parts.map((part, index) => (
          part.startsWith('#') ? (
            <Text key={index} style={styles.hashtag}>
              {part}
            </Text>
          ) : (
            <Text key={index}>{part}</Text>
          )
        ))}
      </Text>
    );
  };

  return (
    <View style={styles.postCard}>
      {/* Header */}
      <View style={styles.postHeader}>
        <TouchableOpacity 
          style={styles.userInfo}
          onPress={handleUserPress}
          activeOpacity={0.7}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {post.author.full_name.charAt(0)}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{post.author.full_name}</Text>
            <View style={styles.postMeta}>
              <Text style={styles.userType}>
                {post.author.user_type === 'admin' ? 'System Administrator' : 
                 post.author.user_type === 'doctor' ? 'Doctor' : 'Student'}
              </Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.timestamp}>{formatTime(post.created_at)}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="more-horizontal" size={20} color={colors.gray600} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <TouchableOpacity 
        style={styles.postContentContainer}
        onPress={handleComment}
        activeOpacity={0.95}
      >
        {renderContent(post.content)}
      </TouchableOpacity>

      {/* Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity 
          style={[styles.actionButton, liked && styles.actionButtonLiked]}
          onPress={handleLike}
          activeOpacity={0.8}
        >
          <Icon 
            name="heart" 
            size={20} 
            color={liked ? '#DC3545' : colors.gray600}
            fill={liked ? '#DC3545' : 'none'}
          />
          <Text style={[styles.actionText, liked && styles.actionTextLiked]}>
            {likesCount > 0 ? likesCount : 'Like'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleComment}
          activeOpacity={0.8}
        >
          <Icon name="message-circle" size={20} color={colors.gray600} />
          <Text style={styles.actionText}>
            {post.comments_count > 0 ? post.comments_count : 'Comment'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleShare}
          activeOpacity={0.8}
        >
          <Icon name="share" size={20} color={colors.gray600} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

        {/* NEW: Save Button with Functionality */}
        <TouchableOpacity 
          style={[styles.actionButton, saved && styles.actionButtonSaved]}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Icon 
            name="bookmark" 
            size={20} 
            color={saved ? '#0066CC' : colors.gray600}
            fill={saved ? '#0066CC' : 'none'}
          />
          <Text style={[styles.actionText, saved && styles.actionTextSaved]}>
            {saved ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(state => state.auth.user);

  // Load posts
  const loadPosts = async () => {
    try {
      console.log('🚀 Fetching posts from feed...');
      const response = await api.get('/posts/feed');
      console.log('✅ Posts fetched:', response.data);
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error('❌ Error fetching posts:', error);
      Alert.alert('Error', 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // Handle refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  // Handle create post navigation
  const handleCreatePost = () => {
    console.log('🎯 Navigating to CreatePost...');
    navigation.navigate('CreatePost');
  };

  // Render item with navigation prop
  const renderItem = ({ item }) => (
    <PostCard post={item} navigation={navigation} />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>IAP Connect</Text>
          <Text style={styles.headerSubtitle}>
            Welcome back, {user?.full_name || 'User'}!
          </Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading posts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>IAP Connect</Text>
        <Text style={styles.headerSubtitle}>
          Welcome back, {user?.full_name || 'User'}!
        </Text>
      </View>

      {/* Posts List */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={styles.postsContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button for Create Post */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={handleCreatePost}
        activeOpacity={0.8}
      >
        <Icon name="plus" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  postsContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6C757D',
  },
  
  // Post Card Styles
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#0066CC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 2,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userType: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '500',
  },
  separator: {
    fontSize: 12,
    color: '#CED4DA',
    marginHorizontal: 6,
  },
  timestamp: {
    fontSize: 12,
    color: '#ADB5BD',
  },
  moreButton: {
    padding: 8,
  },
  
  // Content Styles
  postContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  postContent: {
    fontSize: 16,
    color: '#343A40',
    lineHeight: 22,
  },
  hashtag: {
    color: '#0066CC',
    fontWeight: '600',
  },
  
  // Actions Styles
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12, // Reduced to fit 4 buttons
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    flex: 1,
    marginHorizontal: 2, // Reduced margin
    justifyContent: 'center',
  },
  actionButtonLiked: {
    backgroundColor: '#FFE8E8',
  },
  actionButtonSaved: { // NEW: Saved button style
    backgroundColor: '#E8F0FF',
  },
  actionText: {
    fontSize: 11, // Slightly smaller for 4 buttons
    color: '#6C757D',
    marginLeft: 4, // Reduced margin
    fontWeight: '500',
  },
  actionTextLiked: {
    color: '#DC3545',
  },
  actionTextSaved: { // NEW: Saved text style
    color: '#0066CC',
  },
  
  // Floating Action Button
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 1000,
  },
});