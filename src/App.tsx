import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import { AuthProvider } from '@context/AuthContext';
import { MantineProvider } from '@mantine/core';
import { ThemeProvider } from '@mui/material/styles';

import AdminHomePage from '@pages/AdminHomePage';
import CustomerHomePage from '@pages/CustomerHomePage';
import CustomerIdeaPage from '@pages/CustomerIdeaPage';
import FAQPage from '@pages/FAQPage';
import AboutUsPage from '@pages/AboutUsPage';
 
import customTheme from './theme';

function App() {
  return (
    <MantineProvider>
      <ThemeProvider theme={customTheme}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<CustomerHomePage />} />
              <Route path="/admin" element={<AdminHomePage />} />
              <Route path="/ideas/:id" element={<CustomerIdeaPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </MantineProvider>
  )
}

export default App;
