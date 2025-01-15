import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import Customer from '../types/Customer';
import axios from 'axios';

interface AuthContextProps {
  customer: Customer | null;
  token: string | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, givenName: string, phoneNumber: string, subscribedToNewsletter: boolean, smsNotifications: boolean, emailNotifications: boolean) => Promise<void>;
  logout: () => void;
  fetchCustomerDetails: () => Promise<void>;
  updateCustomerDetails: (updatedCustomer: Partial<Customer>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchCustomerDetails();
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string }>(`${process.env.REACT_APP_API_BASE}/api/customers/login/`, { email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      await fetchCustomerDetails();
    } catch (err) {
      setError('Login failed');
      console.error('Error logging in:', err);
    }
  };

  const register = async (name: string, email: string, password: string, givenName: string, phoneNumber: string, subscribedToNewsletter: boolean, smsNotifications: boolean, emailNotifications: boolean) => {
    try {
      const response = await axios.post<{ token: string }>(`${process.env.REACT_APP_API_BASE}/api/customers/register/`, 
        { 
          name, email, password, 
          givenName,
          phoneNumber,
          subscribedToNewsletter,
          smsNotifications,
          emailNotifications
        });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      await fetchCustomerDetails();
    } catch (err) {
      setError('Registration failed');
      console.error('Error registering:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCustomer(null);
  };

  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get<Customer>(`${process.env.REACT_APP_API_BASE}/api/customers/me/`, {
        headers: { 'Authorization': `Token ${token}` }
      });
      setCustomer(response.data);
    } catch (err) {
      setError('Failed to fetch customer details');
      console.error('Error fetching customer details:', err);
    }
  };

  const updateCustomerDetails = async (updatedCustomer: Partial<Customer>) => {
    try {
      const response = await axios.put<Customer>(`${process.env.REACT_APP_API_BASE}/api/customers/me/`, updatedCustomer, {
        headers: { 'Authorization': `Token ${token}` }
      });
      setCustomer(response.data);
    } catch (err) {
      setError('Failed to update customer details');
      console.error('Error updating customer details:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      customer, 
      token, 
      error, 
      login, 
      register, 
      logout, 
      fetchCustomerDetails, 
      updateCustomerDetails 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};