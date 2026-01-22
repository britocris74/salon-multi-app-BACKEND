import { getTenantDB } from '../config/getTenantDB.js'
import { TiposPagoModel } from '../models/tiposPago.js'

export const getTiposPago = async (req, res) => {
  try {
    const { empresaId } = req.user

    const conn = await getTenantDB(empresaId)
    const TiposPagos = TiposPagoModel(conn)

    // 📋 listar todos
    const tiposPago = await TiposPagos.find()

    res.json(tiposPago)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error obteniendo tipos de pago' })
  }
}

export const createTiposPago = async (req, res) => {
  try {
    const { empresaId, sucursalId } = req.user

    const { tipo } = req.body

    if (!tipo) {
      return res.status(400).json({ message: 'El tipo es obligatorio' })
    }

    const conn = await getTenantDB(empresaId)
    const TiposPagos = TiposPagoModel(conn)

    const nuevoTipoPago = await TiposPagos.create({ tipo, empresaId, sucursalId })
    res.status(201).json(nuevoTipoPago)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creando tipo de pago' })
  }
}
