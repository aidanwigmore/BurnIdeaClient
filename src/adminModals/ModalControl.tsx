import React from 'react';

import ModalOverLay from '../customerModals/ModalOverLay';

interface ModalControlProps {
    modalOverLayOpen: boolean;
    setModalOverLayOpen: () => void;
    children?: React.ReactNode;
}

function ModalControl({ modalOverLayOpen, children, setModalOverLayOpen }: ModalControlProps) {
    if (!modalOverLayOpen) {
        return null;
    }

    return (
        <>
            <ModalOverLay modalOverLayOpen={modalOverLayOpen} setModalOverLayOpen={setModalOverLayOpen}>
                {children}
            </ModalOverLay>
        </>
    );
}

export default ModalControl;
