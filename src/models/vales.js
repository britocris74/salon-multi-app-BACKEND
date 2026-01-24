import mongoose from 'mongoose'

const ValesSchema = new mongoose.Schema(
  {
    profesionalId: { type: mongoose.Schema.Types.ObjectId, required: true },
    monto: { type: Number, required: true },
  },
  { timestamps: true },
)
export const ValesModel = conn => {
  return conn.models.vales || conn.model('vales', ValesSchema)
}
