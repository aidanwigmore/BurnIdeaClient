import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'success.main',
        color: 'white',
        padding: '16px 0',
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} BurnIdea. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="/privacy" color="inherit" underline="hover">
            Privacy Policy
          </Link>
          {' | '}
          <Link href="/terms" color="inherit" underline="hover">
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;