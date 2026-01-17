// 🚨 Middleware global de manejo de errores

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
  }
}

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const isOperational = err.isOperational || false

  // Log solo errores inesperados (no operacionales)
  if (!isOperational) {
    console.error('❌ Error inesperado:', err)
  }

  res.status(statusCode).json({
    error: isOperational ? err.message : 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && !isOperational && { stack: err.stack }),
  })
}

// Wrapper para async handlers - evita try/catch repetitivo
export const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
