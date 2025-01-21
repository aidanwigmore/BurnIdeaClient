import React from 'react';

import Box from '@mui/material/Box';

import IdeaPageNavigation from './IdeaPageNavigation';

import customTheme from '../theme';

import Category from '../types/Category';
import Idea from '../types/Idea';

interface CustomerIdeaPageContentProps {
    idea: Idea;
    ideas: Idea[];
    categories?: Category[] | null;
}

function CustomerIdeaPageContent({ idea, ideas, categories }: CustomerIdeaPageContentProps) {
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: customTheme.palette.secondary.main,
                borderRadius: '15px',
                gap: '12px',
                marginRight: 'auto',
                overflow: 'hidden',
                flexWrap: 'wrap',
            }}>
                <IdeaPageNavigation idea={idea} ideas={ideas} categories={categories ?? null} />
            </Box>
        </>
    );
};

export default CustomerIdeaPageContent;
