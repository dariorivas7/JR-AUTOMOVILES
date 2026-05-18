import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerAuto } from '../lib/autosService';
import placeholderJR from '../assets/fiat-imagen.jpeg';
import { useMediaQuery } from '../hooks/useMediaQuery';

function CarDetails() {
  const { id } = useParams();
  const [auto, setAuto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [fotoActiva, setFotoActiva] = useState(0);
  const isMobile = useMediaQuery('(max-width: 900px)');

  useEffect(() => {
    async function cargar() {
      const data = await obtenerAuto(id);
      setAuto(data);
      setCargando(false);
    }
    cargar();
  }, [id]);

  if (cargando) {
    return (
      <div style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.72rem' }}>Cargando...</p>
      </div>
    );
  }

  if (!auto) {
    return (
      <div style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.72rem' }}>Vehículo no encontrado</p>
        <Link to="/catalogo" style={{ color: '#C5A059', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  const todasLasFotos = auto.fotos?.length > 0
    ? auto.fotos
    : auto.imagenPortada
      ? [{ url: auto.imagenPortada, publicId: 'portada' }]
      : [];

  const fotoMostrada = todasLasFotos.length > 0 ? todasLasFotos[fotoActiva]?.url : null;

  const whatsappUrl = `https://wa.me/5493547456489?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20y%20me%20interesa%20el%20${encodeURIComponent(auto.marca + ' ' + auto.modelo + ' ' + auto.anio)}.`;

  return (
    <div style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Volver */}
        <Link
          to="/catalogo"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.35)',
            textDecoration: 'none',
            fontSize: '0.65rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '32px',
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#C5A059'}
          onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
        >
          ← Catálogo
        </Link>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>

          {/* Columna izquierda: galería */}
          <div style={{ flex: '1 1 300px' }}>

            {/* Foto principal */}
            <div style={{ width: '100%', height: isMobile ? '240px' : '340px', backgroundColor: '#0a0a0a', borderRadius: '2px', overflow: 'hidden', marginBottom: '12px', border: '1px solid rgba(197,160,89,0.1)' }}>
              {fotoMostrada ? (
                <img
                  src={fotoMostrada}
                  alt={`${auto.marca} ${auto.modelo}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = placeholderJR; e.target.style.objectFit = 'contain'; e.target.style.padding = '30px'; }}
                />
              ) : (
                <img src={placeholderJR} alt="JR Automotores" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '40px', opacity: 0.2 }} />
              )}
            </div>

            {/* Miniaturas */}
            {todasLasFotos.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {todasLasFotos.map((foto, i) => (
                  <button
                    key={foto.publicId || i}
                    onClick={() => setFotoActiva(i)}
                    style={{
                      width: '72px',
                      height: '52px',
                      padding: 0,
                      border: `2px solid ${i === fotoActiva ? '#C5A059' : 'rgba(197,160,89,0.15)'}`,
                      borderRadius: '2px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: 'none',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <img src={foto.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Columna derecha: datos */}
          <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '0' }}>

            {/* Marca y modelo */}
            <h1 style={{ fontSize: '1.8rem', fontWeight: 300, color: '#ffffff', letterSpacing: '2px', margin: '0 0 4px 0' }}>
              <span style={{ fontWeight: 700 }}>{auto.marca}</span> {auto.modelo}
            </h1>
            <p style={{ margin: '0 0 28px 0', fontSize: '0.65rem', letterSpacing: '3px', color: '#C5A059', textTransform: 'uppercase' }}>
              {auto.anio}
            </p>

            {/* Ficha técnica */}
            <div style={{ borderTop: '1px solid rgba(197,160,89,0.1)', paddingTop: '20px', marginBottom: '24px' }}>
              {[
                { label: 'Motor', valor: auto.motor },
                { label: 'Kilometraje', valor: auto.km != null ? `${auto.km.toLocaleString('es-AR')} km` : null },
                { label: 'Año', valor: auto.anio },
              ].filter(f => f.valor).map(({ label, valor }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '0.62rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>{label}</span>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.5px' }}>{valor}</span>
                </div>
              ))}
            </div>

            {/* Precio */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '0.62rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
                Precio de contado
              </p>
              <p style={{ margin: 0, fontSize: '2rem', color: '#C5A059', fontWeight: 300, letterSpacing: '1px' }}>
                $ {auto.precio?.toLocaleString('es-AR')}
              </p>
            </div>

            {/* Botón WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '14px',
                backgroundColor: '#C5A059',
                color: '#0f0f0f',
                textDecoration: 'none',
                textAlign: 'center',
                borderRadius: '2px',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                transition: 'opacity 0.2s',
                marginBottom: '12px',
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.85'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>

        {/* Descripción */}
        {auto.descripcion && (
          <div style={{ marginTop: '48px', borderTop: '1px solid rgba(197,160,89,0.1)', paddingTop: '32px' }}>
            <p style={{ fontSize: '0.62rem', letterSpacing: '3px', color: '#C5A059', textTransform: 'uppercase', marginBottom: '16px' }}>
              Descripción
            </p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.92rem', lineHeight: '1.8', whiteSpace: 'pre-wrap', margin: 0 }}>
              {auto.descripcion}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default CarDetails;
