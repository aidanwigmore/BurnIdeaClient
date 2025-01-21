import React from 'react';

import Box from '@mui/material/Box';

import CategoryColumn from '@category/CategoryColumn';

import customTheme from '../theme';

import Category from '../types/Category';
import Idea from '../types/Idea';

interface AdminHomePageContentProps {
    categories: Category[] | null;
    ideas: Idea[] | null;
}

function AdminHomePageContent({ categories, ideas }: AdminHomePageContentProps) {
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
                    <Box key={index} sx={{ padding: '12px', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Box key={`category-box-${index}`} sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            {category.ideas && category.id &&
                                <CategoryColumn key={`category-column-${category.id}`} id={category.id} category={category} name={category.name} ideas={ideas} renderHeader={true} />
                            }
                        </Box>
                    </Box>
                ))}
            </Box >
        </>
    );
};

export default AdminHomePageContent;
