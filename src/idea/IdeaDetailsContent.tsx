import React from 'react';

import Box from '@mui/material/Box';

import IdeaImageCard from '@idea/IdeaImageCard';
import IdeaInfoCard from '@idea/IdeaInfoCard';

import Category from '../types/Category';
import Idea from '../types/Idea';

interface IdeaDetailsContentProps {
    idea: Idea;
    category: Category | null;
}

function IdeaDetailsContent({ idea, category }: IdeaDetailsContentProps) {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'top',
                justifyContent: 'space-between',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '99%',
            }}
        >
            <React.Fragment key={`idea-fragment-${idea.id}`}>
                <IdeaImageCard key={`idea-${idea.id}`} idea={idea} category={category} />
                <IdeaInfoCard idea={idea} />
            </React.Fragment>
        </Box>
    )
}

export default IdeaDetailsContent;