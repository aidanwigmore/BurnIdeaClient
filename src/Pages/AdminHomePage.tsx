import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';

import AdminHomePageContent from '@content/AdminHomePageContent';
import AdminLayout from '@adminLayout/AdminLayout';

import Category from '../types/Category';
import Customer from '../types/Customer';
import Idea from '../types/Idea';
import FAQ from '../types/FAQ';

function AdminHomePage() {

  const [categories, setCategories] = useState<Category[] | null>(null);
  const [ideas, setIdeas] = useState<Idea[] | null>(null);
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [faqs, setFaqs] = useState<FAQ[] | null>(null);

  const [modalOverLayOpen, setModalOverLayOpen] = useState(false);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [customersModalOpen, setCustomersModalOpen] = useState(false);
  const [ideaModalOpen, setIdeaModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);

  const [category, setCategory] = useState<Category | null>(null);
  const [idea, setIdea] = useState<Idea | null>(null);
  const [faq, setFaq] = useState<FAQ | null>(null);

  const handleModalOverLayOpen = useCallback(() => {
    if (modalOverLayOpen === true) {
      setCategory(null);
      setIdea(null);
    }
    setModalOverLayOpen(prevState => !prevState);
    if (customersModalOpen === true) {
      setCustomersModalOpen(false);
    }
    if (faqModalOpen === true) {
      setFaqModalOpen(false);
    }
    if (ideaModalOpen === true) {
      setIdeaModalOpen(false);
    }
    if (categoryModalOpen === true) {
      setCategoryModalOpen(false);
    }
    if (adminLoginModalOpen === true) {
      setAdminLoginModalOpen(false);
    }
  }, [
    customersModalOpen, ideaModalOpen, categoryModalOpen, modalOverLayOpen, adminLoginModalOpen, faqModalOpen,
    setCustomersModalOpen, setIdeaModalOpen, setCategoryModalOpen, setAdminLoginModalOpen, setFaqModalOpen,
  ]);

  const handleSetIdea = useCallback((idea: Idea) => {
    handleModalOverLayOpen();
    setIdeaModalOpen(true);
    setIdea(idea);
  }, [setIdea, handleModalOverLayOpen]);

  const handleResetIdea = useCallback(() => {
    setIdea(null);
  }, [setIdea]);

  const handleResetCategory = useCallback(() => {
    setCategory(null);
  }, [setCategory]);

  const handleResetFaq = useCallback(() => {
    setFaq(null);
  }, [setFaq]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/api/ideas/`,
      { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } }
    )
      .then(response => {
        setIdeas(response.data);
      })
      .catch(error => {
        console.error('Error fetching ideas:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/api/faq/`,
      { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } }
    )
      .then(response => {
        setFaqs(response.data);
      })
      .catch(error => {
        console.error('Error fetching FAQ:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/api/categories/`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/api/customers/admin/`,
      { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } }
    )
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const handleCustomersModalOpen = useCallback(() => {
    handleModalOverLayOpen();
    setCustomersModalOpen(true);
  }, [handleModalOverLayOpen]);

  const handleCategoryModalOpen = useCallback(() => {
    handleModalOverLayOpen();
    setCategoryModalOpen(true);
  }, [handleModalOverLayOpen]);

  const handleIdeaModalOpen = useCallback(() => {
    handleModalOverLayOpen();
    setIdeaModalOpen(true);
  }, [handleModalOverLayOpen]);

  const handleFaqModalOpen = useCallback(() => {
    handleModalOverLayOpen();
    setFaqModalOpen(true);
  }, [handleModalOverLayOpen]);

  const handleAdminLoginModalOpen = useCallback(() => {
    handleModalOverLayOpen();
    setAdminLoginModalOpen(true);
  }, [handleModalOverLayOpen]);

  return (
    <>
      <AdminLayout
        idea={idea}
        ideas={ideas}
        setIdea={setIdea}
        setIdeas={setIdeas}
        faq={faq}
        faqs={faqs}
        setFaq={setFaq}
        setFaqs={setFaqs}
        faqModalOpen={faqModalOpen}
        handleFaqModalOpen={handleFaqModalOpen}
        handleResetFaq={handleResetFaq}
        category={category}
        categories={categories}
        setCategory={setCategory}
        setCategories={setCategories}
        categoryModalOpen={categoryModalOpen}
        customers={customers}
        handleResetIdea={handleResetIdea}
        handleResetCategory={handleResetCategory}
        modalOverLayOpen={modalOverLayOpen}
        customersModalOpen={customersModalOpen}
        ideaModalOpen={ideaModalOpen}
        adminLoginModalOpen={adminLoginModalOpen}
        handleModalOverLayOpen={handleModalOverLayOpen}
        handleCustomersModalOpen={handleCustomersModalOpen}
        handleCategoryModalOpen={handleCategoryModalOpen}
        handleIdeaModalOpen={handleIdeaModalOpen}
        handleAdminLoginModalOpen={handleAdminLoginModalOpen}
      >
        <Box sx={{ gridArea: 'content' }}>
          <AdminHomePageContent
            categories={categories}
            ideas={ideas}
          />
        </Box>
      </AdminLayout>
    </>
  );
}

export default AdminHomePage;
