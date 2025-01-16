import React, { useState, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import AdminCategoryModal from '@adminModals/AdminCategoryModal';

import Footer from '@layout/Footer';
import Header from '@header/Header';
import AdminVerticalAppBar from '@adminLayout/AdminVerticalAppBar';
import AdminHorizontalAppBar from '@adminLayout/AdminHorizontalAppBar';
import AdminModalControl from '@customerModals/ModalOverLay';
import AdminIdeaModal from '@adminModals/AdminIdeaModal';
import AdminLoginModal from '@adminModals/AdminLoginModal';
import FaqModal from '@adminModals/FaqModal';
import Body from '@layout/Body';

import Category from '../types/Category';
import Customer from '../types/Customer';
import Idea from '../types/Idea';
import FAQ from '../types/FAQ';
import customTheme from '../theme';

interface AdminLayoutProps {
    children: React.ReactNode;

    category: Category | null;
    idea: Idea | null;
    faq: FAQ | null;

    categories: Category[] | null;
    customers: Customer[] | null;
    ideas: Idea[] | null;
    faqs: FAQ[] | null;

    setCategories: (categories: Category[]) => void;
    setCategory: (category: Category) => void;
    setIdea: (idea: Idea) => void;
    setIdeas: (ideas: Idea[]) => void;
    setFaq: (faq: FAQ) => void;
    setFaqs: (faqs: FAQ[]) => void;

    faqModalOpen: boolean;
    adminLoginModalOpen: boolean;
    categoryModalOpen: boolean;
    ideaModalOpen: boolean;
    modalOverLayOpen: boolean;
    customersModalOpen: boolean;

    handleFaqModalOpen: () => void;
    handleAdminLoginModalOpen: () => void;
    handleCategoryModalOpen: () => void;
    handleCustomersModalOpen: () => void;
    handleModalOverLayOpen: () => void;
    handleIdeaModalOpen: () => void;
    handleResetCategory: () => void;
    handleResetFaq: () => void;
    handleResetIdea: () => void;
}

function AdminLayout({
    children,

    category,
    idea,
    faq,

    categories,
    customers,
    ideas,
    faqs,

    setFaq,
    setIdea,
    setCategory,
    setCategories,
    setIdeas,
    setFaqs,

    faqModalOpen,
    adminLoginModalOpen,
    categoryModalOpen,
    customersModalOpen,
    modalOverLayOpen,
    ideaModalOpen,

    handleFaqModalOpen,
    handleAdminLoginModalOpen,
    handleCategoryModalOpen,
    handleCustomersModalOpen,
    handleResetIdea,
    handleResetCategory,
    handleResetFaq,
    handleModalOverLayOpen,
    handleIdeaModalOpen,
}: AdminLayoutProps) {
    const navigate = useNavigate();

    const handleNavigation = useCallback((path: string) => {
        navigate(path);
    }, [navigate]);

    const [bannerDisplayed, setBannerDisplayed] = useState(true);

    const handleCloseBanner = useCallback(() => {
        setBannerDisplayed(false);
    }, [setBannerDisplayed]);

    const renderModal = useCallback(() => {
        if (categoryModalOpen) {
            return (
                <AdminCategoryModal
                    category={category ?? null}
                    ideas={ideas ?? null}
                    categories={categories ?? null}
                    setCategory={() => setCategory}
                    setCategories={() => setCategories}
                    handleResetCategory={handleResetCategory}
                    handleNavigation={handleCategoryModalOpen}
                />
            )
        } else if (ideaModalOpen) {
            return (
                <AdminIdeaModal
                    idea={idea ?? null}
                    ideas={ideas ?? null}
                    setIdea={() => setIdea}
                    setIdeas={() => setIdeas}
                    handleResetIdea={handleResetIdea}
                    handleNavigation={handleIdeaModalOpen}
                />
            )
        } else if (adminLoginModalOpen) {
            return (
                <AdminLoginModal
                    handleNavigation={handleAdminLoginModalOpen}
                />
            )
        } else if (faqModalOpen) {
            return (
                <FaqModal
                    faq={faq ?? null}
                    faqs={faqs ?? null}
                    setFaqs={() => setFaqs}
                    setFaq={() => setFaq}
                    handleResetFaq={handleResetFaq}
                    handleNavigation={handleFaqModalOpen}
                />
            )
        }
    }, [
        customers, ideas, idea, category, categories,
        handleResetIdea, handleResetCategory, setCategory,
        setCategories, setIdeas, setIdea, setFaq, faq, 
        faqModalOpen,
        customersModalOpen,
        ideaModalOpen,
        categoryModalOpen, adminLoginModalOpen,
        handleCustomersModalOpen,
        handleIdeaModalOpen, handleCategoryModalOpen, handleAdminLoginModalOpen,
    ]);

    return (
        <>
            <AdminModalControl
                modalOverLayOpen={modalOverLayOpen}
                setModalOverLayOpen={handleModalOverLayOpen}
                children={
                    renderModal()
                }
            />
            <Body />
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateAreas: bannerDisplayed ? `
                        "header header header"
                        "vertSideBar horiSideBar horiSideBar"
                        "vertSideBar content content"
                        "footer footer footer" 
                        ` : `
                        "header header header"
                        "vertSideBar horiSideBar horiSideBar"
                        "vertSideBar content content"
                        "footer footer footer"
                        `,
                    gridTemplateColumns: '100px 1fr 1fr',
                    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
                    height: '100vh',
                    gap: '12px',
                }}
            >
                <Box sx={{
                        gridArea: 'header',
                        display: 'inline',
                        alignItems: 'center',
                        backgroundColor: customTheme.palette.secondary.main,
                        borderRadius: '15px',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    }}>
                    <Header modalOverLayOpen={modalOverLayOpen} setModalOverLayOpen={handleModalOverLayOpen} admin={true}/>
                </Box>
                <Box sx={{ gridArea: 'vertSideBar' }}>
                    <AdminVerticalAppBar
                        setFAQModalOpen={handleFaqModalOpen}
                        setLoginModalOpen={handleAdminLoginModalOpen}
                        setCustomersModalOpen={handleCustomersModalOpen}
                        setCategoryModalOpen={handleCategoryModalOpen}
                        setIdeaModalOpen={handleIdeaModalOpen}
                    />
                </Box>
                <Box sx={{ gridArea: 'horiSideBar' }}>
                    <AdminHorizontalAppBar
                        handleNavigateFAQ={() => handleNavigation('/faq')}
                    />
                </Box>
                <Box sx={{ gridArea: 'content' }}>
                    {children}
                </Box>
                <Box sx={{ gridArea: 'footer' }}>
                    <Footer />
                </Box>
            </Box>
        </>
    )
}

export default AdminLayout;