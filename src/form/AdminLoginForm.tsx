import React, { useState, useCallback } from 'react';
import axios from 'axios';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Garbage from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/CheckOutlined';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

import CustomInput from '@materials/SearchInput';
import FormButtonGroup from '@materials/FormButtonGroup';

import customTheme from '../theme';

interface AdminLoginFormProps {
    handleNavigation: (url: string | undefined) => void;
}

function AdminLoginForm({ handleNavigation }: AdminLoginFormProps) {
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
        axios.post(`${process.env.REACT_APP_API_BASE}/api/customers/login/`, { email, password }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                setSnackbarMessage('Login successful');
                setSeverity('success');
                setTimeout(() => {
                    handleNavigation('/');
                }, 2000);
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                if (error.response) {
                    setErrors(error.response.data);
                }
                setSnackbarMessage('Error logging in');
                setSeverity('error');
            });
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
                    type={'email'}
                    margin="normal"
                    error={errors.email !== ''}
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
                    type={'password'}
                    margin="normal"
                    error={errors.password !== ''}
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
                />            </Box>
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

export default AdminLoginForm;