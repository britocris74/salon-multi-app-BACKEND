import mongoose from 'mongoose'

const profesionalSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    activo: { type: Boolean, default: true },
    codigo: { type: String, required: true },
    color: { type: String, required: true },
    empresaId: { type: mongoose.Schema.Types.ObjectId, required: true },
    sucursalId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
)

export const ProfesionalModel = conn => {
  return conn.models.profesionales || conn.model('profesionales', profesionalSchema)
}
