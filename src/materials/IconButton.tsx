import React from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import customTheme from '../theme';

interface IconButtonProps {
    text: string;
    icon: React.ReactNode;
    color?: any;
    open?: boolean;
    onClick: () => void;
    backgroundColor?: string;
}

function IconButton({ text, icon, color, open, onClick, backgroundColor }: IconButtonProps) {

    if (color) {
        return (
            <Button
                sx={{
                    display: 'block',
                    height: '90px',
                    width: '90px',
                    color: color,
                    fontFamily: 'Oswald, Arial, sans-serif',
                    fontSize: 12,
                    backgroundColor: backgroundColor,
                }}
            >
                <div>{icon}</div>
                <div>
                    <Typography
                        variant="h6"
                        onClick={onClick}
                        sx={{
                            color: color,
                            fontFamily: 'Oswald, Arial, sans-serif',
                        }}
                    >
                        {text}
                    </Typography>
                </div>
            </Button>
        );
    } else {
        return (
            <Button
                sx={{
                    display: 'block',
                    height: '90px',
                    width: '90px',
                    color: customTheme.palette.custom.white,
                    fontFamily: 'Oswald, Arial, sans-serif',
                    fontSize: 12,
                    backgroundColor: backgroundColor,
                }}
            >
                <div>{icon}</div>
                <div>
                    <Typography
                        sx={{
                            color: customTheme.palette.custom.white,
                            fontFamily: 'Oswald, Arial, sans-serif',
                            fontSize: 12,
                        }}
                    >
                        {text}
                    </Typography>
                </div>
            </Button>
        );
    }
};

export default IconButton;
