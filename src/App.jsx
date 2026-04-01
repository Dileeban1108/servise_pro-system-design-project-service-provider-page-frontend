import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import './App.css';

import Layout             from './components/service_provider/layout/Layout';
import ProviderDashboard  from './components/service_provider/dashboard/ProviderDashboard';
import AddService         from './components/service_provider/services/AddService';
import EditService        from './components/service_provider/services/EditService';
import ManageServices     from './components/service_provider/services/ManageServices';
import Appointments       from './components/service_provider/appointments/Appointments';
import ProviderAnalytics  from './components/service_provider/analytics/ProviderAnalytics';

// ── Dev Environment Auto-Login Wrapper ───────────────────────
const DevAuthWrapper = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const ensureDevAuth = async () => {
      // For disconnected testing, auto-generate a valid MongoDB Provider Token
      if (!localStorage.getItem('token')) {
        try {
          const testCredentials = {
            name: "Test Provider",
            email: "test_provider@servicepro.com",
            password: "Password123!",
            category: "General",
          };

          try {
            // Attempt to register a test user
            const regRes = await axios.post('http://localhost:5000/api/auth/register', testCredentials);
            if (regRes.data.success) {
              localStorage.setItem('token', regRes.data.data.token);
            }
          } catch (err) {
            // If email exists, just login
            if (err.response?.status === 409) {
              const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
                email: testCredentials.email,
                password: testCredentials.password
              });
              if (loginRes.data.success) {
                localStorage.setItem('token', loginRes.data.data.token);
              }
            } else {
              console.error("Auto-Auth failed. Ensure backend is running.", err);
            }
          }
        } catch (masterErr) {
          console.error("Final fallback error:", masterErr);
        }
      }
      setIsReady(true);
    };

    ensureDevAuth();
  }, []);

  if (!isReady) return <div style={{padding:'4rem', textAlign:'center', fontSize:'1.5rem'}}>Authenticating Dev Environment...</div>;
  return children;
};


function App() {
  return (
    <DevAuthWrapper>
      <BrowserRouter>
        <Routes>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/provider/dashboard" replace />} />

          {/* All provider pages share the Layout (sidebar + header) */}
          <Route path="/provider" element={<Layout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"       element={<ProviderDashboard />} />
            <Route path="add-service"     element={<AddService />} />
            <Route path="manage-services" element={<ManageServices />} />
            <Route path="edit-service/:id" element={<EditService />} />
            <Route path="appointments"    element={<Appointments />} />
            <Route path="analytics"       element={<ProviderAnalytics />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/provider/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </DevAuthWrapper>
  );
}

export default App;
