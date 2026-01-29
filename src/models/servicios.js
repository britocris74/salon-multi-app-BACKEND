import mongoose from 'mongoose'

const ServicioSchema = new mongoose.Schema(
  {
    nro: { type: String, required: true },
    servicio: { type: String, required: true },
    precioLista: { type: Number, required: true },
    precioEfectivo: { type: Number, required: true },
    empresaId: { type: mongoose.Schema.Types.ObjectId, required: true },
    sucursalId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
)
export const ServicioModel = conn => {
  return conn.models.servicios || conn.model('servicios', ServicioSchema)
}
