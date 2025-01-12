import React from 'react';

import Box from '@mui/material/Box';

import CategoryColumn from '@category/CategoryColumn';

import customTheme from '../theme';

import Category from '../types/Category';
import Idea from '../types/Idea';

interface CustomerHomePageContentProps {
    categories: Category[] | null;
    ideas: Idea[] | null;
    showDescription?: boolean;
}

function CustomerHomePageContent({ ideas, categories, showDescription }: CustomerHomePageContentProps) {
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                backgroundColor: customTheme.palette.secondary.main,
                borderRadius: '15px',
                gap: '12px',
                marginRight: 'auto',
                overflow: 'hidden',
                flexWrap: 'wrap',
            }}>
                {categories && categories.map((category, index) => (
                    <Box key={`category-box-${index}`} sx={{ width: { xs: '98%', sm: 'auto' }, marginLeft: 'auto', marginRight: 'auto' }}>
                        {category.ideas && category.id &&
                            <CategoryColumn categoryPage={false} key={`category-column-${category.id}`} id={category.id} category={category} name={category.name} ideas={ideas} renderHeader={true} renderDescription={showDescription ?? false} />
                        }
                    </Box>
                ))}
            </Box >
        </>
    );
};

export default CustomerHomePageContent;
