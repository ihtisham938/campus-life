import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tab,
  Tabs,
  Rating,
  Alert,
  Avatar,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Paper,
  Tooltip,
  IconButton,
  Collapse,
  LinearProgress
} from '@mui/material';
import {
  RateReview,
  Verified,
  Shield,
  Add,
  Search,
  FilterList,
  ThumbUp,
  ThumbDown,
  Flag,
  Reply,
  Visibility,
  VisibilityOff,
  School,
  Star,
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule,
  ExpandMore,
  ExpandLess,
  Dashboard
} from '@mui/icons-material';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const TeacherReviews = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openReview, setOpenReview] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [expandedReviews, setExpandedReviews] = useState({});
  
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Professor',
      department: 'Computer Science',
      courses: ['CS101 - Introduction to Programming', 'CS201 - Data Structures', 'CS301 - Algorithms'],
      avatar: '/avatars/dr-sarah.jpg',
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
          anonymous: true,
          studentId: 'student_1',
          teacherResponse: {
            response: 'Thank you for your kind words! I\'m glad the explanations are helpful. Please don\'t hesitate to reach out if you need any clarification.',
            timestamp: new Date('2024-02-12T10:00:00')
          }
        },
        {
          id: 2,
          rating: 4,
          course: 'CS101',
          semester: 'Fall 2024',
          comment: 'Good teaching style but sometimes moves too fast through complex topics.',
          ratings: { teaching: 4, clarity: 3, helpfulness: 4, difficulty: 4 },
          helpful: 8,
          notHelpful: 2,
          timestamp: new Date('2024-02-05T09:15:00'),
          status: 'approved',
          anonymous: true,
          studentId: 'student_2',
          teacherResponse: null
        }
      ]
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      title: 'Associate Professor',
      department: 'Mathematics',
      courses: ['MATH101 - Calculus I', 'MATH201 - Calculus II', 'MATH301 - Linear Algebra'],
      avatar: '/avatars/prof-michael.jpg',
      overallRating: 4.2,
      totalReviews: 35,
      ratingsBreakdown: {
        teaching: 4.1,
        clarity: 4.0,
        helpfulness: 4.5,
        difficulty: 4.2
      },
      recentReviews: [
        {
          id: 3,
          rating: 4,
          course: 'MATH201',
          semester: 'Fall 2024',
          comment: 'Challenging but fair. Office hours are very helpful for understanding difficult concepts.',
          ratings: { teaching: 4, clarity: 4, helpfulness: 5, difficulty: 4 },
          helpful: 15,
          notHelpful: 0,
          timestamp: new Date('2024-02-08T16:45:00'),
          status: 'approved',
          anonymous: true
        }
      ]
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      title: 'Assistant Professor',
      department: 'Psychology',
      courses: ['PSY101 - Introduction to Psychology', 'PSY201 - Cognitive Psychology'],
      avatar: '/avatars/dr-emily.jpg',
      overallRating: 4.8,
      totalReviews: 28,
      ratingsBreakdown: {
        teaching: 4.9,
        clarity: 4.7,
        helpfulness: 4.8,
        difficulty: 3.5
      },
      recentReviews: [
        {
          id: 4,
          rating: 5,
          course: 'PSY101',
          semester: 'Fall 2024',
          comment: 'Amazing professor! Makes complex psychological concepts easy to understand.',
          ratings: { teaching: 5, clarity: 5, helpfulness: 5, difficulty: 3 },
          helpful: 20,
          notHelpful: 0,
          timestamp: new Date('2024-02-12T11:20:00'),
          status: 'approved',
          anonymous: true
        }
      ]
    }
  ]);

  const [newReview, setNewReview] = useState({
    teacherId: '',
    course: '',
    semester: '',
    overallRating: 0,
    ratings: {
      teaching: 0,
      clarity: 0,
      helpfulness: 0,
      difficulty: 0
    },
    comment: '',
    wouldRecommend: null,
    anonymous: true
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleExpandReview = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = departmentFilter === 'All' || teacher.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = ['All', ...new Set(teachers.map(t => t.department))];

  const TeacherCard = ({ teacher }) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <Avatar 
            sx={{ width: 80, height: 80 }}
            src={teacher.avatar}
          >
            {teacher.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6">
                {teacher.name}
              </Typography>
              <Verified color="primary" fontSize="small" />
            </Box>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {teacher.title} • {teacher.department}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={teacher.overallRating} precision={0.1} readOnly size="small" />
              <Typography variant="body2" color="text.secondary">
                {teacher.overallRating} ({teacher.totalReviews} reviews)
              </Typography>
            </Box>

            <Typography variant="body2" paragraph>
              <strong>Courses:</strong> {teacher.courses.join(', ')}
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">
                    {teacher.ratingsBreakdown.teaching}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Teaching
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="success.main">
                    {teacher.ratingsBreakdown.clarity}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Clarity
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="info.main">
                    {teacher.ratingsBreakdown.helpfulness}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Helpfulness
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="warning.main">
                    {teacher.ratingsBreakdown.difficulty}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Difficulty
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {teacher.recentReviews.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Recent Reviews:
            </Typography>
            {teacher.recentReviews.slice(0, 2).map(review => (
              <Paper key={review.id} sx={{ p: 2, mb: 2, backgroundColor: '#f9f9f9' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Box>
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      {review.course} • {review.semester}
                    </Typography>
                  </Box>
                  <Chip 
                    label={review.status} 
                    size="small" 
                    color={review.status === 'approved' ? 'success' : 'warning'}
                  />
                </Box>
                <Typography variant="body2" paragraph>
                  {review.comment.length > 150 && !expandedReviews[review.id] 
                    ? `${review.comment.substring(0, 150)}...`
                    : review.comment
                  }
                  {review.comment.length > 150 && (
                    <Button 
                      size="small" 
                      onClick={() => handleExpandReview(review.id)}
                      sx={{ ml: 1 }}
                    >
                      {expandedReviews[review.id] ? 'Show less' : 'Show more'}
                    </Button>
                  )}
                </Typography>
                {/* Teacher Response */}
                {review.teacherResponse && (
                  <Box sx={{ 
                    mt: 2, 
                    p: 2, 
                    backgroundColor: '#e3f2fd', 
                    borderLeft: '4px solid', 
                    borderColor: 'primary.main',
                    borderRadius: 1
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Reply sx={{ fontSize: 16, color: 'primary.main', mr: 1 }} />
                      <Typography variant="caption" color="primary.main" fontWeight="bold">
                        Teacher Response
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        • {format(review.teacherResponse.timestamp, 'MMM dd, yyyy')}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.primary' }}>
                      "{review.teacherResponse.response}"
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<ThumbUp />}>
                      Helpful ({review.helpful})
                    </Button>
                    <Button size="small" startIcon={<ThumbDown />}>
                      ({review.notHelpful})
                    </Button>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {format(review.timestamp, 'MMM dd, yyyy')}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </CardContent>
      
      <CardActions>
        <Button
          startIcon={<RateReview />}
          onClick={() => {
            setSelectedTeacher(teacher);
            setNewReview(prev => ({ ...prev, teacherId: teacher.id }));
            setOpenReview(true);
          }}
          variant="contained"
          color="secondary"
        >
          Write Review
        </Button>
        <Button startIcon={<Visibility />}>
          View All Reviews
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom color="secondary">
            Teacher Reviews & Feedback
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Help improve teaching quality through constructive feedback
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip icon={<Shield />} label="Moderated" color="error" variant="outlined" />
          <Chip icon={<Verified />} label="Anonymous" color="warning" variant="outlined" />
          <Chip icon={<RateReview />} label="Constructive" color="success" variant="outlined" />
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search teachers, departments, or courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                value={departmentFilter}
                label="Department"
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                {departments.map(dept => (
                  <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Alert severity="info" sx={{ height: '56px', display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2">
                {filteredTeachers.length} teachers found
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map(teacher => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))
          ) : (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Search sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No teachers found matching your criteria
                </Typography>
                <Button onClick={() => { setSearchTerm(''); setDepartmentFilter('All'); }} sx={{ mt: 2 }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Review Submission Dialog */}
      <Dialog 
  open={openReview} 
  onClose={() => setOpenReview(false)} 
  maxWidth="md" 
  fullWidth
  PaperProps={{
    sx: { minHeight: '80vh' }
  }}
>
  <DialogTitle>
    <Typography variant="h5" component="h2" gutterBottom>
      Write Review for {selectedTeacher?.name}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {selectedTeacher?.title} • {selectedTeacher?.department}
    </Typography>
  </DialogTitle>
  
  <DialogContent dividers>
    <Alert severity="info" sx={{ mb: 3 }}>
      Your review will be moderated before being published. Please provide constructive feedback that helps improve teaching quality.
    </Alert>
    
    {/* Course and Semester Selection */}
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Course</InputLabel>
          <Select
            value={newReview.course}
            label="Course"
            onChange={(e) => setNewReview({...newReview, course: e.target.value})}
            sx={{ minWidth: '250px' }}
          >
            {selectedTeacher?.courses.map(course => (
              <MenuItem key={course} value={course}>{course}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Semester</InputLabel>
          <Select
            value={newReview.semester}
            label="Semester"
            onChange={(e) => setNewReview({...newReview, semester: e.target.value})}
            sx={{ minWidth: '200px' }}
          >
            <MenuItem value="Fall 2024">Fall 2024</MenuItem>
            <MenuItem value="Spring 2024">Spring 2024</MenuItem>
            <MenuItem value="Summer 2024">Summer 2024</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
    
    {/* Overall Rating */}
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Overall Rating *
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Rating
          value={newReview.overallRating}
          onChange={(event, newValue) => setNewReview({...newReview, overallRating: newValue})}
          size="large"
          sx={{ fontSize: '2rem' }}
        />
        <Typography variant="body1" color="text.secondary">
          {newReview.overallRating > 0 ? `${newReview.overallRating} star${newReview.overallRating !== 1 ? 's' : ''}` : 'Not rated'}
        </Typography>
      </Box>
    </Box>
    
    {/* Detailed Ratings */}
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Detailed Ratings
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(newReview.ratings).map(([category, rating]) => (
          <Grid item xs={6} md={3} key={category}>
            <Paper sx={{ 
              p: 2, 
              textAlign: 'center',
              backgroundColor: 'grey.50',
              border: '1px solid',
              borderColor: 'divider'
            }}>
              <Typography variant="subtitle2" sx={{ 
                textTransform: 'capitalize', 
                fontWeight: 600,
                mb: 1.5
              }}>
                {category}
              </Typography>
              <Rating
                value={rating}
                onChange={(event, newValue) => setNewReview({
                  ...newReview,
                  ratings: { ...newReview.ratings, [category]: newValue || 0 }
                })}
                size="medium"
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
    
    {/* Written Review */}
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Your Review *
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={5}
        placeholder="Share your experience with this teacher. Focus on teaching methods, clarity, helpfulness, and suggestions for improvement..."
        value={newReview.comment}
        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
        helperText={`${newReview.comment.length}/500 characters`}
        inputProps={{ maxLength: 500 }}
        variant="outlined"
        required
      />
    </Box>
    
    {/* Recommendation */}
    <Box sx={{ mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Would you recommend this teacher?</InputLabel>
        <Select
          value={newReview.wouldRecommend !== null ? newReview.wouldRecommend : ''}
          label="Would you recommend this teacher?"
          onChange={(e) => setNewReview({...newReview, wouldRecommend: e.target.value})}
          sx={{ minWidth: '350px' }}
        >
          <MenuItem value={true}>Yes, I would recommend</MenuItem>
          <MenuItem value={false}>No, I would not recommend</MenuItem>
        </Select>
      </FormControl>
    </Box>
  </DialogContent>
  
  <DialogActions sx={{ p: 3 }}>
    <Button 
      onClick={() => setOpenReview(false)}
      size="large"
    >
      Cancel
    </Button>
    <Button 
      variant="contained" 
      color="secondary"
      size="large"
      disabled={!newReview.overallRating || !newReview.course || !newReview.comment.trim()}
      sx={{ minWidth: 140 }}
    >
      Submit Review
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default TeacherReviews;