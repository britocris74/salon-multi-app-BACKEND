import mongoose from 'mongoose'

const servicioSchema = new mongoose.Schema(
  {
    tipoServicio: {
      type: String,
      required: true,
    },
    precioLista: {
      type: Number,
      required: true,
      min: 0,
    },
    precioEfectivo: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }, // evita crear _id para cada servicio
)

const comandaSchema = new mongoose.Schema(
  {
    profesionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profesional',
      required: true,
    },
    clienteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente',
      required: true,
    },
    servicios: {
      type: [servicioSchema],
      required: true,
      validate: v => v.length > 0,
    },
    tipoPagoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tipopago',
      required: true,
    },
    montoTotal: {
      type: Number,
      required: true,
      min: 0,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    empresaId: { type: mongoose.Schema.Types.ObjectId, required: true },
    sucursalId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
)

export const ComandaModel = conn => {
  return conn.models.comanda || conn.model('comanda', comandaSchema)
}
