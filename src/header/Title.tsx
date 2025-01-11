import React from 'react';

import Typography from '@mui/material/Typography';

import customTheme from '../theme';

interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  return (
    <Typography
      sx={{
        color: customTheme.palette.warning.main,
        fontFamily: 'CustomTitleFont, sans-serif',
        fontWeight: 1000,
        fontSize: 50,
        '-webkit-text-stroke': `2px ${customTheme.palette.custom.black}`,
      }}
    >
      {title}
    </Typography>
  );
};

export default Title;
