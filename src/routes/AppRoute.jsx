import Layout             from '../layout/Layout';
import ProviderDashboard  from '../dashboard/ProviderDashboard';
import AddService         from '../services/AddService';
import EditService        from '../services/EditService';
import ManageServices     from '../services/ManageServices';
import Appointments       from '../appointments/Appointments';
import ProviderAnalytics  from '../analytics/ProviderAnalytics';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const AppRoutes = () => {
  return (
    // <DevAuthWrapper>
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
    // </DevAuthWrapper>
  );
}

export default AppRoutes;
