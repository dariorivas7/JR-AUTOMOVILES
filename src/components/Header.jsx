import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import logoJR from '../assets/JR_Automotores.png';
import './Header.css';

function Header() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header style={{
      backgroundColor: '#0f0f0f',
      borderBottom: '1px solid rgba(197,160,89,0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 28px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Lado izquierdo: Logo + texto */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <img
            src={logoJR}
            alt="JR Automotores"
            style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span style={{
              fontSize: '0.6rem',
              letterSpacing: '3px',
              color: '#C5A059',
              textTransform: 'uppercase',
              fontWeight: 400,
              lineHeight: 1,
            }}>
              Compra · Venta · Consignación
            </span>
          </div>
        </Link>

        {/* Lado derecho: Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {['/', '/catalogo'].map((path, i) => (
            <Link
              key={path}
              to={path}
              style={{
                padding: '8px 16px',
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                fontSize: '0.72rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#C5A059'}
              onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              {['Inicio', 'Catálogo'][i]}
            </Link>
          ))}

          {session ? (
            <>
              <Link
                to="/admin"
                style={{
                  padding: '8px 16px',
                  color: 'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  fontSize: '0.72rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#C5A059'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
              >
                Panel Admin
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: '8px',
                  padding: '8px 20px',
                  backgroundColor: 'transparent',
                  color: '#C5A059',
                  border: '1px solid rgba(197,160,89,0.4)',
                  borderRadius: '2px',
                  fontSize: '0.72rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#C5A059';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(197,160,89,0.4)';
                  e.currentTarget.style.color = '#C5A059';
                }}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                marginLeft: '8px',
                padding: '8px 20px',
                backgroundColor: '#C5A059',
                color: '#0f0f0f',
                textDecoration: 'none',
                borderRadius: '2px',
                fontSize: '0.72rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 700,
                transition: 'opacity 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.85'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              Login Admin
            </Link>
          )}
        </nav>

      </div>
    </header>
  );
}

export default Header;