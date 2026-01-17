import mongoose from 'mongoose'

const clienteSchema = new mongoose.Schema(
  {
    nombre: String,
    telefono: String,
    email: String,
    activo: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export const ClienteModel = conn => {
  /* return conn.model('clientes', clienteSchema) */
  return conn.models.clientes || conn.model('clientes', clienteSchema)
}
