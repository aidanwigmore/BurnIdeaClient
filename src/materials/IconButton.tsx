import React from 'react';

import Button from '@mui/material/Button';

import Text from '@materials/Text';

import customTheme from '../theme';
import { Size } from '../types/Size';

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
                    <Text size={Size.medium} text={text} />
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
                    <Text size={Size.medium} text={text} />
                </div>
            </Button>
        );
    }
};

export default IconButton;
