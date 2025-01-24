import React, { useState, useCallback } from 'react';

import { useFaqContext } from '@context/FAQContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

import CustomTable from '@materials/CustomTable';
import Text from '@materials/Text';
import FaqForm from '@form/FaqForm';

import FAQ from '../types/FAQ';

import { Size } from '../types/Size';

interface FaqModalProps {
    faq: FAQ | null;
    faqs: FAQ[] | null,
    setFaq: (faq: FAQ) => void;
    handleResetFaq: () => void;
    handleNavigation: (url: string | undefined) => void;
}

function FaqModal({ faq, faqs, setFaq, handleResetFaq, handleNavigation }: FaqModalProps) {
    const { fetchFaqs, deleteFaq } = useFaqContext();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);
    const [newFaq, setNewFaq] = useState<FAQ | null>(null);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleEdit = (faq: FAQ) => {
        setSelectedFaq(faq);
    };

    const handleCancel = () => {
        setSelectedFaq(null);
        setNewFaq(null);
    };

    const filteredFaqs = faqs?.filter((faq) => {
        const searchQueryLowerCase = searchQuery.toLowerCase();
        const searchQueryNumber = Number(searchQueryLowerCase);
        return (
            faq.id?.toString().toLowerCase().includes(searchQueryLowerCase) ||
            faq.question?.toLowerCase().includes(searchQueryLowerCase) ||
            faq.answer?.toLowerCase().includes(searchQueryLowerCase)
        );
    });
    
    const handleRefresh = useCallback(async () => {
        fetchFaqs();
    }, []);

    const handleDelete = useCallback((faq: FAQ) => {
        deleteFaq(faq.id ?? '');
        handleResetFaq();
        fetchFaqs();
    }, [handleResetFaq, handleRefresh]);

    const transformedFaqs = filteredFaqs?.map((faq) => ({
        id: faq.id || '',
        extraData: [
            faq.id || '',
            faq.answer,
            faq.question,
            <img src={faq.image} alt={faq.answer} style={{ width: "50px", height: "50px" }} />,
        ],
        actions: (
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Button
                    onClick={() => handleEdit(faq)}
                    variant="contained"
                    color="success"
                    sx={{ margin: '5px' }}
                >
                    Edit
                </Button>
                <Button
                    onClick={() => handleDelete(faq)}
                    variant="contained"
                    color="error"
                    sx={{ margin: '5px' }}
                >
                    Delete
                </Button>
            </Box>
        ),
    })) || [];

    return (
        <Card
            sx={{
                marginLeft: 'auto',
                marginRight: 'auto',
                height: '85vh',
                width: '80vw',
                overflow: 'auto',
            }}
        >
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Text size={Size.large} text={"Faqs"} />
            </Box>
            <Divider />
            {(selectedFaq || newFaq) ? (
                <>
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <Text text={selectedFaq?.id ? `Edit FAQ ${selectedFaq.id}` : 'Create FAQ'} />
                    </Box>
                    <Box>
                        <FaqForm
                            faq={selectedFaq ?? newFaq}
                            handleCancel={handleCancel}
                            handleResetFaq={handleResetFaq}
                        />
                    </Box>
                </>
            ) : (
                <Button sx={{ marginLeft: '12px' }} color="success" variant="contained" onClick={() => setNewFaq({ question: '', answer: '', })}>
                    Create FAQ
                </Button>
            )}
            <Box sx={{ width: '100%', textAlign: 'center', marginTop: '24px' }}>
                <TextField
                    label="Search Faqs"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    sx={{ marginBottom: '20px', width: '50vw', marginLeft: 'auto', marginRight: 'auto' }}
                />
            </Box>
            <CustomTable
                columns={["ID", "question", "answer", "image", "actions"]}
                data={transformedFaqs ?? []}
            />
        </Card>
    );
}

export default FaqModal;
