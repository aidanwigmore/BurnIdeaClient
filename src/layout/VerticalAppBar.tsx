import React, { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

import Alert from '@mui/material/Alert';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Register from '@mui/icons-material/PersonAdd';
import Login from '@mui/icons-material/Login';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import Snackbar from '@mui/material/Snackbar';

import Customer from '../types/Customer';

import customTheme from '../theme';

interface VerticalAppBarProps {
  setAccountModalOpen: () => void;
  setLoginModalOpen: () => void;
  setRegisterModalOpen: () => void;
}

function VerticalAppBar({
  setAccountModalOpen,
  setLoginModalOpen,
  setRegisterModalOpen,
}: VerticalAppBarProps) {

  const navigate = useNavigate();
  const { customer, logout, token, login, error } = useAuth();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">('error');

  const [setCustomer] = useState<Customer | null>(null);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAccountModalOpen = useCallback(() => {
    setAccountModalOpen();
  }, [setAccountModalOpen]);

  const handleLoginOpen = useCallback(() => {
    setLoginModalOpen();
  }, [setLoginModalOpen]);

  const handleRegisterOpen = useCallback(() => {
    setRegisterModalOpen();
  }, [setRegisterModalOpen]);

  const handleLogout = useCallback(() => {
    logout();
    setSnackbarMessage('Logging out. Please refresh your browser.');
    setSnackbarOpen(true);
    setSeverity('info');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }, [navigate]);

  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      await login(email, password);
      setSnackbarMessage('Login successful');
      setSnackbarOpen(true);
      setSeverity('success');
    } catch (err) {
      setSnackbarMessage('Login failed');
      setSnackbarOpen(true);
      setSeverity('error');
    }
  }, [login]);

  const renderLoginButtons = useCallback(() => {
    if (customer && token) {
      return (
        <>
          <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleLogout}>
            <LogoutOutlined sx={{ width: '36px', height: '36px', marginLeft: 'auto', marginRight: 'auto' }} />
            Log Out
          </Button>
          <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleAccountModalOpen}>
            <AccountCircleOutlined sx={{ width: '36px', height: '36px', marginLeft: 'auto', marginRight: 'auto' }} />
            Account
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleLoginOpen}>
            <Login sx={{ width: '36px', height: '36px', marginLeft: 'auto', marginRight: 'auto' }} />
            Login
          </Button>
          <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleRegisterOpen}>
            <Register sx={{ width: '36px', height: '36px' }} />
            Register
          </Button>
        </>
      );
    }
  }, [customer, token, handleAccountModalOpen, handleLoginOpen, handleLogout, handleLogin, handleRegisterOpen]);

  return (
    <Box sx={{ flexDirection: 'column', flexGrow: 1, height: '100%' }}>
      <AppBar
        sx={{
          background: `linear-gradient(180deg, #000000 0%, ${customTheme.palette.secondary.main} 48%, ${customTheme.palette.secondary.main} 100vw)`,
          width: '100%',
          height: '100%',
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

export default VerticalAppBar;
