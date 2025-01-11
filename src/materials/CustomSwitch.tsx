import React from 'react';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';

interface CustomSwitchProps {
    style?: any;
    modalOverLayOpen?: boolean;
    setModalOverLayOpen?: (value: boolean) => void;
    handleChange?: () => void;
    label? : string;
}

function CustomSwitch({style, modalOverLayOpen, setModalOverLayOpen, handleChange, label} : CustomSwitchProps) {

  return (
    <Box 
        sx={{  
            ...style
        }}
    >
      {label}
      <Switch 
        checked={modalOverLayOpen} 
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </Box>
  );
}

export default CustomSwitch;
