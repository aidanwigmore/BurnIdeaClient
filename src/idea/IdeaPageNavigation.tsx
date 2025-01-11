import React, { useState, useEffect } from 'react';

import { Box, Tabs, Tab } from '@mui/material';
import Report from '@mui/icons-material/Report';

import IdeaDetailsContent from '@idea/IdeaDetailsContent';

import customTheme from '../theme';

import Category from '../types/Category';
import Idea from '../types/Idea';

interface IdeaPageNavigationProps {
    idea: Idea;
    categories: Category[] | null;
    ideas: Idea[];
}

function IdeaPageNavigation({ idea, categories, ideas }: IdeaPageNavigationProps) {

    const [option, setOption] = useState(1);

    const setSelectedOption = (event: React.ChangeEvent<{}>, newValue: number) => {
        setOption(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={option} onChange={setSelectedOption} aria-label="basic tabs example">
                    <Tab label="Details" value={1} />
                    <Tab label="Ratings" value={2} />
                </Tabs>
            </Box>

            {option === 1 && <IdeaDetailsContent idea={idea} category={null} />}
        </>
    );
}

export default IdeaPageNavigation;