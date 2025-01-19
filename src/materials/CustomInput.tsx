import React, { useState, useCallback } from 'react';

import TextField from '@mui/material/TextField';

import customTheme from '../theme';
import { styled } from '@mui/material/styles';

interface CustomInputProps {
    label: string;
    value: string;
    type?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
}

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: customTheme.palette.secondary.main,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: customTheme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: customTheme.palette.secondary.main,
        },
    },
});

function CustomInput({ label, value, type, error, onChange }: CustomInputProps) {
    return (
        <CustomTextField
            label={label}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error}
            variant="outlined"
            sx={{width: '45%', margin: '12px'}}
            InputLabelProps={{
                style: { color: 'secondary', }, // Change this to your desired color
            }}
            InputProps={{
                style: { color: 'secondary', }, // Change this to your desired color
            }}
            type={type || 'text'}
        />
    );
}

export default CustomInput;