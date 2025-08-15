// Course Service - Handles course ratings and syllabus feedback

class CourseService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  }

  // Get all courses with ratings
  async getCourses() {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: this.getMockCourses()
          });
        }, 500);
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Submit course rating
  async submitCourseRating(ratingData) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Course rating submitted successfully',
            ratingId: `rating_${Date.now()}`
          });
        }, 600);
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get course analytics
  async getCourseAnalytics(courseId) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              courseId,
              enrollmentTrends: {
                'Fall 2023': 110,
                'Spring 2024': 125,
                'Fall 2024': 120
              },
              ratingTrends: {
                'Fall 2023': 4.1,
                'Spring 2024': 4.2,
                'Fall 2024': 4.3
              },
              categoryBreakdown: {
                content: { avg: 4.2, count: 156 },
                difficulty: { avg: 3.8, count: 156 },
                workload: { avg: 3.5, count: 156 },
                syllabus: { avg: 4.0, count: 156 },
                materials: { avg: 4.1, count: 156 },
                assignments: { avg: 4.3, count: 156 }
              },
              studentOutcomes: {
                passRate: 92,
                averageGPA: 3.2,
                retentionRate: 95
              }
            }
          });
        }, 600);
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Compare courses
  async compareCourses(courseIds) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const courses = this.getMockCourses().filter(c => courseIds.includes(c.id));
          resolve({
            success: true,
            data: {
              courses,
              comparison: {
                highestRated: courses.reduce((prev, curr) => prev.overallRating > curr.overallRating ? prev : curr),
                easiest: courses.reduce((prev, curr) => prev.ratingsBreakdown.difficulty < curr.ratingsBreakdown.difficulty ? prev : curr),
                mostEngaging: courses.reduce((prev, curr) => prev.ratingsBreakdown.content > curr.ratingsBreakdown.content ? prev : curr)
              }
            }
          });
        }, 400);
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get syllabus feedback
  async getSyllabusFeedback(courseId) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              courseId,
              syllabusRating: 4.0,
              feedbackCategories: {
                clarity: 4.1,
                organization: 3.9,
                expectations: 4.2,
                resources: 3.8
              },
              suggestions: [
                'Add more detailed assignment rubrics',
                'Include more recommended reading materials',
                'Clarify late submission policies',
                'Add course schedule with specific topics'
              ],
              commonConcerns: [
                'Assignment deadlines too close together',
                'Unclear grading criteria',
                'Limited office hours information'
              ]
            }
          });
        }, 500);
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Submit syllabus feedback
  async submitSyllabusFeedback(courseId, feedbackData) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Syllabus feedback submitted successfully',
            feedbackId: `syllabus_feedback_${Date.now()}`
          });
        }, 400);
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get recommended courses
  async getRecommendedCourses(studentProfile) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const allCourses = this.getMockCourses();
          // Simple recommendation based on department and rating
          const recommended = allCourses
            .filter(course => course.overallRating >= 4.0)
            .slice(0, 3);
          
          resolve({
            success: true,
            data: {
              recommended,
              reasons: [
                'High student ratings',
                'Good syllabus quality',
                'Positive feedback on teaching'
              ]
            }
          });
        }, 600);
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Mock data
  getMockCourses() {
    return [
      {
        id: 1,
        code: 'CS101',
        name: 'Introduction to Programming',
        department: 'Computer Science',
        credits: 3,
        instructor: 'Dr. Sarah Johnson',
        semester: 'Fall 2024',
        description: 'Introduction to programming concepts using Python. Covers variables, control structures, functions, and basic data structures.',
        prerequisites: 'None',
        overallRating: 4.3,
        totalRatings: 156,
        ratingsBreakdown: {
          content: 4.2,
          difficulty: 3.8,
          workload: 3.5,
          syllabus: 4.0,
          materials: 4.1,
          assignments: 4.3
        },
        enrollmentStats: {
          enrolled: 120,
          capacity: 150,
          waitlist: 15
        },
        gradeDistribution: {
          'A': 25, 'B': 35, 'C': 25, 'D': 10, 'F': 5
        },
        recentReviews: [
          {
            id: 1,
            overallRating: 5,
            semester: 'Fall 2024',
            ratings: {
              content: 5, difficulty: 4, workload: 4,
              syllabus: 5, materials: 4, assignments: 5
            },
            review: 'Great introductory course! Dr. Johnson explains concepts clearly and the assignments are well-structured.',
            pros: ['Clear explanations', 'Good pace', 'Helpful assignments'],
            cons: ['Could use more practice problems'],
            wouldRecommend: true,
            wouldTakeAgain: true,
            helpful: 18,
            timestamp: new Date('2024-02-10T14:30:00')
          }
        ]
      },
      {
        id: 2,
        code: 'MATH201',
        name: 'Calculus II',
        department: 'Mathematics',
        credits: 4,
        instructor: 'Prof. Michael Chen',
        semester: 'Fall 2024',
        description: 'Continuation of Calculus I. Integration techniques, applications of integration, sequences and series.',
        prerequisites: 'MATH101 - Calculus I',
        overallRating: 3.9,
        totalRatings: 89,
        ratingsBreakdown: {
          content: 4.1,
          difficulty: 4.2,
          workload: 4.0,
          syllabus: 3.8,
          materials: 3.7,
          assignments: 3.9
        },
        enrollmentStats: {
          enrolled: 80,
          capacity: 100,
          waitlist: 5
        },
        gradeDistribution: {
          'A': 15, 'B': 30, 'C': 35, 'D': 15, 'F': 5
        },
        recentReviews: []
      },
      {
        id: 3,
        code: 'PSY101',
        name: 'Introduction to Psychology',
        department: 'Psychology',
        credits: 3,
        instructor: 'Dr. Emily Rodriguez',
        semester: 'Fall 2024',
        description: 'Survey of major areas in psychology including learning, memory, perception, personality, and social psychology.',
        prerequisites: 'None',
        overallRating: 4.7,
        totalRatings: 203,
        ratingsBreakdown: {
          content: 4.8,
          difficulty: 3.2,
          workload: 3.5,
          syllabus: 4.6,
          materials: 4.5,
          assignments: 4.4
        },
        enrollmentStats: {
          enrolled: 200,
          capacity: 200,
          waitlist: 45
        },
        gradeDistribution: {
          'A': 40, 'B': 35, 'C': 20, 'D': 4, 'F': 1
        },
        recentReviews: []
      }
    ];
  }
}

export default new CourseService();