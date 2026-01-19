import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import testRoutes from './routes/test.routes.js'
import clientesRoutes from './routes/clientes.routes.js'
import turnosRoutes from './routes/turnos.routes.js'
import profesionalesRoutes from './routes/profesionales.routes.js'
import serviciosRoutes from './routes/servicios.routes.js'
import { errorHandler } from './middlewares/error.middleware.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)

app.use('/api/auth', authRoutes)

app.use('/api/test', testRoutes)

app.use('/api/clientes', clientesRoutes)

app.use('/api/turnos', turnosRoutes)

app.use('/api/profesionales', profesionalesRoutes)

app.use('/api/servicios', serviciosRoutes)

// Middleware de error global (debe ir al final)
app.use(errorHandler)

export default app
