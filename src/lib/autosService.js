import { supabase } from './supabaseClient';

const mapearAuto = (auto) => ({
  id: auto.id,
  marca: auto.marca_cd,
  modelo: auto.modelo_cd,
  anio: auto.anio_cd,
  km: auto.kilometros,
  motor: auto.motor,
  precio: auto.precio,
  imagenPortada: auto.link_imagen,
  fotos: auto.fotos || [],
  descripcion: auto.descripcion_cd,
});

// 1. LISTAR (GET)
export const listarAutos = async () => {
  try {
    const { data, error } = await supabase
      .from('autos')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    return data.map(mapearAuto);
  } catch (error) {
    console.error("Error en listarAutos:", error.message);
    return [];
  }
};

// 2. OBTENER UNO (GET by id)
export const obtenerAuto = async (id) => {
  try {
    const { data, error } = await supabase
      .from('autos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return mapearAuto(data);
  } catch (error) {
    console.error("Error en obtenerAuto:", error.message);
    return null;
  }
};

// 3. CREAR (POST)
export const crearAuto = async (formData, fotasListas) => {
  try {
    const portada = fotasListas.length > 0 ? fotasListas[0].url : '';

    const { data, error } = await supabase
      .from('autos')
      .insert([{
        marca_cd: formData.marca,
        modelo_cd: formData.modelo,
        anio_cd: parseInt(formData.anio),
        kilometros: parseInt(formData.km),
        motor: formData.motor,
        precio: parseFloat(formData.precio),
        descripcion_cd: formData.descripcion,
        link_imagen: portada,
        fotos: fotasListas,
      }])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error en crearAuto:", error.message);
    throw error;
  }
};

// 4. ACTUALIZAR (PUT)
export const actualizarAuto = async (id, formData, fotasListas) => {
  try {
    const portada = fotasListas.length > 0 ? fotasListas[0].url : '';

    const { data, error } = await supabase
      .from('autos')
      .update({
        marca_cd: formData.marca,
        modelo_cd: formData.modelo,
        anio_cd: parseInt(formData.anio),
        kilometros: parseInt(formData.km),
        motor: formData.motor,
        precio: parseFloat(formData.precio),
        descripcion_cd: formData.descripcion,
        link_imagen: portada,
        fotos: fotasListas,
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error en actualizarAuto:", error.message);
    throw error;
  }
};

// 5. ELIMINAR (DELETE)
export const eliminarAuto = async (id) => {
  try {
    const { error } = await supabase
      .from('autos')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error en eliminarAuto:", error.message);
    throw error;
  }
};
