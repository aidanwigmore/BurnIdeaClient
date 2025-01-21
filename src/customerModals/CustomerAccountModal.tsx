import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import AccountForm from '@form/AccountForm';

import Text from '@materials/Text';

interface CustomerAccountModalProps {
    handleNavigation: (url: string | undefined) => void;
}

function CustomerAccountModal({ handleNavigation }: CustomerAccountModalProps) {

    const navigate = useNavigate();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">('error');

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
            <AccountForm handleNavigation={handleNavigation} />
        </Card>
    );
}

export default CustomerAccountModal;
