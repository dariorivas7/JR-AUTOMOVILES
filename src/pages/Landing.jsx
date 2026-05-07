import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 100px)', // Ajustado para descontar el Header
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 20px',
        textAlign: 'center',
        backgroundColor: '#0f0f0f',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow superior (Efecto de iluminación suave) */}
      <div style={{
        position: 'absolute',
        top: '-80px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '360px',
        background: 'radial-gradient(ellipse, rgba(197,160,89,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Línea decorativa inferior */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.3), transparent)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Tagline superior: Ubicación */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '32px' }}>
          <div style={{ width: '28px', height: '1px', background: '#C5A059', opacity: 0.6 }} />
          <span style={{ fontSize: '11px', letterSpacing: '4px', color: '#C5A059', textTransform: 'uppercase', opacity: 0.8 }}>
            Alta Gracia, Córdoba
          </span>
          <div style={{ width: '28px', height: '1px', background: '#C5A059', opacity: 0.6 }} />
        </div>

        {/* Logo Principal */}
        <h1 style={{
          fontSize: 'clamp(3rem, 10vw, 4.5rem)', // Se ajusta según el tamaño de pantalla
          fontWeight: 300,
          color: '#ffffff',
          letterSpacing: '12px', // Un poco más de aire para el estilo premium
          margin: '0 0 6px 0',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}>
          JR
        </h1>
        <h2 style={{
          fontSize: 'clamp(0.9rem, 4vw, 1.1rem)',
          fontWeight: 400,
          color: '#C5A059',
          letterSpacing: '8px',
          margin: '0 0 20px 0',
          textTransform: 'uppercase',
        }}>
          Automotores
        </h2>

        {/* Divisor minimalista */}
        <div style={{ width: '48px', height: '1px', background: '#C5A059', margin: '0 auto 24px' }} />

        {/* Subtítulo descriptivo */}
        <p style={{
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '2px',
          margin: '0 0 48px 0',
          textTransform: 'uppercase',
          maxWidth: '300px'
        }}>
          Vehículos de calidad · Alta Gracia
        </p>

        {/* Botones de Acción */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          
          {/* Botón Catálogo */}
          <Link
            to="/catalogo"
            style={{
              padding: '13px 32px',
              backgroundColor: '#C5A059',
              color: '#0f0f0f',
              textDecoration: 'none',
              borderRadius: '2px',
              fontWeight: 700,
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = '0.85';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Ver catálogo
          </Link>

          {/* Botón WhatsApp (Corregido el error de etiqueta <a>) */}
          <a
            href="https://wa.me/5493547456489?text=Hola,%20vengo%20de%20la%20página%20web%20y%20quiero%20hacer%20una%20consulta."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '13px 32px',
              backgroundColor: 'transparent',
              color: '#C5A059',
              textDecoration: 'none',
              borderRadius: '2px',
              fontWeight: 700,
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              border: '1px solid rgba(197,160,89,0.4)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'rgba(197,160,89,0.9)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(197,160,89,0.4)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Contactar
          </a>
        </div>

      </div>
    </div>
  );
}

export default Landing;