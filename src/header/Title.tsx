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
        color: customTheme.palette.info.main,
        fontFamily: 'CustomTitleFont, times new roman',
        fontWeight: 1000,
        fontSize: 50,
        '-webkit-text-stroke': `2px ${customTheme.palette.info.light}`,
      }}
    >
      {title}
    </Typography>
  );
};

export default Title;
