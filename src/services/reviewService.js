// Review Service - Handles teacher reviews and moderation

class ReviewService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  }

  // Get all teachers with reviews
  async getTeachers() {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: this.getMockTeachers()
          });
        }, 500);
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Submit teacher review
  async submitTeacherReview(reviewData) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulate content moderation
          const moderationResult = this.moderateContent(reviewData.comment);
          resolve({
            success: true,
            message: 'Review submitted for moderation',
            reviewId: `review_${Date.now()}`,
            moderation: moderationResult,
            estimatedApprovalTime: '24-48 hours'
          });
        }, 800);
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Vote on review helpfulness
  async voteOnReview(reviewId, voteType) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: `Review marked as ${voteType}`,
            voteId: `vote_${Date.now()}`
          });
        }, 300);
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Report inappropriate review
  async reportReview(reviewId, reason) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Review reported for further review',
            reportId: `report_${Date.now()}`
          });
        }, 400);
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get teacher analytics
  async getTeacherAnalytics(teacherId) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              teacherId,
              totalReviews: 47,
              averageRating: 4.5,
              ratingTrends: {
                '2024-01': 4.2,
                '2024-02': 4.5,
                '2024-03': 4.6
              },
              courseBreakdown: {
                'CS101': { rating: 4.3, reviews: 20 },
                'CS201': { rating: 4.7, reviews: 15 },
                'CS301': { rating: 4.5, reviews: 12 }
              },
              studentFeedback: {
                positive: 85,
                neutral: 12,
                negative: 3
              }
            }
          });
        }, 600);
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Content moderation simulation
  moderateContent(content) {
    const inappropriateWords = ['hate', 'terrible', 'worst', 'stupid', 'awful'];
    const hasInappropriate = inappropriateWords.some(word => 
      content.toLowerCase().includes(word)
    );
    
    return {
      approved: !hasInappropriate,
      confidence: hasInappropriate ? 0.95 : 0.98,
      flags: hasInappropriate ? ['inappropriate-language'] : [],
      suggestedEdits: hasInappropriate ? ['Consider using more constructive language'] : []
    };
  }

  // Mock data
  getMockTeachers() {
    return [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        title: 'Professor',
        department: 'Computer Science',
        courses: ['CS101 - Introduction to Programming', 'CS201 - Data Structures', 'CS301 - Algorithms'],
        overallRating: 4.5,
        totalReviews: 47,
        ratingsBreakdown: {
          teaching: 4.6,
          clarity: 4.3,
          helpfulness: 4.7,
          difficulty: 3.8
        },
        recentReviews: [
          {
            id: 1,
            rating: 5,
            course: 'CS201',
            semester: 'Fall 2024',
            comment: 'Excellent teacher! Very clear explanations and always willing to help students.',
            ratings: { teaching: 5, clarity: 5, helpfulness: 5, difficulty: 4 },
            helpful: 12,
            notHelpful: 1,
            timestamp: new Date('2024-02-10T14:30:00'),
            status: 'approved',
            anonymous: true
          }
        ]
      }
    ];
  }
}

export default new ReviewService();