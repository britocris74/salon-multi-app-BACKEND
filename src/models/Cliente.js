import mongoose from 'mongoose'

const clienteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String, required: true, unique: true },
    email: { type: String },
    activo: { type: Boolean, default: true },
    empresaId: { type: mongoose.Schema.Types.ObjectId, required: true },
    sucursalId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
)

export const ClienteModel = conn => {
  return conn.models.clientes || conn.model('clientes', clienteSchema)
}
