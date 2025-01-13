import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import Body from '@layout/Body';
import CustomerAccountModal from '@customerModals/CustomerAccountModal';
import CustomerModalControl from '@customerModals/CustomerModalControl';
import CustomerLoginModal from '@customerModals/CustomerLoginModal';
import CustomerRegisterModal from '@customerModals/CustomerRegisterModal';
import Footer from '@layout/Footer';
import Header from '@header/Header';
import HorizontalAppBar from '@layout/HorizontalAppBar';
import VerticalAppBar from '@layout/VerticalAppBar';

import Category from '../types/Category';
import Idea from '../types/Idea';

import customTheme from '../theme';

interface CustomerLayoutProps {
    children: React.ReactNode;

    categories: Category[] | null;
    ideas: Idea[] | null;

    accountModalOpen: boolean;
    modalOverLayOpen: boolean;
    loginModalOpen: boolean;
    registerModalOpen: boolean;

    handleModalOverLayOpen: () => void;
    handleAccountModalOpen: () => void;
    handleLoginModalOpen: () => void;
    handleRegisterModalOpen: () => void;
}

function CustomerLayout({
    children,

    categories,
    ideas,

    accountModalOpen,
    modalOverLayOpen,
    loginModalOpen,
    registerModalOpen,

    handleModalOverLayOpen,
    handleAccountModalOpen,
    handleLoginModalOpen,
    handleRegisterModalOpen,
}: CustomerLayoutProps) {
    const navigate = useNavigate();

    const handleNavigation = useCallback((path: string | undefined) => {
        navigate(path || '/');
    }, [navigate]);

    const [bannerDisplayed, setBannerDisplayed] = useState(true);

    const handleCloseBanner = useCallback(() => {
        setBannerDisplayed(false);
    }, [setBannerDisplayed]);

    const renderModal = useCallback(() => {
        if (accountModalOpen) {
            return (
                <CustomerAccountModal
                    handleNavigation={handleAccountModalOpen}
                />
            )
        } else if (loginModalOpen) {
            return (
                <CustomerLoginModal
                    handleNavigation={handleLoginModalOpen}
                />
            )
        } else if (registerModalOpen) {
            return (
                <CustomerRegisterModal handleNavigation={handleRegisterModalOpen} />
            )
        }
    }, [
        accountModalOpen,
        loginModalOpen, registerModalOpen,
        ideas,
        handleLoginModalOpen,
        handleAccountModalOpen,
        handleRegisterModalOpen,
    ]);

    return (
        <>
            <CustomerModalControl
                modalOverLayOpen={modalOverLayOpen}
                setModalOverLayOpen={handleModalOverLayOpen}
                children={
                    renderModal()
                }
            />
            <Body>
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
                        backgroundColor: customTheme.palette.secondary.main,
                        borderRadius: '15px',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    }}>
                        <Header modalOverLayOpen={modalOverLayOpen} setModalOverLayOpen={handleModalOverLayOpen} />
                    </Box>
                    <Box sx={{ gridArea: 'vertSideBar' }}>
                        <VerticalAppBar
                            setAccountModalOpen={handleAccountModalOpen}
                            setLoginModalOpen={handleLoginModalOpen}
                            setRegisterModalOpen={handleRegisterModalOpen}
                        />
                    </Box>
                    <Box sx={{ gridArea: 'horiSideBar' }}>
                        <HorizontalAppBar
                            handleNavigateFAQ={() => handleNavigation('/faq')}
                            handleNavigateAboutUs={() => handleNavigation('/about-us')}
                        />
                    </Box>
                    <Box sx={{ gridArea: 'content' }}>
                        {children}
                    </Box>
                    <Box sx={{ gridArea: 'footer' }}>
                        <Footer />
                    </Box>
                </Box>
            </Body>
        </>
    )
}

export default CustomerLayout;