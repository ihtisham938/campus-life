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
  Paper,
  Avatar,
  IconButton,
  Divider,
  Alert,
  Badge,
  Tooltip,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardActions
} from '@mui/material';
import {
  QuestionAnswer,
  Forum,
  People,
  Add,
  Search,
  FilterList,
  ThumbUp,
  ThumbDown,
  Reply,
  Verified,
  VisibilityOff,
  TrendingUp,
  School,
  Event,
  Home,
  Build,
  SportsEsports,
  MenuBook,
  ExpandMore,
  Star,
  CheckCircle,
  PersonOff
} from '@mui/icons-material';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const QAForum = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openAskQuestion, setOpenAskQuestion] = useState(false);
  const [openAnswerDialog, setOpenAnswerDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('popular'); // popular, recent, unanswered
  
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'How to register for CS101 course?',
      content: 'I am trying to register for the Introduction to Programming course but the system shows it is full. Are there any waitlist options available?',
      category: 'courses',
      author: 'John Smith',
      authorType: 'student',
      isAnonymous: false,
      upvotes: 15,
      downvotes: 2,
      userVote: null, // null, 'up', 'down'
      answers: [
        {
          id: 1,
          content: 'You can join the waitlist through the student portal. Go to Course Registration > Waitlist Management. Students are typically added from the waitlist during the first week of classes.',
          author: 'Dr. Sarah Johnson',
          authorType: 'faculty',
          isOfficial: true,
          isAnonymous: false,
          upvotes: 23,
          downvotes: 0,
          timestamp: new Date('2024-02-08T10:30:00')
        },
        {
          id: 2,
          content: 'I was on the waitlist last semester and got in after 3 days. Just make sure to check your email regularly for updates.',
          author: 'Anonymous Student',
          authorType: 'student',
          isOfficial: false,
          isAnonymous: true,
          upvotes: 8,
          downvotes: 1,
          timestamp: new Date('2024-02-08T14:20:00')
        }
      ],
      timestamp: new Date('2024-02-08T09:15:00'),
      solved: true
    },
    {
      id: 2,
      title: 'Library opening hours during exam period?',
      content: 'Will the library have extended hours during the final exam period? I need a quiet place to study.',
      category: 'facilities',
      author: 'Anonymous',
      authorType: 'student',
      isAnonymous: true,
      upvotes: 28,
      downvotes: 0,
      userVote: null,
      answers: [
        {
          id: 3,
          content: 'Yes, the library will be open 24/7 starting two weeks before finals until the end of exam period. Additional study rooms will also be available on the 3rd floor.',
          author: 'Campus Administration',
          authorType: 'admin',
          isOfficial: true,
          isAnonymous: false,
          upvotes: 45,
          downvotes: 0,
          timestamp: new Date('2024-02-09T11:00:00')
        }
      ],
      timestamp: new Date('2024-02-09T08:45:00'),
      solved: true
    },
    {
      id: 3,
      title: 'When is the Spring Career Fair?',
      content: 'I heard there will be a career fair this spring. Does anyone know the exact date and which companies will be attending?',
      category: 'events',
      author: 'Maria Garcia',
      authorType: 'student',
      isAnonymous: false,
      upvotes: 22,
      downvotes: 1,
      userVote: null,
      answers: [],
      timestamp: new Date('2024-02-10T16:30:00'),
      solved: false
    },
    {
      id: 4,
      title: 'How to reset campus WiFi password?',
      content: 'I forgot my campus WiFi password and cannot connect to the network. Is there a way to reset it online?',
      category: 'technical',
      author: 'Anonymous',
      authorType: 'student',
      isAnonymous: true,
      upvotes: 12,
      downvotes: 0,
      userVote: null,
      answers: [
        {
          id: 4,
          content: 'Visit the IT Help Desk portal at help.university.edu and click on "Reset Network Password". You can also visit the IT office in the Student Center for immediate assistance.',
          author: 'IT Support Team',
          authorType: 'admin',
          isOfficial: true,
          isAnonymous: false,
          upvotes: 18,
          downvotes: 0,
          timestamp: new Date('2024-02-11T13:45:00')
        }
      ],
      timestamp: new Date('2024-02-11T12:20:00'),
      solved: true
    }
  ]);

  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    category: 'courses',
    isAnonymous: false
  });

  const [newAnswer, setNewAnswer] = useState({
    content: '',
    isAnonymous: false
  });

  const categories = [
    { id: 'courses', label: 'Courses & Academics', icon: <MenuBook />, color: 'primary' },
    { id: 'events', label: 'Campus Events', icon: <Event />, color: 'secondary' },
    { id: 'facilities', label: 'Campus Facilities', icon: <Home />, color: 'success' },
    { id: 'technical', label: 'Technical Support', icon: <Build />, color: 'warning' },
    { id: 'sports', label: 'Sports & Recreation', icon: <SportsEsports />, color: 'info' },
    { id: 'general', label: 'General Questions', icon: <Forum />, color: 'default' }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleVoteQuestion = (questionId, voteType) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newQuestion = { ...q };
        
        if (q.userVote === voteType) {
          // Remove vote
          if (voteType === 'up') newQuestion.upvotes--;
          else newQuestion.downvotes--;
          newQuestion.userVote = null;
        } else {
          // Change or add vote
          if (q.userVote === 'up') newQuestion.upvotes--;
          if (q.userVote === 'down') newQuestion.downvotes--;
          
          if (voteType === 'up') newQuestion.upvotes++;
          else newQuestion.downvotes++;
          newQuestion.userVote = voteType;
        }
        
        return newQuestion;
      }
      return q;
    }));
  };

  const handleVoteAnswer = (questionId, answerId, voteType) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          answers: q.answers.map(a => {
            if (a.id === answerId) {
              const newAnswer = { ...a };
              
              if (a.userVote === voteType) {
                // Remove vote
                if (voteType === 'up') newAnswer.upvotes--;
                else newAnswer.downvotes--;
                newAnswer.userVote = null;
              } else {
                // Change or add vote
                if (a.userVote === 'up') newAnswer.upvotes--;
                if (a.userVote === 'down') newAnswer.downvotes--;
                
                if (voteType === 'up') newAnswer.upvotes++;
                else newAnswer.downvotes++;
                newAnswer.userVote = voteType;
              }
              
              return newAnswer;
            }
            return a;
          })
        };
      }
      return q;
    }));
  };

  const handleSubmitQuestion = () => {
    if (!newQuestion.title.trim() || !newQuestion.content.trim()) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please fill in both title and content.',
        icon: 'warning'
      });
      return;
    }

    const question = {
      id: questions.length + 1,
      ...newQuestion,
      author: newQuestion.isAnonymous ? 'Anonymous' : 'Current User',
      authorType: 'student',
      upvotes: 0,
      downvotes: 0,
      userVote: null,
      answers: [],
      timestamp: new Date(),
      solved: false
    };

    setQuestions([question, ...questions]);
    setNewQuestion({ title: '', content: '', category: 'courses', isAnonymous: false });
    setOpenAskQuestion(false);

    Swal.fire({
      title: 'Question Posted!',
      text: 'Your question has been posted successfully.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      timerProgressBar: true
    });
  };

  const handleSubmitAnswer = () => {
    if (!newAnswer.content.trim()) {
      Swal.fire({
        title: 'Missing Content',
        text: 'Please provide an answer.',
        icon: 'warning'
      });
      return;
    }

    const answer = {
      id: Date.now(),
      content: newAnswer.content,
      author: newAnswer.isAnonymous ? 'Anonymous' : 'Current User',
      authorType: 'student', // This would be determined by user role
      isOfficial: false, // This would be true for faculty/admin
      isAnonymous: newAnswer.isAnonymous,
      upvotes: 0,
      downvotes: 0,
      userVote: null,
      timestamp: new Date()
    };

    setQuestions(questions.map(q => 
      q.id === selectedQuestion.id 
        ? { ...q, answers: [...q.answers, answer] }
        : q
    ));

    setNewAnswer({ content: '', isAnonymous: false });
    setOpenAnswerDialog(false);
    setSelectedQuestion(null);

    Swal.fire({
      title: 'Answer Posted!',
      text: 'Your answer has been posted successfully.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      timerProgressBar: true
    });
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || question.category === categoryFilter;
    const matchesTab = tabValue === 0 ? true : 
                      tabValue === 1 ? question.solved :
                      tabValue === 2 ? !question.solved :
                      true;
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch(sortBy) {
      case 'popular':
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      case 'recent':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'unanswered':
        return a.answers.length - b.answers.length;
      default:
        return 0;
    }
  });

  const getCategoryInfo = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  const QuestionCard = ({ question }) => {
    const categoryInfo = getCategoryInfo(question.category);
    const score = question.upvotes - question.downvotes;
    
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {question.title}
                </Typography>
                {question.solved && (
                  <Tooltip title="Question Solved">
                    <CheckCircle color="success" />
                  </Tooltip>
                )}
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Chip 
                  icon={categoryInfo.icon} 
                  label={categoryInfo.label} 
                  size="small" 
                  color={categoryInfo.color}
                  variant="outlined"
                />
                <Typography variant="body2" color="text.secondary">
                  by {question.isAnonymous ? 'Anonymous' : question.author}
                  {question.isAnonymous && <PersonOff fontSize="small" sx={{ ml: 0.5 }} />}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {format(question.timestamp, 'MMM dd, yyyy HH:mm')}
                </Typography>
              </Box>
              
              <Typography variant="body2" paragraph>
                {question.content}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleVoteQuestion(question.id, 'up')}
                    color={question.userVote === 'up' ? 'primary' : 'default'}
                  >
                    <ThumbUp fontSize="small" />
                  </IconButton>
                  <Typography variant="body2" sx={{ minWidth: '20px', textAlign: 'center' }}>
                    {score}
                  </Typography>
                  <IconButton 
                    size="small"
                    onClick={() => handleVoteQuestion(question.id, 'down')}
                    color={question.userVote === 'down' ? 'error' : 'default'}
                  >
                    <ThumbDown fontSize="small" />
                  </IconButton>
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  {question.answers.length} answers
                </Typography>
              </Box>
            </Box>
          </Box>
          
          {question.answers.length > 0 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle2">
                  View Answers ({question.answers.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {question.answers.map(answer => (
                    <React.Fragment key={answer.id}>
                      <ListItem alignItems="flex-start" sx={{ pl: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: answer.isOfficial ? 'primary.main' : 'grey.400' }}>
                            {answer.isAnonymous ? <PersonOff /> : answer.author.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Typography variant="subtitle2">
                                {answer.isAnonymous ? 'Anonymous' : answer.author}
                              </Typography>
                              {answer.isOfficial && (
                                <Tooltip title="Official Response">
                                  <Verified color="primary" fontSize="small" />
                                </Tooltip>
                              )}
                              <Typography variant="caption" color="text.secondary">
                                {format(answer.timestamp, 'MMM dd, yyyy HH:mm')}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" paragraph>
                                {answer.content}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <IconButton 
                                  size="small"
                                  onClick={() => handleVoteAnswer(question.id, answer.id, 'up')}
                                  color={answer.userVote === 'up' ? 'primary' : 'default'}
                                >
                                  <ThumbUp fontSize="small" />
                                </IconButton>
                                <Typography variant="caption">
                                  {answer.upvotes - answer.downvotes}
                                </Typography>
                                <IconButton 
                                  size="small"
                                  onClick={() => handleVoteAnswer(question.id, answer.id, 'down')}
                                  color={answer.userVote === 'down' ? 'error' : 'default'}
                                >
                                  <ThumbDown fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}
        </CardContent>
        
        <CardActions>
          <Button 
            startIcon={<Reply />}
            onClick={() => {
              setSelectedQuestion(question);
              setOpenAnswerDialog(true);
            }}
          >
            Answer
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom color="info.main">
            Q&A Forum
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Ask questions, share knowledge, get answers from the community
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenAskQuestion(true)}
          size="large"
          color="info"
        >
          Ask Question
        </Button>
      </Box>

      {/* Category Overview */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Categories
        </Typography>
        <Grid container spacing={2}>
          {categories.map(category => (
            <Grid item xs={6} sm={4} md={2} key={category.id}>
              <Card 
                sx={{ 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  '&:hover': { elevation: 4 }
                }}
                onClick={() => setCategoryFilter(category.id)}
              >
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ color: `${category.color}.main`, mb: 1 }}>
                    {category.icon}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {category.label}
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
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="All">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="recent">Most Recent</MenuItem>
                <MenuItem value="unanswered">Unanswered First</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Questions" />
          <Tab label="Solved" />
          <Tab label="Unanswered" />
        </Tabs>
      </Box>

      {/* Questions List */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {sortedQuestions.length > 0 ? (
            sortedQuestions.map(question => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <QuestionAnswer sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No questions found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Be the first to ask a question in this category!
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Ask Question Dialog */}
      <Dialog 
  open={openAskQuestion} 
  onClose={() => setOpenAskQuestion(false)} 
  maxWidth="md" 
  fullWidth
  PaperProps={{
    sx: { minHeight: '60vh' }
  }}
>
  <DialogTitle>
    <Typography variant="h5" component="h2" gutterBottom>
      Ask a Question
    </Typography>
  </DialogTitle>
  
  <DialogContent dividers>
    <Alert severity="info" sx={{ mb: 3 }}>
      Ask clear, specific questions to get better answers. Be respectful and follow community guidelines.
    </Alert>
    
    {/* Question Title */}
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="Question Title"
        placeholder="What's your question?"
        value={newQuestion.title}
        onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
        required
        variant="outlined"
      />
    </Box>
    
    {/* Category and Anonymous Toggle */}
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={8}>
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            value={newQuestion.category}
            label="Category"
            onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          height: '100%',
          minHeight: 56 
        }}>
          <FormControlLabel
            control={
              <Switch
                checked={newQuestion.isAnonymous}
                onChange={(e) => setNewQuestion({...newQuestion, isAnonymous: e.target.checked})}
                color="primary"
              />
            }
            label="Post anonymously"
            sx={{ m: 0 }}
          />
        </Box>
      </Grid>
    </Grid>
    
    {/* Question Details */}
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
        Question Details *
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        placeholder="Provide more details about your question. Include context, what you've tried, and what specific help you need..."
        value={newQuestion.content}
        onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
        required
        variant="outlined"
        helperText={`${newQuestion.content?.length || 0}/2000 characters`}
        inputProps={{ maxLength: 2000 }}
      />
    </Box>
  </DialogContent>
  
  <DialogActions sx={{ p: 3 }}>
    <Button 
      onClick={() => setOpenAskQuestion(false)}
      size="large"
    >
      Cancel
    </Button>
    <Button 
      variant="contained" 
      onClick={handleSubmitQuestion}
      size="large"
      disabled={!newQuestion.title?.trim() || !newQuestion.category || !newQuestion.content?.trim()}
      sx={{ minWidth: 140 }}
    >
      Post Question
    </Button>
  </DialogActions>
</Dialog>

      {/* Answer Dialog */}
      <Dialog open={openAnswerDialog} onClose={() => setOpenAnswerDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Answer: {selectedQuestion?.title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newAnswer.isAnonymous}
                      onChange={(e) => setNewAnswer({...newAnswer, isAnonymous: e.target.checked})}
                    />
                  }
                  label="Answer anonymously"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Your Answer"
                  placeholder="Provide a helpful and detailed answer..."
                  value={newAnswer.content}
                  onChange={(e) => setNewAnswer({...newAnswer, content: e.target.value})}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAnswerDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitAnswer}>
            Post Answer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QAForum;