import mongoose from 'mongoose'

const ServicioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    precio: { type: String, required: true },
    empresaId: { type: mongoose.Schema.Types.ObjectId, required: true },
    sucursalId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
)
export const ServicioModel = conn => {
  return conn.models.servicios || conn.model('servicios', ServicioSchema)
}
