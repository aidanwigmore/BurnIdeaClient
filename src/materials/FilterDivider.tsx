import React from 'react';

import Divider from '@mui/material/Divider';

import customTheme from '../theme';

function FilterDivider() {
  return (
    <>
      <Divider 
            color={customTheme.palette.primary.main} 
            sx={{
                height: {sm: '20px', xs: '10px'},
                width: {sm: '5px', xs: '5px'},
                marginLeft: '12px', 
                marginRight: '20px', 
                borderRadius: '10px'
            }}
        />
    </>
  );
}

export default FilterDivider;