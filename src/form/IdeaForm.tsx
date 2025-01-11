import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Cancel from '@mui/icons-material/Cancel';
import Edit from '@mui/icons-material/Edit';
import Garbage from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/CheckOutlined';

import CustomInput from '@materials/CustomInput';
import FormButtonGroup from '@materials/FormButtonGroup';
import Switch from '@mui/material/Switch';

import customTheme from '../theme';

import Idea from '../types/Idea';

interface IdeaFormProps {
    idea?: Idea | null;
    handleResetIdea: () => void;
    handleCancel: () => void;
    setIdeas: (ideas: Idea[]) => void;
}
function IdeaForm({ idea, handleResetIdea, handleCancel, setIdeas }: IdeaFormProps) {
    const [renderEditDelete, setRenderEditDelete] = useState(true);

    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

    const handleRefresh = useCallback(async () => {
        const newIdeas = await axios.get(`${process.env.REACT_APP_API_BASE}/api/ideas/`, {
            headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
        });
        setIdeas(newIdeas.data);
    }, [setIdeas]);

    const [newIdea, setNewIdea] = useState<Idea>({
        id: idea?.id || undefined,
        name: idea?.name || '',
        ideaDescription: idea?.ideaDescription || '',
        ideaDifficulty: idea?.ideaDifficulty || 0,
        visible: idea?.visible || true,
        image: idea?.image || '',
    });

    useEffect(() => {
        if (idea) {
            setNewIdea(idea);
        }
    }, [idea]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleSetEdit = useCallback(() => {
        setRenderEditDelete(false);
        setEdit(!edit);
    }, [setEdit, edit]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewIdea(prevIdea => ({
            ...prevIdea,
            name: event.target.value
        }));
    };

    const handleVisibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewIdea(prevIdea => ({
            ...prevIdea,
            visible: event.target.checked
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewIdea(prevIdea => ({
                    ...prevIdea,
                    image: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewIdea(prevIdea => ({
            ...prevIdea,
            ideaDescription: event.target.value
        }));
    };

    const handleDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setNewIdea(prevIdea => ({
            ...prevIdea,
            ideaDifficulty: value
        }));
    };

    const handleSave = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            let response;
            if (newIdea.id === undefined) {
                const postData = {
                    ...newIdea,
                    visible: newIdea.visible.toString(),
                    image: newIdea.image,
                };
                response = await axios.post(`${process.env.REACT_APP_API_BASE}/api/ideas/`, postData, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
            } else {
                const putData = {
                    ...newIdea,
                    visible: newIdea.visible.toString(),
                    image: newIdea.image,
                };
                response = await axios.put(`${process.env.REACT_APP_API_BASE}/api/ideas/${newIdea.id}/`, putData, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
            }

            setIdeas(response.data);
            handleResetIdea();
        } catch (error) {
            console.error('Error saving idea:', error);
        }
    }, [newIdea, handleResetIdea, setIdeas]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <CustomInput id={0} text={"Name"} value={newIdea.name || idea?.name} onChange={handleNameChange} error={""} />
                <Switch checked={newIdea.visible} onChange={handleVisibleChange} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <CustomInput id={1} text={"Difficulty"} value={newIdea?.ideaDifficulty + "" || idea?.ideaDifficulty + ''} onChange={handleDifficultyChange} error={""} />
            </Box>
            <Box
                sx={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <CustomInput width={'80%'} id={3} text={newIdea.ideaDescription || (idea?.ideaDescription || "Description")} onChange={handleDescriptionChange} error={""} />
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
                    {(newIdea.image || idea?.image) && <img src={newIdea.image || (idea?.image)} alt="Image" style={{ width: '20%', height: '20%', marginRight: '10px' }} />}
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
                            'Edit Product ',
                            'Delete Product',
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

export default IdeaForm;