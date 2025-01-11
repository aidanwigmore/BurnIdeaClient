import React from 'react';

import Button from '@mui/material/Button';

import customTheme from '../theme';

interface CustomButtonProps {
    text: string;
    onClick: (option: string) => void;
    color?: any;
    backgroundColor?: any;
    children?: React.ReactNode;
}

function CustomButton({ text, onClick, color, backgroundColor, children }: CustomButtonProps) {
    return (
        <Button
            variant="contained"
            onClick={() => onClick}
            sx={{
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "15px",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                padding: "12px",
                color: color ? color : customTheme.palette.custom.black,
                backgroundColor: backgroundColor ? backgroundColor : customTheme.palette.success.main,
                fontFamily: 'CustomCategoryFont, sans-serif',
                fontWeight: 1000,
                fontSize: 50,
            }}
        >
            {text}
            {children}
        </Button>
    )
}

export default CustomButton;
