import React from 'react';
import { InputBase } from '@mui/material';
import customTheme from '../theme';

interface SearchInputProps {
  id: number;
  text: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  disabled?: boolean;
  width?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const SearchInput: React.FC<SearchInputProps> = ({ id, text, value, onChange, error, width, disabled, inputProps }) => {
  return (
    <InputBase
      sx={{
        borderRadius: '10px',
        backgroundColor: customTheme.palette.info.main,
        color: customTheme.palette.secondary.main,
        padding: '10px',
        width: width || '100%',
      }}
      inputProps={{
        style: {
          margin: '0 10px',
        },
        ...inputProps,
      }}
      disabled={disabled}
      id={id.toString()}
      placeholder={text}
      value={value}
      onChange={onChange}
      error={!!error}
    />
  );
};

export default SearchInput;