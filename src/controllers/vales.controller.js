import { getTenantDB } from '../config/getTenantDB.js'
import { ValesModel } from '../models/vales.js'

export const getVales = async (req, res) => {
  try {
    const { empresaId } = req.user

    const conn = await getTenantDB(empresaId)
    const Vales = ValesModel(conn)

    // 📋 listar todos
    const vales = await Vales.find()

    res.json(vales)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error obteniendo vales' })
  }
}

export const createVales = async (req, res) => {
  try {
    const { empresaId, sucursalId } = req.user

    const { profesionalId, monto } = req.body

    if (!profesionalId) {
      return res.status(400).json({ message: 'El profesionalId es obligatorio' })
    }

    if (!monto) {
      return res.status(400).json({ message: 'El monto es obligatorio' })
    }

    const conn = await getTenantDB(empresaId)
    const Vales = ValesModel(conn)

    const nuevoVale = await Vales.create({ profesionalId, monto, empresaId, sucursalId })
    res.status(201).json(nuevoVale)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creando vale' })
  }
}
