import React from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

import customTheme from '../theme';

import Category from '../types/Category';
import { Size } from '../types/Size';

interface CategoryButtonProps {
    text: string;
    categoryId: string;
    category?: Category;
}

const CategoryButton = React.forwardRef<HTMLButtonElement, CategoryButtonProps>(({ text, categoryId, category }, ref) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/categories/${categoryId}`);
    };

    return (
        <Button
            ref={ref}
            variant="contained"
            sx={{
                width: '50%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '12px',
                marginBottom: '12px',
                borderRadius: "15px",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                color: customTheme.palette.custom.black,
                fontFamily: 'Raleway Large, sans-serif',
                fontSize: Size["large"],
                backgroundColor: category?.color ?? customTheme.palette.success.main,
            }}
            onClick={() => {}}
        >
            {text}
        </Button>
    )
});

export default CategoryButton;
