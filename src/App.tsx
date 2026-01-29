import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/admin/Dashboard';
import AdminClasses from './pages/admin/Classes';
import AdminInstructors from './pages/admin/Instructors';
import AdminMartialArts from './pages/admin/MartialArts';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import MartialArtPage from '@/components/sections/MartialArtPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="admin/classes" element={<AdminRoute><AdminClasses /></AdminRoute>} />
          <Route path="admin/instructors" element={<AdminRoute><AdminInstructors /></AdminRoute>} />
          <Route path="/admin/martial-arts" element={<AdminRoute><AdminMartialArts /></AdminRoute>} />
          <Route path="martial-arts/:id" element={<MartialArtPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
