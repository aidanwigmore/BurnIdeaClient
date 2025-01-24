import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import CustomerIdeaPageContent from '@idea/CustomerIdeaPageContent';
import CustomerLayout from '@layout/CustomerLayout';

import { useIdeaContext } from '@context/IdeaContext';

import Idea from '../types/Idea';

function CustomerIdeaPage() {

  const { id } = useParams<{ id: string }>();

  const [idea, setIdea] = useState<Idea | null>(null);
  const { ideas, fetchIdeas, error } = useIdeaContext();

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
    fetchIdeas();
    if (id) {
      const ideaId = parseInt(id, 10);
      const foundIdea = ideas.find((idea: Idea) => Number(idea.id) === ideaId);
      setIdea(foundIdea || null);
    }
  }, [id]);

  return (
    <>
      <CustomerLayout
        ideas={ideas}
        categories={null}
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
