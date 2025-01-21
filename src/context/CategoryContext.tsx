import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import Category from '../types/Category';

interface CategoryContextProps {
  categories: Category[];
  error: string | null;
  fetchCategories: () => Promise<void>;
  createCategory: (newCategory: Partial<Category>) => Promise<void>;
  updateCategory: (id: string, updatedCategory: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE}/api/categories/`);
      setCategories(response.data);
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };

  const createCategory = async (newCategory: Partial<Category>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/api/categotries/`, newCategory, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setCategories([...categories, response.data]);
    } catch (err) {
      setError('Failed to create category');
    }
  };

  const updateCategory = async (id: string, updatedCategory: Partial<Category>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${process.env.REACT_APP_API_BASE}/api/categories/${id}/`, updatedCategory, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setCategories(categories.map(category => (category.id === id ? response.data : category)));
    } catch (err) {
      setError('Failed to update category');
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_BASE}/api/categories/${id}/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setCategories(categories.filter(category => category.id !== id));
    } catch (err) {
      setError('Failed to delete category');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, error, fetchCategories, createCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategoryContext must be used within an CategoryProvider');
  }
  return context;
};