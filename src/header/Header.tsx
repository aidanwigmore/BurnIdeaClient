import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import CustomSwitch from '@materials/CustomSwitch';
import Title from '@header/Title';

import customTheme from '../theme';

interface HeaderProps {
  modalOverLayOpen: boolean;
  setModalOverLayOpen: () => void;
}

function Header({ modalOverLayOpen, setModalOverLayOpen }: HeaderProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  const handleNavigateTeaBank = () => {
    navigate(`/http://teabankclient-d9c62f61e84a.herokuapp.com/`);
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
        onClick={handleNavigateTeaBank}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '10%',
          maxWidth: '20%',
          backgroundColor: customTheme.palette.success.main,
          height: '100%',
          borderRadius: '15px',
        }}
      >
        TeaBank.com
      </Button>
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
        <Title title={"BurnIdea"} />
      </Button>
    </Box>
  );
};

export default Header;
