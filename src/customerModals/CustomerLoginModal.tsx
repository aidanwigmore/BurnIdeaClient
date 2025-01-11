import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import LoginForm from '@form/LoginForm';

import Text from '@materials/Text';

interface CustomerLoginModalProps {
    handleNavigation: (url: string | undefined) => void;
}

function CustomerLoginModal({ handleNavigation }: CustomerLoginModalProps) {
    return (
        <Card
            sx={{
                marginLeft: 'auto',
                marginRight: 'auto',
                height: '85vh',
                width: '80vw',
                padding: '10px',
            }}
        >
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Text text={"Log In"} />
            </Box>
            <LoginForm handleNavigation={handleNavigation} />
        </Card>
    );
}

export default CustomerLoginModal;
