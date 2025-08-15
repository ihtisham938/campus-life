import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Chip
} from '@mui/material';
import { QuestionAnswer, Forum, People } from '@mui/icons-material';

const QAForum = () => {
  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <QuestionAnswer sx={{ fontSize: 60, color: 'info.main', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom color="info.main">
          Q&A Platform
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discussion forum for students and faculty collaboration
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Key Features:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          <Chip icon={<QuestionAnswer />} label="Q&A System" color="info" />
          <Chip icon={<Forum />} label="Discussion Forum" color="primary" />
          <Chip icon={<People />} label="Community Driven" color="secondary" />
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Coming Soon
          </Typography>
          <Typography variant="body1" paragraph>
            This platform will provide:
          </Typography>
          <ul>
            <li>Interactive question and answer system</li>
            <li>Category-based discussion forums</li>
            <li>Faculty and student interaction</li>
            <li>Upvoting and reputation system</li>
            <li>Search and filtering capabilities</li>
            <li>Real-time notifications</li>
          </ul>
          <Button variant="contained" color="info" sx={{ mt: 2 }}>
            Get Notified When Ready
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QAForum;