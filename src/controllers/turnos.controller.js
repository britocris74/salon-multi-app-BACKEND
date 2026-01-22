import { getTenantDB } from '../config/getTenantDB.js'
import { TurnoModel } from '../models/turnos.js'

export const createTurno = async (req, res) => {
  try {
    const { empresaId, sucursalId } = req.user

    const { nombre, apellido, telefono, profesional, servicio, fecha } = req.body

    if (!fecha) {
      return res.status(400).json({ message: 'La fecha es obligatoria' })
    }

    const conn = await getTenantDB(empresaId)
    const Turno = TurnoModel(conn)

    const nuevoTurno = await Turno.create({
      nombre,
      apellido,
      telefono,
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
    const { date } = req.query

    const conn = await getTenantDB(empresaId)
    const Turnos = TurnoModel(conn)

    // 🔍 buscar por date
    if (date) {
      const start = new Date(`${date}T00:00:00.000`)
      const end = new Date(`${date}T23:59:59.999`)

      const turnos = await Turnos.find({
        fecha: {
          $gte: start,
          $lte: end,
        },
      }).sort({ fecha: 1 })

      if (!turnos || turnos.length === 0) {
        return res.status(404).json({ message: 'Turnos no encontrado' })
      } else {
        return res.json(turnos)
      }
    }

    // 📋 listar todos
    const turnos = await Turnos.find()

    res.json(turnos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error obteniendo turnos' })
  }
}
