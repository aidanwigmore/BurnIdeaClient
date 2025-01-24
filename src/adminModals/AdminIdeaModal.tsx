import React, { useState, useCallback } from 'react';

import DOMPurify from 'dompurify';

import { useIdeaContext } from '@context/IdeaContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

import CustomTable from '@materials/CustomTable';
import Text from '@materials/Text';
import IdeaForm from '@form/IdeaForm';

import Idea from '../types/Idea';

import { Size } from '../types/Size';

interface AdminIdeaModalProps {
    idea: Idea | null;
    ideas: Idea[] | null,
    setIdea: (idea: Idea) => void;
    handleResetIdea: () => void;
    handleNavigation: (url: string | undefined) => void;
}

function AdminIdeaModal({ idea, ideas, setIdea, handleResetIdea, handleNavigation }: AdminIdeaModalProps) {
    const { fetchIdeas, deleteIdea } = useIdeaContext();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
    const [newIdea, setNewIdea] = useState<Idea | null>(null);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleEdit = (idea: Idea) => {
        setSelectedIdea(idea);
    };

    const handleCancel = () => {
        setSelectedIdea(null);
        setNewIdea(null);
    };

    const filteredIdeas = ideas?.filter((idea) => {
        const searchQueryLowerCase = searchQuery.toLowerCase();
        const searchQueryNumber = Number(searchQueryLowerCase);
        return (
            idea.id?.toString().toLowerCase().includes(searchQueryLowerCase) ||
            idea.name?.toLowerCase().includes(searchQueryLowerCase) ||
            idea.ideaDescription?.toLowerCase().includes(searchQueryLowerCase) ||
            idea.ideaDifficulty === searchQueryNumber
        );
    });

    const handleRefresh = useCallback(async () => {
        fetchIdeas();
    }, []);

    const handleDelete = useCallback((idea: Idea) => {
        deleteIdea(idea.id || '');
        handleResetIdea();
        handleRefresh();
    }, [handleResetIdea, handleRefresh]);

    const transformedIdeas = filteredIdeas?.map((idea) => ({
        id: idea.id || '',
        extraData: [
            idea.id || '',
            idea.name,
            <img src={idea.image} alt={idea.name} style={{ width: "50px", height: "50px" }} />,
            <b>{idea.ideaDifficulty}</b>,
            idea.visible.toString(),
            <div style={{ maxWidth: '100px', maxHeight: '100px', overflow: 'auto' }}>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(idea?.ideaDescription || '') }} />
            </div>,
        ],
        actions: (
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Button
                    onClick={() => handleEdit(idea)}
                    variant="contained"
                    color="success"
                    sx={{ margin: '5px' }}
                >
                    Edit
                </Button>
                <Button
                    onClick={() => handleDelete(idea)}
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
                <Text size={Size.large} text={"Ideas"} />
            </Box>
            <Divider />
            {(selectedIdea || newIdea) ? (
                <>
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <Text text={selectedIdea?.id ? `Edit Idea ${selectedIdea.id}` : 'Create Idea'} />
                    </Box>
                    <Box>
                        <IdeaForm
                            idea={selectedIdea ?? newIdea}
                            handleCancel={handleCancel}
                            handleResetIdea={handleResetIdea}
                        />
                    </Box>
                </>
            ) : (
                <Button sx={{ marginLeft: '12px' }} color="success" variant="contained" onClick={() => setNewIdea({ name: '', visible: false, ideaDescription: '', ideaDifficulty: 0, dateCreated: new Date() })}>
                    Create Idea
                </Button>
            )}
            <Box sx={{ width: '100%', textAlign: 'center', marginTop: '24px' }}>
                <TextField
                    label="Search Ideas"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    sx={{ marginBottom: '20px', width: '50vw', marginLeft: 'auto', marginRight: 'auto' }}
                />
            </Box>
            <CustomTable
                columns={["ID", "name", "image", "difficulty", "visible", "description", "actions"]}
                data={transformedIdeas ?? []}
            />
        </Card>
    );
}

export default AdminIdeaModal;
