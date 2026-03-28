import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import './App.css';

import Layout             from './components/service_provider/layout/Layout';
import ProviderDashboard  from './components/service_provider/dashboard/ProviderDashboard';
import AddService         from './components/service_provider/services/AddService';
import EditService        from './components/service_provider/services/EditService';
import ManageServices     from './components/service_provider/services/ManageServices';
import Appointments       from './components/service_provider/appointments/Appointments';
import ProviderAnalytics  from './components/service_provider/analytics/ProviderAnalytics';

function App() {
  return (
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
  );
}

export default App;
