import React from 'react';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';

import customTheme from '../theme';

interface HorizontalAppBarProps {
    handleNavigateFAQ: () => void;
    handleNavigateAboutUs: () => void;
}

function HorizontalAppBar({ handleNavigateFAQ, handleNavigateAboutUs }: HorizontalAppBarProps) {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    sx={{
                        background: `linear-gradient(90deg, #000000 0%, ${customTheme.palette.secondary.main} 48%, ${customTheme.palette.secondary.main} 100vw)`,
                        borderRadius: '15px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'left',
                    }}
                    position="static"
                >
                    <Toolbar>
                        <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleNavigateFAQ}>
                            <HelpOutlineIcon sx={{ width: '36px', height: '36px', marginLeft: 'auto', marginRight: 'auto' }} />
                            FAQ
                        </Button>
                        <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleNavigateAboutUs}>
                            <InfoIcon sx={{ width: '36px', height: '36px', marginLeft: 'auto', marginRight: 'auto' }} />
                            About Us
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default HorizontalAppBar;
