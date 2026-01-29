import { getTenantDB } from '../config/getTenantDB.js'
import { ComandaModel } from '../models/comanda.js'

export const getComandas = async (req, res) => {
  try {
    const { empresaId } = req.user
    const { clienteId, profesionalId } = req.query

    const conn = await getTenantDB(empresaId)
    const Comanda = ComandaModel(conn)

    // 🔍 buscar por cliente
    if (clienteId) {
      const comanda = await Comanda.find({ clienteId })
      if (!comanda) {
        return res.status(404).json({ message: 'Comanda no encontrada' })
      } else {
        return res.json(comanda)
      }
    }

    // 🔍 buscar por profesional
    if (profesionalId) {
      const comanda = await Comanda.find({ profesionalId })
      if (!comanda) {
        return res.status(404).json({ message: 'Comanda no encontrada' })
      } else {
        return res.json(comanda)
      }
    }

    // 📋 listar todos
    const comandas = await Comanda.find()

    res.json(comandas)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error obteniendo comandas' })
  }
}

export const createComanda = async (req, res) => {
  try {
    const { empresaId, sucursalId, userId } = req.user

    const { profesionalId, clienteId, servicios, tipoPagoId, montoTotal } = req.body

    const conn = await getTenantDB(empresaId)
    const Comanda = ComandaModel(conn)

    const nuevaComanda = await Comanda.create({
      profesionalId,
      clienteId,
      servicios,
      tipoPagoId,
      montoTotal,
      empresaId,
      sucursalId,
      createdBy: userId,
    })

    res.status(201).json(nuevaComanda)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creando comanda' })
  }
}
