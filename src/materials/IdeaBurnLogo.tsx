import React from 'react';

import Box from '@mui/material/Box';

import Text from '@materials/Text';

import { Size } from '../types/Size';

interface IdeaBurnLogoProps {
    admin?: boolean;
}

function IdeaBurnLogo({ admin }: IdeaBurnLogoProps) {

    return (
        <Box
            sx={{display: 'inline-flex', alignItems: 'center'}}
        >
            <img src="/logo.png" alt="IdeaBurn Logo" style={{width: '50px', height: '50px'}} />
            <Text 
                size={Size.large}
                text={
                    admin && admin===true ? (
                        'IDEABURN - ADMIN'
                    ) : (
                        'IDEABURN'
                    )
                }
            />
        </Box>
    );
};

export default IdeaBurnLogo;
