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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Chip,
  Alert
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  QuestionAnswer,
  Assignment,
  Preview,
  Save,
  Cancel
} from '@mui/icons-material';
import Swal from 'sweetalert2';

const CustomQuestionnaires = () => {
  const [questionnaires, setQuestionnaires] = useState([
    {
      id: 1,
      title: 'CS101 Programming Fundamentals Assessment',
      course: 'CS101',
      department: 'Computer Science',
      createdBy: 'Dr. Sarah Johnson',
      status: 'active',
      questions: [
        {
          id: 1,
          type: 'rating',
          question: 'How well did the programming exercises help you understand the concepts?',
          required: true
        },
        {
          id: 2,
          type: 'text',
          question: 'What programming topics would you like more practice with?',
          required: false
        },
        {
          id: 3,
          type: 'rating',
          question: 'How appropriate was the pace of introducing new concepts?',
          required: true
        }
      ],
      responses: 24
    },
    {
      id: 2,
      title: 'Mathematics Course Delivery Feedback',
      course: 'MATH201',
      department: 'Mathematics',
      createdBy: 'Prof. Michael Chen',
      status: 'draft',
      questions: [
        {
          id: 1,
          type: 'rating',
          question: 'Rate the effectiveness of problem-solving sessions',
          required: true
        },
        {
          id: 2,
          type: 'choice',
          question: 'Which teaching method helped you most?',
          options: ['Lectures', 'Tutorials', 'Online resources', 'Group work'],
          required: true
        }
      ],
      responses: 0
    }
  ]);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
  const [newQuestionnaire, setNewQuestionnaire] = useState({
    title: '',
    course: '',
    department: '',
    questions: []
  });
  const [newQuestion, setNewQuestion] = useState({
    type: 'rating',
    question: '',
    required: true,
    options: []
  });

  const handleCreateQuestionnaire = () => {
    if (!newQuestionnaire.title || !newQuestionnaire.course) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please fill in the title and course.',
        icon: 'warning'
      });
      return;
    }

    const questionnaire = {
      id: questionnaires.length + 1,
      ...newQuestionnaire,
      createdBy: 'Current User',
      status: 'draft',
      responses: 0
    };

    setQuestionnaires([...questionnaires, questionnaire]);
    setNewQuestionnaire({ title: '', course: '', department: '', questions: [] });
    setOpenCreate(false);

    Swal.fire({
      title: 'Questionnaire Created!',
      text: 'Your custom questionnaire has been saved as draft.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      timerProgressBar: true
    });
  };

  const handleAddQuestion = () => {
    if (!newQuestion.question) return;

    const question = {
      id: newQuestionnaire.questions.length + 1,
      ...newQuestion
    };

    setNewQuestionnaire({
      ...newQuestionnaire,
      questions: [...newQuestionnaire.questions, question]
    });

    setNewQuestion({
      type: 'rating',
      question: '',
      required: true,
      options: []
    });
  };

  const handleDeleteQuestion = (questionId) => {
    setNewQuestionnaire({
      ...newQuestionnaire,
      questions: newQuestionnaire.questions.filter(q => q.id !== questionId)
    });
  };

  const handleActivateQuestionnaire = (id) => {
    setQuestionnaires(questionnaires.map(q => 
      q.id === id ? { ...q, status: 'active' } : q
    ));
    
    Swal.fire({
      title: 'Questionnaire Activated!',
      text: 'Students can now respond to this questionnaire.',
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
      case 'active': return 'success';
      case 'draft': return 'warning';
      case 'closed': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Custom Course Questionnaires
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Create targeted feedback forms for specific courses
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCreate(true)}
          size="large"
        >
          Create Questionnaire
        </Button>
      </Box>

      <Grid container spacing={3}>
        {questionnaires.map(questionnaire => (
          <Grid item xs={12} md={6} key={questionnaire.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {questionnaire.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {questionnaire.course} • {questionnaire.department}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created by {questionnaire.createdBy}
                    </Typography>
                  </Box>
                  <Chip 
                    label={questionnaire.status} 
                    color={getStatusColor(questionnaire.status)}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {questionnaire.questions.length} questions • {questionnaire.responses} responses
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button
                    size="small"
                    startIcon={<Preview />}
                    onClick={() => {
                      setSelectedQuestionnaire(questionnaire);
                      setOpenEdit(true);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    disabled={questionnaire.status === 'active'}
                  >
                    Edit
                  </Button>
                  {questionnaire.status === 'draft' && (
                    <Button
                      size="small"
                      color="success"
                      onClick={() => handleActivateQuestionnaire(questionnaire.id)}
                    >
                      Activate
                    </Button>
                  )}
                  <Button
                    size="small"
                    startIcon={<Assignment />}
                    disabled={questionnaire.responses === 0}
                  >
                    Results ({questionnaire.responses})
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Questionnaire Dialog */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Custom Questionnaire</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Questionnaire Title"
                  value={newQuestionnaire.title}
                  onChange={(e) => setNewQuestionnaire({...newQuestionnaire, title: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Course Code"
                  placeholder="e.g., CS101"
                  value={newQuestionnaire.course}
                  onChange={(e) => setNewQuestionnaire({...newQuestionnaire, course: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Department"
                  value={newQuestionnaire.department}
                  onChange={(e) => setNewQuestionnaire({...newQuestionnaire, department: e.target.value})}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Questions ({newQuestionnaire.questions.length})
            </Typography>

            {newQuestionnaire.questions.length > 0 && (
              <List>
                {newQuestionnaire.questions.map((question, index) => (
                  <ListItem key={question.id} sx={{ border: 1, borderColor: 'divider', borderRadius: 1, mb: 1 }}>
                    <ListItemText
                      primary={`${index + 1}. ${question.question}`}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip label={question.type} size="small" />
                          {question.required && <Chip label="Required" size="small" color="error" />}
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleDeleteQuestion(question.id)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}

            <Paper sx={{ p: 2, mt: 2, backgroundColor: 'grey.50' }}>
              <Typography variant="subtitle2" gutterBottom>
                Add New Question
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={newQuestion.type}
                      label="Type"
                      onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value})}
                    >
                      <MenuItem value="rating">5-Star Rating</MenuItem>
                      <MenuItem value="text">Text Response</MenuItem>
                      <MenuItem value="choice">Multiple Choice</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    fullWidth
                    label="Question"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                    placeholder="Enter your question here..."
                  />
                </Grid>
                {newQuestion.type === 'choice' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Options (comma separated)"
                      placeholder="Option 1, Option 2, Option 3"
                      onChange={(e) => setNewQuestion({
                        ...newQuestion, 
                        options: e.target.value.split(',').map(opt => opt.trim()).filter(opt => opt)
                      })}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                      variant="outlined"
                      onClick={() => setNewQuestion({...newQuestion, required: !newQuestion.required})}
                      color={newQuestion.required ? 'error' : 'success'}
                    >
                      {newQuestion.required ? 'Required' : 'Optional'}
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleAddQuestion}
                      disabled={!newQuestion.question}
                    >
                      Add Question
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleCreateQuestionnaire}
            disabled={newQuestionnaire.questions.length === 0}
          >
            Create Questionnaire
          </Button>
        </DialogActions>
      </Dialog>

      {/* View/Edit Questionnaire Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedQuestionnaire?.title}
        </DialogTitle>
        <DialogContent>
          {selectedQuestionnaire && (
            <Box sx={{ pt: 2 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                <strong>Course:</strong> {selectedQuestionnaire.course} • 
                <strong> Department:</strong> {selectedQuestionnaire.department} • 
                <strong> Status:</strong> {selectedQuestionnaire.status} •
                <strong> Responses:</strong> {selectedQuestionnaire.responses}
              </Alert>
              
              <Typography variant="h6" gutterBottom>
                Questions ({selectedQuestionnaire.questions.length})
              </Typography>
              
              <List>
                {selectedQuestionnaire.questions.map((question, index) => (
                  <ListItem key={question.id} sx={{ border: 1, borderColor: 'divider', borderRadius: 1, mb: 1 }}>
                    <ListItemText
                      primary={`${index + 1}. ${question.question}`}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip label={question.type} size="small" />
                          {question.required && <Chip label="Required" size="small" color="error" />}
                          {question.options && (
                            <Chip label={`${question.options.length} options`} size="small" variant="outlined" />
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomQuestionnaires;