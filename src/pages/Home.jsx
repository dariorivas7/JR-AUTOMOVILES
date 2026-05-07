import React, { useState, useEffect } from 'react';
import CarCard from '../components/carCard';
import Filters from '../components/Filters';
import { listarAutos } from '../lib/autosService';

const FILTROS_BASE = { marca: 'Todas', precioMax: '', anioMin: '' };

function Home() {
  const [autosOriginales, setAutosOriginales] = useState([]);
  const [autosFiltrados, setAutosFiltrados] = useState([]);
  const [filtrosPendientes, setFiltrosPendientes] = useState(FILTROS_BASE);
  const [filtrosAplicados, setFiltrosAplicados] = useState(FILTROS_BASE);
  const [hayFiltrosSinAplicar, setHayFiltrosSinAplicar] = useState(false);

  useEffect(() => {
    async function cargar() {
      const data = await listarAutos();
      setAutosOriginales(data);
      setAutosFiltrados(data);
    }
    cargar();
  }, []);

  useEffect(() => {
    const resultado = autosOriginales.filter(auto => {
      const coincideMarca = filtrosAplicados.marca === 'Todas' || auto.marca === filtrosAplicados.marca;
      const coincidePrecio = !filtrosAplicados.precioMax || auto.precio <= parseInt(filtrosAplicados.precioMax);
      const coincideAnio = !filtrosAplicados.anioMin || auto.anio >= parseInt(filtrosAplicados.anioMin);
      return coincideMarca && coincidePrecio && coincideAnio;
    });
    setAutosFiltrados(resultado);
  }, [filtrosAplicados, autosOriginales]);

  useEffect(() => {
    setHayFiltrosSinAplicar(JSON.stringify(filtrosPendientes) !== JSON.stringify(filtrosAplicados));
  }, [filtrosPendientes, filtrosAplicados]);

  const handleFilterChange = (nombre, valor) => {
    setFiltrosPendientes(prev => ({ ...prev, [nombre]: valor }));
  };

  const aplicarFiltros = () => {
    setFiltrosAplicados({ ...filtrosPendientes });
  };

  const limpiarFiltros = () => {
    setFiltrosPendientes(FILTROS_BASE);
    setFiltrosAplicados(FILTROS_BASE);
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '32px 20px',
      backgroundColor: '#0f0f0f',
      minHeight: '100vh',
    }}>

      <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>

        {/* Sidebar de filtros */}
        <aside style={{
          width: '240px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: '90px',
        }}>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}>
            <span style={{
              fontSize: '0.65rem',
              letterSpacing: '3px',
              color: '#C5A059',
              textTransform: 'uppercase',
            }}>
              Filtros
            </span>
            <button
              onClick={limpiarFiltros}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.25)',
                fontSize: '0.62rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#C5A059'}
              onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
            >
              Limpiar
            </button>
          </div>

          <Filters
            filtros={filtrosPendientes}
            onFilterChange={handleFilterChange}
            marcas={['Todas', ...new Set(autosOriginales.map(a => a.marca).filter(Boolean))]}
          />

          <div style={{ marginTop: '20px', position: 'relative' }}>
            {hayFiltrosSinAplicar && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.58rem',
                letterSpacing: '1.5px',
                color: '#C5A059',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                Hay cambios sin aplicar
              </div>
            )}
            <button
              onClick={aplicarFiltros}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: hayFiltrosSinAplicar ? '#C5A059' : 'rgba(197,160,89,0.12)',
                color: hayFiltrosSinAplicar ? '#0f0f0f' : 'rgba(197,160,89,0.4)',
                border: `1px solid ${hayFiltrosSinAplicar ? '#C5A059' : 'rgba(197,160,89,0.2)'}`,
                borderRadius: '2px',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                cursor: hayFiltrosSinAplicar ? 'pointer' : 'default',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => { if (hayFiltrosSinAplicar) e.currentTarget.style.opacity = '0.85'; }}
              onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              Aplicar filtros
            </button>
          </div>

          <p style={{
            marginTop: '14px',
            fontSize: '0.62rem',
            letterSpacing: '1.5px',
            color: 'rgba(255,255,255,0.2)',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            {autosFiltrados.length} {autosFiltrados.length === 1 ? 'vehículo' : 'vehículos'}
          </p>
        </aside>

        {/* Grilla de autos */}
        <main style={{ flexGrow: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
          }}>
            {autosFiltrados.map((auto) => (
              <CarCard key={auto.id} auto={auto} />
            ))}
          </div>

          {autosFiltrados.length === 0 && (
            <div style={{
              textAlign: 'center',
              marginTop: '80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{ width: '40px', height: '1px', background: 'rgba(197,160,89,0.3)' }} />
              <p style={{
                color: 'rgba(255,255,255,0.25)',
                fontSize: '0.72rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                margin: 0,
              }}>
                Sin resultados para estos filtros
              </p>
              <div style={{ width: '40px', height: '1px', background: 'rgba(197,160,89,0.3)' }} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
