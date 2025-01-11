interface Customer {
    id?: string;
    name: string;
    givenName: string;
    phoneNumber: string;
    email: string;
    subscribedToNewsletter: boolean;
    smsNotifications: boolean;
    emailNotifications: boolean;
    isActive: boolean;
    isStaff: boolean;
    isSuperuser: boolean;
}

export default Customer;
