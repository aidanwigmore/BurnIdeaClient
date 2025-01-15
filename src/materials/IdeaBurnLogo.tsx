import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import customTheme from '../theme';

interface IdeaBurnLogoProps {
    admin?: boolean;
}

function IdeaBurnLogo({ admin }: IdeaBurnLogoProps) {

    return (
        <Box
            sx={{display: 'inline-flex', alignItems: 'center'}}
        >
            <img src="/logo.png" alt="IdeaBurn Logo" style={{width: '50px', height: '50px'}} />
            <Typography
                color={customTheme.palette.primary.main}
                sx={{
                    fontFamily: 'Raleway Large',
                }}
                >
                {
                    admin && admin===true ? (
                        'IDEABURN - ADMIN'
                    ) : (
                        'IDEABURN'
                    )
                }
            </Typography>
        </Box>
    );
};

export default IdeaBurnLogo;
