import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import AccountForm from '@form/AccountForm';

import Text from '@materials/Text';

import Customer from '../types/Customer';

interface CustomerAccountModalProps {
    handleNavigation: (url: string | undefined) => void;
}

function CustomerAccountModal({ handleNavigation }: CustomerAccountModalProps) {

    const navigate = useNavigate();

    const [customer, setCustomer] = useState<Customer | null>(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">('error');

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            try {
                axios.get(`${process.env.REACT_APP_API_BASE}/api/customers/me/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                })
                    .then((response) => {
                        setCustomer(response.data);
                        setSnackbarMessage('Successful sign-in from client storage.');
                        setSnackbarOpen(true);
                        setSeverity('success');
                    })
                    .catch((error) => {
                        console.error('Error logging in:', error);
                        setSnackbarMessage('Error signing from client storage.');
                        setSnackbarOpen(true);
                        setSeverity('error');
                    });
            } catch (error) {
                console.error('Error logging in:', error);
                setSnackbarMessage('Error signing in from client storage.');
                setSnackbarOpen(true);
                setSeverity('error');
            }
        }
    }, [navigate]);

    return (
        <Card
            sx={{
                marginLeft: 'auto',
                marginRight: 'auto',
                height: '85vh',
                width: '80vw',
                padding: '10px',
                overflow: 'auto',
            }}
        >
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Text text={"Account Details"} />
            </Box>
            <AccountForm handleNavigation={handleNavigation} token={token ?? ''} customer={customer} />
        </Card>
    );
}

export default CustomerAccountModal;
