import React, { useEffect, useState, useCallback } from 'react';

import { useAuth } from '@context/AuthContext';

import Box from '@mui/material/Box';
import Cancel from '@mui/icons-material/Cancel';
import Edit from '@mui/icons-material/Edit';
import Garbage from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/CheckOutlined';

import Alert from '@mui/material/Alert';
import CustomCheckBox from '@materials/CustomCheckBox';
import CustomInput from '@materials/SearchInput';
import FormButtonGroup from '@materials/FormButtonGroup';
import Snackbar from '@mui/material/Snackbar';

import customTheme from '../theme';

import Customer from '../types/Customer';

interface AccountFormProps {
    handleNavigation: (url: string | undefined) => void;
}

function AccountForm({ handleNavigation }: AccountFormProps) {
    const { customer, fetchCustomerDetails, updateCustomerDetails, error } = useAuth();
    const [updatedCustomer, setUpdatedCustomer] = useState<Partial<Customer>>({});

    const [renderEditDelete, setRenderEditDelete] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">('error');

    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);
    const [cancel, setCancel] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setName(e.target.value);
    // }

    // const handleGivenNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setGivenName(e.target.value);
    // };

    // const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPhoneNumber(e.target.value);
    // };

    useEffect(() => {
        fetchCustomerDetails();
      }, [fetchCustomerDetails]);

      const handleUpdate = async () => {
        try {
          await updateCustomerDetails(updatedCustomer);
          setSnackbarMessage('Customer details updated successfully.');
          setSeverity('success');
          setSnackbarOpen(true);
        } catch (err) {
          setSnackbarMessage('Failed to update customer details.');
          setSeverity('error');
          setSnackbarOpen(true);
        }
      };

    const handleSetEdit = useCallback(() => {
        setRenderEditDelete(false);
        setEdit(!edit);
    }, [setEdit, edit]);

    const handleCancel = useCallback(() => {
        setRenderEditDelete(true);
        setCancel(!cancel);
    }, [setCancel, cancel]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <CustomInput 
                    id={0} 
                    text={"First Name"} 
                    value={updatedCustomer.name || customer?.name} 
                    onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, name: e.target.value })} 
                    error={""} 
                />
                <CustomInput 
                    id={1} 
                    text={"Last Name"} 
                    value={updatedCustomer.givenName || customer?.givenName} 
                    onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, givenName: e.target.value })} 
                    error={""} 
                />
            </Box>
            <Box
                sx={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <CustomInput 
                    id={2} 
                    text={"Phone Number"} 
                    value={updatedCustomer.phoneNumber || customer?.phoneNumber} 
                    onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, phoneNumber: e.target.value })}
                    error={""} />
                <CustomInput 
                    id={3} 
                    text={"Email"}
                    value={customer?.email}
                    onChange={() => {}}
                    disabled={true}
                    error={""} 
                />
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
                        ]}
                        actions={[handleSetEdit]}
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
                        actions={[handleUpdate, handleCancel]}
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
