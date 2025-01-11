import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PlusIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';

import customTheme from '../theme';

interface QuantityInputProps {
    quantity: number;
    setQuantity: (quantity: number) => void;
}

function QuantityInput({quantity, setQuantity} : QuantityInputProps) {
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: `${customTheme.palette.success.main}`,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '15px',
                margin: '25px',
            }}
        >
            <Button
                onClick={handleDecrement}
                startIcon={<MinusIcon sx={{width: '36px', height: '36px'}} />}
                sx={{
                    color: customTheme.palette.custom.black,
                }}
            />
            <TextField
                value={quantity}
                sx={{
                    width: '50px',
                    textAlign: 'center',
                }}
            />
            <Button
                onClick={handleIncrement}
                startIcon={<PlusIcon sx={{width: '36px', height: '36px'}} />}
                sx={{
                    color: customTheme.palette.custom.black,
                }}
            />
        </Box>
    );
} 

export default QuantityInput;
