import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Avatar,
  Rating,
  Divider,
  Alert,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tooltip,
  LinearProgress,
  Pagination
} from '@mui/material';
import {
  ArrowBack,
  ThumbUp,
  ThumbDown,
  Flag,
  Reply,
  Verified,
  Search,
  FilterList,
  Sort,
  TrendingUp,
  Schedule,
  School,
  RateReview
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom';

const AllTeacherReviews = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [filterByCourse, setFilterByCourse] = useState('All');
  const [filterByRating, setFilterByRating] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const reviewsPerPage = 10;

  // Mock teacher data - in real app, this would be fetched based on teacherId
  const teacher = {
    id: parseInt(teacherId),
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
    ratingDistribution: {
      5: 25,
      4: 15,
      3: 5,
      2: 1,
      1: 1
    }
  };

  // Mock reviews data - in real app, this would be fetched based on teacherId
  const allReviews = [
    {
      id: 1,
      rating: 5,
      course: 'CS201',
      semester: 'Fall 2024',
      comment: 'Excellent teacher! Very clear explanations and always willing to help students. Dr. Johnson makes complex data structures concepts easy to understand through practical examples.',
      ratings: { teaching: 5, clarity: 5, helpfulness: 5, difficulty: 4 },
      helpful: 12,
      notHelpful: 1,
      timestamp: new Date('2024-02-10T14:30:00'),
      status: 'approved',
      anonymous: true,
      studentId: 'student_1',
      wouldRecommend: true,
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
      comment: 'Good teaching style but sometimes moves too fast through complex topics. Would benefit from more examples.',
      ratings: { teaching: 4, clarity: 3, helpfulness: 4, difficulty: 4 },
      helpful: 8,
      notHelpful: 2,
      timestamp: new Date('2024-02-05T09:15:00'),
      status: 'approved',
      anonymous: true,
      studentId: 'student_2',
      wouldRecommend: true,
      teacherResponse: null
    },
    {
      id: 3,
      rating: 5,
      course: 'CS301',
      semester: 'Spring 2024',
      comment: 'Outstanding professor! The algorithms course was challenging but extremely well-taught. Great use of visual aids and real-world applications.',
      ratings: { teaching: 5, clarity: 5, helpfulness: 5, difficulty: 3 },
      helpful: 18,
      notHelpful: 0,
      timestamp: new Date('2024-01-28T11:20:00'),
      status: 'approved',
      anonymous: false,
      author: 'Alex M.',
      wouldRecommend: true,
      teacherResponse: {
        response: 'Thank you Alex! I\'m delighted that you found the visual aids helpful. Keep up the great work!',
        timestamp: new Date('2024-01-30T09:00:00')
      }
    },
    {
      id: 4,
      rating: 3,
      course: 'CS101',
      semester: 'Spring 2024',
      comment: 'Average teaching. Course content is good but delivery could be improved. Office hours are helpful though.',
      ratings: { teaching: 3, clarity: 3, helpfulness: 4, difficulty: 3 },
      helpful: 5,
      notHelpful: 3,
      timestamp: new Date('2024-01-15T16:45:00'),
      status: 'approved',
      anonymous: true,
      wouldRecommend: false,
      teacherResponse: null
    },
    {
      id: 5,
      rating: 5,
      course: 'CS201',
      semester: 'Spring 2024',
      comment: 'One of the best professors I\'ve had! Makes data structures fun and engaging. Assignments are challenging but fair.',
      ratings: { teaching: 5, clarity: 4, helpfulness: 5, difficulty: 4 },
      helpful: 22,
      notHelpful: 1,
      timestamp: new Date('2024-01-10T13:30:00'),
      status: 'approved',
      anonymous: true,
      wouldRecommend: true,
      teacherResponse: {
        response: 'I\'m so happy to hear that you\'re enjoying the course! Data structures can be challenging, but seeing students succeed makes it all worthwhile.',
        timestamp: new Date('2024-01-12T14:00:00')
      }
    }
  ];

  const filteredReviews = allReviews.filter(review => {
    const matchesSearch = review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterByCourse === 'All' || review.course === filterByCourse;
    const matchesRating = filterByRating === 'All' || review.rating === parseInt(filterByRating);
    
    return matchesSearch && matchesCourse && matchesRating;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch(sortBy) {
      case 'newest':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'oldest':
        return new Date(a.timestamp) - new Date(b.timestamp);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return (b.helpful - b.notHelpful) - (a.helpful - a.notHelpful);
      default:
        return 0;
    }
  });

  const paginatedReviews = sortedReviews.slice((page - 1) * reviewsPerPage, page * reviewsPerPage);
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);

  const courses = ['All', ...new Set(allReviews.map(r => r.course))];

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'success';
    if (rating >= 4.0) return 'primary';
    if (rating >= 3.5) return 'warning';
    return 'error';
  };

  const ReviewCard = ({ review }) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: review.anonymous ? 'grey.400' : 'primary.main' }}>
              {review.anonymous ? '?' : (review.author ? review.author.charAt(0) : 'S')}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {review.anonymous ? 'Anonymous Student' : (review.author || 'Student')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {review.course} • {review.semester}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Rating value={review.rating} readOnly size="small" />
            <Typography variant="caption" color="text.secondary" display="block">
              {format(review.timestamp, 'MMM dd, yyyy')}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" paragraph>
          {review.comment}
        </Typography>

        {/* Detailed Ratings */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Detailed Ratings:
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(review.ratings).map(([category, rating]) => (
              <Grid item xs={6} sm={3} key={category}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ minWidth: '70px', textTransform: 'capitalize' }}>
                    {category}:
                  </Typography>
                  <Rating value={rating} readOnly size="small" />
                  <Typography variant="caption" color="text.secondary">
                    {rating}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Recommendation */}
        {review.wouldRecommend !== undefined && (
          <Box sx={{ mb: 2 }}>
            <Chip 
              label={review.wouldRecommend ? "Would Recommend" : "Would Not Recommend"}
              color={review.wouldRecommend ? "success" : "error"}
              size="small"
              variant="outlined"
            />
          </Box>
        )}

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
              <Typography variant="subtitle2" color="primary.main" fontWeight="bold">
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

        {/* Review Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" startIcon={<ThumbUp />} variant="outlined">
              Helpful ({review.helpful})
            </Button>
            <Button size="small" startIcon={<ThumbDown />} variant="outlined">
              Not Helpful ({review.notHelpful})
            </Button>
            <Button size="small" startIcon={<Flag />} variant="outlined" color="error">
              Report
            </Button>
          </Box>
          <Chip 
            label={review.status} 
            size="small" 
            color={review.status === 'approved' ? 'success' : 'warning'}
          />
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Header with Teacher Info */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <IconButton onClick={() => navigate('/reviews')} size="large">
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1" color="secondary">
            All Reviews for {teacher.name}
          </Typography>
        </Box>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar sx={{ width: 80, height: 80 }} src={teacher.avatar}>
                {teacher.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h5">{teacher.name}</Typography>
                  <Verified color="primary" />
                </Box>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {teacher.title} • {teacher.department}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Rating value={teacher.overallRating} precision={0.1} readOnly />
                  <Typography variant="h6" color={getRatingColor(teacher.overallRating)}>
                    {teacher.overallRating}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ({teacher.totalReviews} reviews)
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  <strong>Courses:</strong> {teacher.courses.join(', ')}
                </Typography>
              </Box>
            </Box>

            {/* Rating Distribution */}
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>
              Rating Distribution
            </Typography>
            <Grid container spacing={2}>
              {[5, 4, 3, 2, 1].map(stars => (
                <Grid item xs={12} sm={2.4} key={stars}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ minWidth: '20px' }}>
                      {stars}★
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(teacher.ratingDistribution[stars] / teacher.totalReviews) * 100}
                      sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {teacher.ratingDistribution[stars]}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Filters and Search */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                value={filterByCourse}
                label="Course"
                onChange={(e) => setFilterByCourse(e.target.value)}
              >
                {courses.map(course => (
                  <MenuItem key={course} value={course}>{course}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Rating</InputLabel>
              <Select
                value={filterByRating}
                label="Rating"
                onChange={(e) => setFilterByRating(e.target.value)}
              >
                <MenuItem value="All">All Ratings</MenuItem>
                <MenuItem value="5">5 Stars</MenuItem>
                <MenuItem value="4">4 Stars</MenuItem>
                <MenuItem value="3">3 Stars</MenuItem>
                <MenuItem value="2">2 Stars</MenuItem>
                <MenuItem value="1">1 Star</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="highest">Highest Rating</MenuItem>
                <MenuItem value="lowest">Lowest Rating</MenuItem>
                <MenuItem value="helpful">Most Helpful</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Alert severity="info" sx={{ height: '56px', display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2">
                {sortedReviews.length} reviews
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </Paper>

      {/* Reviews List */}
      <Box sx={{ mb: 4 }}>
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Search sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No reviews found matching your criteria
              </Typography>
              <Button onClick={() => { 
                setSearchTerm(''); 
                setFilterByCourse('All'); 
                setFilterByRating('All');
              }} sx={{ mt: 2 }}>
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, newPage) => setPage(newPage)}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};

export default AllTeacherReviews;