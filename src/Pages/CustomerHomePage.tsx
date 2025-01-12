import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import CustomInput from '@materials/CustomInput';

import CustomSwitch from '@materials/CustomSwitch';
import CustomerHomePageContent from '@content/CustomerHomePageContent';
import CustomerLayout from '@layout/CustomerLayout';

import Category from '../types/Category';
import Idea from '../types/Idea';

import customTheme from '../theme';

function CustomerHomePage() {

  const [categories, setCategories] = useState<Category[] | null>(null);
  const [ideas, setIdeas] = useState<Idea[] | null>(null);

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

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/api/categories/`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching category:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/api/ideas/`
    )
      .then(response => {
        setIdeas(response.data);
      })
      .catch(error => {
        console.error('Error fetching ideas:', error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        axios.get(`${process.env.REACT_APP_API_BASE}/api/customers/me/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        })
          .then((response) => {
          })
          .catch((error) => {
          });
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
  }, []);

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
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: customTheme.palette.secondary.main,
            borderRadius: '15px',
            gap: '12px',
            marginRight: 'auto',
            marginBottom: '12px',
            overflow: 'hidden',
            flexWrap: 'wrap',
            marginLeft: 'auto',
          }}>
            <CustomSwitch style={{ color: 'white' }} modalOverLayOpen={showDescription} handleChange={handleSortNoDescriptionChange} label={"Show Desc."} />
            <CustomSwitch style={{ color: 'white' }} modalOverLayOpen={showIdeas} handleChange={handleSortNoIdeasChange} label={"Show Ideas"} />
            <CustomSwitch style={{ color: 'white' }} handleChange={handleSortNewChange} label={"Sort Newer First"} />
            <CustomSwitch style={{ color: 'white' }} handleChange={handleSortAlphaBeticalChange} label={"Sort Alphabetical"} />
            <CustomInput color={"white"} id={0} text={"Search Categories"} value={searchQuery} onChange={handleSearchInputChange} error={""} />
          </Box>
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
