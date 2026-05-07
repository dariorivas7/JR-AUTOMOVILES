import React, { useState, useEffect } from 'react';
import { useCloudinaryUpload } from '../hooks/useCloudinaryUpload';
import { crearAuto, actualizarAuto } from '../lib/autosService';

const ESTADO_INICIAL = { marca: '', modelo: '', motor: '', anio: '', precio: '', km: '', descripcion: '' };

function CarForm({ onAutoCreado, autoExistente }) {
  const [formData, setFormData] = useState(ESTADO_INICIAL);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const { fotos, setFotos, subiendo, seleccionarArchivos, quitarFoto, getFotosParaBackend } = useCloudinaryUpload();

  // Cargar datos del auto cuando se abre el modo edición
  useEffect(() => {
    if (autoExistente) {
      setFormData({
        marca: autoExistente.marca || '',
        modelo: autoExistente.modelo || '',
        motor: autoExistente.motor || '',
        anio: autoExistente.anio || '',
        precio: autoExistente.precio || '',
        km: autoExistente.km || '',
        descripcion: autoExistente.descripcion || '',
      });
      setFotos(autoExistente.fotos || []);
    } else {
      setFormData(ESTADO_INICIAL);
      setFotos([]);
    }
  }, [autoExistente]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (subiendo) return setError('Esperá a que terminen de subir las fotos');

    const fotasListas = getFotosParaBackend();
    if (fotasListas.length === 0) return setError('Debes incluir al menos una foto para la portada');

    setCargando(true);
    setError('');

    try {
      if (autoExistente) {
        await actualizarAuto(autoExistente.id, formData, fotasListas);
        alert(`✅ "${formData.marca} ${formData.modelo}" se actualizó correctamente.`);
      } else {
        await crearAuto(formData, fotasListas);
        alert(`✅ "${formData.marca} ${formData.modelo}" se publicó correctamente.`);
        setFormData(ESTADO_INICIAL);
        setFotos([]);
      }

      if (onAutoCreado) onAutoCreado();
    } catch (err) {
      console.error(err);
      setError("Error al guardar: " + err.message);
    } finally {
      setCargando(false);
    }
  };

  const inputStyle = { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '14px' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#444' };
  const rowStyle = { display: 'flex', gap: '15px', marginBottom: '5px' };
  const esEdicion = Boolean(autoExistente);

  return (
    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', maxWidth: '900px', margin: '20px auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '25px' }}>
        {esEdicion ? '✏️ Editar Vehículo' : '🚗 Publicar Vehículo - Automotores JR'}
      </h2>

      {error && (
        <div style={{ backgroundColor: '#fff5f5', border: '1px solid #feb2b2', padding: '12px', borderRadius: '6px', marginBottom: '20px', color: '#c53030', fontWeight: '500' }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={manejarEnvio}>
        <div style={rowStyle}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Marca:</label>
            <input type="text" name="marca" value={formData.marca} onChange={manejarCambio} placeholder="Ej: Renault" style={inputStyle} required />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Modelo:</label>
            <input type="text" name="modelo" value={formData.modelo} onChange={manejarCambio} placeholder="Ej: Megane 1 Fase 2" style={inputStyle} required />
          </div>
        </div>

        <div style={rowStyle}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Motor:</label>
            <input type="text" name="motor" value={formData.motor} onChange={manejarCambio} placeholder="Ej: 1.9 dTi" style={inputStyle} required />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Año:</label>
            <input type="number" name="anio" value={formData.anio} onChange={manejarCambio} placeholder="Ej: 2006" style={inputStyle} required />
          </div>
        </div>

        <div style={rowStyle}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Precio ($):</label>
            <input type="number" name="precio" value={formData.precio} onChange={manejarCambio} placeholder="Ej: 4500000" style={inputStyle} required />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Kilometraje:</label>
            <input type="number" name="km" value={formData.km} onChange={manejarCambio} placeholder="Ej: 180000" style={inputStyle} required />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Descripción y detalles:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={manejarCambio}
            placeholder="Describe el estado general, equipamiento, cubiertas, services realizados, etc."
            style={{ ...inputStyle, height: '120px', resize: 'vertical', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <label style={labelStyle}>Fotos del vehículo <span style={{ fontWeight: 'normal', color: '#64748b' }}>(La 1ra será la portada)</span></label>

          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '25px', border: '2px dashed #cbd5e1', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#fff', transition: 'all 0.2s' }}>
            <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={(e) => seleccionarArchivos(e.target.files)} />
            <span style={{ fontSize: '30px', marginBottom: '10px' }}>📸</span>
            <span style={{ fontWeight: '600', color: '#475569' }}>
              {subiendo ? 'Subiendo archivos...' : 'Haz clic para seleccionar varias fotos'}
            </span>
          </label>

          {fotos.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '12px', marginTop: '20px' }}>
              {fotos.map((foto, index) => (
                <div key={foto.publicId || foto._tempId} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: index === 0 ? '3px solid #10b981' : '1px solid #e2e8f0' }}>
                  <img src={foto.url} alt="Preview" style={{ width: '100%', height: '80px', objectFit: 'cover', opacity: foto.subiendo ? 0.4 : 1 }} />
                  {index === 0 && (
                    <div style={{ position: 'absolute', top: 0, left: 0, background: '#10b981', color: '#fff', fontSize: '10px', padding: '2px 6px', fontWeight: 'bold' }}>PORTADA</div>
                  )}
                  {!foto.subiendo && (
                    <button type="button" onClick={() => quitarFoto(foto.publicId)} style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '12px' }}>×</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={cargando || subiendo}
          style={{
            padding: '15px',
            backgroundColor: (cargando || subiendo) ? '#94a3b8' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: (cargando || subiendo) ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            width: '100%',
            fontSize: '17px'
          }}
        >
          {cargando ? '🚀 Guardando...' : subiendo ? '⏳ Subiendo fotos...' : esEdicion ? 'Guardar Cambios' : 'Publicar Vehículo'}
        </button>
      </form>
    </div>
  );
}

export default CarForm;
