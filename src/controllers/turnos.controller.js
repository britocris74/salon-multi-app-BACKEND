import { getTenantDB } from '../config/getTenantDB.js'
import { TurnoModel } from '../models/turnos.js'

export const createTurno = async (req, res) => {
  try {
    const { empresaId, sucursalId } = req.user

    const { nombre, apellido, profesional, servicio, fecha } = req.body

    if (!fecha) {
      return res.status(400).json({ message: 'La fecha es obligatoria' })
    }

    const conn = await getTenantDB(empresaId)
    const Turno = TurnoModel(conn)

    const nuevoTurno = await Turno.create({
      nombre,
      apellido,
      profesional,
      servicio,
      fecha,
      empresaId,
      sucursalId,
    })

    res.status(201).json(nuevoTurno)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creando turno' })
  }
}

export const getTurnos = async (req, res) => {
  try {
    const { empresaId } = req.user

    const conn = await getTenantDB(empresaId)
    const Turnos = TurnoModel(conn)

    // 📋 listar todos
    const turnos = await Turnos.find()

    res.json(turnos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error obteniendo turnos' })
  }
}
