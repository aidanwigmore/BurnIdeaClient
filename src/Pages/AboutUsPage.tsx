import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import AboutContent from '@content/AboutContent';

import CustomerLayout from '@layout/CustomerLayout';

import { useAboutContext } from '@context/AboutContext';

import About from '../types/About';

function AboutUsPage() {
    const { abouts, fetchAbouts, error } = useAboutContext();

    //gather all the abouts into an array based off whether they have visible to true
    const about = abouts?.find((about: About) => about.visible === true);

    return (
        <>
            <CustomerLayout
                ideas={null}
                categories={null}
                accountModalOpen={false}
                modalOverLayOpen={false}
                loginModalOpen={false}
                registerModalOpen={false}
                handleModalOverLayOpen={() => { }}
                handleAccountModalOpen={() => { }}
                handleLoginModalOpen={() => { }}
                handleRegisterModalOpen={() => { }}
            >
                <Box sx={{gridArea: 'content'}}>
                    {abouts && (
                        <AboutContent abouts={abouts || null}/>
                    )}
                </Box>
            </CustomerLayout>
        </>
    );
}

export default AboutUsPage;
