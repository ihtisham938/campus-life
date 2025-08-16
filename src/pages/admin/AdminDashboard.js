import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Grid,
  Tab,
  Tabs,
  LinearProgress,
  Alert,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import {
  Dashboard,
  People,
  Event,
  RateReview,
  School,
  HowToVote,
  QuestionAnswer,
  Feedback,
  Notifications,
  TrendingUp,
  Warning,
  CheckCircle,
  AccessTime,
  BarChart,
  PieChart,
  Assessment,
  Flag,
  AdminPanelSettings,
  Security,
  Report,
  Settings,
  Visibility,
  Edit,
  Delete,
  Approve,
  Block
} from '@mui/icons-material';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');

  // Sample admin data
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalUsers: 2847,
      activeEvents: 5,
      pendingReviews: 23,
      openIssues: 12,
      systemHealth: 98.5
    },
    events: {
      total: 45,
      approved: 38,
      pending: 5,
      rejected: 2,
      conflictDetected: 3
    },
    reviews: {
      total: 1247,
      approved: 1156,
      pending: 23,
      flagged: 18,
      averageRating: 4.2
    },
    elections: {
      active: 2,
      completed: 8,
      totalVotes: 4569,
      averageTurnout: 73.5
    },
    qaForum: {
      totalQuestions: 589,
      answered: 502,
      unanswered: 87,
      officialAnswers: 156
    },
    facilities: {
      totalFeedback: 342,
      issuesReported: 89,
      resolved: 67,
      pending: 22,
      avgSatisfaction: 4.1
    }
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'review_flagged',
      title: 'Review flagged for inappropriate content',
      description: 'Review for Dr. Smith contains potentially offensive language',
      timestamp: new Date('2024-02-12T14:30:00'),
      priority: 'high',
      status: 'pending'
    },
    {
      id: 2,
      type: 'event_conflict',
      title: 'Event scheduling conflict detected',
      description: 'Spring Festival conflicts with midterm examinations',
      timestamp: new Date('2024-02-12T13:15:00'),
      priority: 'medium',
      status: 'pending'
    },
    {
      id: 3,
      type: 'facility_issue',
      title: 'High priority facility issue reported',
      description: 'Library AC system failure reported',
      timestamp: new Date('2024-02-12T11:45:00'),
      priority: 'high',
      status: 'assigned'
    },
    {
      id: 4,
      type: 'election_started',
      title: 'Student Council election started',
      description: 'Voting period for President position has begun',
      timestamp: new Date('2024-02-12T09:00:00'),
      priority: 'low',
      status: 'active'
    }
  ]);

  const [moderationQueue, setModerationQueue] = useState([
    {
      id: 1,
      type: 'teacher_review',
      content: 'This teacher is absolutely terrible and should not be teaching...',
      author: 'Anonymous',
      target: 'Dr. John Smith',
      flagReason: 'Inappropriate language',
      timestamp: new Date('2024-02-12T15:20:00'),
      aiScore: 0.2,
      status: 'pending'
    },
    {
      id: 2,
      type: 'event_proposal',
      content: 'We need to organize a massive party with alcohol and...',
      author: 'Student Union',
      target: 'Campus Party Event',
      flagReason: 'Policy violation',
      timestamp: new Date('2024-02-12T14:10:00'),
      aiScore: 0.3,
      status: 'pending'
    },
    {
      id: 3,
      type: 'qa_question',
      content: 'How can I cheat on the upcoming exam without getting caught?',
      author: 'Anonymous',
      target: 'Academic Question',
      flagReason: 'Academic dishonesty',
      timestamp: new Date('2024-02-12T12:45:00'),
      aiScore: 0.1,
      status: 'pending'
    }
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleModerationAction = (itemId, action) => {
    setModerationQueue(moderationQueue.map(item => 
      item.id === itemId ? { ...item, status: action } : item
    ));
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'active': return 'info';
      default: return 'default';
    }
  };

  const StatCard = ({ title, value, subtitle, icon, color = 'primary', trend }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="h2" color={color}>
              {value}
            </Typography>
            {subtitle && (
              <Typography color="textSecondary" variant="body2">
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp fontSize="small" color={trend > 0 ? 'success' : 'error'} />
                <Typography variant="body2" color={trend > 0 ? 'success.main' : 'error.main'}>
                  {trend > 0 ? '+' : ''}{trend}%
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const ActivityItem = ({ activity }) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: getPriorityColor(activity.priority) + '.main' }}>
          {activity.type === 'review_flagged' && <Flag />}
          {activity.type === 'event_conflict' && <Warning />}
          {activity.type === 'facility_issue' && <Report />}
          {activity.type === 'election_started' && <HowToVote />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={activity.title}
        secondary={
          <Box>
            <Typography variant="body2" color="text.secondary">
              {activity.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Chip 
                label={activity.priority} 
                size="small" 
                color={getPriorityColor(activity.priority)}
              />
              <Chip 
                label={activity.status} 
                size="small" 
                color={getStatusColor(activity.status)}
              />
              <Typography variant="caption" color="text.secondary">
                {format(activity.timestamp, 'MMM dd, HH:mm')}
              </Typography>
            </Box>
          </Box>
        }
      />
    </ListItem>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Administrator Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Campus Life Management System Overview
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={selectedTimeRange}
              label="Time Range"
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              <MenuItem value="7days">Last 7 days</MenuItem>
              <MenuItem value="30days">Last 30 days</MenuItem>
              <MenuItem value="3months">Last 3 months</MenuItem>
              <MenuItem value="1year">Last year</MenuItem>
            </Select>
          </FormControl>
          <Badge badgeContent={moderationQueue.filter(item => item.status === 'pending').length} color="error">
            <Button variant="outlined" startIcon={<Notifications />}>
              Alerts
            </Button>
          </Badge>
        </Box>
      </Box>

      {/* Overview Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Users"
            value={dashboardData.overview.totalUsers}
            subtitle="Active students & faculty"
            icon={<People />}
            color="primary"
            trend={12.5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Active Events"
            value={dashboardData.overview.activeEvents}
            subtitle="Currently in voting"
            icon={<Event />}
            color="secondary"
            trend={-5.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Pending Reviews"
            value={dashboardData.overview.pendingReviews}
            subtitle="Awaiting moderation"
            icon={<RateReview />}
            color="warning"
            trend={8.1}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Open Issues"
            value={dashboardData.overview.openIssues}
            subtitle="Facility issues"
            icon={<Report />}
            color="error"
            trend={-15.3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="System Health"
            value={`${dashboardData.overview.systemHealth}%`}
            subtitle="All systems operational"
            icon={<CheckCircle />}
            color="success"
            trend={2.1}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Avg Response Time"
            value="2.4hrs"
            subtitle="Issue resolution"
            icon={<AccessTime />}
            color="info"
            trend={-8.7}
          />
        </Grid>
      </Grid>

      {/* Tabs for detailed sections */}
      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Recent Activity" />
          <Tab label="Content Moderation" />
          <Tab label="System Analytics" />
          <Tab label="User Management" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Platform Activity
                </Typography>
                <List>
                  {recentActivity.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <ActivityItem activity={activity} />
                      {index < recentActivity.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="outlined" startIcon={<Visibility />}>
                    View All Events
                  </Button>
                  <Button variant="outlined" startIcon={<RateReview />}>
                    Review Queue
                  </Button>
                  <Button variant="outlined" startIcon={<Settings />}>
                    System Settings
                  </Button>
                  <Button variant="outlined" startIcon={<Assessment />}>
                    Generate Report
                  </Button>
                </Box>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Status
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Database Performance
                  </Typography>
                  <LinearProgress variant="determinate" value={95} color="success" />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Server Load
                  </Typography>
                  <LinearProgress variant="determinate" value={67} color="warning" />
                </Box>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Storage Usage
                  </Typography>
                  <LinearProgress variant="determinate" value={43} color="info" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Content Moderation Queue
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Content Preview</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Flag Reason</TableCell>
                    <TableCell>AI Score</TableCell>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {moderationQueue.filter(item => item.status === 'pending').map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Chip label={item.type.replace('_', ' ')} size="small" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ maxWidth: 200 }}>
                          {item.content.substring(0, 50)}...
                        </Typography>
                      </TableCell>
                      <TableCell>{item.author}</TableCell>
                      <TableCell>
                        <Chip 
                          label={item.flagReason} 
                          size="small" 
                          color="warning"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={item.aiScore * 100} 
                            sx={{ width: 60 }}
                            color={item.aiScore < 0.3 ? 'error' : item.aiScore < 0.7 ? 'warning' : 'success'}
                          />
                          <Typography variant="caption">
                            {Math.round(item.aiScore * 100)}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">
                          {format(item.timestamp, 'MMM dd, HH:mm')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton 
                            size="small" 
                            color="success"
                            onClick={() => handleModerationAction(item.id, 'approved')}
                          >
                            <CheckCircle />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleModerationAction(item.id, 'rejected')}
                          >
                            <Block />
                          </IconButton>
                          <IconButton size="small">
                            <Visibility />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Module Usage Statistics
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Event Voting</Typography>
                    <Typography variant="body2">85%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={85} />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Teacher Reviews</Typography>
                    <Typography variant="body2">73%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={73} />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Course Ratings</Typography>
                    <Typography variant="body2">91%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={91} />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Student Elections</Typography>
                    <Typography variant="body2">67%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={67} />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Q&A Forum</Typography>
                    <Typography variant="body2">58%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={58} />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Facilities Feedback</Typography>
                    <Typography variant="body2">79%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={79} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Performance Metrics
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card variant="outlined">
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">
                          {dashboardData.reviews.averageRating}
                        </Typography>
                        <Typography variant="caption">
                          Average Review Rating
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card variant="outlined">
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="success.main">
                          {dashboardData.elections.averageTurnout}%
                        </Typography>
                        <Typography variant="caption">
                          Election Turnout
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card variant="outlined">
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="info.main">
                          {dashboardData.facilities.avgSatisfaction}
                        </Typography>
                        <Typography variant="caption">
                          Facility Satisfaction
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card variant="outlined">
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="warning.main">
                          94%
                        </Typography>
                        <Typography variant="caption">
                          Issues Resolved
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 3 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Management
            </Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              User management features would include user roles, permissions, account status, and activity monitoring.
            </Alert>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button variant="outlined" startIcon={<People />}>
                Manage Users
              </Button>
              <Button variant="outlined" startIcon={<Security />}>
                Role Permissions
              </Button>
              <Button variant="outlined" startIcon={<Assessment />}>
                User Analytics
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AdminDashboard;