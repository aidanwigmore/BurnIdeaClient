import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import AdminLoginForm from '@form/AdminLoginForm';

import Text from '@materials/Text';

interface AdminLoginModalProps {
    handleNavigation: (url: string | undefined) => void;
}

function AdminLoginModal({ handleNavigation }: AdminLoginModalProps) {
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
            <AdminLoginForm handleNavigation={handleNavigation} />
        </Card>
    );
}

export default AdminLoginModal;
