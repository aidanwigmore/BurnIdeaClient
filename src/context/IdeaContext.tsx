import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import Idea from '../types/Idea';

interface IdeaContextProps {
  ideas: Idea[];
  error: string | null;
  fetchIdeas: () => Promise<void>;
  createIdea: (newIdea: Partial<Idea>) => Promise<void>;
  updateIdea: (id: string, updatedIdea: Partial<Idea>) => Promise<void>;
  deleteIdea: (id: string) => Promise<void>;
}

export const IdeaContext = createContext<IdeaContextProps | undefined>(undefined);

interface IdeaProviderProps {
  children: ReactNode;
}

export const IdeaProvider: React.FC<IdeaProviderProps> = ({ children }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchIdeas = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE}/api/ideas/`);
      setIdeas(response.data);
    } catch (err) {
      setError('Failed to fetch ideas');
    }
  };

  const createIdea = async (newIdea: Partial<Idea>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/api/ideas/`, newIdea, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setIdeas([...ideas, response.data]);
    } catch (err) {
      setError('Failed to create idea');
    }
  };

  const updateIdea = async (id: string, updatedIdea: Partial<Idea>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${process.env.REACT_APP_API_BASE}/api/ideas/${id}/`, updatedIdea, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setIdeas(ideas.map(idea => (idea.id === id ? response.data : idea)));
    } catch (err) {
      setError('Failed to update idea');
    }
  };

  const deleteIdea = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_BASE}/api/ideas/${id}/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setIdeas(ideas.filter(idea => idea.id !== id));
    } catch (err) {
      setError('Failed to delete idea');
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <IdeaContext.Provider value={{ ideas, error, fetchIdeas, createIdea, updateIdea, deleteIdea }}>
      {children}
    </IdeaContext.Provider>
  );
};

export const useIdeaContext = () => {
  const context = useContext(IdeaContext);
  if (context === undefined) {
    throw new Error('useIdeaContext must be used within an IdeaProvider');
  }
  return context;
};