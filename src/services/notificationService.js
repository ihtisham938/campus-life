// Comprehensive Notification Service
// Handles all types of notifications across the platform

class NotificationService {
  constructor() {
    this.notifications = [];
    this.subscribers = new Map();
    this.settings = {
      enableSound: true,
      enableBrowserNotifications: true,
      enableEmailNotifications: true,
      quietHours: { start: 22, end: 7 }, // 10 PM to 7 AM
    };
  }

  // Initialize notification service
  async initialize() {
    // Request browser notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    // Load existing notifications from localStorage
    this.loadNotifications();

    // Set up periodic cleanup
    setInterval(() => this.cleanupOldNotifications(), 60000 * 60); // Every hour
  }

  // Create different types of notifications
  createNotification(type, data) {
    const notification = {
      id: this.generateId(),
      type,
      title: this.getTitle(type, data),
      message: this.getMessage(type, data),
      data,
      timestamp: new Date(),
      read: false,
      priority: this.getPriority(type),
      category: this.getCategory(type),
      actionUrl: this.getActionUrl(type, data),
      expiresAt: this.getExpirationDate(type)
    };

    this.notifications.unshift(notification);
    this.saveNotifications();
    this.notifySubscribers(notification);
    this.showBrowserNotification(notification);
    this.playNotificationSound(notification);

    return notification;
  }

  // Notification type handlers
  eventApproved(eventData) {
    return this.createNotification('EVENT_APPROVED', eventData);
  }

  eventRejected(eventData) {
    return this.createNotification('EVENT_REJECTED', eventData);
  }

  eventConflictDetected(eventData) {
    return this.createNotification('EVENT_CONFLICT', eventData);
  }

  newEventProposal(eventData) {
    return this.createNotification('NEW_EVENT_PROPOSAL', eventData);
  }

  reviewReceived(reviewData) {
    return this.createNotification('REVIEW_RECEIVED', reviewData);
  }

  reviewApproved(reviewData) {
    return this.createNotification('REVIEW_APPROVED', reviewData);
  }

  reviewFlagged(reviewData) {
    return this.createNotification('REVIEW_FLAGGED', reviewData);
  }

  teacherResponse(responseData) {
    return this.createNotification('TEACHER_RESPONSE', responseData);
  }

  electionStarted(electionData) {
    return this.createNotification('ELECTION_STARTED', electionData);
  }

  electionEnding(electionData) {
    return this.createNotification('ELECTION_ENDING', electionData);
  }

  electionResults(electionData) {
    return this.createNotification('ELECTION_RESULTS', electionData);
  }

  questionAnswered(qaData) {
    return this.createNotification('QUESTION_ANSWERED', qaData);
  }

  questionUpvoted(qaData) {
    return this.createNotification('QUESTION_UPVOTED', qaData);
  }

  facilityIssueAssigned(issueData) {
    return this.createNotification('ISSUE_ASSIGNED', issueData);
  }

  facilityIssueResolved(issueData) {
    return this.createNotification('ISSUE_RESOLVED', issueData);
  }

  suggestionApproved(suggestionData) {
    return this.createNotification('SUGGESTION_APPROVED', suggestionData);
  }

  systemMaintenance(maintenanceData) {
    return this.createNotification('SYSTEM_MAINTENANCE', maintenanceData);
  }

  // Generate notification titles based on type
  getTitle(type, data) {
    const titles = {
      EVENT_APPROVED: '🎉 Event Approved!',
      EVENT_REJECTED: '❌ Event Not Approved',
      EVENT_CONFLICT: '⚠️ Schedule Conflict Detected',
      NEW_EVENT_PROPOSAL: '📅 New Event Proposal',
      REVIEW_RECEIVED: '⭐ New Review Received',
      REVIEW_APPROVED: '✅ Review Published',
      REVIEW_FLAGGED: '🚩 Review Flagged for Review',
      TEACHER_RESPONSE: '💬 Teacher Response',
      ELECTION_STARTED: '🗳️ Election Started',
      ELECTION_ENDING: '⏰ Election Ending Soon',
      ELECTION_RESULTS: '🏆 Election Results',
      QUESTION_ANSWERED: '💡 Your Question Answered',
      QUESTION_UPVOTED: '👍 Question Upvoted',
      ISSUE_ASSIGNED: '🔧 Issue Assigned',
      ISSUE_RESOLVED: '✅ Issue Resolved',
      SUGGESTION_APPROVED: '💡 Suggestion Approved',
      SYSTEM_MAINTENANCE: '🔧 System Maintenance'
    };
    return titles[type] || 'Notification';
  }

  // Generate notification messages based on type
  getMessage(type, data) {
    const messages = {
      EVENT_APPROVED: `Your event "${data.title}" has been approved and will take place on ${new Date(data.date).toLocaleDateString()}.`,
      EVENT_REJECTED: `Your event "${data.title}" was not approved. ${data.reason || 'Please check the feedback for details.'}`,
      EVENT_CONFLICT: `The proposed event "${data.title}" conflicts with ${data.conflictReason}. Alternative dates have been suggested.`,
      NEW_EVENT_PROPOSAL: `A new event "${data.title}" has been proposed by ${data.proposedBy}. Cast your vote!`,
      REVIEW_RECEIVED: `You have received a new ${data.rating}-star review for your ${data.course} course.`,
      REVIEW_APPROVED: `Your review for ${data.teacherName} has been approved and is now visible.`,
      REVIEW_FLAGGED: `A review has been flagged for manual review due to content concerns.`,
      TEACHER_RESPONSE: `${data.teacherName} has responded to your review.`,
      ELECTION_STARTED: `Voting has started for ${data.position}. Make sure to cast your vote!`,
      ELECTION_ENDING: `Voting for ${data.position} ends in ${data.timeRemaining}. Don't miss your chance to vote!`,
      ELECTION_RESULTS: `Election results for ${data.position} are now available. ${data.winner} has won!`,
      QUESTION_ANSWERED: `Your question "${data.questionTitle}" has received a new answer.`,
      QUESTION_UPVOTED: `Your question "${data.questionTitle}" received an upvote and is gaining popularity!`,
      ISSUE_ASSIGNED: `Your ${data.facility} issue "${data.title}" has been assigned to ${data.assignedTo}.`,
      ISSUE_RESOLVED: `Your ${data.facility} issue "${data.title}" has been resolved.`,
      SUGGESTION_APPROVED: `Your suggestion "${data.title}" has been approved for implementation!`,
      SYSTEM_MAINTENANCE: `System maintenance scheduled for ${new Date(data.scheduledTime).toLocaleString()}. Expected downtime: ${data.duration}.`
    };
    return messages[type] || 'You have a new notification.';
  }

  // Get notification priority
  getPriority(type) {
    const highPriority = ['EVENT_CONFLICT', 'REVIEW_FLAGGED', 'ELECTION_ENDING', 'SYSTEM_MAINTENANCE'];
    const mediumPriority = ['EVENT_APPROVED', 'EVENT_REJECTED', 'TEACHER_RESPONSE', 'ELECTION_RESULTS'];
    
    if (highPriority.includes(type)) return 'HIGH';
    if (mediumPriority.includes(type)) return 'MEDIUM';
    return 'LOW';
  }

  // Get notification category
  getCategory(type) {
    if (type.startsWith('EVENT_')) return 'EVENTS';
    if (type.startsWith('REVIEW_') || type === 'TEACHER_RESPONSE') return 'REVIEWS';
    if (type.startsWith('ELECTION_')) return 'ELECTIONS';
    if (type.startsWith('QUESTION_')) return 'QA';
    if (type.startsWith('ISSUE_') || type.startsWith('SUGGESTION_')) return 'FACILITIES';
    return 'SYSTEM';
  }

  // Get action URL for notification
  getActionUrl(type, data) {
    const urls = {
      EVENT_APPROVED: `/events/${data.id}`,
      EVENT_REJECTED: `/events/${data.id}`,
      EVENT_CONFLICT: `/events/${data.id}`,
      NEW_EVENT_PROPOSAL: `/events/${data.id}`,
      REVIEW_RECEIVED: `/reviews/teacher/${data.teacherId}/all-reviews`,
      REVIEW_APPROVED: `/reviews/teacher/${data.teacherId}/all-reviews`,
      TEACHER_RESPONSE: `/reviews/teacher/${data.teacherId}/all-reviews`,
      ELECTION_STARTED: `/elections`,
      ELECTION_ENDING: `/elections`,
      ELECTION_RESULTS: `/elections`,
      QUESTION_ANSWERED: `/qa`,
      ISSUE_ASSIGNED: `/feedback`,
      ISSUE_RESOLVED: `/feedback`,
      SUGGESTION_APPROVED: `/feedback`
    };
    return urls[type] || '/';
  }

  // Get expiration date for notification
  getExpirationDate(type) {
    const now = new Date();
    const days = {
      EVENT_APPROVED: 30,
      EVENT_REJECTED: 14,
      ELECTION_RESULTS: 60,
      SYSTEM_MAINTENANCE: 7
    };
    
    const daysToAdd = days[type] || 30;
    return new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  }

  // Show browser notification
  showBrowserNotification(notification) {
    if (!this.settings.enableBrowserNotifications) return;
    if (this.isQuietTime()) return;
    if (Notification.permission !== 'granted') return;

    const browserNotification = new Notification(notification.title, {
      body: notification.message,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: notification.type,
      requireInteraction: notification.priority === 'HIGH',
      silent: !this.settings.enableSound
    });

    browserNotification.onclick = () => {
      window.focus();
      if (notification.actionUrl) {
        window.location.href = notification.actionUrl;
      }
      browserNotification.close();
    };

    // Auto close low priority notifications
    if (notification.priority === 'LOW') {
      setTimeout(() => browserNotification.close(), 5000);
    }
  }

  // Play notification sound
  playNotificationSound(notification) {
    if (!this.settings.enableSound) return;
    if (this.isQuietTime()) return;

    const audio = new Audio();
    
    // Different sounds for different priorities
    switch (notification.priority) {
      case 'HIGH':
        audio.src = '/sounds/urgent-notification.mp3';
        break;
      case 'MEDIUM':
        audio.src = '/sounds/standard-notification.mp3';
        break;
      default:
        audio.src = '/sounds/gentle-notification.mp3';
    }

    audio.volume = 0.3;
    audio.play().catch(() => {
      // Ignore errors (user might not have interacted with page yet)
    });
  }

  // Check if it's quiet time
  isQuietTime() {
    const now = new Date();
    const hour = now.getHours();
    const { start, end } = this.settings.quietHours;
    
    if (start > end) {
      // Quiet hours span midnight
      return hour >= start || hour < end;
    }
    return hour >= start && hour < end;
  }

  // Subscribe to notifications
  subscribe(callback) {
    const id = this.generateId();
    this.subscribers.set(id, callback);
    return () => this.subscribers.delete(id);
  }

  // Notify all subscribers
  notifySubscribers(notification) {
    this.subscribers.forEach(callback => {
      try {
        callback(notification);
      } catch (error) {
        console.error('Error notifying subscriber:', error);
      }
    });
  }

  // Mark notification as read
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.saveNotifications();
    }
  }

  // Mark all notifications as read
  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.saveNotifications();
  }

  // Delete notification
  deleteNotification(notificationId) {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.saveNotifications();
  }

  // Clear all notifications
  clearAll() {
    this.notifications = [];
    this.saveNotifications();
  }

  // Get notifications with filtering options
  getNotifications(filters = {}) {
    let filtered = [...this.notifications];

    if (filters.category) {
      filtered = filtered.filter(n => n.category === filters.category);
    }

    if (filters.unreadOnly) {
      filtered = filtered.filter(n => !n.read);
    }

    if (filters.priority) {
      filtered = filtered.filter(n => n.priority === filters.priority);
    }

    if (filters.limit) {
      filtered = filtered.slice(0, filters.limit);
    }

    return filtered;
  }

  // Get unread count
  getUnreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }

  // Update notification settings
  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    localStorage.setItem('notificationSettings', JSON.stringify(this.settings));
  }

  // Get current settings
  getSettings() {
    return { ...this.settings };
  }

  // Clean up old notifications
  cleanupOldNotifications() {
    const now = new Date();
    this.notifications = this.notifications.filter(n => 
      !n.expiresAt || new Date(n.expiresAt) > now
    );
    this.saveNotifications();
  }

  // Utility methods
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  saveNotifications() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  loadNotifications() {
    try {
      const stored = localStorage.getItem('notifications');
      if (stored) {
        this.notifications = JSON.parse(stored);
      }

      const storedSettings = localStorage.getItem('notificationSettings');
      if (storedSettings) {
        this.settings = { ...this.settings, ...JSON.parse(storedSettings) };
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }

  // Batch create notifications
  createBatch(notifications) {
    return notifications.map(({ type, data }) => 
      this.createNotification(type, data)
    );
  }

  // Send email notification (would integrate with email service)
  async sendEmailNotification(notification, userEmail) {
    if (!this.settings.enableEmailNotifications) return;

    // This would integrate with an actual email service
    console.log(`Email notification sent to ${userEmail}:`, {
      subject: notification.title,
      body: notification.message,
      priority: notification.priority
    });
  }
}

// Export singleton instance
export default new NotificationService();