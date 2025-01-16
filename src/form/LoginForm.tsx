import React, { useState, useCallback } from 'react';

import { useAuth } from '@context/AuthContext';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Garbage from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/CheckOutlined';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

import FormButtonGroup from '@materials/FormButtonGroup';

import customTheme from '../theme';

interface LoginFormProps {
  handleNavigation: (url: string | undefined) => void;
}

function LoginForm({ handleNavigation }: LoginFormProps) {
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">('error');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = useCallback(() => {
    login(email, password)
      .then((response) => {
        setSnackbarMessage('Login successful');
        setSeverity('success');
        setTimeout(() => {
          handleNavigation('/');
        }, 2000);
      })
      .catch((error) => {
        console.error('Error logging in:', error.response);
        if (error.response && error.response.data) {
          setSnackbarMessage(`Error logging in: ${JSON.stringify(error.response.data)}`);
          setErrors(error.response.data);
        } else {
          setSnackbarMessage('Error logging in');
        } setSeverity('error');
      });

    setSnackbarOpen(true);
  }, [email, password, handleNavigation]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <TextField
          id={`0`}
          label={"Email"}
          value={email}
          onChange={handleEmailChange}
          type={'text'}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            sx: {
              fontFamily: 'CustomCategoryFont, sans-serif',
              color: customTheme.palette.secondary.main,
              backgroundColor: customTheme.palette.custom.white,
              fontSize: 18,
            }
          }}
          sx={{
            width: '45%',
            border: '2px solid',
            borderColor: customTheme.palette.secondary.main,
            borderRadius: '10px',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <TextField
          id={`1`}
          label={"Password"}
          value={password}
          onChange={handlePasswordChange}
          error={errors.password !== ''}
          type={'password'}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            sx: {
              fontFamily: 'CustomCategoryFont, sans-serif',
              color: customTheme.palette.secondary.main,
              backgroundColor: customTheme.palette.custom.white,
              fontSize: 18,
            }
          }}
          sx={{
            width: '45%',
            border: '2px solid',
            borderColor: customTheme.palette.secondary.main,
            borderRadius: '10px',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        />
      </Box>
      <FormButtonGroup
        texts={[
          'Login',
          'Cancel',
        ]}
        actions={[handleSubmit, () => { }]}
        icons={[<Save />, <Garbage />]}
        colours={[customTheme.palette.success.main, customTheme.palette.error.main]}
      />
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={severity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginForm;