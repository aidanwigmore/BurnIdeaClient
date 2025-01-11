import React from 'react';

import Box from '@mui/material/Box';

import CategoryColumn from './CategoryColumn';

import customTheme from '../theme';

import Category from '../types/Category';
import Idea from '../types/Idea';

interface CustomerCategoryPageContentProps {
    categories: Category[] | null;
    ideas: Idea[] | null;
}

function CustomerCategoryPageContent({ categories, ideas }: CustomerCategoryPageContentProps) {
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
                marginLeft: 'auto',
            }}>
                {categories && categories.length > 1 && categories[0] ? (
                    <Box key={`category-box-0`} sx={{ width: { xs: '98%', sm: 'auto' }, padding: '12px' }}>
                        {categories[0].ideas && categories[0].id &&
                            <CategoryColumn categoryPage={true} key={`category-column-${categories[0].id}`} id={`${categories[0].id}`} category={categories[0]} name={categories[0].name} ideas={ideas} renderHeader={true} />
                        }
                    </Box>
                ) : (
                    categories && categories.map((category, index) => (
                        <Box key={`category-box-${index}`} sx={{ width: { xs: '98%', sm: 'auto' }, marginLeft: 'auto', marginRight: 'auto' }}>
                            {category.ideas && category.id &&
                                <CategoryColumn categoryPage={true} key={`category-column-${category.id}`} id={`${category.id}`} category={category} name={category.name} ideas={ideas} renderHeader={true} />
                            }
                        </Box>
                    ))
                )}
            </Box >
        </>
    );
};

export default CustomerCategoryPageContent;
