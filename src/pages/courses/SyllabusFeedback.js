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
  Rating,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  Description,
  Add,
  Search,
  FilterList,
  Assignment,
  CheckCircle,
  Warning,
  TrendingUp
} from '@mui/icons-material';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const SyllabusFeedback = () => {
  const [openFeedback, setOpenFeedback] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const [courses, setCourses] = useState([
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      department: 'Computer Science',
      instructor: 'Dr. Sarah Johnson',
      semester: 'Fall 2024',
      syllabusRating: 4.2,
      totalFeedback: 45,
      feedbackBreakdown: {
        clarity: 4.3,
        organization: 4.1,
        expectations: 4.4,
        relevance: 4.0,
        completeness: 3.9,
        accessibility: 4.2
      },
      recentFeedback: [
        {
          id: 1,
          ratings: {
            clarity: 5,
            organization: 4,
            expectations: 5,
            relevance: 4,
            completeness: 4,
            accessibility: 5
          },
          feedback: 'The syllabus clearly outlines all course objectives and expectations. Love the weekly breakdown of topics.',
          suggestions: 'Could include more details about the final project requirements.',
          timestamp: new Date('2024-02-10T14:30:00')
        },
        {
          id: 2,
          ratings: {
            clarity: 4,
            organization: 4,
            expectations: 3,
            relevance: 4,
            completeness: 3,
            accessibility: 4
          },
          feedback: 'Good structure overall, but some assignment descriptions are vague.',
          suggestions: 'Add more specific rubrics for each assignment.',
          timestamp: new Date('2024-02-08T10:15:00')
        }
      ]
    },
    {
      id: 2,
      code: 'MATH201',
      name: 'Calculus II',
      department: 'Mathematics',
      instructor: 'Prof. Michael Chen',
      semester: 'Spring 2024',
      syllabusRating: 3.8,
      totalFeedback: 32,
      feedbackBreakdown: {
        clarity: 3.9,
        organization: 3.7,
        expectations: 3.8,
        relevance: 4.0,
        completeness: 3.6,
        accessibility: 3.8
      },
      recentFeedback: []
    },
    {
      id: 3,
      code: 'PSY101',
      name: 'Introduction to Psychology',
      department: 'Psychology',
      instructor: 'Dr. Emily Rodriguez',
      semester: 'Summer 2024',
      syllabusRating: 4.6,
      totalFeedback: 28,
      feedbackBreakdown: {
        clarity: 4.7,
        organization: 4.5,
        expectations: 4.6,
        relevance: 4.8,
        completeness: 4.4,
        accessibility: 4.6
      },
      recentFeedback: []
    }
  ]);

  const [newFeedback, setNewFeedback] = useState({
    ratings: {
      clarity: 0,
      organization: 0,
      expectations: 0,
      relevance: 0,
      completeness: 0,
      accessibility: 0
    },
    feedback: '',
    suggestions: ''
  });

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All' || course.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = ['All', ...new Set(courses.map(c => c.department))];

  const handleSubmitFeedback = () => {
    const feedback = {
      id: Date.now(),
      ...newFeedback,
      timestamp: new Date()
    };

    // Update course with new feedback
    setCourses(courses.map(course => 
      course.id === selectedCourse.id
        ? {
            ...course,
            totalFeedback: course.totalFeedback + 1,
            recentFeedback: [...course.recentFeedback, feedback]
          }
        : course
    ));

    // Reset form
    setNewFeedback({
      ratings: {
        clarity: 0,
        organization: 0,
        expectations: 0,
        relevance: 0,
        completeness: 0,
        accessibility: 0
      },
      feedback: '',
      suggestions: ''
    });

    setOpenFeedback(false);
    setSelectedCourse(null);

    Swal.fire({
      title: 'Syllabus Feedback Submitted!',
      text: 'Thank you for helping improve the course syllabus.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      timerProgressBar: true
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'success';
    if (rating >= 4.0) return 'primary';
    if (rating >= 3.5) return 'warning';
    return 'error';
  };

  const ratingCategories = [
    { key: 'clarity', label: 'Clarity of Objectives', description: 'Course goals and learning outcomes are clear' },
    { key: 'organization', label: 'Organization', description: 'Content is well-structured and logical' },
    { key: 'expectations', label: 'Clear Expectations', description: 'Requirements and grading criteria are explicit' },
    { key: 'relevance', label: 'Content Relevance', description: 'Topics are relevant to course objectives' },
    { key: 'completeness', label: 'Completeness', description: 'All necessary information is included' },
    { key: 'accessibility', label: 'Accessibility', description: 'Syllabus is easy to understand and navigate' }
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Syllabus Feedback System
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Provide targeted feedback on course syllabi
          </Typography>
        </Box>
      </Box>

      {/* Search and Filter */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search courses, instructors..."
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
                {filteredCourses.length} syllabi available
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </Paper>

      {/* Course Cards */}
      <Grid container spacing={3}>
        {filteredCourses.map(course => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {course.code} - {course.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.instructor} • {course.department}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.semester}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color={`${getRatingColor(course.syllabusRating)}.main`}>
                      {course.syllabusRating}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Syllabus Rating
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Feedback Breakdown:
                  </Typography>
                  <Grid container spacing={1}>
                    {Object.entries(course.feedbackBreakdown).map(([category, rating]) => (
                      <Grid item xs={6} key={category}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" sx={{ minWidth: '80px', textTransform: 'capitalize' }}>
                            {category}:
                          </Typography>
                          <Rating value={rating} readOnly size="small" precision={0.1} />
                          <Typography variant="caption" color="text.secondary">
                            {rating}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {course.totalFeedback} feedback responses
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Add />}
                    onClick={() => {
                      setSelectedCourse(course);
                      setOpenFeedback(true);
                    }}
                  >
                    Give Feedback
                  </Button>
                </Box>

                {/* Recent Feedback Preview */}
                {course.recentFeedback.length > 0 && (
                  <Box sx={{ mt: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Recent Feedback:
                    </Typography>
                    {course.recentFeedback.slice(0, 2).map(feedback => (
                      <Box key={feedback.id} sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                          "{feedback.feedback}"
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {format(feedback.timestamp, 'MMM dd, yyyy')}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Feedback Dialog */}
      <Dialog open={openFeedback} onClose={() => setOpenFeedback(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Syllabus Feedback: {selectedCourse?.code} - {selectedCourse?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              Please rate each aspect of the course syllabus and provide specific feedback to help improve it.
            </Alert>

            <Typography variant="h6" gutterBottom>
              Rate Each Aspect:
            </Typography>

            <Grid container spacing={2}>
              {ratingCategories.map(category => (
                <Grid item xs={12} key={category.key}>
                  <Paper sx={{ p: 2, backgroundColor: 'grey.50' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          {category.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {category.description}
                        </Typography>
                      </Box>
                      <Rating
                        value={newFeedback.ratings[category.key]}
                        onChange={(event, newValue) => {
                          setNewFeedback({
                            ...newFeedback,
                            ratings: {
                              ...newFeedback.ratings,
                              [category.key]: newValue || 0
                            }
                          });
                        }}
                        size="large"
                      />
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Written Feedback:
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="General Feedback"
                  placeholder="What works well in this syllabus? What could be improved?"
                  value={newFeedback.feedback}
                  onChange={(e) => setNewFeedback({...newFeedback, feedback: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Specific Suggestions"
                  placeholder="What specific changes would you suggest for this syllabus?"
                  value={newFeedback.suggestions}
                  onChange={(e) => setNewFeedback({...newFeedback, suggestions: e.target.value})}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFeedback(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmitFeedback}
            disabled={Object.values(newFeedback.ratings).every(rating => rating === 0)}
          >
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SyllabusFeedback;