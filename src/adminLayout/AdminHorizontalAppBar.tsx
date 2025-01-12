import React from 'react';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Toolbar from '@mui/material/Toolbar';

import customTheme from '../theme';

interface AdminHorizontalAppBarProps {
    handleNavigateFAQ: () => void;
}

function AdminHorizontalAppBar({ handleNavigateFAQ }: AdminHorizontalAppBarProps) {
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
                        <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleNavigateFAQ} startIcon={<HelpOutlineIcon sx={{ width: '36px', height: '36px' }} />}>
                            FAQ
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default AdminHorizontalAppBar;
