import mongoose from 'mongoose'

const TiposPagoSchema = new mongoose.Schema(
  {
    tipo: { type: String, required: true },
  },
  { timestamps: true },
)
export const TiposPagoModel = conn => {
  return conn.models.tiposPago || conn.model('tiposPago', TiposPagoSchema)
}
