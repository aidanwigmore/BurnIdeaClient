import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import customTheme from '../theme';

interface FormButtonGroupProps {
    actions: (() => void)[];
    texts:  string[];
    icons: React.ReactNode[];
    colours: string[];
}

function  FormButtonGroup({ actions, texts, icons, colours }: FormButtonGroupProps) {

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    gridGap: '10px',
                }}
            >
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        onClick={() => {
                            action();
                        }}
                        sx={{
                            backgroundColor: colours[index],
                            marginBottom: '10px',
                            textWrap: 'nowrap',
                            color: customTheme.palette.custom.white,
                        }}
                    >
                        {icons[index]}
                        {texts[index]}
                    </Button>
                ))}
            </Box>
        </>
    );
}

export default FormButtonGroup;
