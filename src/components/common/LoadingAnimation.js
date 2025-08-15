import React from 'react';
import { Box, CircularProgress, Skeleton, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export const LoadingSpinner = ({ size = 40, color = 'primary' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px'
      }}
    >
      <CircularProgress 
        size={size} 
        color={color}
        sx={{
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              opacity: 1,
            },
            '50%': {
              opacity: 0.5,
            },
            '100%': {
              opacity: 1,
            },
          },
        }}
      />
    </Box>
  </motion.div>
);

export const CardSkeleton = ({ count = 3 }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
    {Array.from({ length: count }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        style={{ flex: '1 1 300px' }}
      >
        <Card
          sx={{
            height: '100%',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Skeleton 
                variant="circular" 
                width={56} 
                height={56} 
                sx={{ mx: 'auto', mb: 2 }}
                animation="wave"
              />
            </Box>
            <Skeleton 
              variant="text" 
              height={32} 
              width="80%" 
              sx={{ mx: 'auto', mb: 2 }}
              animation="wave"
            />
            <Skeleton 
              variant="text" 
              height={20} 
              width="60%" 
              sx={{ mx: 'auto', mb: 1 }}
              animation="wave"
            />
            <Skeleton 
              variant="text" 
              height={20} 
              width="90%" 
              sx={{ mx: 'auto', mb: 3 }}
              animation="wave"
            />
            <Skeleton 
              variant="rounded" 
              height={36} 
              width={120} 
              sx={{ mx: 'auto' }}
              animation="wave"
            />
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </Box>
);

export const ListSkeleton = ({ count = 5 }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {Array.from({ length: count }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        <Card
          sx={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            borderRadius: 2,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <Skeleton 
              variant="circular" 
              width={48} 
              height={48} 
              sx={{ mr: 2 }}
              animation="wave"
            />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton 
                variant="text" 
                height={24} 
                width="70%" 
                sx={{ mb: 1 }}
                animation="wave"
              />
              <Skeleton 
                variant="text" 
                height={16} 
                width="50%" 
                animation="wave"
              />
            </Box>
            <Skeleton 
              variant="rounded" 
              height={32} 
              width={80} 
              animation="wave"
            />
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </Box>
);

export const PulseDot = ({ delay = 0 }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: [0, 1, 0] }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    style={{
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: '#1976d2',
      margin: '0 2px'
    }}
  />
);

export const TypingIndicator = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
    <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
      Loading
    </Typography>
    <PulseDot delay={0} />
    <PulseDot delay={0.2} />
    <PulseDot delay={0.4} />
  </Box>
);

export const FadeInUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.6, 
      delay,
      ease: "easeOut"
    }}
  >
    {children}
  </motion.div>
);

export const SlideInLeft = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ 
      duration: 0.6, 
      delay,
      ease: "easeOut"
    }}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      duration: 0.5, 
      delay,
      ease: "easeOut"
    }}
  >
    {children}
  </motion.div>
);