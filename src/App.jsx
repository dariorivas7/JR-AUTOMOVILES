import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import Header from "./components/Header";
import Home from "./pages/Home";
import AdminDash from "./pages/adminDash";
import Landing from "./pages/Landing.jsx";
import Login from "./components/Login";
import CarDetails from "./pages/CarDetails";

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Verificando acceso...</div>;
  if (!session) return <Navigate to="/login" replace />;

  return children;
};

function App() {
  return (
    <Router>
      <Header />
      <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/catalogo" element={<Home />} />
          <Route path="/auto/:id" element={<CarDetails />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDash />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
