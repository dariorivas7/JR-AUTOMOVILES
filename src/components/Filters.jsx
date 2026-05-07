import React from 'react';

function Filters({ onFilterChange, filtros, marcas = ['Todas'] }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      <div style={styles.filterGroup}>
        <label style={styles.label}>Marca</label>
        <select name="marca" value={filtros.marca} onChange={handleChange} style={styles.select}>
          {marcas.map(m => <option key={m} value={m} style={{ color: '#111', backgroundColor: '#fff' }}>{m}</option>)}
        </select>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.label}>Precio máximo (ARS)</label>
        <input
          type="number"
          name="precioMax"
          value={filtros.precioMax}
          placeholder="Ej: 5000000"
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.label}>Desde el año</label>
        <input
          type="number"
          name="anioMin"
          value={filtros.anioMin}
          placeholder="Ej: 2010"
          onChange={handleChange}
          style={styles.input}
        />
      </div>

    </div>
  );
}

const styles = {
  filterGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { color: 'rgba(255,255,255,0.45)', fontSize: '0.62rem', letterSpacing: '2px', textTransform: 'uppercase' },
  select: {
    padding: '10px', borderRadius: '2px', backgroundColor: 'rgba(255,255,255,0.04)',
    color: 'white', border: '1px solid rgba(197,160,89,0.2)', outline: 'none', cursor: 'pointer',
    fontSize: '0.85rem',
  },
  input: {
    padding: '10px', borderRadius: '2px', backgroundColor: 'rgba(255,255,255,0.04)',
    color: 'white', border: '1px solid rgba(197,160,89,0.2)', outline: 'none',
    fontSize: '0.85rem',
  },
};

export default Filters;
