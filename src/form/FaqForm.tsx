import React, { useState, useCallback, useEffect } from 'react';

import { useFaqContext } from '@context/FAQContext';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Cancel from '@mui/icons-material/Cancel';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/CheckOutlined';

import Text from '@materials/Text';
import RichTextEditor from '@materials/RichTextEditor';
import FormButtonGroup from '@materials/FormButtonGroup';

import customTheme from '../theme';

import FAQ from '../types/FAQ';
import { Size } from '../types/Size';

interface FaqFormProps {
    faq?: FAQ | null;
    handleResetFaq: () => void;
    handleCancel: () => void;
}
function FaqForm({ faq, handleResetFaq, handleCancel }: FaqFormProps) {
    const { fetchFaqs, updateFaq, createFaq } = useFaqContext();

    const [renderEditDelete, setRenderEditDelete] = useState(true);

    const [edit, setEdit] = useState(false);

    const handleRefresh = useCallback(async () => {
        fetchFaqs();
    }, []);

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

    const handleQuestionChange = (value: string) => {
        setNewFaq(prevFaq => ({
            ...prevFaq,
            question: value
        }));
    };

    const handleAnswerChange = (value: string) => {
        setNewFaq(prevFaq => ({
            ...prevFaq,
            answer: value
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
                createFaq(postData);
            } else {
                const putData = {
                    ...newFaq,
                    question: newFaq.question.toString(),
                    answer: newFaq.answer.toString(),
                    image: newFaq.image,
                };
                updateFaq(newFaq.id, putData);
            }
            handleCancel();
            handleRefresh();
            handleResetFaq();
        } catch (error) {
            console.error('Error saving FAQs:', error);
        }
    }, [newFaq, handleResetFaq, handleCancel, handleRefresh]);

    return (
        <>
            <Box
                sx={{
                    width: '80%', 
                    backgroundColor: customTheme.palette.primary.light,
                    padding: '10px',
                    borderRadius: '10px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '12px',
                }}
            >
                <Text size={Size.medium} text={"Question"}/>
                <RichTextEditor value={newFaq.question || (faq?.question || '')} onChange={handleQuestionChange}/>
            </Box>
            <Box
                sx={{
                    width: '80%', 
                    backgroundColor: customTheme.palette.primary.light,
                    padding: '10px',
                    borderRadius: '10px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Text size={Size.medium} text={"Answer"}/>
                <RichTextEditor value={newFaq.answer || (faq?.answer || '')} onChange={handleAnswerChange}/>
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