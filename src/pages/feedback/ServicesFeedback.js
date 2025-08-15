import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Chip
} from '@mui/material';
import { Feedback, Restaurant, MenuBook, Science } from '@mui/icons-material';

const ServicesFeedback = () => {
  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Feedback sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom color="error.main">
          Services Feedback
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Integrated feedback system for campus facilities and services
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Key Features:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          <Chip icon={<Restaurant />} label="Cafeteria Feedback" color="error" />
          <Chip icon={<MenuBook />} label="Library Services" color="primary" />
          <Chip icon={<Science />} label="Labs & Classrooms" color="secondary" />
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Coming Soon
          </Typography>
          <Typography variant="body1" paragraph>
            This comprehensive feedback system will cover:
          </Typography>
          <ul>
            <li>Cafeteria food quality and service</li>
            <li>Library facilities and resources</li>
            <li>Classroom and laboratory conditions</li>
            <li>Campus maintenance issues</li>
            <li>Transportation services</li>
            <li>Administrative services feedback</li>
          </ul>
          <Button variant="contained" color="error" sx={{ mt: 2 }}>
            Get Notified When Ready
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ServicesFeedback;