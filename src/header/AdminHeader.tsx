import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import CustomSwitch from '@materials/CustomSwitch';
import Title from '@header/Title';

import customTheme from '../theme';

interface AdminHeaderProps {
  modalOverLayOpen: boolean;
  setModalOverLayOpen: () => void;
}

function AdminHeader({ modalOverLayOpen, setModalOverLayOpen }: AdminHeaderProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <Box
      sx={{
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '15px',
        justifyContent: 'space-between',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      }}>
      <Button
        onClick={handleClick}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          borderRadius: '15px',
        }}
      >
        <Box sx={{display: 'inline-flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Title title={"Admin"} />
          <img style={{paddingBottom: '8%'}} src='/burn.gif' />
        </Box>

      </Button>
    </Box>
  );
};

export default AdminHeader;
