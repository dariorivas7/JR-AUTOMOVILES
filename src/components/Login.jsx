import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("Error: " + error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      backgroundColor: '#0f0f0f',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Glow de fondo */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -60%)',
        width: '500px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(197,160,89,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%',
        maxWidth: '380px',
        position: 'relative',
        zIndex: 2,
      }}>

        {/* Cabecera */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '24px', height: '1px', background: '#C5A059', opacity: 0.5 }} />
            <span style={{ fontSize: '10px', letterSpacing: '4px', color: '#C5A059', textTransform: 'uppercase' }}>
              Acceso restringido
            </span>
            <div style={{ width: '24px', height: '1px', background: '#C5A059', opacity: 0.5 }} />
          </div>
          <h1 style={{
            fontSize: '1.6rem',
            fontWeight: 300,
            color: '#ffffff',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            margin: '0 0 4px 0',
          }}>
            Panel Admin
          </h1>
          <p style={{
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            JR Automotores
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{
              fontSize: '0.65rem',
              letterSpacing: '2px',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="admin@ejemplo.com"
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                padding: '13px 16px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(197,160,89,0.2)',
                borderRadius: '2px',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(197,160,89,0.7)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(197,160,89,0.2)'}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{
              fontSize: '0.65rem',
              letterSpacing: '2px',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
            }}>
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                padding: '13px 16px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(197,160,89,0.2)',
                borderRadius: '2px',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(197,160,89,0.7)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(197,160,89,0.2)'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '10px',
              padding: '14px',
              backgroundColor: loading ? 'rgba(197,160,89,0.4)' : '#C5A059',
              color: '#0f0f0f',
              border: 'none',
              borderRadius: '2px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseOver={(e) => { if (!loading) e.currentTarget.style.opacity = '0.85'; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>

        </form>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          marginTop: '32px',
          fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '1px',
        }}>
          Solo personal autorizado
        </p>

      </div>
    </div>
  );
}

export default Login;