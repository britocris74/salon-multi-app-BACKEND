import mongoose from 'mongoose'

const TurnoSchema = new mongoose.Schema(
  {
    nombre: { type: String },
    apellido: { type: String },
    profesional: { type: String },
    servicio: { type: String },
    fecha: { type: Date },
    empresaId: { type: mongoose.Schema.Types.ObjectId, required: true },
    sucursalId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
)
export const TurnoModel = conn => {
  return conn.models.turnos || conn.model('turnos', TurnoSchema)
}
