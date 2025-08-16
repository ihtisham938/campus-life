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
  Badge,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Feedback,
  RateReview,
  ThumbUp,
  ThumbDown,
  Add,
  Search,
  FilterList,
  Report,
  BugReport,
  Lightbulb,
  Restaurant,
  LocalLibrary,
  SportsBasketball,
  FitnessCenter,
  LocalParking,
  School,
  Home,
  Notifications,
  Priority,
  CheckCircle,
  AccessTime,
  TrendingUp,
  ExpandMore,
  Flag,
  Person,
  AdminPanelSettings
} from '@mui/icons-material';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const ServicesFeedback = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [openIssue, setOpenIssue] = useState(false);
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const facilities = [
    { id: 'cafeteria', label: 'Cafeteria', icon: <Restaurant />, color: 'primary' },
    { id: 'library', label: 'Library', icon: <LocalLibrary />, color: 'secondary' },
    { id: 'sports', label: 'Sports Facilities', icon: <SportsBasketball />, color: 'success' },
    { id: 'gym', label: 'Gymnasium', icon: <FitnessCenter />, color: 'warning' },
    { id: 'parking', label: 'Parking', icon: <LocalParking />, color: 'info' },
    { id: 'classrooms', label: 'Classrooms & Labs', icon: <School />, color: 'error' },
    { id: 'hostels', label: 'Hostels', icon: <Home />, color: 'default' }
  ];

  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      type: 'feedback',
      facility: 'cafeteria',
      title: 'Great Food Quality',
      content: 'The food quality has improved significantly this semester. Love the new healthy options!',
      ratings: {
        cleanliness: 4,
        staff: 5,
        quality: 5,
        overall: 5
      },
      author: 'Sarah M.',
      timestamp: new Date('2024-02-10T14:30:00'),
      status: 'reviewed',
      helpful: 12,
      notHelpful: 1
    },
    {
      id: 2,
      type: 'issue',
      facility: 'library',
      title: 'Broken Air Conditioning in Study Area',
      content: 'The AC in the 3rd floor study area has been broken for 3 days. It\'s getting very uncomfortable to study there.',
      priority: 'high',
      author: 'Anonymous',
      timestamp: new Date('2024-02-11T09:15:00'),
      status: 'in_progress',
      assignedTo: 'Facilities Manager',
      estimatedFix: new Date('2024-02-13T16:00:00')
    },
    {
      id: 3,
      type: 'suggestion',
      facility: 'cafeteria',
      title: 'Add More Vegan Options',
      content: 'Could we have more vegan meal options? Many students are requesting plant-based alternatives.',
      author: 'Mike R.',
      timestamp: new Date('2024-02-09T11:20:00'),
      status: 'under_review',
      votes: 45,
      userVote: null,
      category: 'menu_improvement'
    },
    {
      id: 4,
      type: 'issue',
      facility: 'gym',
      title: 'Equipment Maintenance Needed',
      content: 'Several treadmills are making loud noises and the weights area needs cleaning.',
      priority: 'medium',
      author: 'Jessica K.',
      timestamp: new Date('2024-02-08T16:45:00'),
      status: 'pending',
      assignedTo: null
    },
    {
      id: 5,
      type: 'suggestion',
      facility: 'library',
      title: 'Extended Weekend Hours',
      content: 'Please consider extending library hours on weekends, especially during exam periods.',
      author: 'Alex T.',
      timestamp: new Date('2024-02-07T13:30:00'),
      status: 'approved',
      votes: 78,
      userVote: 'up',
      category: 'hours_extension',
      implementationDate: new Date('2024-03-01T00:00:00')
    }
  ]);

  const [newFeedback, setNewFeedback] = useState({
    facility: 'cafeteria',
    title: '',
    content: '',
    ratings: {
      cleanliness: 0,
      staff: 0,
      quality: 0,
      overall: 0
    }
  });

  const [newIssue, setNewIssue] = useState({
    facility: 'cafeteria',
    title: '',
    content: '',
    priority: 'medium',
    anonymous: false
  });

  const [newSuggestion, setNewSuggestion] = useState({
    facility: 'cafeteria',
    title: '',
    content: '',
    category: 'general_improvement'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleVoteSuggestion = (suggestionId, voteType) => {
    setFeedbacks(feedbacks.map(item => {
      if (item.id === suggestionId && item.type === 'suggestion') {
        const newItem = { ...item };
        
        if (item.userVote === voteType) {
          // Remove vote
          newItem.votes--;
          newItem.userVote = null;
        } else if (item.userVote === null) {
          // Add vote
          newItem.votes++;
          newItem.userVote = voteType;
        } else {
          // Change vote (from up to down or vice versa)
          newItem.userVote = voteType;
        }
        
        return newItem;
      }
      return item;
    }));
  };

  const handleSubmitFeedback = () => {
    if (!newFeedback.title.trim() || !newFeedback.content.trim()) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please fill in title and content.',
        icon: 'warning'
      });
      return;
    }

    const feedback = {
      id: feedbacks.length + 1,
      type: 'feedback',
      ...newFeedback,
      author: 'Current User',
      timestamp: new Date(),
      status: 'pending',
      helpful: 0,
      notHelpful: 0
    };

    setFeedbacks([feedback, ...feedbacks]);
    setNewFeedback({
      facility: 'cafeteria',
      title: '',
      content: '',
      ratings: { cleanliness: 0, staff: 0, quality: 0, overall: 0 }
    });
    setOpenFeedback(false);

    Swal.fire({
      title: 'Feedback Submitted!',
      text: 'Thank you for your feedback. It will be reviewed by the facilities team.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      timerProgressBar: true
    });
  };

  const handleSubmitIssue = () => {
    if (!newIssue.title.trim() || !newIssue.content.trim()) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please describe the issue.',
        icon: 'warning'
      });
      return;
    }

    const issue = {
      id: feedbacks.length + 1,
      type: 'issue',
      ...newIssue,
      author: newIssue.anonymous ? 'Anonymous' : 'Current User',
      timestamp: new Date(),
      status: 'pending',
      assignedTo: null
    };

    setFeedbacks([issue, ...feedbacks]);
    setNewIssue({
      facility: 'cafeteria',
      title: '',
      content: '',
      priority: 'medium',
      anonymous: false
    });
    setOpenIssue(false);

    Swal.fire({
      title: 'Issue Reported!',
      text: 'Your issue has been reported. The facilities team will be notified.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      timerProgressBar: true
    });
  };

  const handleSubmitSuggestion = () => {
    if (!newSuggestion.title.trim() || !newSuggestion.content.trim()) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please provide suggestion details.',
        icon: 'warning'
      });
      return;
    }

    const suggestion = {
      id: feedbacks.length + 1,
      type: 'suggestion',
      ...newSuggestion,
      author: 'Current User',
      timestamp: new Date(),
      status: 'pending',
      votes: 0,
      userVote: null
    };

    setFeedbacks([suggestion, ...feedbacks]);
    setNewSuggestion({
      facility: 'cafeteria',
      title: '',
      content: '',
      category: 'general_improvement'
    });
    setOpenSuggestion(false);

    Swal.fire({
      title: 'Suggestion Submitted!',
      text: 'Your suggestion is now open for community voting.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      timerProgressBar: true
    });
  };

  const filteredFeedbacks = feedbacks.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFacility = facilityFilter === 'All' || item.facility === facilityFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesTab = tabValue === 0 ? true :
                      tabValue === 1 ? item.type === 'feedback' :
                      tabValue === 2 ? item.type === 'issue' :
                      tabValue === 3 ? item.type === 'suggestion' :
                      true;
    
    return matchesSearch && matchesFacility && matchesStatus && matchesTab;
  });

  const getFacilityInfo = (facilityId) => {
    return facilities.find(f => f.id === facilityId) || facilities[0];
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'warning';
      case 'in_progress': return 'info';
      case 'completed': case 'approved': case 'reviewed': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const FeedbackCard = ({ item }) => {
    const facilityInfo = getFacilityInfo(item.facility);
    
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Chip 
                  icon={facilityInfo.icon} 
                  label={facilityInfo.label} 
                  size="small" 
                  color={facilityInfo.color}
                  variant="outlined"
                />
                {item.type === 'issue' && (
                  <Chip 
                    label={item.priority} 
                    size="small" 
                    color={getPriorityColor(item.priority)}
                    variant="filled"
                  />
                )}
                {item.type === 'suggestion' && (
                  <Chip 
                    icon={<TrendingUp />}
                    label={`${item.votes} votes`} 
                    size="small" 
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Box>
              
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              
              <Typography variant="body2" paragraph>
                {item.content}
              </Typography>
              
              {item.type === 'feedback' && item.ratings && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Ratings:
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(item.ratings).map(([category, rating]) => (
                      <Grid item xs={6} sm={3} key={category}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" sx={{ minWidth: '70px', textTransform: 'capitalize' }}>
                            {category}:
                          </Typography>
                          <Rating value={rating} readOnly size="small" />
                          <Typography variant="caption">
                            {rating}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
              
              {item.type === 'issue' && item.assignedTo && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Assigned to:</strong> {item.assignedTo}
                    {item.estimatedFix && (
                      <>
                        <br />
                        <strong>Estimated fix:</strong> {format(item.estimatedFix, 'MMM dd, yyyy HH:mm')}
                      </>
                    )}
                  </Typography>
                </Alert>
              )}
              
              {item.type === 'suggestion' && item.implementationDate && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Implementation planned:</strong> {format(item.implementationDate, 'MMM dd, yyyy')}
                  </Typography>
                </Alert>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    by {item.author} • {format(item.timestamp, 'MMM dd, yyyy')}
                  </Typography>
                  <Chip 
                    label={item.status.replace('_', ' ')} 
                    size="small" 
                    color={getStatusColor(item.status)}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>
                
                {item.type === 'feedback' && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<ThumbUp />}>
                      {item.helpful}
                    </Button>
                    <Button size="small" startIcon={<ThumbDown />}>
                      {item.notHelpful}
                    </Button>
                  </Box>
                )}
                
                {item.type === 'suggestion' && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      size="small" 
                      startIcon={<ThumbUp />}
                      onClick={() => handleVoteSuggestion(item.id, 'up')}
                      color={item.userVote === 'up' ? 'primary' : 'default'}
                      variant={item.userVote === 'up' ? 'contained' : 'outlined'}
                    >
                      Vote
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom color="warning.main">
            Services Feedback System
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Share feedback, report issues, and suggest improvements for campus facilities
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenFeedback(true)}
            color="success"
          >
            Give Feedback
          </Button>
          <Button
            variant="contained"
            startIcon={<Report />}
            onClick={() => setOpenIssue(true)}
            color="error"
          >
            Report Issue
          </Button>
          <Button
            variant="contained"
            startIcon={<Lightbulb />}
            onClick={() => setOpenSuggestion(true)}
            color="warning"
          >
            Suggest Improvement
          </Button>
        </Box>
      </Box>

      {/* Facilities Overview */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Campus Facilities
        </Typography>
        <Grid container spacing={2}>
          {facilities.map(facility => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={facility.id}>
              <Card 
                sx={{ 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  '&:hover': { elevation: 4 }
                }}
                onClick={() => setFacilityFilter(facility.id)}
              >
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ color: `${facility.color}.main`, mb: 1 }}>
                    {facility.icon}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {facility.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Search and Filter */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search feedback, issues, suggestions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Facility</InputLabel>
              <Select
                value={facilityFilter}
                label="Facility"
                onChange={(e) => setFacilityFilter(e.target.value)}
              >
                <MenuItem value="All">All Facilities</MenuItem>
                {facilities.map(facility => (
                  <MenuItem key={facility.id} value={facility.id}>
                    {facility.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="reviewed">Reviewed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Alert severity="info" sx={{ height: '56px', display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2">
                {filteredFeedbacks.length} items
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All" />
          <Tab label="Feedback" />
          <Tab label="Issues" />
          <Tab label="Suggestions" />
        </Tabs>
      </Box>

      {/* Content List */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map(item => (
              <FeedbackCard key={item.id} item={item} />
            ))
          ) : (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Feedback sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No items found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Be the first to share feedback, report an issue, or suggest an improvement!
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Feedback Dialog */}
      <Dialog open={openFeedback} onClose={() => setOpenFeedback(false)} maxWidth="md" fullWidth>
        <DialogTitle>Provide Facility Feedback</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 3 }}>
            Your feedback helps improve campus facilities. Please be constructive and specific.
          </Alert>
          
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Facility</InputLabel>
                  <Select
                    value={newFeedback.facility}
                    label="Facility"
                    onChange={(e) => setNewFeedback({...newFeedback, facility: e.target.value})}
                  >
                    {facilities.map(facility => (
                      <MenuItem key={facility.id} value={facility.id}>
                        {facility.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Feedback Title"
                  value={newFeedback.title}
                  onChange={(e) => setNewFeedback({...newFeedback, title: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Detailed Feedback"
                  placeholder="Share your experience and suggestions..."
                  value={newFeedback.content}
                  onChange={(e) => setNewFeedback({...newFeedback, content: e.target.value})}
                />
              </Grid>
            </Grid>

            {/* Ratings */}
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Rate This Facility
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(newFeedback.ratings).map(([category, rating]) => (
                <Grid item xs={6} sm={3} key={category}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', mb: 1 }}>
                      {category}
                    </Typography>
                    <Rating
                      value={rating}
                      onChange={(event, newValue) => setNewFeedback({
                        ...newFeedback,
                        ratings: { ...newFeedback.ratings, [category]: newValue || 0 }
                      })}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFeedback(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitFeedback} color="success">
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>

      {/* Issue Report Dialog */}
      <Dialog open={openIssue} onClose={() => setOpenIssue(false)} maxWidth="md" fullWidth>
        <DialogTitle>Report an Issue</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 3 }}>
            Report urgent issues that need immediate attention. Facilities management will be notified.
          </Alert>
          
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Facility</InputLabel>
                  <Select
                    value={newIssue.facility}
                    label="Facility"
                    onChange={(e) => setNewIssue({...newIssue, facility: e.target.value})}
                  >
                    {facilities.map(facility => (
                      <MenuItem key={facility.id} value={facility.id}>
                        {facility.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={newIssue.priority}
                    label="Priority"
                    onChange={(e) => setNewIssue({...newIssue, priority: e.target.value})}
                  >
                    <MenuItem value="low">Low - Minor inconvenience</MenuItem>
                    <MenuItem value="medium">Medium - Affects daily use</MenuItem>
                    <MenuItem value="high">High - Urgent attention needed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Issue Title"
                  placeholder="Brief description of the issue"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue({...newIssue, title: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Issue Description"
                  placeholder="Provide detailed information about the issue, location, and any other relevant details..."
                  value={newIssue.content}
                  onChange={(e) => setNewIssue({...newIssue, content: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <Typography variant="body2" color="text.secondary">
                    <input
                      type="checkbox"
                      checked={newIssue.anonymous}
                      onChange={(e) => setNewIssue({...newIssue, anonymous: e.target.checked})}
                    />
                    {' '}Report anonymously
                  </Typography>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenIssue(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitIssue} color="error">
            Report Issue
          </Button>
        </DialogActions>
      </Dialog>

      {/* Suggestion Dialog */}
      <Dialog open={openSuggestion} onClose={() => setOpenSuggestion(false)} maxWidth="md" fullWidth>
        <DialogTitle>Suggest an Improvement</DialogTitle>
        <DialogContent>
          <Alert severity="success" sx={{ mb: 3 }}>
            Share your ideas to improve campus facilities. Popular suggestions may be implemented!
          </Alert>
          
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Facility</InputLabel>
                  <Select
                    value={newSuggestion.facility}
                    label="Facility"
                    onChange={(e) => setNewSuggestion({...newSuggestion, facility: e.target.value})}
                  >
                    {facilities.map(facility => (
                      <MenuItem key={facility.id} value={facility.id}>
                        {facility.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={newSuggestion.category}
                    label="Category"
                    onChange={(e) => setNewSuggestion({...newSuggestion, category: e.target.value})}
                  >
                    <MenuItem value="general_improvement">General Improvement</MenuItem>
                    <MenuItem value="menu_improvement">Menu Enhancement</MenuItem>
                    <MenuItem value="hours_extension">Extended Hours</MenuItem>
                    <MenuItem value="equipment_upgrade">Equipment Upgrade</MenuItem>
                    <MenuItem value="new_service">New Service</MenuItem>
                    <MenuItem value="accessibility">Accessibility</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Suggestion Title"
                  placeholder="Brief title for your suggestion"
                  value={newSuggestion.title}
                  onChange={(e) => setNewSuggestion({...newSuggestion, title: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Detailed Suggestion"
                  placeholder="Explain your suggestion and how it would improve the facility..."
                  value={newSuggestion.content}
                  onChange={(e) => setNewSuggestion({...newSuggestion, content: e.target.value})}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSuggestion(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitSuggestion} color="warning">
            Submit Suggestion
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServicesFeedback;