import { Routes, Route, useLocation } from 'react-router-dom';
import { RestaurantProvider } from './context/RestaurantContext';
import LandingPage from './layout/LandingPage';
import LoginPage from './layout/LoginPage';
import PanelSwitcher from './layout/PanelSwitcher';
import MenuPanel from './panels/menu/MenuPanel';
import WaiterPanel from './panels/waiter/WaiterPanel';
import KitchenPanel from './panels/kitchen/KitchenPanel';
import AdminPanel from './panels/admin/AdminPanel';

function AppLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      {!isLanding && <PanelSwitcher />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPanel />} />
        <Route path="/mesero" element={<WaiterPanel />} />
        <Route path="/cocina" element={<KitchenPanel />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <RestaurantProvider>
      <AppLayout />
    </RestaurantProvider>
  );
}
