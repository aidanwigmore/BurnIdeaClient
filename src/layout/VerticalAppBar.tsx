import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import AppBar from '@mui/material/AppBar';
import Archive from '@mui/icons-material/Archive';
import Bookmark from '@mui/icons-material/Bookmark';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Register from '@mui/icons-material/PersonAdd';
import Login from '@mui/icons-material/Login';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import Mail from '@mui/icons-material/Mail';
import Map from '@mui/icons-material/Map';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import Star from '@mui/icons-material/Star';

import Customer from '../types/Customer';

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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">('error');

  const token = localStorage.getItem('token');

  const [customer, setCustomer] = useState<Customer | null>(null);

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
    localStorage.removeItem('token');
    setCustomer(null);
    setSnackbarMessage('Logging out. Please refresh your browser.');
    setSnackbarOpen(true);
    setSeverity('info');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }, [navigate]);

  useEffect(() => {
    if (token) {
      try {
        axios.get(`${process.env.REACT_APP_API_BASE}/api/customers/me/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        })
          .then((response: { data: Customer }) => {
            setCustomer(response.data);
            setSnackbarMessage('Successful sign-in from client storage.');
            setSnackbarOpen(true);
            setSeverity('success');
          })
          .catch((error : unknown) => {
            setSnackbarMessage('Error signing in from client storage.');
            setSnackbarOpen(true);
            setSeverity('error');
          });
      } catch (error) {
        setSnackbarMessage('Error signing in from client storage.');
        setSnackbarOpen(true);
        setSeverity('error');
      }
    }
  }, [navigate, token]);

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
  }, [customer, token, handleAccountModalOpen, handleLoginOpen, handleLogout, handleRegisterOpen]);

  return (
    <Box sx={{ flexDirection: 'column', flexGrow: 1, height: '100%' }}>
      <AppBar
        sx={{
          background: 'linear-gradient(180deg, #000000 0%, #687258 48%, #687258 100vw)',
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
