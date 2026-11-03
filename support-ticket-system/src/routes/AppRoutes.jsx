import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Subscriptions from '../pages/Subscriptions';
import CreateTicket from '../pages/CreateTicket';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../layout/DashboardLayout';
import Profile from '../pages/Profile';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        {/* جميع صفحات النظام داخل Layout واحد */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/tickets/create" element={<CreateTicket />} />

          <Route path="/tickets" element={<h1>التذاكر السابقة</h1>} />

          <Route
            path="/tickets/:id"
            element={<h1>تفاصيل التذكرة</h1>}
          />

          <Route path="/profile" element={<Profile />} />

          <Route path="/subscriptions" element={<Subscriptions />} />

        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
