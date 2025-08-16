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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Paper,
  CardMedia
} from '@mui/material';
import {
  HowToVote,
  Timeline,
  Security,
  PersonAdd,
  Campaign,
  VerifiedUser,
  AccessTime,
  Person,
  School,
  CheckCircle,
  PendingActions,
  Visibility,
  BarChart,
  Lock,
  Group,
  Schedule
} from '@mui/icons-material';
import { format } from 'date-fns';

const StudentElections = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openRegistration, setOpenRegistration] = useState(false);
  const [openVoting, setOpenVoting] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedElection, setSelectedElection] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  const [elections, setElections] = useState([
    {
      id: 1,
      title: 'Student Council President 2024',
      description: 'Election for Student Council President for the academic year 2024-2025',
      position: 'President',
      startDate: new Date('2024-03-01T08:00:00'),
      endDate: new Date('2024-03-05T18:00:00'),
      registrationDeadline: new Date('2024-02-25T23:59:59'),
      status: 'active', // active, upcoming, completed, registration
      totalVoters: 1250,
      votedCount: 892,
      candidates: [
        {
          id: 1,
          name: 'Sarah Chen',
          studentId: 'CS2021001',
          program: 'Computer Science',
          year: '3rd Year',
          gpa: 3.8,
          bio: 'Passionate computer science student with a vision for positive change on campus. I believe in the power of technology to solve problems and bring students together.',
          manifesto: 'Committed to improving campus facilities, enhancing student services, and fostering a more inclusive university environment.',
          experience: 'Vice President - Computer Science Society, Volunteer - Campus Sustainability Initiative',
          votes: 456,
          avatar: '/avatars/sarah.jpg',
          videoIntroduction: '/videos/sarah-intro.mp4',
          verified: true
        },
        {
          id: 2,
          name: 'Michael Johnson',
          studentId: 'BUS2020045',
          program: 'Business Administration',
          year: '4th Year',
          gpa: 3.7,
          manifesto: 'Focus on bridging the gap between students and administration, improving academic support services, and organizing more engaging campus events.',
          experience: 'President - Business Students Association, Member - Academic Affairs Committee',
          votes: 312,
          avatar: '/avatars/michael.jpg',
          verified: true
        },
        {
          id: 3,
          name: 'Aisha Patel',
          studentId: 'ENG2021078',
          program: 'Engineering',
          year: '3rd Year',
          gpa: 3.9,
          manifesto: 'Advocating for better mental health resources, modernizing campus technology infrastructure, and promoting diversity and inclusion.',
          experience: 'Secretary - Engineering Students Society, Coordinator - Peer Tutoring Program',
          votes: 124,
          avatar: '/avatars/aisha.jpg',
          verified: true
        }
      ]
    },
    {
      id: 2,
      title: 'Student Council Vice President 2024',
      description: 'Election for Student Council Vice President position',
      position: 'Vice President',
      startDate: new Date('2024-03-01T08:00:00'),
      endDate: new Date('2024-03-05T18:00:00'),
      registrationDeadline: new Date('2024-02-25T23:59:59'),
      status: 'active',
      totalVoters: 1250,
      votedCount: 743,
      candidates: [
        {
          id: 4,
          name: 'David Kim',
          studentId: 'SCI2020123',
          program: 'Life Sciences',
          year: '4th Year',
          gpa: 3.6,
          manifesto: 'Focusing on academic excellence support and research opportunities for undergraduate students.',
          experience: 'Research Assistant, Science Club President',
          votes: 398,
          avatar: '/avatars/david.jpg',
          verified: true
        },
        {
          id: 5,
          name: 'Emma Wilson',
          studentId: 'ART2021056',
          program: 'Fine Arts',
          year: '3rd Year',
          gpa: 3.8,
          manifesto: 'Promoting arts and culture on campus while ensuring equal representation for all programs.',
          experience: 'Arts Council Member, Event Coordinator',
          votes: 345,
          avatar: '/avatars/emma.jpg',
          verified: true
        }
      ]
    },
    {
      id: 3,
      title: 'Student Council Treasurer 2023',
      description: 'Completed election for Student Council Treasurer',
      position: 'Treasurer',
      startDate: new Date('2023-03-01T08:00:00'),
      endDate: new Date('2023-03-05T18:00:00'),
      registrationDeadline: new Date('2023-02-25T23:59:59'),
      status: 'completed',
      totalVoters: 1180,
      votedCount: 1056,
      winner: 'Alex Rodriguez',
      candidates: [
        {
          id: 6,
          name: 'Alex Rodriguez',
          studentId: 'FIN2020089',
          program: 'Finance',
          year: '4th Year',
          gpa: 3.9,
          votes: 678,
          winner: true
        },
        {
          id: 7,
          name: 'Lisa Chang',
          studentId: 'ACC2020034',
          program: 'Accounting',
          year: '3rd Year',
          gpa: 3.7,
          votes: 378
        }
      ]
    }
  ]);

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    studentId: '',
    program: '',
    year: '',
    manifesto: '',
    experience: '',
    videoIntroduction: null,
    bio: ''
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleVote = (electionId, candidateId) => {
    setElections(elections.map(election => 
      election.id === electionId 
        ? {
            ...election,
            votedCount: election.votedCount + 1,
            candidates: election.candidates.map(candidate =>
              candidate.id === candidateId
                ? { ...candidate, votes: candidate.votes + 1 }
                : candidate
            )
          }
        : election
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'success';
      case 'upcoming': return 'primary';
      case 'completed': return 'default';
      case 'registration': return 'warning';
      default: return 'default';
    }
  };

  const getVotePercentage = (candidate, totalVotes) => {
    return totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0;
  };

  const getTotalVotes = (candidates) => {
    return candidates.reduce((total, candidate) => total + candidate.votes, 0);
  };

  const filteredElections = elections.filter(election => {
    switch(tabValue) {
      case 0: return election.status === 'active' || election.status === 'registration';
      case 1: return election.status === 'upcoming';
      case 2: return election.status === 'completed';
      default: return true;
    }
  });

  const ElectionCard = ({ election }) => {
    const totalVotes = getTotalVotes(election.candidates);
    const turnoutPercentage = Math.round((election.votedCount / election.totalVoters) * 100);
    
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                {election.title}
                <Chip 
                  label={election.position} 
                  size="small" 
                  sx={{ ml: 1 }}
                  color="primary"
                  variant="outlined"
                />
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {election.description}
              </Typography>
            </Box>
            <Chip 
              label={election.status} 
              color={getStatusColor(election.status)}
              sx={{ textTransform: 'capitalize' }}
            />
          </Box>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {election.candidates.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Candidates
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success.main">
                  {election.votedCount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Votes Cast
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="info.main">
                  {turnoutPercentage}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Turnout
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="text.primary">
                  {election.totalVoters}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Eligible Voters
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Voting Period: {format(election.startDate, 'MMM dd')} - {format(election.endDate, 'MMM dd, yyyy')}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={turnoutPercentage}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>

          {election.status === 'completed' && election.winner && (
            <Alert severity="success" sx={{ mb: 2 }}>
              <strong>Winner:</strong> {election.winner}
            </Alert>
          )}
        </CardContent>
        
        <CardActions>
          {election.status === 'active' && (
            <Button
              startIcon={<HowToVote />}
              onClick={() => {
                setSelectedElection(election);
                setOpenVoting(true);
              }}
              variant="contained"
              color="success"
            >
              Vote Now
            </Button>
          )}
          {election.status === 'registration' && (
            <Button
              startIcon={<PersonAdd />}
              onClick={() => {
                setSelectedElection(election);
                setOpenRegistration(true);
              }}
              variant="contained"
              color="warning"
            >
              Register as Candidate
            </Button>
          )}
          <Button
            startIcon={<BarChart />}
            onClick={() => {
              setSelectedElection(election);
              setOpenDetails(true);
            }}
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    );
  };

  const CandidateCard = ({ candidate, election, onVote }) => {
    const totalVotes = getTotalVotes(election.candidates);
    const percentage = getVotePercentage(candidate, totalVotes);
    
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Avatar 
              sx={{ width: 60, height: 60 }}
              src={candidate.avatar}
            >
              {candidate.name.charAt(0)}
            </Avatar>
            
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="h6">
                  {candidate.name}
                </Typography>
                {candidate.verified && (
                  <Tooltip title="Verified Candidate">
                    <VerifiedUser color="primary" fontSize="small" />
                  </Tooltip>
                )}
              </Box>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {candidate.program} • {candidate.year} • ID: {candidate.studentId}
              </Typography>
              
              {candidate.gpa && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  GPA: {candidate.gpa}
                </Typography>
              )}
              
              <Typography variant="body2" paragraph>
                <strong>Manifesto:</strong> {candidate.manifesto}
              </Typography>
              
              {candidate.experience && (
                <Typography variant="body2" paragraph>
                  <strong>Experience:</strong> {candidate.experience}
                </Typography>
              )}
              
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2">
                    Current Votes
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {candidate.votes} votes ({percentage}%)
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={percentage}
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
        
        {election.status === 'active' && onVote && (
          <CardActions>
            <Button
              variant="contained"
              color="success"
              onClick={() => onVote(candidate.id)}
              startIcon={<HowToVote />}
            >
              Vote for {candidate.name.split(' ')[0]}
            </Button>
          </CardActions>
        )}
      </Card>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Student Council Elections
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Democratic and secure voting for student governance
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Voting is secure and anonymous">
            <Chip icon={<Security />} label="Secure Voting" color="error" variant="outlined" />
          </Tooltip>
          <Tooltip title="Real-time result tracking">
            <Chip icon={<Timeline />} label="Live Results" color="info" variant="outlined" />
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Active Elections" />
          <Tab label="Upcoming Elections" />
          <Tab label="Past Elections" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {filteredElections.length > 0 ? (
            filteredElections.map(election => (
              <ElectionCard key={election.id} election={election} />
            ))
          ) : (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <HowToVote sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No elections in this category
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Voting Dialog */}
      <Dialog open={openVoting} onClose={() => setOpenVoting(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Lock color="primary" />
            Secure Voting - {selectedElection?.title}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 3 }}>
            Your vote is anonymous and secure. You can only vote once per election.
          </Alert>
          
          {selectedElection && selectedElection.candidates.map(candidate => (
            <CandidateCard 
              key={candidate.id} 
              candidate={candidate} 
              election={selectedElection}
              onVote={(candidateId) => {
                handleVote(selectedElection.id, candidateId);
                setOpenVoting(false);
              }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVoting(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Candidate Registration Dialog */}
      <Dialog open={openRegistration} onClose={() => setOpenRegistration(false)} maxWidth="md" fullWidth>
        <DialogTitle>Register as Candidate</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 3 }}>
            Please ensure you meet all eligibility requirements before registering.
          </Alert>
          
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={newCandidate.name}
                onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Student ID"
                value={newCandidate.studentId}
                onChange={(e) => setNewCandidate({...newCandidate, studentId: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Program/Major"
                value={newCandidate.program}
                onChange={(e) => setNewCandidate({...newCandidate, program: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Year Level</InputLabel>
                <Select
                  value={newCandidate.year}
                  label="Year Level"
                  onChange={(e) => setNewCandidate({...newCandidate, year: e.target.value})}
                >
                  <MenuItem value="2nd Year">2nd Year</MenuItem>
                  <MenuItem value="3rd Year">3rd Year</MenuItem>
                  <MenuItem value="4th Year">4th Year</MenuItem>
                  <MenuItem value="Graduate">Graduate</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Campaign Manifesto"
                placeholder="Describe your goals and vision if elected..."
                value={newCandidate.manifesto}
                onChange={(e) => setNewCandidate({...newCandidate, manifesto: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Personal Bio"
                placeholder="Tell us about yourself, your background, and what motivates you..."
                value={newCandidate.bio}
                onChange={(e) => setNewCandidate({...newCandidate, bio: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Relevant Experience"
                placeholder="List your leadership experience, achievements, and qualifications..."
                value={newCandidate.experience}
                onChange={(e) => setNewCandidate({...newCandidate, experience: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Video Introduction (Optional)
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Upload a short video introduction (max 2 minutes, 50MB) to help voters get to know you better.
                </Typography>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (file.size > 50 * 1024 * 1024) {
                        alert('File size must be less than 50MB');
                        return;
                      }
                      setNewCandidate({...newCandidate, videoIntroduction: file});
                    }
                  }}
                  style={{ display: 'none' }}
                  id="video-upload"
                />
                <label htmlFor="video-upload">
                  <Button variant="outlined" component="span" fullWidth>
                    {newCandidate.videoIntroduction ? 
                      `Selected: ${newCandidate.videoIntroduction.name || newCandidate.videoIntroduction}` : 
                      'Choose Video File'
                    }
                  </Button>
                </label>
                {newCandidate.videoIntroduction && (
                  <Box sx={{ mt: 2 }}>
                    <video 
                      width="100%" 
                      height="200" 
                      controls
                      src={typeof newCandidate.videoIntroduction === 'string' ? 
                        newCandidate.videoIntroduction : 
                        URL.createObjectURL(newCandidate.videoIntroduction)}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRegistration(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => {
            // Add candidate registration logic here
            setOpenRegistration(false);
          }}>
            Submit Registration
          </Button>
        </DialogActions>
      </Dialog>

      {/* Detailed Election Results Dialog */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BarChart color="primary" />
            Election Details - {selectedElection?.title}
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedElection && (
            <Box sx={{ pt: 2 }}>
              {/* Election Overview */}
              <Paper sx={{ p: 3, mb: 3, backgroundColor: 'grey.50' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Election Information
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">Position</Typography>
                      <Typography variant="h6">{selectedElection.position}</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">Status</Typography>
                      <Chip 
                        label={selectedElection.status} 
                        color={getStatusColor(selectedElection.status)}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">Voting Period</Typography>
                      <Typography variant="body1">
                        {format(selectedElection.startDate, 'MMM dd, yyyy HH:mm')} - {format(selectedElection.endDate, 'MMM dd, yyyy HH:mm')}
                      </Typography>
                    </Box>
                    {selectedElection.winner && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Winner</Typography>
                        <Typography variant="h6" color="success.main">
                          🏆 {selectedElection.winner}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Voting Statistics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'white', borderRadius: 1 }}>
                          <Typography variant="h4" color="success.main">
                            {selectedElection.votedCount}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Total Votes
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'white', borderRadius: 1 }}>
                          <Typography variant="h4" color="primary.main">
                            {selectedElection.totalVoters}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Eligible Voters
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" gutterBottom>
                            Turnout: {Math.round((selectedElection.votedCount / selectedElection.totalVoters) * 100)}%
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={(selectedElection.votedCount / selectedElection.totalVoters) * 100}
                            sx={{ height: 10, borderRadius: 5 }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>

              {/* Candidates Results */}
              <Typography variant="h6" gutterBottom>
                Candidate Results
              </Typography>
              <Grid container spacing={2}>
                {selectedElection.candidates
                  .sort((a, b) => b.votes - a.votes)
                  .map((candidate, index) => {
                    const totalVotes = getTotalVotes(selectedElection.candidates);
                    const percentage = getVotePercentage(candidate, totalVotes);
                    const isWinner = candidate.winner || index === 0;
                    
                    return (
                      <Grid item xs={12} key={candidate.id}>
                        <Card sx={{ 
                          border: isWinner ? '2px solid' : '1px solid',
                          borderColor: isWinner ? 'success.main' : 'divider',
                          backgroundColor: isWinner ? 'success.light' : 'white'
                        }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Badge
                                badgeContent={index + 1}
                                color={isWinner ? "success" : "primary"}
                                sx={{
                                  '& .MuiBadge-badge': {
                                    fontSize: '1rem',
                                    height: '24px',
                                    minWidth: '24px'
                                  }
                                }}
                              >
                                <Avatar 
                                  sx={{ 
                                    width: 60, 
                                    height: 60,
                                    border: isWinner ? '3px solid' : 'none',
                                    borderColor: 'success.main'
                                  }}
                                  src={candidate.avatar}
                                >
                                  {candidate.name.charAt(0)}
                                </Avatar>
                              </Badge>
                              
                              <Box sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                  <Typography variant="h6">
                                    {candidate.name}
                                  </Typography>
                                  {isWinner && selectedElection.status === 'completed' && (
                                    <Chip 
                                      label="WINNER" 
                                      color="success" 
                                      size="small"
                                      sx={{ fontWeight: 'bold' }}
                                    />
                                  )}
                                  {candidate.verified && (
                                    <Tooltip title="Verified Candidate">
                                      <VerifiedUser color="primary" fontSize="small" />
                                    </Tooltip>
                                  )}
                                </Box>
                                
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  {candidate.program} • {candidate.year} • ID: {candidate.studentId}
                                </Typography>
                                
                                {candidate.gpa && (
                                  <Typography variant="body2" color="text.secondary">
                                    GPA: {candidate.gpa}
                                  </Typography>
                                )}
                              </Box>
                              
                              <Box sx={{ textAlign: 'center', minWidth: '120px' }}>
                                <Typography variant="h4" color={isWinner ? 'success.main' : 'primary'}>
                                  {candidate.votes}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  votes ({percentage}%)
                                </Typography>
                              </Box>
                            </Box>

                            {/* Vote Progress Bar */}
                            <Box sx={{ mb: 2 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={percentage}
                                sx={{ 
                                  height: 12, 
                                  borderRadius: 6,
                                  backgroundColor: 'grey.200',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: isWinner ? 'success.main' : 'primary.main'
                                  }
                                }}
                              />
                            </Box>

                            {/* Candidate Details */}
                            {(candidate.bio || candidate.manifesto || candidate.experience || candidate.videoIntroduction) && (
                              <Box>
                                {candidate.bio && (
                                  <Box sx={{ mb: 1 }}>
                                    <Typography variant="subtitle2" color="primary">
                                      Bio:
                                    </Typography>
                                    <Typography variant="body2">
                                      {candidate.bio}
                                    </Typography>
                                  </Box>
                                )}
                                
                                {candidate.manifesto && (
                                  <Box sx={{ mb: 1 }}>
                                    <Typography variant="subtitle2" color="primary">
                                      Manifesto:
                                    </Typography>
                                    <Typography variant="body2">
                                      {candidate.manifesto}
                                    </Typography>
                                  </Box>
                                )}
                                
                                {candidate.experience && (
                                  <Box sx={{ mb: 1 }}>
                                    <Typography variant="subtitle2" color="primary">
                                      Experience:
                                    </Typography>
                                    <Typography variant="body2">
                                      {candidate.experience}
                                    </Typography>
                                  </Box>
                                )}
                                
                                {candidate.videoIntroduction && (
                                  <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle2" color="primary" gutterBottom>
                                      Video Introduction:
                                    </Typography>
                                    <video 
                                      width="100%" 
                                      height="200" 
                                      controls
                                      src={candidate.videoIntroduction}
                                      style={{ borderRadius: '8px' }}
                                    >
                                      Your browser does not support the video tag.
                                    </video>
                                  </Box>
                                )}
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>

              {/* Voting Timeline */}
              <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Election Timeline
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Registration Deadline"
                      secondary={format(selectedElection.registrationDeadline, 'MMM dd, yyyy HH:mm')}
                    />
                    <CheckCircle color="success" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Voting Period Start"
                      secondary={format(selectedElection.startDate, 'MMM dd, yyyy HH:mm')}
                    />
                    <CheckCircle color="success" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Voting Period End"
                      secondary={format(selectedElection.endDate, 'MMM dd, yyyy HH:mm')}
                    />
                    {selectedElection.status === 'completed' ? 
                      <CheckCircle color="success" /> : 
                      <Schedule color="warning" />
                    }
                  </ListItem>
                </List>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetails(false)} size="large">
            Close
          </Button>
          {selectedElection?.status === 'active' && (
            <Button 
              variant="contained" 
              startIcon={<HowToVote />}
              onClick={() => {
                setOpenDetails(false);
                setOpenVoting(true);
              }}
              color="success"
              size="large"
            >
              Vote Now
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentElections;