import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ExpandIcon from '@mui/icons-material/ExpandMore';

import customTheme from '../theme';

import FAQ from '../types/FAQ';

interface FAQContentProps {
    faqs: FAQ[] | null;
}

function FAQContent({ faqs }: FAQContentProps) {
    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

    const [searchQuery, setSearchQuery] = useState('');

    const handleToggleQuestion = (index: number) => {
        setExpandedQuestion(expandedQuestion === index ? null : index);
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredQuestions = faqs?.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <Box sx={{
                    gridArea: 'content', padding: '12px', textAlign: 'center', backgroundColor: customTheme.palette.secondary.main,
                    gap: '12px',
                    borderRadius: '15px',
                    marginBottom: '12px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                    <Typography variant="h4" sx={{ color: 'white' }}>FAQ</Typography>
                    <Input sx={{ color: customTheme.palette.primary.main }} id={'0'} placeholder='Search' value={searchQuery} onChange={handleSearchInputChange} />
                    
                    <Box>
                        <List>
                            {filteredQuestions?.map((faq, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid black',
                                        backgroundColor: 'white',
                                        borderRadius: '12px',
                                    }}
                                >
                                    <Button sx={{ color: 'success.main', fontSize: '12px', display: 'flex', flexDirection: 'row' }} onClick={() => handleToggleQuestion(index)} startIcon={<ExpandIcon sx={{ width: '36px', height: '36px' }} />}>
                                        <Typography>{faq.question}?</Typography>
                                    </Button>
                                    {expandedQuestion === index && (
                                        <>
                                            <img src={faq.image} alt={faq.question} />
                                            <Typography>{faq.answer}</Typography>
                                        </>
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </Box >
        </>
    );
};

export default FAQContent;
