import React, { useCallback, useState, useEffect } from 'react';

import { useAuth } from '@context/AuthContext';
import { useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Category from '@mui/icons-material/Category';
import Login from '@mui/icons-material/Login';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Snackbar from '@mui/material/Snackbar';
import Question from '@mui/icons-material/QuestionAnswer';
import RttIcon from '@mui/icons-material/Rtt';

import Customer from '../types/Customer';

import customTheme from '../theme';

interface AdminVerticalAppBarProps {
  setFAQModalOpen: () => void;
  setLoginModalOpen: () => void;
  setCustomersModalOpen: () => void;
  setCategoryModalOpen: () => void;
  setIdeaModalOpen: () => void;
  setAboutModalOpen: () => void;
}

function AdminVerticalAppBar({
  setFAQModalOpen,
  setLoginModalOpen,
  setCustomersModalOpen,
  setCategoryModalOpen,
  setIdeaModalOpen,
  setAboutModalOpen,
}: AdminVerticalAppBarProps) {

  const { customer, token } = useAuth();

  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">('error');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFAQModalOpen = useCallback(() => {
    setFAQModalOpen();
  }, [setFAQModalOpen]);

  const handleAboutModalOpen = useCallback(() => {
    setAboutModalOpen();
  }, [setAboutModalOpen]);

  const handleLoginModalOpen = useCallback(() => {
    setLoginModalOpen();
  }, [setLoginModalOpen]);

  const handleCustomersModalOpen = useCallback(() => {
    setCustomersModalOpen();
  }, [setCustomersModalOpen]);

  const handleCategoryModalOpen = useCallback(() => {
    setCategoryModalOpen();
  }, [setCategoryModalOpen]);

  const handleIdeaModalOpen = useCallback(() => {
    setIdeaModalOpen();
  }, [setIdeaModalOpen]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    setTimeout(() => {
      navigate('/admin');
    }, 2000);
  }, [navigate]);

  const renderLoginButtons = useCallback(() => {
    if (customer?.isStaff === true && token) {
      return (
        <>
          <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleLogout}>
            <LogoutOutlined sx={{ width: '36px', height: '36px' }} />
            Log Out
          </Button>
          <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleCustomersModalOpen}>
            <AccountCircleOutlined sx={{ width: '36px', height: '36px' }} />
            Customers
          </Button>
          <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleIdeaModalOpen}>
            <MenuBookIcon sx={{ width: '36px', height: '36px' }} />
            Ideas
          </Button>
          <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleCategoryModalOpen}>
            <Category sx={{ width: '36px', height: '36px' }} />
            Categories
          </Button>
          <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleFAQModalOpen}>
            <Question sx={{ width: '36px', height: '36px' }} />
            FAQ
          </Button>
          <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleAboutModalOpen}>
            <RttIcon sx={{ width: '36px', height: '36px' }} />
            Content
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleLoginModalOpen} startIcon={<Login sx={{ width: '36px', height: '36px' }} />}>
            Login
          </Button>
        </>
      );
    }
  }, [
    customer, token,
    handleCustomersModalOpen,
    handleLoginModalOpen, handleLogout,
    handleIdeaModalOpen,
    handleCategoryModalOpen,
    handleAboutModalOpen,
    handleFAQModalOpen,
  ]);

  return (
    <Box sx={{ flexDirection: 'column', flexGrow: 1, height: '100%' }}>
      <AppBar
        sx={{
          background: `linear-gradient(180deg, #000000 0%, ${customTheme.palette.secondary.main} 48%, ${customTheme.palette.secondary.main} 100vw)`,
          height: '100%',
          width: '100px',
          borderRadius: '15px',
        }}
        position="static"
      >
        {
          renderLoginButtons()
        }
      </AppBar>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={severity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box >
  );
}

export default AdminVerticalAppBar;
