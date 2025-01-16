import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Cancel from '@mui/icons-material/Cancel';
import Edit from '@mui/icons-material/Edit';
import Garbage from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/CheckOutlined';

import CustomInput from '@materials/SearchInput';
import FormButtonGroup from '@materials/FormButtonGroup';

import customTheme from '../theme';

import FAQ from '../types/FAQ';

interface FaqFormProps {
    faq?: FAQ | null;
    handleResetFaq: () => void;
    handleCancel: () => void;
    setFaqs: (faqs: FAQ[]) => void;
}
function FaqForm({ faq, handleResetFaq, handleCancel, setFaqs }: FaqFormProps) {
    const [renderEditDelete, setRenderEditDelete] = useState(true);

    const [edit, setEdit] = useState(false);

    const handleRefresh = useCallback(async () => {
        const newFaqs = await axios.get(`${process.env.REACT_APP_API_BASE}/api/faq/`, {
            headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
        });
        setFaqs(newFaqs.data);
    }, [setFaqs]);

    const [newFaq, setNewFaq] = useState<FAQ>({
        id: faq?.id || undefined,
        question: faq?.question || '',
        answer: faq?.answer || '',
        image: faq?.image || '',
    });

    useEffect(() => {
        if (faq) {
            setNewFaq(faq);
        }
    }, [faq]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleSetEdit = useCallback(() => {
        setRenderEditDelete(false);
        setEdit(!edit);
    }, [setEdit, edit]);

    const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewFaq(prevFaq => ({
            ...prevFaq,
            question: event.target.value
        }));
    };

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewFaq(prevFaq => ({
            ...prevFaq,
            answer: event.target.value
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewFaq(prevFaq => ({
                    ...prevFaq,
                    image: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            let response;
            if (newFaq.id === undefined) {
                const postData = {
                    ...newFaq,
                    question: newFaq.question.toString(),
                    answer: newFaq.answer.toString(),
                    image: newFaq.image,
                };
                response = await axios.post(`${process.env.REACT_APP_API_BASE}/api/faq/`, postData, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
            } else {
                const putData = {
                    ...newFaq,
                    question: newFaq.question.toString(),
                    answer: newFaq.answer.toString(),
                    image: newFaq.image,
                };
                response = await axios.put(`${process.env.REACT_APP_API_BASE}/api/faq/${newFaq.id}/`, putData, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
            }

            setFaqs(response.data);
            handleResetFaq();
        } catch (error) {
            console.error('Error saving FAQs:', error);
        }
    }, [newFaq, handleResetFaq, setFaqs]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <CustomInput id={0} text={"Question"} value={newFaq.question || faq?.question} onChange={handleQuestionChange} error={""} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <CustomInput id={1} text={"Answer"} value={newFaq?.answer + "" || newFaq?.answer + ''} onChange={handleAnswerChange} error={""} />
            </Box>
            <Box
                sx={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <>
                    {(newFaq.image || faq?.image) && <img src={newFaq.image || (faq?.image)} alt="Image" style={{ width: '20%', height: '20%', marginRight: '10px' }} />}
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            backgroundColor: customTheme.palette.warning.light,
                            marginBottom: '10px',
                            textWrap: 'nowrap',
                            color: customTheme.palette.custom.white,
                        }}
                    >
                        {fileUrl ? 'Re-upload File' : 'Upload File'}
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                </>
            </Box>
            {!renderEditDelete ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FormButtonGroup
                        texts={[
                            'Edit Faq ',
                            'Delete Faq',
                        ]}
                        actions={[handleSetEdit]}
                        icons={[<Edit />]}
                        colours={[customTheme.palette.success.main, customTheme.palette.error.main]}
                    />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FormButtonGroup
                        texts={[
                            'Save',
                            'Cancel',
                        ]}
                        actions={[handleSave, handleCancel]}
                        icons={[<Save />, <Cancel />]}
                        colours={[customTheme.palette.success.main, customTheme.palette.error.main]}
                    />
                </Box>
            )}
        </>
    );
}

export default FaqForm;