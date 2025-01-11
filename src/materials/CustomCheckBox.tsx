import React from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

interface CustomCheckBoxProps {
    text?: string;
    value?: boolean;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomCheckBox({ text, value, handleChange }: CustomCheckBoxProps) {
    return (
        <Box>
            {text}
            <Checkbox checked={value} color="secondary" onChange={handleChange} />
        </Box>
    );
}

export default CustomCheckBox;
