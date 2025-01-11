import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import Text from '@materials/Text';

import customTheme from '../theme';

interface BannerProps {
    onClick: () => void;
}

function Banner({ onClick }: BannerProps) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                sx={{
                    background: customTheme.palette.success.main,
                    height: '75px',
                    width: '100%',
                    borderRadius: '15px',
                    justifyContent: 'center',
                }}
                position="static"
            >
                <Toolbar>
                    <Box sx={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        wordWrap: 'no-wrap',
                    }}>
                        <Text size={{ xs: '40', sm: '15' }} color={customTheme.palette.custom.white} text={'Free Shipping On All Orders!'} />
                    </Box>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={onClick}
                    >
                        <Close sx={{ color: customTheme.palette.custom.white }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Banner;
