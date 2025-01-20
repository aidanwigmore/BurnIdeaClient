import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Cancel from '@mui/icons-material/Cancel';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/CheckOutlined';
import Switch from '@mui/material/Switch';

import Text from '@materials/Text';
import RichTextEditor from '@materials/RichTextEditor';
import FormButtonGroup from '@materials/FormButtonGroup';
 
import customTheme from '../theme';

import About from '../types/About';
import { Size } from '../types/Size';

interface AboutFormProps {
    about?: About | null;
    handleResetAbout: () => void;
    handleCancel: () => void;
    setAbouts: (abouts: About[]) => void;
}
function AboutForm({ about, handleResetAbout, handleCancel, setAbouts }: AboutFormProps) {
    const [renderEditDelete, setRenderEditDelete] = useState(true);

    const [edit, setEdit] = useState(false);

    const handleRefresh = useCallback(async () => {
        const newAbouts = await axios.get(`${process.env.REACT_APP_API_BASE}/api/about/`, {
            headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
        });
        setAbouts(newAbouts.data);
    }, [setAbouts]);

    const [newAbout, setNewAbout] = useState<About>({
        id: about?.id || undefined,
        content: about?.content || '',
        visible: about?.visible || false,
        image: about?.image || '',
    });

    useEffect(() => {
        if (about) {
            setNewAbout(about);
        }
    }, [about]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleSetEdit = useCallback(() => {
        setRenderEditDelete(false);
        setEdit(!edit);
    }, [setEdit, edit]);

    const handleContentChange = (value: string) => {
        setNewAbout(prevAbout => ({
            ...prevAbout,
            content: value
        }));
    };

    const handleVisibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAbout(prevAbout => ({
            ...prevAbout,
            visible: event.target.checked
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewAbout(prevAbout => ({
                    ...prevAbout,
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
            if (newAbout.id === undefined) {
                const postData = {
                    ...newAbout,
                    content: newAbout.content.toString(),
                    image: newAbout.image,
                };
                response = await axios.post(`${process.env.REACT_APP_API_BASE}/api/about/`, postData, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
            } else {
                const putData = {
                    ...newAbout,
                    content: newAbout.content.toString(),
                    image: newAbout.image,
                };
                response = await axios.put(`${process.env.REACT_APP_API_BASE}/api/about/${newAbout.id}/`, putData, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
            }

            setAbouts(response.data);
            handleResetAbout();
        } catch (error) {
            console.error('Error saving Abouts:', error);
        }
    }, [newAbout, handleResetAbout, setAbouts]);

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
                <Text size={Size.medium} text={"Content"}/>
                <RichTextEditor value={newAbout.content || (about?.content || '')} onChange={handleContentChange}/>
            </Box>
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
                <Text size={Size.medium} text={"Visible?"}/>
                <Switch checked={newAbout.visible} onChange={handleVisibleChange} />
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
                    {(newAbout.image || about?.image) && <img src={newAbout.image || (about?.image)} alt="Image" style={{ width: '20%', height: '20%', marginRight: '10px' }} />}
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
                            'Edit About ',
                            'Delete About',
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

export default AboutForm;