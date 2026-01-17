import { getTenantDB } from '../config/getTenantDB.js'
import { ClienteModel } from '../models/Cliente.js'

export const getClientes = async (req, res) => {
  try {
    const { empresaId } = req.user
    const { email } = req.query

    const conn = await getTenantDB(empresaId)
    const Cliente = ClienteModel(conn)

    // 🔍 buscar por email
    if (email) {
      const cliente = await Cliente.findOne({ email })
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' })
      } else {
        return res.json(cliente)
      }
    }

    // 📋 listar todos
    const clientes = await Cliente.find({ activo: true })

    res.json(clientes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error obteniendo clientes' })
  }
}

export const getClienteById = async (req, res) => {
  try {
    const { empresaId } = req.user
    const { id } = req.params

    const conn = await getTenantDB(empresaId)
    const Cliente = ClienteModel(conn)

    const cliente = await Cliente.findById(id)

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    res.json(cliente)
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo cliente' })
  }
}

export const createCliente = async (req, res) => {
  try {
    const { empresaId } = req.user
    const { nombre, email, telefono } = req.body

    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' })
    }

    if (!email) {
      return res.status(400).json({ message: 'El email es obligatorio' })
    }

    const conn = await getTenantDB(empresaId)
    const Cliente = ClienteModel(conn)

    // ❌ evitar duplicados por empresa
    if (email) {
      const existe = await Cliente.findOne({ email })
      if (existe) {
        return res.status(409).json({ message: 'El cliente ya existe' })
      }
    }

    const nuevoCliente = await Cliente.create({
      nombre,
      email,
      telefono,
    })

    res.status(201).json(nuevoCliente)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creando cliente' })
  }
}
