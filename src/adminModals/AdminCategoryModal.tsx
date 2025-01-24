import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Text from '@materials/Text';
import TextField from '@mui/material/TextField';

import { useCategoryContext } from '@context/CategoryContext';

import CustomTable from '@materials/CustomTable';
import CategoryForm from '@form/CategoryForm';

import Category from '../types/Category';
import Idea from '../types/Idea';
import { Size } from '../types/Size';

interface AdminCategoryModalProps {
    category: Category | null;
    ideas: Idea[] | null;
    categories: Category[] | null;
    setCategory: (category: Category) => void;
    handleResetCategory: () => void;
    handleNavigation: (url: string | undefined) => void;
}

function AdminCategoryModal({ category, ideas, setCategory, categories, handleResetCategory, handleNavigation }: AdminCategoryModalProps) {
    const { fetchCategories, deleteCategory } = useCategoryContext();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [newCategory, setNewCategory] = useState<Category | null>(null);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredCategories = categories?.filter((category) => {
        const searchQueryLowerCase = searchQuery.toLowerCase();
        return (
            category.id?.toString().toLowerCase().includes(searchQueryLowerCase) ||
            category.name?.toLowerCase().includes(searchQueryLowerCase) ||
            category.categoryDescription?.toLowerCase().includes(searchQueryLowerCase)
        );
    });

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
    };

    const handleCancel = () => {
        setSelectedCategory(null);
        setNewCategory(null);
    };

    const handleDelete = (category: Category) => {
        deleteCategory(category.id ?? '');
        handleResetCategory();
        fetchCategories();
    };

    const transformedCategories = filteredCategories?.map((category) => ({
        id: category.id || '',
        extraData: [
            category.id || '',
            category.name,
            category.visible.toString(),
            category.categoryDescription,
            category.ideas.join(', '),
        ],
        actions: (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    onClick={() => handleEdit(category)}
                    variant="contained"
                    color="success"
                    sx={{ margin: '5px' }}
                >
                    Edit
                </Button>
                <Button
                    onClick={() => handleDelete(category)}
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
                <Text size={Size.large} text={"Categories"} />
            </Box>
            {(selectedCategory || newCategory) ? (
                <>
                    <Divider />
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <Text text={selectedCategory?.id ? `Edit Category ${selectedCategory.id}` : 'Create Category'} />
                    </Box>
                    <Box>
                        <CategoryForm
                            category={selectedCategory ?? newCategory}
                            ideas={ideas}
                            handleCancel={handleCancel}
                            handleResetCategory={handleResetCategory}
                        />
                    </Box>
                </>
            ) : (
                <Button sx={{ marginLeft: '12px' }} color="success" variant="contained" onClick={() => setNewCategory({ name: '', visible: false, categoryDescription: '', ideas: [], color: '' })}>
                    Create Category
                </Button>
            )}
            <Box sx={{ width: '100%', textAlign: 'center', marginTop: '24px' }}>
                <TextField
                    label="Search Categories"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    sx={{ marginBottom: '20px', width: '50vw', marginLeft: 'auto', marginRight: 'auto' }}
                />
            </Box>
            <CustomTable
                columns={["ID", "name", "visible", "description", "product ids", "actions"]}
                data={transformedCategories ?? []}
            />
        </Card>
    );
}

export default AdminCategoryModal;
