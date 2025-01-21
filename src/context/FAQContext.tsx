import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import FAQ from '../types/FAQ';

interface FaqContextProps {
  faqs: FAQ[];
  error: string | null;
  fetchFaqs: () => Promise<void>;
  createFaq: (newFaq: Partial<FAQ>) => Promise<void>;
  updateFaq: (id: string, updatedFaq: Partial<FAQ>) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
}

export const FaqContext = createContext<FaqContextProps | undefined>(undefined);

interface FaqProviderProps {
  children: ReactNode;
}

export const FaqProvider: React.FC<FaqProviderProps> = ({ children }) => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE}/api/faq/`);
      setFaqs(response.data);
    } catch (err) {
      setError('Failed to fetch faqs');
    }
  };

  const createFaq = async (newFaq: Partial<FAQ>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/api/faq/`, newFaq, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setFaqs([...faqs, response.data]);
    } catch (err) {
      setError('Failed to create faq');
    }
  };

  const updateFaq = async (id: string, updatedFaq: Partial<FAQ>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${process.env.REACT_APP_API_BASE}/api/faq/${id}/`, updatedFaq, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setFaqs(faqs.map(faq => (faq.id === id ? response.data : faq)));
    } catch (err) {
      setError('Failed to update faq');
    }
  };

  const deleteFaq = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_BASE}/api/faq/${id}/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setFaqs(faqs.filter(faq => faq.id !== id));
    } catch (err) {
      setError('Failed to delete faq');
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <FaqContext.Provider value={{ faqs, error, fetchFaqs, createFaq, updateFaq, deleteFaq }}>
      {children}
    </FaqContext.Provider>
  );
};

export const useFaqContext = () => {
  const context = useContext(FaqContext);
  if (context === undefined) {
    throw new Error('useFaqContext must be used within an FaqProvider');
  }
  return context;
};