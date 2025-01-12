import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ExpandIcon from '@mui/icons-material/ExpandMore';
import Slide from '@mui/material/Slide';

import Text from '@materials/Text';
import Typography from '@mui/material/Typography';

import CustomerLayout from '@layout/CustomerLayout';

import customTheme from '../theme';

import Category from '../types/Category';
import Idea from '../types/Idea';

const categories: Category[] = [];
const ideas: Idea[] = [];

function AboutUsPage() {

    return (
        <>
            <CustomerLayout
                categories={categories}
                ideas={ideas}
                accountModalOpen={false}
                modalOverLayOpen={false}
                loginModalOpen={false}
                registerModalOpen={false}
                handleModalOverLayOpen={() => { }}
                handleAccountModalOpen={() => { }}
                handleLoginModalOpen={() => { }}
                handleRegisterModalOpen={() => { }}
            >
                <Box sx={{
                    gridArea: 'content', padding: '12px', width: '99%', textAlign: 'center', backgroundColor: customTheme.palette.secondary.main,
                    gap: '12px',
                    borderRadius: '15px',
                    marginBottom: '12px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: '100%',
                }}>
                    <Typography variant="h4" sx={{ color: 'white' }}>About Us</Typography>
                    <Divider />
                    <Typography variant="h6" sx={{ color: 'white' }}>This platform was inspired by my Uncle Brian! This is a platform for him to upload his own ideas to this wonderful website, to share with the world.</Typography>
                    <Divider />
                </Box>
            </CustomerLayout>
        </>
    );
}

export default AboutUsPage;
