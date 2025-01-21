import React from 'react';

import { Box, Card, Typography } from '@mui/material';

import customTheme from '../theme';

import Idea from '../types/Idea';

interface IdeaInfoCardProps {
    idea: Idea;
}

function IdeaInfoCard({ idea }: IdeaInfoCardProps) {
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
                marginBottom: "12px",
                borderRadius: "15px",
                width: { xs: '100%', sm: '100%' },
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            }} variant="outlined"
        >
            <Box
                sx={{
                    marginLeft: '12px',
                    marginRight: '12px',
                }}
            >
                <Box
                    sx={{

                    }}
                >
                    <Typography
                        sx={{
                            color: customTheme.palette.custom.black,
                            fontFamily: 'CustomCategoryFont, sans-serif',
                            fontSize: 25,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        {"Idea Details"}
                    </Typography>
                    <Typography
                        sx={{
                            color: customTheme.palette.custom.black,
                            fontFamily: 'sans-serif',
                            fontSize: 15,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        {`${idea.ideaDescription}`}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: '99%',
                        display: 'inline-flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        sx={{
                            color: customTheme.palette.custom.black,
                            fontFamily: 'CustomCategoryFont, sans-serif',
                            fontSize: 25,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        {"Difficulty"}
                    </Typography>
                    <Typography
                        sx={{
                            color: customTheme.palette.custom.black,
                            fontFamily: 'sans-serif',
                            fontSize: 15,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        {`${idea.ideaDifficulty}`}
                    </Typography>
                </Box>
            </Box>
        </Card >
    )
}

export default IdeaInfoCard;