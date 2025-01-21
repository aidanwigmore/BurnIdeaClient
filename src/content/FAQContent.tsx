import React, { useState } from 'react';
import DOMPurify from 'dompurify';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ExpandIcon from '@mui/icons-material/ExpandMore';

import Text from '@materials/Text';

import FAQ from '../types/FAQ';
import { Size } from '../types/Size';

import customTheme from '../theme';

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
                    width: '100%',
                }}>
                    <Text color={customTheme.palette.primary.main} sx={{ width: '99%', textAlign: 'center' }} size={Size.large} text={"FAQ"} />
                    <Divider color={customTheme.palette.primary.main}/>
                    <Input sx={{color: 'primary.main'}} id={'0'} placeholder='Search' value={searchQuery} onChange={handleSearchInputChange} />
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
                                    <Button sx={{ color: 'secondary.main', fontSize: '12px', display: 'flex', flexDirection: 'row' }} onClick={() => handleToggleQuestion(index)} startIcon={<ExpandIcon sx={{ width: '36px', height: '36px' }} />}>
                                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.question || '') }} />
                                        {/* <Text sx={{ width: '99%', textAlign: 'center' }} size={Size.medium} text={`${faq.question}?`} /> */}
                                    </Button>
                                    {expandedQuestion === index && (
                                        <>
                                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.answer || '') }} />
                                        <img src={faq.image} alt={"Faq image"} />
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
