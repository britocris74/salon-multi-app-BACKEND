import { getTenantDB } from '../config/getTenantDB.js'
import { ProfesionalModel } from '../models/profesionales.js'

export const getProfesionales = async (req, res) => {
  try {
    const { empresaId } = req.user
    const { codigo } = req.query

    const conn = await getTenantDB(empresaId)
    const Profesional = ProfesionalModel(conn)

    // 🔍 buscar por codigo
    if (codigo) {
      const profesional = await Profesional.findOne({ codigo })
      if (!profesional) {
        return res.status(404).json({ message: 'Profesional no encontrado' })
      } else {
        return res.json(profesional)
      }
    }

    // 📋 listar todos
    const profesionales = await Profesional.find({ activo: true })

    res.json(profesionales)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error obteniendo profesionales' })
  }
}

export const createProfesional = async (req, res) => {
  try {
    const { empresaId, sucursalId } = req.user

    const { nombre, apellido, codigo, color } = req.body

    if (!codigo) {
      return res.status(400).json({ message: 'El código es obligatorio' })
    }

    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' })
    }

    if (!apellido) {
      return res.status(400).json({ message: 'El apellido es obligatorio' })
    }

    const conn = await getTenantDB(empresaId)
    const Profesional = ProfesionalModel(conn)

    const nuevoProfesional = await Profesional.create({
      nombre,
      apellido,
      codigo,
      color,
      empresaId,
      sucursalId,
    })

    res.status(201).json(nuevoProfesional)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creando profesional' })
  }
}
