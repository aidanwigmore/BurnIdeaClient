import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import XIcon from '@mui/icons-material/Close';

interface ModalOverLayProps {
    modalOverLayOpen: boolean;
    setModalOverLayOpen: () => void;
    children: React.ReactNode;
}

function ModalOverLay({ modalOverLayOpen, setModalOverLayOpen, children }: ModalOverLayProps) {
    return (
        <>
            <Box>
                <Modal
                    open={modalOverLayOpen}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Box
                        sx={{
                            paddingTop: '10px',
                            paddingLeft: '10px',
                        }}
                    >
                        <Button
                            sx={{ marginRight: '0px' }}
                            variant="contained"
                            color="warning"
                            onClick={setModalOverLayOpen}
                        >
                            <XIcon />
                        </Button>
                        {children}
                    </Box>
                </Modal>
            </Box>
        </>
    );
}

export default ModalOverLay;