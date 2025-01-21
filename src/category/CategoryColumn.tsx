import React from 'react';
import DOMPurify from 'dompurify';

import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';

import CategoryButton from './CategoryButton';
import IdeaImageCard from '@idea/IdeaImageCard';

import Category from '../types/Category';
import Idea from '../types/Idea';

import customTheme from '../theme';

interface CategoryColumnProps {
    renderHeader: boolean;
    id: string;
    name: string;
    ideas: Idea[] | null;
    category: Category;
    renderDescription?: boolean;
    categoryPage?: boolean;
}

function CategoryColumn({ renderDescription, renderHeader, id, name, ideas, category, categoryPage }: CategoryColumnProps) {
    return (
        <Box key={`category-column-outer-box-${id}`} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <>
                {renderHeader === true && (
                    <Tooltip title="Navigate to Category page?" arrow>
                        <CategoryButton text={name} categoryId={id} category={category} />
                    </Tooltip>
                )}
                {renderDescription === true && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: customTheme.palette.secondary.main, borderRadius: '15px', marginBottom: '12px', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: customTheme.palette.secondary.main, borderRadius: '15px', gap: '12px', marginRight: 'auto', overflow: 'hidden', flexWrap: 'wrap', marginLeft: 'auto' }}>
                            <Box sx={{ padding: '12px', marginLeft: 'auto', marginRight: 'auto' }}>
                                <div style={{color: 'white'}} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(category?.categoryDescription || '') }} />
                            </Box>
                        </Box>
                    </Box>
                )}
                {
                    categoryPage === true ? (
                        <Box>
                            {ideas && ideas.map((idea) => {
                                if (idea.id !== undefined) {
                                    const ideaId = parseInt(idea.id, 10);
                                    if (!isNaN(ideaId) && category && category.ideas && category.ideas.includes(ideaId)) {
                                        return (
                                            <React.Fragment key={`idea-fragment-${idea.id}`}>
                                                <IdeaImageCard key={`idea-${idea.id}`} idea={idea} category={category} renderDescription={renderDescription}/>
                                            </React.Fragment>
                                        );
                                    }
                                }
                                return null;
                            })}
                        </Box>
                    ) : (
                        <Box sx={{width: {sm: '100%', xs: '90%'}}} >
                            {ideas && ideas.map((idea) => {
                                if (idea.id !== undefined) {
                                    const ideaId = parseInt(idea.id, 10);
                                    if (!isNaN(ideaId) && category && category.ideas && category.ideas.includes(ideaId)) {
                                        return (
                                            <React.Fragment key={`idea-fragment-${idea.id}`}>
                                                <IdeaImageCard key={`idea-${idea.id}`} idea={idea} category={category} renderDescription={renderDescription} />
                                            </React.Fragment>
                                        );
                                    }
                                }
                                return null;
                            })}
                        </Box>
                    )
                }
            </>
        </Box>
    )
}

export default CategoryColumn;