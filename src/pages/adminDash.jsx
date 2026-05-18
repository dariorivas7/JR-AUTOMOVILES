import React, { useState, useEffect } from 'react';
import CarForm from '../components/CarForm';
import { listarAutos, eliminarAuto } from '../lib/autosService';

function AdminDash() {
  const [autos, setAutos] = useState([]);
  const [autoParaEditar, setAutoParaEditar] = useState(null);

  useEffect(() => {
    cargarAutos();
  }, []);

  const cargarAutos = async () => setAutos(await listarAutos());

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar vehículo definitivamente?")) {
      await eliminarAuto(id);
      cargarAutos();
    }
  };

  const handleEdit = (auto) => {
    setAutoParaEditar(auto);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif', color: '#fff' }}>

      <div style={{ marginBottom: '40px' }}>
        <CarForm
          onAutoCreado={() => {
            cargarAutos();
            setAutoParaEditar(null);
          }}
          autoExistente={autoParaEditar}
        />
        {autoParaEditar && (
          <button
            onClick={() => setAutoParaEditar(null)}
            style={{ marginTop: '10px', background: '#666', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cancelar Edición
          </button>
        )}
      </div>

      <hr style={{ borderColor: '#333', marginBottom: '40px' }} />

      <h2 style={{ marginBottom: '20px' }}>📋 Inventario Actual</h2>

      <div style={styles.tableBox}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Portada</th>
              <th style={styles.th}>Vehículo</th>
              <th style={styles.th}>Año</th>
              <th style={styles.th}>Precio</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {autos.map(auto => (
              <tr key={auto.id}>
                <td style={styles.td}>
                  {auto.imagenPortada ? (
                    <img
                      src={auto.imagenPortada}
                      alt="portada"
                      style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  ) : (
                    <div style={{ width: '60px', height: '40px', background: '#333', borderRadius: '4px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>S/F</div>
                  )}
                </td>
                <td style={styles.td}>
                  <strong>{auto.marca}</strong> {auto.modelo}
                </td>
                <td style={styles.td}>{auto.anio}</td>
                <td style={styles.td}>$ {auto.precio?.toLocaleString('es-AR')}</td>
                <td style={styles.td}>
                  <button onClick={() => handleEdit(auto)} style={styles.btnEdit}>✏️</button>
                  <button onClick={() => handleDelete(auto.id)} style={styles.btnDelete}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  tableBox: { border: '1px solid #333', borderRadius: '8px', overflowX: 'auto', background: '#111' },
  table: { width: '100%', borderCollapse: 'collapse', color: '#eee' },
  th: { padding: '12px', background: '#222', textAlign: 'left', borderBottom: '2px solid #333' },
  td: { padding: '10px', borderBottom: '1px solid #333' },
  btnEdit: { background: '#f59e0b', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' },
  btnDelete: { background: '#ef4444', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' },
};

export default AdminDash;
