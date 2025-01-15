import React, { useState, useCallback } from 'react';

import { useAuth } from '@context/AuthContext';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Garbage from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/CheckOutlined';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

import CustomCheckBox from '@materials/CustomCheckBox';
import CustomInput from '@materials/CustomInput';
import FormButtonGroup from '@materials/FormButtonGroup';
import Text from '@materials/Text';

import customTheme from '../theme';

interface RegisterFormProps {
  handleNavigation: (url: string | undefined) => void;
}

function RegisterForm({ handleNavigation }: RegisterFormProps) {
    const { register } = useAuth();
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [givenName, setGivenName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subscribedToNewsletter, setSubscribedToNewsletter] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    givenName: '',
    email: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">('error');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = useCallback(() => {
    if (password !== confirmPassword) {
      setSnackbarMessage('Passwords do not match');
      setSeverity('error');
      setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
      return;
    } else {
      register(name, email, password, givenName, phoneNumber, subscribedToNewsletter, smsNotifications, emailNotifications)
        .then(() => {
          setSnackbarMessage('Successfully Registered');
          setSeverity('success');
          setTimeout(() => {
            handleNavigation('/');
          }, 2000);
        })
        .catch((error) => {
          console.error('Error registering:', error.response);
          if (error.response && error.response.data) {
            setSnackbarMessage(`Error registering: ${JSON.stringify(error.response.data)}`);
            setErrors(error.response.data);
          } else {
            setSnackbarMessage('Error registering');
          } setSeverity('error');
        });
    }
    setSnackbarOpen(true);
  }, [
    email, name, givenName, errors, setErrors, password, phoneNumber, subscribedToNewsletter, smsNotifications, emailNotifications, confirmPassword, handleNavigation
  ]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleGivenNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGivenName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubscribedToNewsletterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubscribedToNewsletter(event.target.checked);
  };

  const handleSmsNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSmsNotifications(event.target.checked);
  };

  const handleEmailNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailNotifications(event.target.checked);
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
        <CustomInput id={1} text={"Name"} value={name} onChange={handleNameChange} error={errors.name} />
        <CustomInput id={2} text={"Given Name"} value={givenName} onChange={handleGivenNameChange} error={errors.givenName} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <CustomInput id={0} text={"Email"} value={email} onChange={handleEmailChange} error={errors.email} />
        <CustomInput id={1} text={"Phone Number"} value={phoneNumber} onChange={handlePhoneNumberChange} error={errors.phoneNumber} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <TextField
          id={`2`}
          label={"Password"}
          value={password}
          onChange={handlePasswordChange}
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
        <TextField
          id={`3`}
          label={"Confirm Password"}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={errors.confirmPassword !== ''}
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
      <Text sx={{ width: '99%', textAlign: 'center' }} size={15} text={"Password must be minimum 8 characters long, have 3 special characters and 3 numbers."} />
      <Box
        sx={{
          display: 'flex',
          width: '50%',
          marginLeft: 'auto',
          marginRight: 'auto',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <CustomCheckBox value={subscribedToNewsletter} text={"Subscribed to the newsletter?"} handleChange={handleSubscribedToNewsletterChange} />
        <CustomCheckBox value={smsNotifications} text={"SMS notifications?"} handleChange={handleSmsNotificationsChange} />
        <CustomCheckBox value={emailNotifications} text={"Email notifications?"} handleChange={handleEmailNotificationsChange} />
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

export default RegisterForm;