// web/src/components/notifications/NotificationDropdown.js
/**
 * Notification Dropdown Component
 * Shows list of notifications with actions
 * FIXED: Proper component structure and API integration
 */

import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { 
  Bell, 
  X, 
  Heart, 
  MessageCircle, 
  UserPlus, 
  RefreshCw
} from 'lucide-react';
import { notificationService } from '../../services/api';

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 380px;
  max-height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid ${props => props.theme.colors.gray200};
  z-index: 1000;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 320px;
    right: -20px;
  }
`;

const DropdownHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.colors.gray50};
`;

const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.colors.gray800};
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray600};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.gray200};
    color: ${props => props.theme.colors.primary};
  }
`;

const NotificationList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${props => props.theme.colors.gray100};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  gap: 12px;
  
  ${props => !props.isRead && css`
    background: ${props.theme.colors.primary}05;
    border-left: 3px solid ${props.theme.colors.primary};
  `}
  
  &:hover {
    background: ${props => props.theme.colors.gray50};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  ${props => props.type === 'like' && css`
    background: #dc262620;
    color: #dc2626;
  `}
  
  ${props => props.type === 'comment' && css`
    background: #0066cc20;
    color: #0066cc;
  `}
  
  ${props => props.type === 'follow' && css`
    background: #28a74520;
    color: #28a745;
  `}
  
  ${props => !props.type && css`
    background: ${props.theme.colors.gray200};
    color: ${props.theme.colors.gray600};
  `}
`;

const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotificationText = styled.p`
  margin: 0 0 4px 0;
  font-size: 14px;
  color: ${props => props.theme.colors.gray800};
  line-height: 1.4;
  
  strong {
    font-weight: 600;
  }
`;

const NotificationTime = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.gray500};
`;

const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${props => props.theme.colors.gray500};
`;

const LoadingState = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.gray500};
`;

const MarkAllButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const NotificationDropdown = ({ isOpen, onClose, onNotificationClick }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getNotifications(1, 20);
      setNotifications(response.notifications || []);
      setUnreadCount(response.unread_count || 0);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      // Set fallback data on error
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Mark notification as read
  const handleNotificationClick = async (notification) => {
    if (!notification.is_read) {
      try {
        await notificationService.markAsRead(notification.id);
        setNotifications(prev => 
          prev.map(n => 
            n.id === notification.id ? { ...n, is_read: true } : n
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    }

    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => 
        prev.map(n => ({ ...n, is_read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart size={18} />;
      case 'comment':
        return <MessageCircle size={18} />;
      case 'follow':
        return <UserPlus size={18} />;
      default:
        return <Bell size={18} />;
    }
  };

  // Format time
  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMs = now - time;
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return time.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownHeader>
        <HeaderTitle>
          Notifications
          {unreadCount > 0 && ` (${unreadCount})`}
        </HeaderTitle>
        
        <HeaderActions>
          {unreadCount > 0 && (
            <MarkAllButton onClick={handleMarkAllAsRead}>
              Mark all read
            </MarkAllButton>
          )}
          
          <HeaderButton onClick={fetchNotifications}>
            <RefreshCw size={16} />
          </HeaderButton>
          
          <HeaderButton onClick={onClose}>
            <X size={16} />
          </HeaderButton>
        </HeaderActions>
      </DropdownHeader>

      <NotificationList>
        {loading ? (
          <LoadingState>
            <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite' }} />
            <span style={{ marginLeft: '8px' }}>Loading...</span>
          </LoadingState>
        ) : notifications.length === 0 ? (
          <EmptyState>
            <Bell size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
            <p>No notifications yet</p>
            <p style={{ fontSize: '14px' }}>We'll notify you when something happens!</p>
          </EmptyState>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              isRead={notification.is_read}
              onClick={() => handleNotificationClick(notification)}
            >
              <NotificationIcon type={notification.type}>
                {getNotificationIcon(notification.type)}
              </NotificationIcon>
              
              <NotificationContent>
                <NotificationText>
                  <strong>{notification.title}</strong>
                  <br />
                  {notification.message}
                </NotificationText>
                <NotificationTime>
                  {formatTime(notification.created_at)}
                </NotificationTime>
              </NotificationContent>
            </NotificationItem>
          ))
        )}
      </NotificationList>
    </DropdownContainer>
  );
};

export default NotificationDropdown;