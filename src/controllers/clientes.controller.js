import { getTenantDB } from '../config/getTenantDB.js'
import { ClienteModel } from '../models/Cliente.js'

export const getClientes = async (req, res) => {
  try {
    const { empresaId } = req.user
    const { email, telefono } = req.query

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

    // 🔍 buscar por telefono
    if (telefono) {
      const cliente = await Cliente.findOne({ telefono })
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
    const { empresaId, sucursalId, userId } = req.user

    const { nombre, apellido, email, telefono } = req.body

    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' })
    }

    if (!email) {
      return res.status(400).json({ message: 'El email es obligatorio' })
    }

    const conn = await getTenantDB(empresaId)
    const Cliente = ClienteModel(conn)

    // ❌ evitar duplicados por empresa
    if (telefono) {
      const existe = await Cliente.findOne({ telefono })
      if (existe) {
        return res.status(409).json({ message: 'El cliente ya existe' })
      }
    }

    const nuevoCliente = await Cliente.create({
      nombre,
      apellido,
      telefono,
      email,
      empresaId,
      sucursalId,
      createdBy: userId,
    })

    res.status(201).json(nuevoCliente)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creando cliente' })
  }
}

export const updateCliente = async (req, res) => {
  try {
    const { empresaId, sucursalId } = req.user
    const { id } = req.params

    const { nombre, apellido, email, telefono, activo } = req.body

    const conn = await getTenantDB(empresaId)
    const Cliente = ClienteModel(conn)

    // 🔎 Buscar cliente por id + sucursal
    const cliente = await Cliente.findOne({
      _id: id,
      sucursalId,
    })

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    // 🚫 Validar email duplicado (si cambia)
    if (email && email !== cliente.email) {
      const existeEmail = await Cliente.findOne({
        email,
        _id: { $ne: id },
      })

      if (existeEmail) {
        return res.status(409).json({ message: 'El email ya está en uso' })
      }
    }

    // 🚫 Validar teléfono duplicado (si cambia)
    if (telefono && telefono !== cliente.telefono) {
      const existeTelefono = await Cliente.findOne({
        telefono,
        _id: { $ne: id },
      })

      if (existeTelefono) {
        return res.status(409).json({ message: 'El teléfono ya está en uso' })
      }
    }

    // ✏️ Actualizar solo lo que venga
    if (nombre !== undefined) cliente.nombre = nombre
    if (apellido !== undefined) cliente.apellido = apellido
    if (email !== undefined) cliente.email = email
    if (telefono !== undefined) cliente.telefono = telefono
    if (activo !== undefined) cliente.activo = activo

    await cliente.save()

    res.status(200).json(cliente)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error actualizando cliente' })
  }
}
