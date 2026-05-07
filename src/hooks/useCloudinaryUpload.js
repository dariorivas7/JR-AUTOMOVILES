import React from 'react'

const CLOUD_NAME = 'dq9lvcw8p'
const UPLOAD_PRESET = 'catalogo_autos'
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

async function subirArchivoACloudinary(archivo, onProgreso) {
  const formData = new FormData()
  formData.append('file', archivo)
  formData.append('upload_preset', UPLOAD_PRESET)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgreso) {
        onProgreso(Math.round((e.loaded / e.total) * 100))
      }
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText)
        resolve({ url: data.secure_url, publicId: data.public_id })
      } else {
        reject(new Error(`Error subiendo imagen: ${xhr.statusText}`))
      }
    }

    xhr.onerror = () => reject(new Error('Error de red al subir imagen'))
    xhr.open('POST', UPLOAD_URL)
    xhr.send(formData)
  })
}

export function useCloudinaryUpload() {
  const [fotos, setFotos] = React.useState([])
  const [subiendo, setSubiendo] = React.useState(false)

  async function seleccionarArchivos(fileList) {
    const archivos = Array.from(fileList)
    if (archivos.length === 0) return

    setSubiendo(true)

    const placeholders = archivos.map((archivo, i) => ({
      url: URL.createObjectURL(archivo),
      publicId: null,
      subiendo: true,
      progreso: 0,
      _tempId: Date.now() + i
    }))

    setFotos(prev => [...prev, ...placeholders])

    const promesas = archivos.map((archivo, i) =>
      subirArchivoACloudinary(archivo, (progreso) => {
        setFotos(prev =>
          prev.map(f => f._tempId === placeholders[i]._tempId ? { ...f, progreso } : f)
        )
      })
      .then(resultado => {
        setFotos(prev =>
          prev.map(f =>
            f._tempId === placeholders[i]._tempId
              ? { url: resultado.url, publicId: resultado.publicId, subiendo: false, progreso: 100 }
              : f
          )
        )
      })
      .catch(err => {
        setFotos(prev => prev.filter(f => f._tempId !== placeholders[i]._tempId))
        console.error('Error subiendo foto:', err.message)
      })
    )

    await Promise.allSettled(promesas)
    setSubiendo(false)
  }

  function quitarFoto(publicId) {
    setFotos(prev => prev.filter(f => f.publicId !== publicId))
  }

  function getFotosParaBackend() {
    return fotos
      .filter(f => !f.subiendo && f.publicId)
      .map(({ url, publicId }) => ({ url, publicId }))
  }

  return { fotos, setFotos, subiendo, seleccionarArchivos, quitarFoto, getFotosParaBackend }
}
