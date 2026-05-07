import React from 'react';
import { Link } from 'react-router-dom';
import placeholderJR from '../assets/fiat-imagen.jpeg';

function CarCard({ auto }) {
  const tieneImagenValida = auto.imagenPortada && auto.imagenPortada.trim() !== "";

  return (
    <Link
      to={`/auto/${auto.id}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        style={{
          backgroundColor: '#141414',
          border: '1px solid rgba(197,160,89,0.15)',
          borderRadius: '2px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: 'sans-serif',
          transition: 'border-color 0.25s ease, transform 0.25s ease',
          cursor: 'pointer',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = 'rgba(197,160,89,0.5)';
          e.currentTarget.style.transform = 'translateY(-3px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = 'rgba(197,160,89,0.15)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >

        {/* Imagen */}
        <div style={{ width: '100%', height: '190px', backgroundColor: '#0a0a0a', overflow: 'hidden' }}>
          {tieneImagenValida ? (
            <img
              src={auto.imagenPortada}
              alt={`${auto.marca} ${auto.modelo}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.04)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderJR;
                e.target.style.objectFit = 'contain';
                e.target.style.padding = '20px';
              }}
            />
          ) : (
            <img src={placeholderJR} alt="JR Automotores" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px', opacity: 0.3 }} />
          )}
        </div>

        {/* Cuerpo */}
        <div style={{ padding: '18px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>

          <h2 style={{ fontSize: '1rem', margin: '0 0 6px 0', color: '#ffffff', fontWeight: 400, letterSpacing: '0.5px' }}>
            <span style={{ fontWeight: 700 }}>{auto.marca}</span> {auto.modelo}
          </h2>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
            {[auto.anio, auto.km != null ? `${auto.km.toLocaleString()} km` : null, auto.motor].filter(Boolean).map((dato, i) => (
              <span key={i} style={{
                fontSize: '0.65rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '3px 8px',
                borderRadius: '2px',
              }}>
                {dato}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(197,160,89,0.1)' }}>
            <p style={{ color: 'rgba(255,255,255,0.3)', margin: '0 0 3px 0', fontSize: '0.62rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Precio de contado
            </p>
            <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#C5A059', fontWeight: 400, letterSpacing: '1px' }}>
              $ {auto.precio?.toLocaleString("es-AR")}
            </h3>
          </div>

        </div>
      </div>
    </Link>
  );
}

export default CarCard;
