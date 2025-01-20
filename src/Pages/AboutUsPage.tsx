import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

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

import About from '../types/About';
import Category from '../types/Category';
import Idea from '../types/Idea';

import { Size } from '../types/Size';

const categories: Category[] = [];
const ideas: Idea[] = [];
const abouts: About[] = [];

function AboutUsPage() {
    const [abouts, setAbouts] = useState<About[] | null>(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE}/api/about/`
        )
          .then(response => {
            setAbouts(response.data);
          })
          .catch(error => {
            console.error('Error fetching about:', error);
          });
      }, []);

    //gather all the abouts into an array based off whether they have visible to true
    const about = abouts?.find((about: About) => about.visible === true);

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
                    <div style={{color: 'white'}} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(about?.content || '') }} />
                    <img style={{height: '50%', width: '50%', margin: '12px'}} src={about?.image} alt={"About image"} />
                    <Divider color={customTheme.palette.primary.main}/>
                </Box>
            </CustomerLayout>
        </>
    );
}

export default AboutUsPage;
