import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import About from '../types/About';

interface AboutContextProps {
  abouts: About[];
  error: string | null;
  fetchAbouts: () => Promise<void>;
  createAbout: (newAbout: Partial<About>) => Promise<void>;
  updateAbout: (id: string, updatedAbout: Partial<About>) => Promise<void>;
  deleteAbout: (id: string) => Promise<void>;
}

export const AboutContext = createContext<AboutContextProps | undefined>(undefined);

interface AboutProviderProps {
  children: ReactNode;
}

export const AboutProvider: React.FC<AboutProviderProps> = ({ children }) => {
  const [abouts, setAbouts] = useState<About[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAbouts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE}/api/about/`);
      setAbouts(response.data);
    } catch (err) {
      setError('Failed to fetch abouts');
    }
  };

  const createAbout = async (newAbout: Partial<About>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/api/about/`, newAbout, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setAbouts([...abouts, response.data]);
    } catch (err) {
      setError('Failed to create about');
    }
  };

  const updateAbout = async (id: string, updatedAbout: Partial<About>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${process.env.REACT_APP_API_BASE}/api/about/${id}/`, updatedAbout, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setAbouts(abouts.map(about => (about.id === id ? response.data : about)));
    } catch (err) {
      setError('Failed to update about');
    }
  };

  const deleteAbout = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_BASE}/api/about/${id}/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setAbouts(abouts.filter(about => about.id !== id));
    } catch (err) {
      setError('Failed to delete about');
    }
  };

  useEffect(() => {
    fetchAbouts();
  }, []);

  return (
    <AboutContext.Provider value={{ abouts, error, fetchAbouts, createAbout, updateAbout, deleteAbout }}>
      {children}
    </AboutContext.Provider>
  );
};

export const useAboutContext = () => {
  const context = useContext(AboutContext);
  if (context === undefined) {
    throw new Error('useAboutContext must be used within an AboutProvider');
  }
  return context;
};