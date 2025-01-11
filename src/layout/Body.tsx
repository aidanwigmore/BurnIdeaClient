import React from 'react';

import Box from '@mui/material/Box';

interface BodyProps {
  children?: React.ReactNode;
}

function Body({ children }: BodyProps) {
  return (
    <Box sx={{ height: '99%' }}>
      {children}
    </Box>
  );
};

export default Body;
