import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DoctorsPage from './pages/DoctorsPage';
import NursesPage from './pages/NursesPage';
import Layout from './components/Layout';
import { StaffProvider } from './contexts/StaffContext';

const App: React.FC = () => {
  return (
    <StaffProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/doctors" replace />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/nurses" element={<NursesPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </StaffProvider>
  );
};

export default App;
