import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Bookmark from '@mui/icons-material/Bookmark';
import Box from '@mui/material/Box';
import { Button, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import Star from '@mui/icons-material/Star';
import Snackbar from '@mui/material/Snackbar';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import customTheme from '../theme';

import Category from '../types/Category';
import Idea from '../types/Idea';

interface IdeaImageCardProps {
    idea: Idea | null;
    category: Category | null;
    handleClick?: () => void;
}

const IdeaImageCardButton = React.forwardRef<HTMLButtonElement, IdeaImageCardProps>(({ idea, category, handleClick, ...props }, ref) => {
    return (
        <Button
            ref={ref}
            variant="contained"
            sx={{
                marginTop: '12px',
                marginBottom: '12px',
                paddingLeft: '12px',
                paddingRight: '12px',
                borderRadius: "15px",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                color: customTheme.palette.custom.black,
                fontFamily: 'CustomCategoryFont, sans-serif',
                backgroundColor: customTheme.palette.custom.white,
                fontWeight: 1000,
                fontSize: 50,
            }}
            onClick={handleClick}
            {...props}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                    backgroundColor: category?.color || customTheme.palette.primary.main,
                    margin: '16px auto',
                }}
            >
                <img src={idea?.image ? `${idea.image}` : `${'https://via.placeholder.com/'}${100}`} alt="Idea" style={{ borderRadius: '7px', cursor: 'pointer', maxWidth: '50%', maxHeight: '50%', width: '50%', height: '50%' }} />
            </Box>
        </Button >
    )
});

function IdeaImageCard({ idea, category }: IdeaImageCardProps) {
    const navigate = useNavigate();

    const [token, setToken] = useState<string | null>(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">('error');

    const handleClick = useCallback(() => {
        console.log('navigating to idea');
        navigate(`/ideas/${idea?.id}`);
    }, [idea, navigate]);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }
    }, [navigate]);

    return (
        <Card
            sx={{
                '@keyframes fadeIn': {
                    from: {
                        opacity: 0,
                    },
                    to: {
                        opacity: 1,
                    },
                },
                animation: 'fadeIn 1s ease-in-out',
                borderRadius: "15px",
                width: { xs: '100%', sm: '100%' },
                marginBottom: '12px',
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            }} variant="outlined"
        >
            <Box
                sx={{
                    display: 'inline-flex',
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'inline-flex',
                        flexDirection: 'row',
                        width: '99%',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            color: customTheme.palette.custom.black,
                            fontFamily: 'CustomCategoryFont, sans-serif',
                            fontSize: '20px',
                        }}
                    >
                        {idea?.name}
                    </Typography>
                    <Typography
                        sx={{
                            color: customTheme.palette.custom.black,
                            fontFamily: 'CustomCategoryFont, sans-serif',
                            fontSize: '25px',
                        }}
                    >
                        Difficulty: {idea?.ideaDifficulty}
                    </Typography>
                </Box>
                <Tooltip title="Navigate to Idea page?" arrow>
                    <IdeaImageCardButton handleClick={handleClick} idea={idea} category={category} />
                </Tooltip>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={severity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Card >
    )
}

export default IdeaImageCard;