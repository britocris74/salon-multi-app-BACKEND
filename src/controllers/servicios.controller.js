import XLSX from 'xlsx'
import { getTenantDB } from '../config/getTenantDB.js'
import { ServicioModel } from '../models/servicios.js'
import { parseNumber } from '../helpers/index.js'

export const createServicio = async (req, res) => {
  try {
    const { empresaId, sucursalId } = req.user

    const { servicio, precioLista, precioEfectivo } = req.body

    if (!precioLista || !precioEfectivo) {
      return res.status(400).json({ message: 'El precioLista y precioEfectivo son obligatorios' })
    }

    const conn = await getTenantDB(empresaId)
    const Servicio = ServicioModel(conn)

    const nuevoServicio = await Servicio.create({
      servicio,
      precioLista,
      precioEfectivo,
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

export const importServicesFromExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se envió archivo' })
    }

    const { empresaId } = req.user

    const conn = await getTenantDB(empresaId)
    const Servicios = ServicioModel(conn)

    // Leer workbook desde buffer
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]

    // Convertir a JSON
    const rows = XLSX.utils.sheet_to_json(sheet)

    let inserted = 0
    let updated = 0

    for (const row of rows) {
      const { Nro, SERVICIO, LISTA, EFECTIVO } = row

      if (!SERVICIO) continue

      const precioLista = parseNumber(LISTA)
      const precioEfectivo = parseNumber(EFECTIVO)
      const servicio = SERVICIO
      const nro = Nro

      const result = await Servicios.findOneAndUpdate(
        { servicio, nro },
        { precioLista, precioEfectivo, nro },
        { upsert: true, new: true },
      )

      result.createdAt.getTime() === result.updatedAt.getTime() ? inserted++ : updated++
    }

    res.json({
      message: 'Servicios importados correctamente',
      inserted,
      updated,
      total: rows.length,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al importar Excel' })
  }
}
