import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import FAQContent from '@content/FAQContent';
import CustomerLayout from '@layout/CustomerLayout';

import FAQ from '../types/FAQ';

const faqs: FAQ[] = [];

function FAQPage() {

  const [faqs, setFaqs] = useState<FAQ[] | null>(null);

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
    axios.get(`${process.env.REACT_APP_API_BASE}/api/faq/`
    )
      .then(response => {
        setFaqs(response.data);
      })
      .catch(error => {
        console.error('Error fetching faq:', error);
      });
  }, []);

  return (
    <>
      <CustomerLayout
        ideas={null}
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
          {faqs && (
            <FAQContent faqs={faqs || null}/>
          )} 
        </Box> 
      </CustomerLayout>
    </>
  );
}

export default FAQPage;
