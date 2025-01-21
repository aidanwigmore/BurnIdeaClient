import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { Button, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import Snackbar from '@mui/material/Snackbar';
import RatingComponent from '@mui/material/Rating';

import Text from '@materials/Text';

import customTheme from '../theme';

import Category from '../types/Category';
import Idea from '../types/Idea';
import { Size } from '../types/Size';

interface IdeaImageCardProps {
    idea: Idea | null;
    category: Category | null;
    renderDescription?: boolean;
    handleClick?: () => void;
}

const IdeaImageCardButton = React.forwardRef<HTMLButtonElement, IdeaImageCardProps>(({ idea, category, renderDescription, handleClick, ...props }, ref) => {
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

function IdeaImageCard({ idea, category, renderDescription }: IdeaImageCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // This will format the date according to the client's locale
      };
    
    const navigate = useNavigate();

    const [token, setToken] = useState<string | null>(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">('error');

    const sanitizedDescription = DOMPurify.sanitize(idea?.ideaDescription || '');

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
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}  
                >
                    <Text sx={{textAlign: 'center'}} size={Size.large} text={idea?.name ?? 'Idea Name'}/>
                </Box>
                <Box
                    sx={{
                        display: 'inline-flex',
                        flexDirection: 'row',
                        width: '99%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{display: 'inline-flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
                        <Text size={Size.medium} text={'Difficulty: '}/>
                        <RatingComponent
                            name="rating"
                            value={idea?.ideaDifficulty}
                            onChange={() => { }}
                            size="large"
                            readOnly={true}
                            sx={{marginLeft: '0'}}
                        />
                    </Box>
                    <Text size={Size.medium} text={`Created: ${ idea && idea.dateCreated && formatDate(idea.dateCreated.toString()) }`}/>
                </Box>
                <Tooltip title="Navigate to Idea page?" arrow>
                    <IdeaImageCardButton handleClick={handleClick} idea={idea} category={category} />
                </Tooltip>
                {renderDescription && renderDescription === true && (
                    <Box
                        sx={{
                            display: 'inline-flex',
                            flexDirection: 'row',
                            width: '99%',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            padding: '12px',
                        }}
                    >
                        <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
                    </Box>
                )}
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