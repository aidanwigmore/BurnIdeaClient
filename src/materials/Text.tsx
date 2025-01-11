import React from 'react';

import Typography from '@mui/material/Typography';

import customTheme from '../theme';

interface TextProps {
    text: string;
    size?: any;
    font?: boolean;
    color?: string;
    justifyContent?: any;
    sx?: any;
}

function Text({ text, color, size, font, justifyContent, sx }: TextProps) {

    return (
        <Typography
            color={customTheme.palette.custom.black}
            sx={{
                color: color,
                fontFamily: font ? 'sans-serif' : 'CustomCategoryFont, sans-serif',
                fontSize: size ? size : 40,
                marginLeft: justifyContent === 'left' ? '0' : 'auto',
                marginRight: justifyContent === 'right' ? '0' : 'auto',
                ...sx,
            }}
        >
            {text}
        </Typography>
    );
};

export default Text;
