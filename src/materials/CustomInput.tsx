import React from 'react';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

import customTheme from '../theme';

interface CustomInputProps {
  id: number;
  text: string;
  error: string;
  value?: string;
  width?: string;
  disabled?: boolean;
  color?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomInput({ required, color, id, text, error, value, width, disabled, onChange }: CustomInputProps) {
  return (
    <>
      <FormControl
        sx={{
          width: width || '45%',
          border: '2px solid',
          borderColor: color ? color : customTheme.palette.secondary.main,
          borderRadius: '10px',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        <InputLabel
          variant="outlined"
          htmlFor={`${"name-input-"}${id}`}
          error={!!error}
        >
          <Typography
            sx={{
              fontFamily: 'CustomCategoryFont, sans-serif',
              color: color ? color : customTheme.palette.secondary.main,
              backgroundColor: color ? '' : customTheme.palette.custom.white,
              fontSize: 18,
            }}
          >
            {text}
          </Typography>
        </InputLabel >
        <Input required={required ?? false} disabled={disabled ?? false} value={value} sx={{ paddingLeft: '10px' }} id={`${"name-input-"}${id}`} aria-describedby={text} onChange={onChange} />
        <FormHelperText id="my-helper-text">{error}</FormHelperText>
      </FormControl>
    </>
  );
}

export default CustomInput;