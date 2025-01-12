import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import CustomerIdeaPageContent from '@idea/CustomerIdeaPageContent';
import CustomerLayout from '@layout/CustomerLayout';

import Category from '../types/Category';
import Idea from '../types/Idea';

const categories: Category[] = [];

function CustomerIdeaPage() {

  const { id } = useParams<{ id: string }>();

  const [idea, setIdea] = useState<Idea | null>(null);
  const [ideas, setIdeas] = useState<Idea[] | null>(null);

  const [modalOverLayOpen, setModalOverLayOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const handleModalOverLayOpen = useCallback(() => {
    setModalOverLayOpen(prevState => !prevState);
    if (accountModalOpen === true) {
      setAccountModalOpen(false);
    }
    if (loginModalOpen === true) {
      setLoginModalOpen(false);
    }
    if (registerModalOpen === true) {
      setRegisterModalOpen(false);
    }
  }, [
    accountModalOpen, loginModalOpen, registerModalOpen, modalOverLayOpen,
    setAccountModalOpen, setLoginModalOpen, setRegisterModalOpen,
  ]);

  const handleAccountModalOpen = useCallback(() => {
    handleModalOverLayOpen();
    setAccountModalOpen(true);
  }, [handleModalOverLayOpen]);

  const handleLoginModalOpen = useCallback(() => {
    handleModalOverLayOpen();
    setLoginModalOpen(true);
  }, [handleModalOverLayOpen]);

  const handleRegisterModalOpen = useCallback(() => {
    handleModalOverLayOpen();
    setRegisterModalOpen(true);
  }, [handleModalOverLayOpen]);

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.REACT_APP_API_BASE}/api/ideas/`,
      )
        .then(response => {
          if (response.data) {
            setIdeas(response.data);
            setIdea(response.data.find((idea: Idea) => idea.id == id));
          }
        })
        .catch(error => {
          console.error('Error fetching ideas:', error);
        });
    }
  }, [id]);

  return (
    <>
      <CustomerLayout
        ideas={ideas}
        categories={categories}
        modalOverLayOpen={modalOverLayOpen}
        accountModalOpen={accountModalOpen}
        loginModalOpen={loginModalOpen}
        registerModalOpen={registerModalOpen}
        handleModalOverLayOpen={handleModalOverLayOpen}
        handleAccountModalOpen={handleAccountModalOpen}
        handleLoginModalOpen={handleLoginModalOpen}
        handleRegisterModalOpen={handleRegisterModalOpen}
      >
        <Box sx={{ gridArea: 'content' }}>
          {idea && ideas && (
            <CustomerIdeaPageContent
              ideas={ideas}
              idea={idea}
            />
          )}
        </Box>
      </CustomerLayout>
    </>
  );
}

export default CustomerIdeaPage;
