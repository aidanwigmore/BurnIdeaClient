import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { useAuth } from '@context/AuthContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Text from '@materials/Text';
import IdeaBurnLogo from '@materials/IdeaBurnLogo';

import { Size } from '../types/Size';

interface HeaderProps {
  admin?: boolean;
  modalOverLayOpen: boolean;
  setModalOverLayOpen: () => void;
}

function Header({ modalOverLayOpen, setModalOverLayOpen, admin }: HeaderProps) {
  const navigate = useNavigate();

  const { customer } = useAuth();

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
        <Box sx={{display: 'inline-flex', flexDirection: 'row', justifyContent: 'flex-start', width: '99%' }}>
          <IdeaBurnLogo admin={admin}/>
        </Box>
        <Box sx={{display: 'inline-flex', flexDirection: 'row', justifyContent: 'flex-end', width: '99%', paddingRight: '12px' }}>
          { customer && customer.givenName &&
            <Text text={`Welcome, ${customer.givenName}.`} size={Size.medium}/>
          }
        </Box>
      </Button>
    </Box>
  );
};

export default Header;
