import React, { useState, useCallback } from 'react';
import DOMPurify from 'dompurify';

import { useAboutContext } from '@context/AboutContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

import CustomTable from '@materials/CustomTable';
import Text from '@materials/Text';
import AboutForm from '@form/AboutForm';

import About from '../types/About';

import { Size } from '../types/Size';

interface AdminAboutModalProps {
    about: About | null;
    abouts: About[] | null,
    setAbout: (about: About) => void;
    handleResetAbout: () => void;
    handleNavigation: (url: string | undefined) => void;
}

function AdminAboutModal({ about, abouts, setAbout, handleResetAbout, handleNavigation }: AdminAboutModalProps) {
    const { fetchAbouts, deleteAbout } = useAboutContext();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAbout, setSelectedAbout] = useState<About | null>(null);
    const [newAbout, setNewAbout] = useState<About | null>(null);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleEdit = (about: About) => {
        setSelectedAbout(about);
    };

    const handleCancel = () => {
        setSelectedAbout(null);
        setNewAbout(null);
    };

    const filteredAbouts = abouts?.filter((about: About) => {
        const searchQueryLowerCase = searchQuery.toLowerCase();
        const searchQueryNumber = Number(searchQueryLowerCase);
        return (
            about.id?.toString().toLowerCase().includes(searchQueryLowerCase) ||
            about.content?.toLowerCase().includes(searchQueryLowerCase)
        );
    });

    const handleRefresh = useCallback(async () => {
            fetchAbouts();
    }, []);

    const handleDelete = useCallback((about : About) => {
        deleteAbout(about.id || '');
        handleResetAbout();
        handleRefresh();
    }, [handleResetAbout, handleRefresh]); 

    const transformedAbouts = filteredAbouts?.map((about) => ({
        id: about.id || '',
        extraData: [
            about.id || '',
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(about.content || '') }} />,
            about?.visible ? 'True' : 'False',
            <img src={about.image} alt={"About image"} style={{ width: "50px", height: "50px" }} />,
        ],
        actions: (
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Button
                    onClick={() => handleEdit(about)}
                    variant="contained"
                    color="success"
                    sx={{ margin: '5px' }}
                >
                    Edit
                </Button>
                <Button
                    onClick={() => handleDelete(about)}
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
                <Text size={Size.large} text={"Abouts"} />
            </Box>
            <Divider />
            {(selectedAbout || newAbout) ? (
                <>
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <Text text={selectedAbout?.id ? `Edit About ${selectedAbout.id}` : 'Create About'} />
                    </Box>
                    <Box>
                        <AboutForm
                            about={selectedAbout ?? newAbout}
                            handleCancel={handleCancel}
                            handleResetAbout={handleResetAbout}
                        />
                    </Box>
                </>
            ) : (
                <Button sx={{ marginLeft: '12px' }} color="success" variant="contained" onClick={() => setNewAbout({ content: '' })}>
                    Create About
                </Button>
            )}
            <Box sx={{ width: '100%', textAlign: 'center', marginTop: '24px' }}>
                <TextField
                    label="Search Abouts"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    sx={{ marginBottom: '20px', width: '50vw', marginLeft: 'auto', marginRight: 'auto' }}
                />
            </Box>
            <CustomTable
                columns={["ID", "content", "visible", "image", "actions"]}
                data={transformedAbouts ?? []}
            />
        </Card>
    );
}

export default AdminAboutModal;
