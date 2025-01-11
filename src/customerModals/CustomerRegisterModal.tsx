import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import RegisterForm from '@form/RegisterForm';

import Text from '@materials/Text';

interface CustomerRegisterModalProps {
    handleNavigation: (url: string | undefined) => void;
}

function CustomerRegisterModal({ handleNavigation } : CustomerRegisterModalProps) {
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
            <Box sx={{width: '100%', textAlign: 'center'}}>
                <Text text={"Register"} />
            </Box>
            <RegisterForm handleNavigation={handleNavigation}/>
        </Card>
    );
}

export default CustomerRegisterModal;
