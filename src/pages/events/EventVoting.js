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
  LinearProgress,
  Alert,
  Avatar,
  CardActions,
  IconButton,
  Badge,
  Tooltip,
  Slide,
  Fade,
  Grow,
  Zoom
} from '@mui/material';
import {
  Event,
  Schedule,
  Feedback,
  Add,
  ThumbUp,
  ThumbDown,
  Comment,
  Warning,
  CheckCircle,
  AccessTime,
  Person,
  School
} from '@mui/icons-material';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInUp, ScaleIn, SlideInLeft } from '../../components/common/LoadingAnimation';

const EventVoting = () => {
  const [tabValue, setTabValue] = useState(0);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Annual Tech Symposium',
      description: 'A day-long symposium featuring industry speakers and student presentations.',
      proposedBy: 'Dr. Sarah Johnson',
      userType: 'faculty',
      startDate: new Date('2024-03-15T09:00:00'),
      endDate: new Date('2024-03-15T17:00:00'),
      location: 'Main Auditorium',
      category: 'Academic',
      votes: { yes: 45, no: 12 },
      hasConflict: false,
      status: 'voting',
      feedback: []
    },
    {
      id: 2,
      title: 'Spring Cultural Festival',
      description: 'Cultural performances, food stalls, and art exhibitions.',
      proposedBy: 'Student Council',
      userType: 'student',
      startDate: new Date('2024-03-20T10:00:00'),
      endDate: new Date('2024-03-20T20:00:00'),
      location: 'Campus Grounds',
      category: 'Cultural',
      votes: { yes: 78, no: 23 },
      hasConflict: true,
      conflictReason: 'Overlaps with Midterm Examination Period',
      suggestedDates: ['March 22, 2024', 'March 27, 2024', 'April 3, 2024'],
      status: 'voting',
      feedback: []
    },
    {
      id: 3,
      title: 'Career Fair 2024',
      description: 'Annual career fair with 50+ companies and organizations.',
      proposedBy: 'Career Services',
      userType: 'faculty',
      startDate: new Date('2024-04-10T08:00:00'),
      endDate: new Date('2024-04-10T16:00:00'),
      location: 'Sports Complex',
      category: 'Career',
      votes: { yes: 89, no: 5 },
      hasConflict: false,
      status: 'approved',
      feedback: []
    }
  ]);
  const [openProposal, setOpenProposal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    location: '',
    category: '',
    targetAudience: '',
    estimatedCost: '',
    objectives: ''
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleVote = (eventId, voteType) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, votes: { ...event.votes, [voteType]: event.votes[voteType] + 1 }}
        : event
    ));
  };

  const handleSubmitProposal = () => {
    // Simple conflict detection simulation
    const hasConflict = Math.random() < 0.3; // 30% chance of conflict for demo
    
    const newEventData = {
      id: events.length + 1,
      title: newEvent.title,
      description: newEvent.description,
      proposedBy: 'Current User', // In real app, this would be from auth context
      userType: 'student', // In real app, this would be from auth context
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      location: newEvent.location,
      category: newEvent.category,
      targetAudience: newEvent.targetAudience,
      estimatedCost: newEvent.estimatedCost,
      objectives: newEvent.objectives,
      votes: { yes: 0, no: 0 },
      hasConflict,
      conflictReason: hasConflict ? 'Overlaps with Academic Calendar Event' : null,
      suggestedDates: hasConflict ? [
        format(new Date(newEvent.startDate.getTime() + 7 * 24 * 60 * 60 * 1000), 'MMM dd, yyyy'),
        format(new Date(newEvent.startDate.getTime() + 14 * 24 * 60 * 60 * 1000), 'MMM dd, yyyy'),
        format(new Date(newEvent.startDate.getTime() + 21 * 24 * 60 * 60 * 1000), 'MMM dd, yyyy')
      ] : null,
      status: 'voting',
      feedback: []
    };

    setEvents([...events, newEventData]);
    
    // Reset form
    setNewEvent({
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      category: '',
      targetAudience: '',
      estimatedCost: '',
      objectives: ''
    });
    
    setOpenProposal(false);
    
    // Switch to "Active Voting" tab to show the new event
    setTabValue(0);

    // Show success notification
    Swal.fire({
      title: 'Event Proposed!',
      text: 'Your event proposal has been submitted for voting.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      timerProgressBar: true
    });
  };

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) return;

    const newFeedback = {
      id: Date.now(),
      eventId: selectedEvent.id,
      feedback: feedbackText,
      submittedBy: 'Current User', // In real app, from auth context
      timestamp: new Date(),
      helpful: 0
    };

    // Add feedback to the selected event
    setEvents(events.map(event => 
      event.id === selectedEvent.id 
        ? { ...event, feedback: [...event.feedback, newFeedback] }
        : event
    ));

    // Reset and close
    setFeedbackText('');
    setOpenFeedback(false);
    setSelectedEvent(null);

    // Show success notification
    Swal.fire({
      title: 'Feedback Submitted!',
      text: 'Thank you for your valuable feedback on this event.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      timerProgressBar: true
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'voting': return 'primary';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getVotePercentage = (votes) => {
    const total = votes.yes + votes.no;
    return total > 0 ? Math.round((votes.yes / total) * 100) : 0;
  };

  const filteredEvents = events.filter(event => {
    switch(tabValue) {
      case 0: return event.status === 'voting';
      case 1: return event.status === 'approved';
      case 2: return event.status === 'rejected';
      default: return true;
    }
  });

  const EventCard = ({ event, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card 
        sx={{ 
          mb: 2, 
          border: event.hasConflict ? '2px solid #f57c00' : 'none',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-4px)'
          }
        }}
      >
        <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              {event.title}
              <Chip 
                label={event.category} 
                size="small" 
                sx={{ ml: 1 }}
                color="primary"
                variant="outlined"
              />
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {event.description}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTime fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {format(event.startDate, 'MMM dd, yyyy - HH:mm')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Avatar sx={{ width: 20, height: 20, fontSize: '0.75rem' }}>
                  {event.userType === 'faculty' ? <School fontSize="small" /> : <Person fontSize="small" />}
                </Avatar>
                <Typography variant="body2" color="text.secondary">
                  by {event.proposedBy}
                </Typography>
              </Box>
            </Box>

            {event.hasConflict && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                <strong>Schedule Conflict:</strong> {event.conflictReason}
                {event.suggestedDates && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" display="block">
                      <strong>Suggested alternatives:</strong> {event.suggestedDates.join(', ')}
                    </Typography>
                  </Box>
                )}
              </Alert>
            )}

            {/* Feedback Display */}
            {event.feedback && event.feedback.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>
                  Recent Feedback ({event.feedback.length})
                </Typography>
                {event.feedback.slice(-2).map((feedback) => (
                  <Alert key={feedback.id} severity="info" sx={{ mb: 1, '& .MuiAlert-message': { fontSize: '0.875rem' } }}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      "{feedback.feedback}"
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      - {feedback.submittedBy} • {format(feedback.timestamp, 'MMM dd, HH:mm')}
                    </Typography>
                  </Alert>
                ))}
              </Box>
            )}

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2">Voting Progress</Typography>
                <Typography variant="body2" color="primary">
                  {getVotePercentage(event.votes)}% approval
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={getVotePercentage(event.votes)}
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption">
                  👍 {event.votes.yes} votes
                </Typography>
                <Typography variant="caption">
                  👎 {event.votes.no} votes
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Chip 
            label={event.status} 
            color={getStatusColor(event.status)}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      </CardContent>
      
      {event.status === 'voting' && (
        <CardActions sx={{ p: 2, pt: 0 }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              startIcon={<ThumbUp />}
              onClick={() => handleVote(event.id, 'yes')}
              variant="outlined"
              size="small"
              sx={{
                borderColor: '#4caf50',
                color: '#4caf50',
                mr: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#4caf50',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
                }
              }}
            >
              Support
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              startIcon={<ThumbDown />}
              onClick={() => handleVote(event.id, 'no')}
              variant="outlined"
              size="small"
              sx={{
                borderColor: '#f44336',
                color: '#f44336',
                mr: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f44336',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)'
                }
              }}
            >
              Oppose
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              startIcon={<Comment />}
              onClick={() => {
                setSelectedEvent(event);
                setOpenFeedback(true);
              }}
              variant="outlined"
              size="small"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                }
              }}
            >
              Feedback
            </Button>
          </motion.div>
        </CardActions>
      )}
      </Card>
    </motion.div>
  );

  return (
    <Box>
      <FadeInUp>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 'bold'
              }}
            >
              Event Voting System
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Propose, vote on, and provide feedback on university events
            </Typography>
          </Box>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenProposal(true)}
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                borderRadius: 2,
                px: 3,
                py: 1.5,
                boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  boxShadow: '0 12px 32px rgba(25, 118, 210, 0.4)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Propose Event
            </Button>
          </motion.div>
        </Box>
      </FadeInUp>

      <SlideInLeft delay={0.2}>
        <Box sx={{ mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  transform: 'translateY(-2px)'
                }
              },
              '& .MuiTabs-indicator': {
                background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                height: 3
              }
            }}
          >
            <Tab label="Active Voting" />
            <Tab label="Approved Events" />
            <Tab label="Rejected Events" />
          </Tabs>
        </Box>
      </SlideInLeft>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AnimatePresence mode="wait">
            {filteredEvents.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 6 }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <Event sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                    </motion.div>
                    <Typography variant="h6" color="text.secondary">
                      No events in this category
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Be the first to propose an event!
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </Grid>
      </Grid>

        {/* Event Proposal Dialog */}
        <Dialog 
          open={openProposal} 
          onClose={() => setOpenProposal(false)} 
          maxWidth="md" 
          fullWidth
        >
          <DialogTitle sx={{ pb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Event color="primary" />
              <Typography variant="h5" component="span">
                Propose New Event
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 0, width: '100%' }}>
            <Box sx={{ p: 4, width: '100%', maxWidth: 'none' }}>
              <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
                {/* Basic Information Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                    📝 Basic Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={7}>
                      <TextField
                        fullWidth
                        label="Event Title *"
                        placeholder="Enter a compelling title for your event"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        fullWidth
                        label="Event Location *"
                        placeholder="Specify the venue or location"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Description & Objectives Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                    📄 Description & Objectives
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        multiline
                        rows={5}
                        label="Event Description *"
                        placeholder="Provide a detailed description of the event, its activities, and what attendees can expect..."
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        multiline
                        rows={5}
                        label="Event Objectives & Purpose"
                        placeholder="Describe the purpose, goals, and expected outcomes of this event..."
                        value={newEvent.objectives}
                        onChange={(e) => setNewEvent({...newEvent, objectives: e.target.value})}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Schedule Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                    📅 Schedule
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Start Date & Time *"
                        type="datetime-local"
                        value={newEvent.startDate ? format(new Date(newEvent.startDate), "yyyy-MM-dd'T'HH:mm") : ''}
                        onChange={(e) => setNewEvent({...newEvent, startDate: new Date(e.target.value)})}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="End Date & Time *"
                        type="datetime-local"
                        value={newEvent.endDate ? format(new Date(newEvent.endDate), "yyyy-MM-dd'T'HH:mm") : ''}
                        onChange={(e) => setNewEvent({...newEvent, endDate: new Date(e.target.value)})}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Event Details Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                    🎯 Event Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined" sx={{ minWidth: '250px', width: '100%' }}>
                        <InputLabel>Event Category *</InputLabel>
                        <Select
                          value={newEvent.category}
                          label="Event Category *"
                          onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                          sx={{
                            width: '100%',
                            minWidth: '250px',
                            '& .MuiSelect-select': {
                              width: '100%'
                            },
                            '& .MuiOutlinedInput-root': {
                              width: '100%'
                            }
                          }}
                        >
                          <MenuItem value="Academic">📚 Academic</MenuItem>
                          <MenuItem value="Cultural">🎭 Cultural</MenuItem>
                          <MenuItem value="Sports">⚽ Sports</MenuItem>
                          <MenuItem value="Career">💼 Career</MenuItem>
                          <MenuItem value="Social">🤝 Social</MenuItem>
                          <MenuItem value="Workshop">🔧 Workshop</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined" sx={{ minWidth: '250px', width: '100%' }}>
                        <InputLabel>Target Audience</InputLabel>
                        <Select
                          value={newEvent.targetAudience}
                          label="Target Audience"
                          onChange={(e) => setNewEvent({...newEvent, targetAudience: e.target.value})}
                          sx={{
                            width: '100%',
                            minWidth: '250px',
                            '& .MuiSelect-select': {
                              width: '100%'
                            },
                            '& .MuiOutlinedInput-root': {
                              width: '100%'
                            }
                          }}
                        >
                          <MenuItem value="All Students">👥 All Students</MenuItem>
                          <MenuItem value="Undergraduate Students">🎓 Undergraduate Students</MenuItem>
                          <MenuItem value="Graduate Students">📖 Graduate Students</MenuItem>
                          <MenuItem value="Faculty & Staff">👨‍🏫 Faculty & Staff</MenuItem>
                          <MenuItem value="Alumni">🎉 Alumni</MenuItem>
                          <MenuItem value="University Community">🏛️ University Community</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Estimated Budget"
                        type="number"
                        placeholder="0"
                        value={newEvent.estimatedCost}
                        onChange={(e) => setNewEvent({...newEvent, estimatedCost: e.target.value})}
                        InputProps={{
                          startAdornment: <span style={{ marginRight: '8px', color: '#666' }}>$</span>
                        }}
                        variant="outlined"
                        helperText="Enter estimated cost in USD"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
            <Button 
              onClick={() => setOpenProposal(false)} 
              size="large"
              sx={{ minWidth: '100px' }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSubmitProposal}
              disabled={!newEvent.title || !newEvent.description || !newEvent.category}
              size="large"
              sx={{ minWidth: '150px' }}
            >
              Submit Proposal
            </Button>
          </DialogActions>
        </Dialog>

        {/* Feedback Dialog */}
        <Dialog open={openFeedback} onClose={() => setOpenFeedback(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Provide Feedback</DialogTitle>
          <DialogContent>
            {selectedEvent && (
              <Box sx={{ pt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {selectedEvent.title}
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Your feedback"
                  placeholder="Share your thoughts, suggestions, or concerns about this event..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setOpenFeedback(false);
              setFeedbackText('');
              setSelectedEvent(null);
            }}>Cancel</Button>
            <Button 
              variant="contained" 
              onClick={handleSubmitFeedback}
              disabled={!feedbackText.trim()}
            >
              Submit Feedback
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};

export default EventVoting;