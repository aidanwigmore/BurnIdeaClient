import React, { useState, useEffect, useCallback } from 'react';

import { useAuth } from '@context/AuthContext';
import { useIdeaContext } from '@context/IdeaContext';
import { useCategoryContext } from '@context/CategoryContext';
import { useAboutContext } from '@context/AboutContext';
import { useFaqContext } from '@context/FAQContext';

import Box from '@mui/material/Box';

import AdminHomePageContent from '@content/AdminHomePageContent';
import AdminLayout from '@adminLayout/AdminLayout';

import Category from '../types/Category';
import Customer from '../types/Customer';
import Idea from '../types/Idea';
import FAQ from '../types/FAQ';
import About from '../types/About';

function AdminHomePage() {

  const { categories, fetchCategories } = useCategoryContext();
  const { ideas, fetchIdeas } = useIdeaContext();
  const { customer, customers, fetchCustomerDetails, error } = useAuth();
  const { faqs, fetchFaqs } = useFaqContext();
  const { abouts, fetchAbouts } = useAboutContext();

  const [modalOverLayOpen, setModalOverLayOpen] = useState(false);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [customersModalOpen, setCustomersModalOpen] = useState(false);
  const [ideaModalOpen, setIdeaModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);

  const [category, setCategory] = useState<Category | null>(null);
  const [idea, setIdea] = useState<Idea | null>(null);
  const [faq, setFaq] = useState<FAQ | null>(null);
  const [about, setAbout] = useState<About | null>(null);

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
    if (aboutModalOpen === true) {
      setAboutModalOpen(false);
    }
  }, [
    customersModalOpen, ideaModalOpen, categoryModalOpen, modalOverLayOpen, adminLoginModalOpen, faqModalOpen, aboutModalOpen,
    setCustomersModalOpen, setIdeaModalOpen, setCategoryModalOpen, setAdminLoginModalOpen, setFaqModalOpen, setAboutModalOpen,
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

  const handleResetAbout = useCallback(() => {
    setAbout(null);
  }, [setAbout]);

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

  const handleAboutModalOpen = useCallback(() => {
    handleModalOverLayOpen();
    setAboutModalOpen(true);
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
        faq={faq}
        faqs={faqs}
        setFaq={setFaq}
        faqModalOpen={faqModalOpen}
        handleFaqModalOpen={handleFaqModalOpen}
        handleResetFaq={handleResetFaq}
        about={about}
        abouts={abouts}
        setAbout={setAbout}
        aboutsModalOpen={aboutModalOpen}
        handleAboutModalOpen={handleAboutModalOpen}
        handleResetAbout={handleResetAbout}
        category={category}
        categories={categories}
        setCategory={setCategory}
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
