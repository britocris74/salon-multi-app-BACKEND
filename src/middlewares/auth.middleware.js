import { verifyToken } from '../utils/jwt.js'

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.[process.env.COOKIE_NAME]

    if (!token) {
      return res.status(401).json({ message: 'No autenticado' })
    }

    const decoded = verifyToken(token)

    // 👉 lo dejamos disponible para el resto de la app
    req.user = {
      userId: decoded.userId,
      empresaId: decoded.empresaId,
      sucursalId: decoded.sucursalId,
      rol: decoded.rol,
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Sesión inválida o expirada' })
  }
}
