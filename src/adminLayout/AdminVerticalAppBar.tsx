import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import AppBar from '@mui/material/AppBar';
import Archive from '@mui/icons-material/Archive';
import Bookmark from '@mui/icons-material/Bookmark';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Category from '@mui/icons-material/Category';
import Login from '@mui/icons-material/Login';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import Map from '@mui/icons-material/Map';
import Mail from '@mui/icons-material/Mail';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import Star from '@mui/icons-material/Star';

import Customer from '../types/Customer';

interface AdminVerticalAppBarProps {
  setLoginModalOpen: () => void;
  setCustomersModalOpen: () => void;
  setCategoryModalOpen: () => void;
  setIdeaModalOpen: () => void;
}

function AdminVerticalAppBar({
  setLoginModalOpen,
  setCustomersModalOpen,
  setCategoryModalOpen,
  setIdeaModalOpen,
}: AdminVerticalAppBarProps) {

  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">('error');

  const token = localStorage.getItem('token');

  const [admin, setAdmin] = useState<Customer | null>(null);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
    setAdmin(null);
    setTimeout(() => {
      navigate('/admin');
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
          .then((response) => {
            setAdmin(response.data);
            if (response.data.isStaff === true) {
              setSnackbarMessage('Successful sign-in from client storage.');
              setSnackbarOpen(true);
              setSeverity('success');
            } else {
              setSnackbarMessage('You are not authenticated to view this page.');
              setSnackbarOpen(true);
              setSeverity('error');
              setTimeout(() => {
                navigate('/');
              }, 2000);
            }
          })
          .catch((error) => {
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
    if (admin?.isStaff === true && token) {
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
    admin, token,
    handleCustomersModalOpen,
    handleLoginModalOpen, handleLogout,
    handleIdeaModalOpen,
    handleCategoryModalOpen,
  ]);

  return (
    <Box sx={{ flexDirection: 'column', flexGrow: 1, height: '100%' }}>
      <AppBar
        sx={{
          background: 'linear-gradient(180deg, #000000 0%, #687258 48%, #687258 100vw)',
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
