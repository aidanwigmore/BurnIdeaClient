import React from 'react';

import Switch from '@mui/material/Switch';

import customTheme from '../theme';

interface FilterSwitchProps {
    checked?: boolean;
    onChange?: () => void;
}

function FilterDivider({ checked, onChange } : FilterSwitchProps) {
  return (
    <>
      <Switch 
        color="info" 
        checked={checked} 
        onChange={onChange} 
        sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
                color: customTheme.palette.info.main,
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: customTheme.palette.info.main,
            },
            '& .MuiSwitch-switchBase': {
                color: customTheme.palette.error.main,
            },
            '& .MuiSwitch-track': {
                backgroundColor: customTheme.palette.error.main,
            },
        }}
    />
    </>
  );
}

export default FilterDivider;