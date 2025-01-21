import React, { useState } from 'react';
import DOMPurify from 'dompurify';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

import Text from '@materials/Text';

import customTheme from '../theme';

import About from '../types/About';

import { Size } from '../types/Size';

interface AboutContentProps {
    abouts: About[] | null;
}

function AboutContent({ abouts }: AboutContentProps) {    

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                backgroundColor: customTheme.palette.secondary.main,
                borderRadius: '15px',
                gap: '12px',
                marginRight: 'auto',
                overflow: 'hidden',
                flexWrap: 'wrap',
            }}>
                <Box sx={{
                    gridArea: 'content', padding: '12px', textAlign: 'center', backgroundColor: customTheme.palette.secondary.main,
                    gap: '12px',
                    borderRadius: '15px',
                    marginBottom: '12px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '100%',
                }}>
                    <Text color={customTheme.palette.primary.main} sx={{ width: '99%', textAlign: 'center' }} size={Size.large} text={"About Us"} />
                    <Divider color={customTheme.palette.primary.main}/>
                    <Box>
                        <List>
                            {abouts?.map((about, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid black',
                                        backgroundColor: 'white',
                                        borderRadius: '12px',
                                    }}
                                    >
                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(about.content || '') }} />
                                    <img style={{width: '50%'}} src={about.image} alt={"About image"} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </Box >
        </>
    );
};

export default AboutContent;
