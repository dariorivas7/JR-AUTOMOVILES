import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import logoJR from '../assets/JR_Automotores.png';
import { useMediaQuery } from '../hooks/useMediaQuery';
import './Header.css';

const linkStyle = {
  padding: '8px 16px',
  color: 'rgba(255,255,255,0.55)',
  textDecoration: 'none',
  fontSize: '0.72rem',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  fontWeight: 500,
  transition: 'color 0.2s',
};

function Header() {
  const [session, setSession] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  // Cerrar menú al cambiar a desktop
  useEffect(() => {
    if (!isMobile) setMenuAbierto(false);
  }, [isMobile]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuAbierto(false);
    navigate('/');
  };

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header style={{
      backgroundColor: '#0f0f0f',
      borderBottom: '1px solid rgba(197,160,89,0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Barra principal */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link to="/" onClick={cerrarMenu} style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <img src={logoJR} alt="JR Automotores" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
          <span style={{ fontSize: '0.6rem', letterSpacing: '3px', color: '#C5A059', textTransform: 'uppercase', fontWeight: 400 }}>
            Compra · Venta · Consignación
          </span>
        </Link>

        {/* Desktop nav */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link to="/" style={linkStyle} onMouseOver={e => e.currentTarget.style.color = '#C5A059'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>Inicio</Link>
            <Link to="/catalogo" style={linkStyle} onMouseOver={e => e.currentTarget.style.color = '#C5A059'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>Catálogo</Link>

            {session ? (
              <>
                <Link to="/admin" style={linkStyle} onMouseOver={e => e.currentTarget.style.color = '#C5A059'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>Panel Admin</Link>
                <button
                  onClick={handleLogout}
                  style={{ marginLeft: '8px', padding: '8px 20px', backgroundColor: 'transparent', color: '#C5A059', border: '1px solid rgba(197,160,89,0.4)', borderRadius: '2px', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.color = '#fff'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(197,160,89,0.4)'; e.currentTarget.style.color = '#C5A059'; }}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link to="/login" style={{ marginLeft: '8px', padding: '8px 20px', backgroundColor: '#C5A059', color: '#0f0f0f', textDecoration: 'none', borderRadius: '2px', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700 }}
                onMouseOver={e => e.currentTarget.style.opacity = '0.85'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                Login Admin
              </Link>
            )}
          </nav>
        )}

        {/* Hamburger button (mobile) */}
        {isMobile && (
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}
            aria-label="Menú"
          >
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: menuAbierto ? '#C5A059' : 'rgba(255,255,255,0.7)', transition: 'all 0.2s', transform: menuAbierto ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: menuAbierto ? 'transparent' : 'rgba(255,255,255,0.7)', transition: 'all 0.2s' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: menuAbierto ? '#C5A059' : 'rgba(255,255,255,0.7)', transition: 'all 0.2s', transform: menuAbierto ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && menuAbierto && (
        <nav style={{
          borderTop: '1px solid rgba(197,160,89,0.1)',
          backgroundColor: '#0f0f0f',
          padding: '12px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          <Link to="/" onClick={cerrarMenu} style={{ ...linkStyle, padding: '12px 0' }}>Inicio</Link>
          <Link to="/catalogo" onClick={cerrarMenu} style={{ ...linkStyle, padding: '12px 0' }}>Catálogo</Link>

          {session ? (
            <>
              <Link to="/admin" onClick={cerrarMenu} style={{ ...linkStyle, padding: '12px 0' }}>Panel Admin</Link>
              <button onClick={handleLogout} style={{ marginTop: '8px', padding: '12px', backgroundColor: 'transparent', color: '#C5A059', border: '1px solid rgba(197,160,89,0.4)', borderRadius: '2px', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" onClick={cerrarMenu} style={{ marginTop: '8px', padding: '12px', backgroundColor: '#C5A059', color: '#0f0f0f', textDecoration: 'none', borderRadius: '2px', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700, textAlign: 'center', display: 'block' }}>
              Login Admin
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
