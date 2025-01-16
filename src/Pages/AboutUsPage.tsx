import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ExpandIcon from '@mui/icons-material/ExpandMore';
import Slide from '@mui/material/Slide';

import Text from '@materials/Text';

import CustomerLayout from '@layout/CustomerLayout';

import customTheme from '../theme';

import Category from '../types/Category';
import Idea from '../types/Idea';

import { Size } from '../types/Size';

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
                    <Text color={customTheme.palette.primary.main} size={Size.large} text={"About Us"} />
                    <Divider color={customTheme.palette.primary.main}/>
                    <Text color={customTheme.palette.primary.main} size={Size.medium} text={"This platform was inspired by my Uncle Brian! This is a platform for him to upload his own ideas to this wonderful website, to share with the world."} />
                    <Divider color={customTheme.palette.primary.main}/>
                </Box>
            </CustomerLayout>
        </>
    );
}

export default AboutUsPage;
