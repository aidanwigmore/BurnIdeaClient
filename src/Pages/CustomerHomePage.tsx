import React, { useState, useEffect, useCallback } from 'react';

import { useAuth } from '@context/AuthContext';
import { useIdeaContext } from '@context/IdeaContext';
import { useCategoryContext } from '@context/CategoryContext';

import Box from '@mui/material/Box';

import Filters from 'filters/Filters';
import CustomerHomePageContent from '@content/CustomerHomePageContent';
import CustomerLayout from '@layout/CustomerLayout';

function CustomerHomePage() {
  const { categories, fetchCategories } = useCategoryContext();
  const { ideas, fetchIdeas } = useIdeaContext();
  const { customer, fetchCustomerDetails, error } = useAuth();
  
  const [sortNew, setSortNew] = useState<Boolean>(true);
  const [sortAlphaBetical, setSortAlphaBetical] = useState<Boolean>(false);

  const [searchQuery, setSearchQuery] = useState('');

  const [showIdeas, setShowIdeas] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
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

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCategories = categories?.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSortNewChange = useCallback(() => {
    setSortNew(!sortNew);
    if (sortNew) {
      categories?.sort((a, b) => {
        if (a.id && b.id) {
          return parseInt(b.id, 10) - parseInt(a.id, 10);
        }
        return 0;
      });
    } else {
      categories?.sort((a, b) => {
        if (a.id && b.id) {
          return parseInt(a.id, 10) - parseInt(b.id, 10);
        }
        return 0;
      });
    }
  }, [sortNew, categories]);

  const handleSortNoIdeasChange = useCallback(() => {
    setShowIdeas(!showIdeas);
  }, [showIdeas]);

  const handleSortNoDescriptionChange = useCallback(() => {
    setShowDescription(!showDescription);
  }, [showDescription]);

  const handleSortAlphaBeticalChange = useCallback(() => {
    setSortAlphaBetical(!sortAlphaBetical);
    if (sortAlphaBetical) {
      categories?.sort((a, b) => {
        if (a.name && b.name) {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
    } else {
      categories?.sort((a, b) => {
        if (a.name && b.name) {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
    }
  }, [sortAlphaBetical, categories]);

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
          <Filters 
            context={'customerHomePage'} 
            showDescription={showDescription} 
            handleSortNoDescriptionChange={handleSortNoDescriptionChange}
            showIdeas={showIdeas}
            handleSortNoIdeasChange={handleSortNoIdeasChange}
            handleSortNewChange={handleSortNewChange}
            searchQuery={searchQuery}
            handleSearchInputChange={handleSearchInputChange}
          />
          <CustomerHomePageContent
            categories={filteredCategories || categories}
            ideas={showIdeas === true ? ideas : []}
            showDescription={showDescription}
          />
        </Box>
      </CustomerLayout>
    </>
  );
}

export default CustomerHomePage;
