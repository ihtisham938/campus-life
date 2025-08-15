import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  Paper,
  LinearProgress,
  Chip,
  Alert
} from '@mui/material';
import {
  Dashboard,
  TrendingUp,
  Reply,
  Analytics,
  Star,
  ThumbUp,
  Warning
} from '@mui/icons-material';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const TeacherDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openResponse, setOpenResponse] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [responseText, setResponseText] = useState('');

  // Mock teacher data - in real app would come from auth context
  const teacherData = {
    id: 1,
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    overallRating: 4.5,
    totalReviews: 47,
    ratingsBreakdown: {
      teaching: 4.6,
      clarity: 4.3,
      helpfulness: 4.7,
      difficulty: 3.8
    },
    trendData: {
      'Jan 2024': 4.2,
      'Feb 2024': 4.3,
      'Mar 2024': 4.4,
      'Apr 2024': 4.5
    },
    pendingReviews: [
      {
        id: 2,
        rating: 4,
        course: 'CS101',
        semester: 'Fall 2024',
        comment: 'Good teaching style but sometimes moves too fast through complex topics.',
        ratings: { teaching: 4, clarity: 3, helpfulness: 4, difficulty: 4 },
        timestamp: new Date('2024-02-05T09:15:00'),
        studentId: 'student_2',
        teacherResponse: null
      },
      {
        id: 4,
        rating: 3,
        course: 'CS201',
        semester: 'Fall 2024',
        comment: 'Content is good but could use more examples during lectures.',
        ratings: { teaching: 3, clarity: 3, helpfulness: 4, difficulty: 4 },
        timestamp: new Date('2024-02-01T11:30:00'),
        studentId: 'student_4',
        teacherResponse: null
      }
    ],
    commonFeedback: {
      positive: [
        'Clear explanations (mentioned 15 times)',
        'Very helpful during office hours (mentioned 12 times)',
        'Good course structure (mentioned 8 times)'
      ],
      concerns: [
        'Moves too fast through topics (mentioned 6 times)',
        'Could use more examples (mentioned 4 times)',
        'Assignments are challenging (mentioned 3 times)'
      ]
    }
  };

  const handleSubmitResponse = () => {
    if (!responseText.trim()) return;

    // In real app, would make API call to submit response
    setResponseText('');
    setOpenResponse(false);
    setSelectedReview(null);

    Swal.fire({
      title: 'Response Sent!',
      text: 'Your private response has been sent to the student.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      timerProgressBar: true
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Dashboard sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" component="h1" color="primary">
            Teacher Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Welcome back, {teacherData.name}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Analytics Overview" />
          <Tab label="Pending Reviews" />
          <Tab label="Feedback Insights" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          {/* Overall Stats */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Star sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" color="primary">
                  {teacherData.overallRating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Overall Rating
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" color="primary">
                  {teacherData.totalReviews}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Reviews
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Rating Breakdown */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Rating Breakdown
                </Typography>
                {Object.entries(teacherData.ratingsBreakdown).map(([category, rating]) => (
                  <Box key={category} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {category}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {rating}/5
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(rating / 5) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Trend Chart Placeholder */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Rating Trends Over Time
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'end', gap: 2, height: 200 }}>
                  {Object.entries(teacherData.trendData).map(([month, rating]) => (
                    <Box key={month} sx={{ textAlign: 'center', flex: 1 }}>
                      <Box 
                        sx={{ 
                          height: `${(rating / 5) * 150}px`,
                          backgroundColor: 'primary.main',
                          borderRadius: 1,
                          mb: 1,
                          minHeight: '20px'
                        }}
                      />
                      <Typography variant="caption">
                        {month.split(' ')[0]}
                      </Typography>
                      <Typography variant="caption" display="block" color="primary">
                        {rating}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Reviews Awaiting Your Response ({teacherData.pendingReviews.length})
            </Typography>
            {teacherData.pendingReviews.map((review) => (
              <Card key={review.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6">
                        {review.course} - {review.semester}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {format(review.timestamp, 'MMM dd, yyyy - HH:mm')}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          sx={{ 
                            color: i < review.rating ? 'warning.main' : 'grey.300',
                            fontSize: 20 
                          }} 
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  <Typography variant="body1" paragraph>
                    "{review.comment}"
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    {Object.entries(review.ratings).map(([category, rating]) => (
                      <Chip 
                        key={category}
                        label={`${category}: ${rating}/5`}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  <Button
                    startIcon={<Reply />}
                    variant="contained"
                    onClick={() => {
                      setSelectedReview(review);
                      setOpenResponse(true);
                    }}
                  >
                    Respond Privately
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>
                  <ThumbUp sx={{ mr: 1 }} />
                  Common Positive Feedback
                </Typography>
                <List>
                  {teacherData.commonFeedback.positive.map((feedback, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemText 
                        primary={feedback}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: 'warning.main' }}>
                  <Warning sx={{ mr: 1 }} />
                  Areas for Improvement
                </Typography>
                <List>
                  {teacherData.commonFeedback.concerns.map((concern, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemText 
                        primary={concern}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Alert severity="info">
              <Typography variant="body2">
                <strong>Insights:</strong> Based on your feedback patterns, students appreciate your clear explanations and helpfulness. 
                Consider slowing down the pace during complex topics and providing more practical examples to address the most common concerns.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      )}

      {/* Response Dialog */}
      <Dialog open={openResponse} onClose={() => setOpenResponse(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Respond to Student Feedback</DialogTitle>
        <DialogContent>
          {selectedReview && (
            <Box sx={{ pt: 2 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                This response will only be visible to you and the student who left the feedback.
              </Alert>
              <Paper sx={{ p: 2, mb: 2, backgroundColor: 'grey.50' }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Student's feedback:
                </Typography>
                <Typography variant="body1">
                  "{selectedReview.comment}"
                </Typography>
              </Paper>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your private response"
                placeholder="Address the student's concerns or provide clarification..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResponse(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmitResponse}
            disabled={!responseText.trim()}
          >
            Send Response
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherDashboard;