import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Subscriptions from '../pages/Subscriptions';
import CreateTicket from '../pages/CreateTicket';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../layout/DashboardLayout';
import Profile from '../pages/Profile';
import PreviousTickets from '../pages/PreviousTickets';
import TicketDetails from '../pages/TicketDetails';
import ScrollToTop from '../components/ScrollToTop';
function AppRoutes() {
  return (
    <BrowserRouter>
  <ScrollToTop />

  <Routes>
    {/* باقي المسارات كما هي */}
  </Routes>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        {/* جميع صفحات النظام داخل Layout واحد */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/tickets/create" element={<CreateTicket />} />

          <Route path="/tickets" element={<PreviousTickets />} />

          <Route path="/tickets/:id" element={<TicketDetails />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/subscriptions" element={<Subscriptions />} />

        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
