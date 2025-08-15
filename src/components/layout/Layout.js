import React from 'react';
import { Box, Container, Fade } from '@mui/material';
import { motion } from 'framer-motion';
import Header from './Header';
import ScrollToTopFAB from '../common/FloatingActionButton';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            flexGrow: 1,
            py: 4,
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8eaf6 100%)',
            minHeight: 'calc(100vh - 64px)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 20% 50%, rgba(25, 118, 210, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(156, 39, 176, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(25, 118, 210, 0.02) 0%, transparent 50%)
              `,
              pointerEvents: 'none',
              zIndex: 0
            },
            '& > *': {
              position: 'relative',
              zIndex: 1
            }
          }}
        >
          <Fade in={true} timeout={800}>
            <Box>{children}</Box>
          </Fade>
        </Container>
      </motion.div>
      <ScrollToTopFAB />
    </Box>
  );
};

export default Layout;