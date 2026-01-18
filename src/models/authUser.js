import mongoose from 'mongoose'

const AuthUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    nombre: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    empresaId: { type: mongoose.Schema.Types.ObjectId, required: true },
    sucursalId: { type: mongoose.Schema.Types.ObjectId, required: true },
    rol: { type: String, default: 'OWNER' },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true },
)

/* export default mongoose.model('usuarios', AuthUserSchema) */

export default mongoose.models.AuthUser || mongoose.model('usuarios', AuthUserSchema)
