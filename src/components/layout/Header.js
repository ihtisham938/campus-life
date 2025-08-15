import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Fade,
  Slide
} from '@mui/material';
import {
  School,
  AccountCircle
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigationItems = [
    { label: 'Events', path: '/events' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Courses', path: '/courses' },
    { label: 'Elections', path: '/elections' },
    { label: 'Q&A', path: '/qa' },
    { label: 'Feedback', path: '/feedback' },
    { label: 'Teacher Dashboard', path: '/teacher-dashboard' }
  ];

  return (
    <Slide direction="down" in={true} timeout={600}>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#1976d2',
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)'
        }}
      >
        <Toolbar>
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <School sx={{ mr: 2 }} />
          </motion.div>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              '&:hover': {
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
              }
            }}
          >
            Campus Life Platform
          </Typography>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Button
                  color="inherit"
                  component={Link}
                  to={item.path}
                  sx={{ 
                    mx: 1,
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '&::after': {
                        width: '100%'
                      }
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: 0,
                      height: '2px',
                      backgroundColor: 'white',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)'
                    }
                  }}
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </Box>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <AccountCircle />
            </IconButton>
          </motion.div>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            TransitionComponent={Fade}
            sx={{
              '& .MuiPaper-root': {
                mt: 1,
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }
            }}
          >
            <MenuItem 
              onClick={handleClose}
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  transform: 'translateX(4px)'
                }
              }}
            >
              Profile
            </MenuItem>
            <MenuItem 
              onClick={handleClose}
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  transform: 'translateX(4px)'
                }
              }}
            >
              Settings
            </MenuItem>
            <MenuItem 
              onClick={handleClose}
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  transform: 'translateX(4px)'
                }
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Header;