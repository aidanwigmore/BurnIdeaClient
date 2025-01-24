import React, { useState, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import AdminCategoryModal from '@adminModals/AdminCategoryModal';

import Footer from '@layout/Footer';
import Header from '@header/Header';
import AdminVerticalAppBar from '@adminLayout/AdminVerticalAppBar';
import HorizontalAppBar from '@layout/HorizontalAppBar';
import AdminModalControl from '@customerModals/ModalOverLay';
import AdminIdeaModal from '@adminModals/AdminIdeaModal';
import AdminLoginModal from '@adminModals/AdminLoginModal';
import AdminAboutModal from '@adminModals/AdminAboutModal';
import FaqModal from '@adminModals/FaqModal';
import Body from '@layout/Body';

import Category from '../types/Category';
import Customer from '../types/Customer';
import Idea from '../types/Idea';
import FAQ from '../types/FAQ';
import About from '../types/About';
import customTheme from '../theme';

interface AdminLayoutProps {
    children: React.ReactNode;

    category: Category | null;
    idea: Idea | null;
    faq: FAQ | null;
    about: About | null;

    categories: Category[] | null;
    customers: Customer[] | null;
    ideas: Idea[] | null;
    faqs: FAQ[] | null;
    abouts: About[] | null;

    setCategory: (category: Category) => void;
    setIdea: (idea: Idea) => void;
    setFaq: (faq: FAQ) => void;
    setAbout: (about: About) => void;

    faqModalOpen: boolean;
    adminLoginModalOpen: boolean;
    categoryModalOpen: boolean;
    ideaModalOpen: boolean;
    modalOverLayOpen: boolean;
    customersModalOpen: boolean;
    aboutsModalOpen: boolean;

    handleFaqModalOpen: () => void;
    handleAdminLoginModalOpen: () => void;
    handleCategoryModalOpen: () => void;
    handleCustomersModalOpen: () => void;
    handleModalOverLayOpen: () => void;
    handleIdeaModalOpen: () => void;
    handleResetCategory: () => void;
    handleResetFaq: () => void;
    handleResetIdea: () => void;
    handleAboutModalOpen: () => void;
    handleResetAbout: () => void;
}

function AdminLayout({
    children,

    category,
    idea,
    faq,
    about,

    categories,
    customers,
    ideas,
    faqs,
    abouts,

    setFaq,
    setIdea,
    setCategory,
    setAbout,

    faqModalOpen,
    adminLoginModalOpen,
    categoryModalOpen,
    customersModalOpen,
    modalOverLayOpen,
    ideaModalOpen,
    aboutsModalOpen,

    handleFaqModalOpen,
    handleAdminLoginModalOpen,
    handleCategoryModalOpen,
    handleCustomersModalOpen,
    handleResetIdea,
    handleResetCategory,
    handleResetFaq,
    handleResetAbout,
    handleModalOverLayOpen,
    handleIdeaModalOpen,
    handleAboutModalOpen,
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
                    setFaq={() => setFaq}
                    handleResetFaq={handleResetFaq}
                    handleNavigation={handleFaqModalOpen}
                />
            )
        } else if (aboutsModalOpen) {
            return (
                <AdminAboutModal
                    about={about ?? null}
                    abouts={abouts ?? null}
                    setAbout={() => setAbout}
                    handleResetAbout={handleResetAbout}
                    handleNavigation={handleAboutModalOpen}
                />
            )
        }
    }, [
        customers, ideas, idea, category, categories, abouts, about,
        handleResetIdea, handleResetCategory, setCategory,
        setIdea, setFaq, faq, 
        faqModalOpen,
        customersModalOpen,
        ideaModalOpen, aboutsModalOpen,
        categoryModalOpen, adminLoginModalOpen,
        handleCustomersModalOpen, handleAboutModalOpen,
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
                        setAboutModalOpen={handleAboutModalOpen}
                    />
                </Box>
                <Box sx={{ gridArea: 'horiSideBar' }}>
                    <HorizontalAppBar
                        handleNavigateAboutUs={() => handleNavigation('/about-us')}
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