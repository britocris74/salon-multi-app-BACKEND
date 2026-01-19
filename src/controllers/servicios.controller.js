import { getTenantDB } from '../config/getTenantDB.js'
import { ServicioModel } from '../models/servicios.js'

export const createServicio = async (req, res) => {
  try {
    const { empresaId, sucursalId } = req.user

    const { nombre, precio } = req.body

    if (!precio) {
      return res.status(400).json({ message: 'El precio es obligatorio' })
    }

    const conn = await getTenantDB(empresaId)
    const Servicio = ServicioModel(conn)

    const nuevoServicio = await Servicio.create({
      nombre,
      precio,
      empresaId,
      sucursalId,
    })

    res.status(201).json(nuevoServicio)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creando servicio' })
  }
}

export const getServicio = async (req, res) => {
  try {
    const { empresaId } = req.user

    const conn = await getTenantDB(empresaId)
    const Servicios = ServicioModel(conn)

    // 📋 listar todos
    const servicios = await Servicios.find()

    res.json(servicios)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error obteniendo servicios' })
  }
}
