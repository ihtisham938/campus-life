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
  Paper,
  Tooltip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Badge
} from '@mui/material';
import {
  School,
  Star,
  Assessment,
  Add,
  Search,
  FilterList,
  ThumbUp,
  ThumbDown,
  BookmarkBorder,
  Bookmark,
  ExpandMore,
  MenuBook,
  Assignment,
  Group,
  Schedule,
  TrendingUp,
  BarChart,
  CompareArrows,
  Lightbulb,
  Category
} from '@mui/icons-material';
import { format } from 'date-fns';
import CustomQuestionnaires from './CustomQuestionnaires';
import SyllabusFeedback from './SyllabusFeedback';

const CourseRatings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openRating, setOpenRating] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [programFilter, setProgramFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [savedCourses, setSavedCourses] = useState([]);
  
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      department: 'Computer Science',
      program: 'Bachelor of Computer Science',
      credits: 3,
      instructor: 'Dr. Sarah Johnson',
      semester: 'Fall 2024',
      description: 'Introduction to programming concepts using Python. Covers variables, control structures, functions, and basic data structures.',
      prerequisites: 'None',
      overallRating: 4.3,
      totalRatings: 156,
      ratingsBreakdown: {
        content: 4.2,
        difficulty: 3.8,
        workload: 3.5,
        syllabus: 4.0,
        materials: 4.1,
        assignments: 4.3
      },
      enrollmentStats: {
        enrolled: 120,
        capacity: 150,
        waitlist: 15
      },
      gradeDistribution: {
        'A': 25,
        'B': 35,
        'C': 25,
        'D': 10,
        'F': 5
      },
      recentReviews: [
        {
          id: 1,
          overallRating: 5,
          semester: 'Fall 2024',
          ratings: {
            content: 5,
            difficulty: 4,
            workload: 4,
            syllabus: 5,
            materials: 4,
            assignments: 5
          },
          review: 'Great introductory course! Dr. Johnson explains concepts clearly and the assignments are well-structured.',
          pros: ['Clear explanations', 'Good pace', 'Helpful assignments'],
          cons: ['Could use more practice problems'],
          wouldRecommend: true,
          wouldTakeAgain: true,
          helpful: 18,
          timestamp: new Date('2024-02-10T14:30:00')
        },
        {
          id: 2,
          overallRating: 4,
          semester: 'Spring 2024',
          ratings: {
            content: 4,
            difficulty: 4,
            workload: 3,
            syllabus: 4,
            materials: 4,
            assignments: 4
          },
          review: 'Solid foundation course. Some topics could be covered in more depth.',
          pros: ['Good structure', 'Fair grading'],
          cons: ['Limited depth in some areas'],
          wouldRecommend: true,
          wouldTakeAgain: true,
          helpful: 12,
          timestamp: new Date('2024-01-20T10:15:00')
        }
      ]
    },
    {
      id: 2,
      code: 'MATH201',
      name: 'Calculus II',
      department: 'Mathematics',
      program: 'Bachelor of Science in Mathematics',
      credits: 4,
      instructor: 'Prof. Michael Chen',
      semester: 'Spring 2024',
      description: 'Continuation of Calculus I. Integration techniques, applications of integration, sequences and series.',
      prerequisites: 'MATH101 - Calculus I',
      overallRating: 3.9,
      totalRatings: 89,
      ratingsBreakdown: {
        content: 4.1,
        difficulty: 4.2,
        workload: 4.0,
        syllabus: 3.8,
        materials: 3.7,
        assignments: 3.9
      },
      enrollmentStats: {
        enrolled: 80,
        capacity: 100,
        waitlist: 5
      },
      gradeDistribution: {
        'A': 15,
        'B': 30,
        'C': 35,
        'D': 15,
        'F': 5
      },
      recentReviews: [
        {
          id: 3,
          overallRating: 4,
          semester: 'Fall 2024',
          ratings: {
            content: 4,
            difficulty: 4,
            workload: 4,
            syllabus: 4,
            materials: 3,
            assignments: 4
          },
          review: 'Challenging but rewarding. Professor Chen is very knowledgeable and helpful during office hours.',
          pros: ['Excellent instructor', 'Comprehensive coverage', 'Good support'],
          cons: ['Textbook could be better', 'Fast pace'],
          wouldRecommend: true,
          wouldTakeAgain: true,
          helpful: 25,
          timestamp: new Date('2024-02-08T16:45:00')
        }
      ]
    },
    {
      id: 3,
      code: 'PSY101',
      name: 'Introduction to Psychology',
      department: 'Psychology',
      program: 'Bachelor of Arts in Psychology',
      credits: 3,
      instructor: 'Dr. Emily Rodriguez',
      semester: 'Summer 2024',
      description: 'Survey of major areas in psychology including learning, memory, perception, personality, and social psychology.',
      prerequisites: 'None',
      overallRating: 4.7,
      totalRatings: 203,
      ratingsBreakdown: {
        content: 4.8,
        difficulty: 3.2,
        workload: 3.5,
        syllabus: 4.6,
        materials: 4.5,
        assignments: 4.4
      },
      enrollmentStats: {
        enrolled: 200,
        capacity: 200,
        waitlist: 45
      },
      gradeDistribution: {
        'A': 40,
        'B': 35,
        'C': 20,
        'D': 4,
        'F': 1
      },
      recentReviews: [
        {
          id: 4,
          overallRating: 5,
          semester: 'Fall 2024',
          ratings: {
            content: 5,
            difficulty: 3,
            workload: 3,
            syllabus: 5,
            materials: 5,
            assignments: 5
          },
          review: 'Absolutely loved this course! Dr. Rodriguez makes psychology fascinating and relatable.',
          pros: ['Engaging lectures', 'Great examples', 'Fair exams'],
          cons: ['None really'],
          wouldRecommend: true,
          wouldTakeAgain: true,
          helpful: 42,
          timestamp: new Date('2024-02-12T11:20:00')
        }
      ]
    }
  ]);

  const [newRating, setNewRating] = useState({
    courseId: '',
    semester: '',
    overallRating: 0,
    ratings: {
      content: 0,
      difficulty: 0,
      workload: 0,
      syllabus: 0,
      materials: 0,
      assignments: 0
    },
    review: '',
    pros: [],
    cons: [],
    wouldRecommend: null,
    wouldTakeAgain: null
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleSavedCourse = (courseId) => {
    setSavedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All' || course.department === departmentFilter;
    const matchesSemester = semesterFilter === 'All' || course.semester === semesterFilter;
    const matchesProgram = programFilter === 'All' || course.program === programFilter;
    const matchesCourse = courseFilter === 'All' || course.code === courseFilter;
    
    return matchesSearch && matchesDepartment && matchesSemester && matchesProgram && matchesCourse;
  });

  const departments = ['All', ...new Set(courses.map(c => c.department))];
  const semesters = ['All', ...new Set(courses.map(c => c.semester))];
  const programs = ['All', ...new Set(courses.map(c => c.program))];
  const courseCodes = ['All', ...new Set(courses.map(c => c.code))];

  const CourseCard = ({ course }) => {
    const isSaved = savedCourses.includes(course.id);
    const enrollmentPercentage = (course.enrollmentStats.enrolled / course.enrollmentStats.capacity) * 100;
    
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="h6">
                  {course.code} - {course.name}
                </Typography>
                <Chip label={`${course.credits} Credits`} size="small" color="primary" variant="outlined" />
              </Box>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {course.department} • {course.instructor} • {course.semester}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Rating value={course.overallRating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  {course.overallRating} ({course.totalRatings} ratings)
                </Typography>
              </Box>
              
              <Typography variant="body2" paragraph>
                {course.description}
              </Typography>
              
              {course.prerequisites && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Prerequisites:</strong> {course.prerequisites}
                </Typography>
              )}
            </Box>
            
            <IconButton onClick={() => toggleSavedCourse(course.id)} color="primary">
              {isSaved ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          </Box>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle2">Detailed Ratings & Statistics</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle2" gutterBottom>Rating Breakdown</Typography>
                  <Grid container spacing={2}>
                    {Object.entries(course.ratingsBreakdown).map(([category, rating]) => (
                      <Grid item xs={6} sm={4} key={category}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" color="primary">
                            {rating}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                            {category}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" gutterBottom>Enrollment</Typography>
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2">Capacity</Typography>
                      <Typography variant="body2">{course.enrollmentStats.enrolled}/{course.enrollmentStats.capacity}</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={enrollmentPercentage}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  {course.enrollmentStats.waitlist > 0 && (
                    <Typography variant="body2" color="warning.main">
                      Waitlist: {course.enrollmentStats.waitlist}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {course.recentReviews.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Recent Reviews:
              </Typography>
              {course.recentReviews.slice(0, 2).map(review => (
                <Paper key={review.id} sx={{ p: 2, mb: 2, backgroundColor: '#f9f9f9' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box>
                      <Rating value={review.overallRating} readOnly size="small" />
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        {review.semester}
                      </Typography>
                    </Box>
                    <Button size="small" startIcon={<ThumbUp />}>
                      Helpful ({review.helpful})
                    </Button>
                  </Box>
                  <Typography variant="body2" paragraph>
                    {review.review}
                  </Typography>
                  
                  {review.pros.length > 0 && (
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" color="success.main" sx={{ fontWeight: 'bold' }}>
                        Pros: 
                      </Typography>
                      <Typography variant="caption">
                        {review.pros.join(', ')}
                      </Typography>
                    </Box>
                  )}
                  
                  {review.cons.length > 0 && (
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" color="warning.main" sx={{ fontWeight: 'bold' }}>
                        Cons: 
                      </Typography>
                      <Typography variant="caption">
                        {review.cons.join(', ')}
                      </Typography>
                    </Box>
                  )}
                  
                  <Typography variant="caption" color="text.secondary">
                    {format(review.timestamp, 'MMM dd, yyyy')}
                    {review.wouldRecommend && ' • Would recommend'}
                    {review.wouldTakeAgain && ' • Would take again'}
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}
        </CardContent>
        
        <CardActions>
          <Button
            startIcon={<Star />}
            onClick={() => {
              setSelectedCourse(course);
              setNewRating(prev => ({ ...prev, courseId: course.id }));
              setOpenRating(true);
            }}
            variant="contained"
            color="success"
          >
            Rate Course
          </Button>
          <Button startIcon={<Assessment />}>
            View Analytics
          </Button>
          <Button startIcon={<CompareArrows />}>
            Compare
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom color="success.main">
            Course Ratings & Reviews
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Comprehensive course evaluation system
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Badge badgeContent={savedCourses.length} color="primary">
            <Chip icon={<Bookmark />} label="Saved" color="primary" variant="outlined" />
          </Badge>
          <Chip icon={<BarChart />} label="Analytics" color="info" variant="outlined" />
          <Chip icon={<TrendingUp />} label="Trending" color="success" variant="outlined" />
        </Box>
      </Box>

      {/* Navigation Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Course Ratings" />
          <Tab label="Syllabus Feedback" />
          <Tab label="Custom Questionnaires" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search courses, instructors, or course codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                value={departmentFilter}
                label="Department"
                onChange={(e) => setDepartmentFilter(e.target.value)}
                sx={{ minWidth: '150px' }}
              >
                {departments.map(dept => (
                  <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Semester</InputLabel>
              <Select
                value={semesterFilter}
                label="Semester"
                onChange={(e) => setSemesterFilter(e.target.value)}
                sx={{ minWidth: '140px' }}
              >
                {semesters.map(sem => (
                  <MenuItem key={sem} value={sem}>{sem}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Program</InputLabel>
              <Select
                value={programFilter}
                label="Program"
                onChange={(e) => setProgramFilter(e.target.value)}
                sx={{ minWidth: '160px' }}
              >
                {programs.map(prog => (
                  <MenuItem key={prog} value={prog}>
                    {prog.length > 25 ? `${prog.substring(0, 25)}...` : prog}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                value={courseFilter}
                label="Course"
                onChange={(e) => setCourseFilter(e.target.value)}
                sx={{ minWidth: '120px' }}
              >
                {courseCodes.map(code => (
                  <MenuItem key={code} value={code}>{code}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Alert severity="success" sx={{ height: '56px', display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2">
                {filteredCourses.length} courses
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Search sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No courses found matching your criteria
                </Typography>
                <Button onClick={() => { 
                  setSearchTerm(''); 
                  setDepartmentFilter('All'); 
                  setSemesterFilter('All');
                  setProgramFilter('All');
                  setCourseFilter('All');
                }} sx={{ mt: 2 }}>
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Course Rating Dialog */}
      <Dialog 
  open={openRating} 
  onClose={() => setOpenRating(false)} 
  maxWidth="md" 
  fullWidth
  PaperProps={{
    sx: { minHeight: '80vh' }
  }}
>
  <DialogTitle>
    <Typography variant="h5" component="h2" gutterBottom>
      Rate {selectedCourse?.code} - {selectedCourse?.name}
    </Typography>
  </DialogTitle>
  
  <DialogContent dividers>
    <Alert severity="info" sx={{ mb: 3 }}>
      Your honest feedback helps other students make informed course selections and helps improve the curriculum.
    </Alert>
    
    {/* Semester and Overall Rating */}
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Semester Taken</InputLabel>
          <Select
            value={newRating.semester}
            label="Semester Taken"
            onChange={(e) => setNewRating({...newRating, semester: e.target.value})}
            sx={{ minWidth: '200px' }}
          >
            <MenuItem value="Fall 2024">Fall 2024</MenuItem>
            <MenuItem value="Spring 2024">Spring 2024</MenuItem>
            <MenuItem value="Summer 2024">Summer 2024</MenuItem>
            <MenuItem value="Fall 2023">Fall 2023</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Overall Rating *
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Rating
            value={newRating.overallRating}
            onChange={(event, newValue) => setNewRating({...newRating, overallRating: newValue})}
            size="large"
            sx={{ fontSize: '2rem' }}
          />
          <Typography variant="body1" color="text.secondary">
            {newRating.overallRating > 0 ? `${newRating.overallRating} star${newRating.overallRating !== 1 ? 's' : ''}` : 'Not rated'}
          </Typography>
        </Box>
      </Grid>
    </Grid>
    
    {/* Detailed Ratings */}
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Detailed Ratings
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(newRating.ratings).map(([category, rating]) => (
          <Grid item xs={6} md={2} key={category}>
            <Paper sx={{ 
              p: 2, 
              textAlign: 'center',
              backgroundColor: 'grey.50',
              border: '1px solid',
              borderColor: 'divider',
              minHeight: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Typography variant="caption" sx={{ 
                textTransform: 'capitalize', 
                fontWeight: 600,
                mb: 1.5,
                lineHeight: 1.2
              }}>
                {category === 'syllabus' ? 'Syllabus Quality' : category}
              </Typography>
              <Rating
                value={rating}
                onChange={(event, newValue) => setNewRating({
                  ...newRating,
                  ratings: { ...newRating.ratings, [category]: newValue || 0 }
                })}
                size="small"
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
    
    {/* Course Review */}
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Course Review *
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Share your experience with this course. Discuss content quality, teaching effectiveness, assignments, and overall value..."
        value={newRating.review}
        onChange={(e) => setNewRating({...newRating, review: e.target.value})}
        helperText={`${newRating.review.length}/1000 characters`}
        inputProps={{ maxLength: 1000 }}
        variant="outlined"
        required
      />
    </Box>
    
    {/* Pros and Cons */}
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          Pros
        </Typography>
        <TextField
          fullWidth
          placeholder="Clear explanations, good materials, fair grading..."
          onChange={(e) => setNewRating({...newRating, pros: e.target.value.split(',').map(p => p.trim()).filter(p => p)})}
          helperText="Separate multiple points with commas"
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          Cons
        </Typography>
        <TextField
          fullWidth
          placeholder="Heavy workload, unclear instructions..."
          onChange={(e) => setNewRating({...newRating, cons: e.target.value.split(',').map(c => c.trim()).filter(c => c)})}
          helperText="Separate multiple points with commas"
        />
      </Grid>
    </Grid>
    
    {/* Recommendation Questions */}
    <Grid container spacing={3} sx={{ mb: 2 }}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Would you recommend this course?</InputLabel>
          <Select
            value={newRating.wouldRecommend !== null ? newRating.wouldRecommend : ''}
            label="Would you recommend this course?"
            onChange={(e) => setNewRating({...newRating, wouldRecommend: e.target.value})}
            sx={{ minWidth: '300px' }}
          >
            <MenuItem value={true}>Yes, I would recommend</MenuItem>
            <MenuItem value={false}>No, I would not recommend</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Would you take it again?</InputLabel>
          <Select
            value={newRating.wouldTakeAgain !== null ? newRating.wouldTakeAgain : ''}
            label="Would you take it again?"
            onChange={(e) => setNewRating({...newRating, wouldTakeAgain: e.target.value})}
            sx={{ minWidth: '280px' }}
          >
            <MenuItem value={true}>Yes, I would take it again</MenuItem>
            <MenuItem value={false}>No, I would not take it again</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  </DialogContent>
  
  <DialogActions sx={{ p: 3 }}>
    <Button 
      onClick={() => setOpenRating(false)}
      size="large"
    >
      Cancel
    </Button>
    <Button 
      variant="contained" 
      color="success"
      size="large"
      disabled={!newRating.overallRating || !newRating.semester || !newRating.review.trim()}
      sx={{ minWidth: 140 }}
    >
      Submit Rating
    </Button>
  </DialogActions>
</Dialog>
        </Box>
      )}

      {/* Syllabus Feedback Tab */}
      {tabValue === 1 && <SyllabusFeedback />}

      {/* Custom Questionnaires Tab */}
      {tabValue === 2 && <CustomQuestionnaires />}
    </Box>
  );
};

export default CourseRatings;