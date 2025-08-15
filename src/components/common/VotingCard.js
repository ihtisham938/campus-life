import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  LinearProgress,
  Box,
  Chip,
  Alert
} from '@mui/material';
import {
  ThumbUp,
  ThumbDown,
  Warning,
  CheckCircle
} from '@mui/icons-material';

const VotingCard = ({ 
  title, 
  description, 
  votes, 
  onVote, 
  hasConflict = false, 
  conflictReason = '', 
  status = 'active',
  showResults = true 
}) => {
  const totalVotes = votes.yes + votes.no;
  const approvalRate = totalVotes > 0 ? Math.round((votes.yes / totalVotes) * 100) : 0;

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'primary';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card sx={{ 
      mb: 2, 
      border: hasConflict ? '2px solid #f57c00' : 'none',
      position: 'relative'
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Chip 
            label={status} 
            color={getStatusColor(status)}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>

        {hasConflict && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Warning />
              <Typography variant="body2">
                <strong>Schedule Conflict:</strong> {conflictReason}
              </Typography>
            </Box>
          </Alert>
        )}

        {showResults && totalVotes > 0 && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2">
                Voting Progress
              </Typography>
              <Typography variant="body2" color="primary">
                {approvalRate}% approval
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={approvalRate}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption">
                👍 {votes.yes} votes
              </Typography>
              <Typography variant="caption">
                👎 {votes.no} votes
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>

      {status === 'active' && onVote && (
        <CardActions>
          <Button
            startIcon={<ThumbUp />}
            onClick={() => onVote('yes')}
            color="success"
            size="small"
          >
            Support
          </Button>
          <Button
            startIcon={<ThumbDown />}
            onClick={() => onVote('no')}
            color="error"
            size="small"
          >
            Oppose
          </Button>
        </CardActions>
      )}

      {status === 'approved' && (
        <CardActions>
          <CheckCircle color="success" sx={{ mr: 1 }} />
          <Typography variant="body2" color="success.main">
            Event Approved
          </Typography>
        </CardActions>
      )}
    </Card>
  );
};

export default VotingCard;