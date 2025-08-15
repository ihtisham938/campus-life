import React, { useState, useEffect } from 'react';
import { Fab, Zoom, Tooltip, Box } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ScrollToTopFAB = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000
      }}
    >
      <Zoom in={showScroll}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Tooltip title="Scroll to top" placement="left">
            <Fab
              color="primary"
              size="medium"
              onClick={scrollTop}
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0 0%, #7b1fa2 100%)',
                  boxShadow: '0 12px 32px rgba(25, 118, 210, 0.4)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <KeyboardArrowUp />
            </Fab>
          </Tooltip>
        </motion.div>
      </Zoom>
    </Box>
  );
};

export default ScrollToTopFAB;