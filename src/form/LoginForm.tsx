import React, { useState, useCallback } from 'react';

import { useAuth } from '@context/AuthContext';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Garbage from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/CheckOutlined';
import Snackbar from '@mui/material/Snackbar';

import CustomInput from '@materials/CustomInput';
import FormButtonGroup from '@materials/FormButtonGroup';

import customTheme from '../theme';

interface LoginFormProps {
    handleNavigation: (url: string | undefined) => void;
}

function LoginForm({ handleNavigation }: LoginFormProps) {
    const { login } = useAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">('error');

    const [errors, setErrors] = useState({
        email: '',
        name: '',
        givenName: '',
        password: '',
    });

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = useCallback(() => {
        try {
            login(email, password);
            setSnackbarMessage('Login successful');
                    setSeverity('success');
                    setTimeout(() => {
                        handleNavigation('/');
            }, 2000);
        } catch(error : any){
            console.error('Error logging in:', error);
            if (error.response) {
                setErrors(error.response.data);
            }
            setSnackbarMessage('Error logging in');
            setSeverity('error');
        };
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
                <CustomInput
                    label={"Email"}
                    value={email}
                    onChange={handleEmailChange}
                    error={errors.email}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <CustomInput
                    label={"Password"}
                    value={password}
                    type={"password"}
                    onChange={handlePasswordChange}
                    error={errors.password}
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