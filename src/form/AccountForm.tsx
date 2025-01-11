import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Cancel from '@mui/icons-material/Cancel';
import Edit from '@mui/icons-material/Edit';
import Garbage from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/CheckOutlined';

import Alert from '@mui/material/Alert';
import CustomCheckBox from '@materials/CustomCheckBox';
import CustomInput from '@materials/CustomInput';
import FormButtonGroup from '@materials/FormButtonGroup';
import Snackbar from '@mui/material/Snackbar';

import customTheme from '../theme';

import Customer from '../types/Customer';

interface AccountFormProps {
    handleNavigation: (url: string | undefined) => void;
    customer: Customer | null;
    token: string;
}

function AccountForm({ token, customer, handleNavigation }: AccountFormProps) {
    const [name, setName] = useState('');
    const [givenName, setGivenName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const [renderEditDelete, setRenderEditDelete] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">('error');

    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleGivenNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGivenName(e.target.value);
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const handleSave = useCallback(() => {
        setRenderEditDelete(true);
        setSave(!save);
        const customerData = {
            name: name,
            givenName: givenName,
            phoneNumber: phoneNumber,
            email: email,
        };
        try {
            axios.put(`${process.env.REACT_APP_API_BASE}/api/customers/update/`, customerData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
                .then((response) => {
                    setSnackbarMessage('Customer updated successfully');
                    setSeverity('success');
                })
                .catch((error) => {
                    setSnackbarMessage('Error updating customer');
                    setSeverity('error');
                });
        } catch (error) {
            setSnackbarMessage('Error updating customer');
            setSeverity('error');
        }
        setSnackbarOpen(true)
    }, [name, givenName, phoneNumber, email, token, save]);

    const handleSetEdit = useCallback(() => {
        setRenderEditDelete(false);
        setEdit(!edit);
    }, [setEdit, edit]);

    const handleCancel = useCallback(() => {
        setRenderEditDelete(true);
        setCancel(!cancel);
    }, [setCancel, cancel]);

    const handleDelete = useCallback(() => {
        setRenderEditDelete(true);
        setDeleteAccount(!deleteAccount);
    }, [setDeleteAccount, deleteAccount]);

    useEffect(() => {
        if (customer) {
            setName(customer.name);
            setGivenName(customer.givenName);
            setPhoneNumber(customer.phoneNumber);
            setEmail(customer.email);
        }
    }, [customer]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <CustomInput id={0} text={"First Name"} value={name} onChange={handleNameChange} error={""} />
                <CustomInput id={1} text={"Last Name"} value={givenName} onChange={handleGivenNameChange} error={" "} />
            </Box>
            <Box
                sx={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <CustomInput id={2} text={"Phone Number"} value={phoneNumber} onChange={handlePhoneNumberChange} error={""} />
                <CustomInput id={3} text={`${email}`} disabled={true} error={""} />
            </Box>
            <Box
                sx={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <Box
                    sx={{
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <CustomCheckBox value={false} text={"Subscribed to the newsletter?"} />
                    <CustomCheckBox value={false} text={"SMS Notifications On?"} />
                    <CustomCheckBox value={false} text={"Email Notifications On?"} />
                </Box>
            </Box>
            {renderEditDelete !== true ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FormButtonGroup
                        texts={[
                            'Edit Account ',
                            'Delete Account',
                        ]}
                        actions={[handleSetEdit, handleDelete]}
                        icons={[<Edit />, <Garbage />]}
                        colours={[customTheme.palette.success.main, customTheme.palette.error.main]}
                    />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FormButtonGroup
                        texts={[
                            'Save Changes ',
                            'Cancel Changes',
                        ]}
                        actions={[handleSave, handleCancel]}
                        icons={[<Save />, <Cancel />]}
                        colours={[customTheme.palette.success.main, customTheme.palette.error.main]}
                    />
                </Box>
            )}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={severity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default AccountForm;
