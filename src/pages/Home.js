import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  Fade,
  Grow
} from '@mui/material';
import {
  Event,
  RateReview,
  School,
  HowToVote,
  QuestionAnswer,
  Feedback
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Event Voting',
      description: 'Vote on university events, detect schedule conflicts, and provide feedback',
      icon: <Event fontSize="large" color="primary" />,
      path: '/events',
      color: '#1976d2'
    },
    {
      title: 'Teacher Reviews',
      description: 'Moderated review system for constructive feedback on faculty',
      icon: <RateReview fontSize="large" color="secondary" />,
      path: '/reviews',
      color: '#9c27b0'
    },
    {
      title: 'Course Ratings',
      description: 'Rate courses, syllabi, and faculty performance',
      icon: <School fontSize="large" color="success" />,
      path: '/courses',
      color: '#2e7d32'
    },
    {
      title: 'Student Council Elections',
      description: 'Web-based voting system with real-time result tracking',
      icon: <HowToVote fontSize="large" color="warning" />,
      path: '/elections',
      color: '#ed6c02'
    },
    {
      title: 'Q&A Platform',
      description: 'Discussion forum for questions and answers between students and faculty',
      icon: <QuestionAnswer fontSize="large" color="info" />,
      path: '/qa',
      color: '#0288d1'
    },
    {
      title: 'Services Feedback',
      description: 'Integrated feedback system for cafeteria, classrooms, library and more',
      icon: <Feedback fontSize="large" color="error" />,
      path: '/feedback',
      color: '#d32f2f'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            color="primary"
            sx={{
              background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 'bold'
            }}
          >
            Academic & Campus Life Enhancement Platform
          </Typography>
          <Fade in={true} timeout={1000}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Empowering students and faculty through digital collaboration
            </Typography>
          </Fade>
          <Grow in={true} timeout={1200}>
            <Chip
              label="University Platform"
              color="primary"
              variant="outlined"
              sx={{ 
                fontSize: '1rem', 
                py: 2,
                background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)',
                border: '2px solid transparent',
                backgroundClip: 'padding-box'
              }}
            />
          </Grow>
        </Box>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <motion.div
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px rgba(0, 0, 0, 0.15)`,
                      '&::before': {
                        opacity: 1
                      }
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -10, 10, -5, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      <Box sx={{ textAlign: 'center', mb: 2 }}>
                        {feature.icon}
                      </Box>
                    </motion.div>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      gutterBottom 
                      align="center"
                      sx={{
                        fontWeight: 'bold',
                        color: feature.color,
                        mb: 2
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      align="center"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 3, px: 3 }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => navigate(feature.path)}
                        sx={{
                          background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
                          borderRadius: 2,
                          px: 4,
                          py: 1.5,
                          textTransform: 'none',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          boxShadow: `0 4px 20px ${feature.color}40`,
                          '&:hover': {
                            background: `linear-gradient(135deg, ${feature.color}ee 0%, ${feature.color} 100%)`,
                            boxShadow: `0 6px 25px ${feature.color}60`,
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        Explore
                      </Button>
                    </motion.div>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Home;