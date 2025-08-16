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
  Alert,
  Avatar,
  Divider,
  Container
} from '@mui/material';
import {
  Dashboard,
  TrendingUp,
  Reply,
  Analytics,
  Star,
  ThumbUp,
  Warning,
  School,
  RateReview,
  Assessment,
  Insights,
  ChatBubbleOutline
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

  const StatCard = ({ icon, title, value, subtitle, color = 'primary' }) => (
    <Card sx={{ 
      height: '100%',
      background: `linear-gradient(135deg, ${color === 'primary' ? '#1976d2 0%, #42a5f5 100%' : 
                                          color === 'success' ? '#2e7d32 0%, #66bb6a 100%' : 
                                          color === 'warning' ? '#ed6c02 0%, #ffb74d 100%' : 
                                          '#1976d2 0%, #42a5f5 100%'})`,
      color: 'white',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 32px rgba(0,0,0,0.16)'
      }
    }}>
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
        <Box sx={{ mb: 2 }}>
          {icon}
        </Box>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 500, opacity: 0.9 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar sx={{ 
            width: 80, 
            height: 80, 
            backgroundColor: 'rgba(255,255,255,0.2)',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>
            SJ
          </Avatar>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              Teacher Dashboard
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 400 }}>
              Welcome back, {teacherData.name}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
              {teacherData.department} • {teacherData.totalReviews} reviews
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Navigation Tabs */}
      <Paper sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              minHeight: 64,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none'
            }
          }}
        >
          <Tab 
            icon={<Analytics />} 
            label="Analytics Overview" 
            iconPosition="start"
          />
          <Tab 
            icon={<ChatBubbleOutline />} 
            label="Pending Reviews" 
            iconPosition="start"
          />
          <Tab 
            icon={<Insights />} 
            label="Feedback Insights" 
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <Grid container spacing={4}>
          {/* Stats Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<Star sx={{ fontSize: 48 }} />}
              title="Overall Rating"
              value={teacherData.overallRating}
              subtitle="⭐ Excellent"
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<RateReview sx={{ fontSize: 48 }} />}
              title="Total Reviews"
              value={teacherData.totalReviews}
              subtitle="📈 Growing"
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<TrendingUp sx={{ fontSize: 48 }} />}
              title="Pending"
              value={teacherData.pendingReviews.length}
              subtitle="Need Response"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<School sx={{ fontSize: 48 }} />}
              title="Courses"
              value="3"
              subtitle="Active This Semester"
              color="primary"
            />
          </Grid>

          {/* Rating Breakdown */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                  📊 Rating Breakdown
                </Typography>
                {Object.entries(teacherData.ratingsBreakdown).map(([category, rating]) => (
                  <Box key={category} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
                        {category}
                      </Typography>
                      <Chip 
                        label={`${rating}/5`}
                        color={rating >= 4.5 ? 'success' : rating >= 4 ? 'primary' : 'warning'}
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(rating / 5) * 100}
                      sx={{ 
                        height: 12, 
                        borderRadius: 6,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 6,
                          background: rating >= 4.5 ? 'linear-gradient(90deg, #4caf50, #8bc34a)' :
                                     rating >= 4 ? 'linear-gradient(90deg, #2196f3, #03a9f4)' :
                                     'linear-gradient(90deg, #ff9800, #ffc107)'
                        }
                      }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Trend Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                  📈 Rating Trends Over Time
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'end', 
                  gap: 3, 
                  height: 200,
                  px: 2 
                }}>
                  {Object.entries(teacherData.trendData).map(([month, rating], index) => (
                    <Box key={month} sx={{ textAlign: 'center', flex: 1 }}>
                      <Box 
                        sx={{ 
                          height: `${(rating / 5) * 150}px`,
                          background: `linear-gradient(to top, #1976d2, #42a5f5)`,
                          borderRadius: 2,
                          mb: 2,
                          minHeight: '30px',
                          position: 'relative',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            transition: 'transform 0.2s ease'
                          }
                        }}
                      >
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            position: 'absolute',
                            top: -25,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontWeight: 600,
                            color: 'primary.main'
                          }}
                        >
                          {rating}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {month.split(' ')[0]}
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
            <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                💬 Reviews Awaiting Your Response
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {teacherData.pendingReviews.length} students are waiting for your feedback
              </Typography>
            </Paper>
            
            {teacherData.pendingReviews.map((review) => (
              <Card key={review.id} sx={{ 
                mb: 3,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid',
                borderColor: 'grey.200',
                '&:hover': {
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease'
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        {review.course} - {review.semester}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        📅 {format(review.timestamp, 'MMM dd, yyyy - HH:mm')}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          sx={{ 
                            color: i < review.rating ? '#ffc107' : '#e0e0e0',
                            fontSize: 24 
                          }} 
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  <Paper sx={{ p: 3, backgroundColor: 'grey.50', borderRadius: 2, mb: 3 }}>
                    <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                      "{review.comment}"
                    </Typography>
                  </Paper>

                  <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                    {Object.entries(review.ratings).map(([category, rating]) => (
                      <Chip 
                        key={category}
                        label={`${category}: ${rating}/5`}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          textTransform: 'capitalize',
                          fontWeight: 600
                        }}
                      />
                    ))}
                  </Box>

                  <Button
                    startIcon={<Reply />}
                    variant="contained"
                    size="large"
                    onClick={() => {
                      setSelectedReview(review);
                      setOpenResponse(true);
                    }}
                    sx={{ 
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 3
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '2px solid #4caf50'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <ThumbUp sx={{ mr: 2, color: 'success.main', fontSize: 32 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>
                    ✨ Positive Feedback
                  </Typography>
                </Box>
                <List sx={{ '& .MuiListItem-root': { px: 0 } }}>
                  {teacherData.commonFeedback.positive.map((feedback, index) => (
                    <ListItem key={index} sx={{ py: 1 }}>
                      <ListItemText 
                        primary={feedback}
                        primaryTypographyProps={{ 
                          variant: 'body1',
                          fontWeight: 500
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '2px solid #ff9800'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Warning sx={{ mr: 2, color: 'warning.main', fontSize: 32 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'warning.main' }}>
                    🎯 Areas for Improvement
                  </Typography>
                </Box>
                <List sx={{ '& .MuiListItem-root': { px: 0 } }}>
                  {teacherData.commonFeedback.concerns.map((concern, index) => (
                    <ListItem key={index} sx={{ py: 1 }}>
                      <ListItemText 
                        primary={concern}
                        primaryTypographyProps={{ 
                          variant: 'body1',
                          fontWeight: 500
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Alert 
              severity="info" 
              sx={{ 
                borderRadius: 3,
                fontSize: '1rem',
                '& .MuiAlert-icon': { fontSize: '1.5rem' }
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                <strong>💡 AI Insights:</strong> Based on your feedback patterns, students appreciate your clear explanations and helpfulness. 
                Consider slowing down the pace during complex topics and providing more practical examples to address the most common concerns.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      )}

      {/* Enhanced Response Dialog */}
      <Dialog 
        open={openResponse} 
        onClose={() => setOpenResponse(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ pb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            💬 Respond to Student Feedback
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {selectedReview && (
            <Box>
              <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                This response will only be visible to you and the student who left the feedback.
              </Alert>
              
              <Paper sx={{ 
                p: 3, 
                mb: 3, 
                backgroundColor: 'grey.50',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200'
              }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Student's feedback:
                </Typography>
                <Typography variant="body1" sx={{ fontStyle: 'italic', fontSize: '1.1rem' }}>
                  "{selectedReview.comment}"
                </Typography>
              </Paper>
              
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Your private response"
                placeholder="Address the student's concerns or provide clarification..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setOpenResponse(false)}
            size="large"
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmitResponse}
            disabled={!responseText.trim()}
            size="large"
            sx={{ 
              textTransform: 'none', 
              fontWeight: 600,
              borderRadius: 2,
              px: 3
            }}
          >
            Send Response
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherDashboard;