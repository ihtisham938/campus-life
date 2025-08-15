import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';
import CssBaseline from '@mui/material/CssBaseline';
import './styles/animations.css';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import EventVoting from './pages/events/EventVoting';
import TeacherReviews from './pages/reviews/TeacherReviews';
import TeacherDashboard from './pages/reviews/TeacherDashboard';
import CourseRatings from './pages/courses/CourseRatings';
import StudentElections from './pages/elections/StudentElections';
import QAForum from './pages/qa/QAForum';
import ServicesFeedback from './pages/feedback/ServicesFeedback';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventVoting />} />
          <Route path="/reviews" element={<TeacherReviews />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/courses" element={<CourseRatings />} />
          <Route path="/elections" element={<StudentElections />} />
          <Route path="/qa" element={<QAForum />} />
          <Route path="/feedback" element={<ServicesFeedback />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
