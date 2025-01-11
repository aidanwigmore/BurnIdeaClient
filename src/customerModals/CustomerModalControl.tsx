import React from 'react';

import ModalOverLay from './ModalOverLay';

interface CustomerModalControlProps {
    modalOverLayOpen: boolean;
    setModalOverLayOpen: () => void;
    children?: React.ReactNode;
}

function CustomerModalControl({ modalOverLayOpen, children, setModalOverLayOpen }: CustomerModalControlProps) {
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

export default CustomerModalControl;
