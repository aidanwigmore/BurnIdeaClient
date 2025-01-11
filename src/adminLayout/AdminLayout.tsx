import React, { useState, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// import AdminCustomersModal from '@adminModals/AdminCustomersModal';
import AdminBanner from '@adminLayout/AdminBanner';
import AdminCategoryModal from '@adminModals/AdminCategoryModal';
import AdminHeader from '@header/AdminHeader';
import AdminVerticalAppBar from '@adminLayout/AdminVerticalAppBar';
import AdminHorizontalAppBar from '@adminLayout/AdminHorizontalAppBar';
import AdminModalControl from '@customerModals/ModalOverLay';
import AdminIdeaModal from '@adminModals/AdminIdeaModal';
import AdminLoginModal from '@adminModals/AdminLoginModal';
import Body from '@layout/Body';

import Category from '../types/Category';
import Customer from '../types/Customer';
import Idea from '../types/Idea';
import customTheme from '../theme';

interface AdminLayoutProps {
    children: React.ReactNode;

    category: Category | null;
    idea: Idea | null;

    categories: Category[] | null;
    customers: Customer[] | null;
    ideas: Idea[] | null;

    setCategories: (categories: Category[]) => void;
    setCategory: (category: Category) => void;
    setIdea: (idea: Idea) => void;
    setIdeas: (ideas: Idea[]) => void;

    adminLoginModalOpen: boolean;
    categoryModalOpen: boolean;
    ideaModalOpen: boolean;
    modalOverLayOpen: boolean;
    customersModalOpen: boolean;

    handleAdminLoginModalOpen: () => void;
    handleCategoryModalOpen: () => void;
    handleCustomersModalOpen: () => void;
    handleModalOverLayOpen: () => void;
    handleIdeaModalOpen: () => void;
    handleResetCategory: () => void;
    handleResetIdea: () => void;
}

function AdminLayout({
    children,

    category,
    idea,

    categories,
    customers,
    ideas,

    setIdea,
    setCategory,
    setCategories,
    setIdeas,

    adminLoginModalOpen,
    categoryModalOpen,
    customersModalOpen,
    modalOverLayOpen,
    ideaModalOpen,

    handleAdminLoginModalOpen,
    handleCategoryModalOpen,
    handleCustomersModalOpen,
    handleResetIdea,
    handleResetCategory,
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
        }
    }, [
        customers, ideas, idea, category, categories,
        handleResetIdea, handleResetCategory, setCategory,
        setCategories, setIdeas, setIdea,
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
                        "vertSideBar banner banner"
                        "vertSideBar content content"
                        ` : `
                        "header header header"
                        "vertSideBar horiSideBar horiSideBar"
                        "vertSideBar content content"
                        `,
                    gridTemplateColumns: '100px 1fr 1fr',
                    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
                    height: '100vh',
                    gap: '12px',
                }}
            >
                <Box sx={{ gridArea: 'header' }}>
                    <AdminHeader modalOverLayOpen={modalOverLayOpen} setModalOverLayOpen={handleModalOverLayOpen} />
                </Box>
                <Box sx={{ gridArea: 'vertSideBar' }}>
                    <AdminVerticalAppBar
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
                {bannerDisplayed && (
                    <Box sx={{ gridArea: 'banner' }}>
                        <AdminBanner onClick={handleCloseBanner} />
                    </Box>
                )
                }
                <Box sx={{ gridArea: 'content' }}>
                    {children}
                </Box>
            </Box>
        </>
    )
}

export default AdminLayout;