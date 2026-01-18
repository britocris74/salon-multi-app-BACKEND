import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { createTurno, getTurnos } from '../controllers/turnos.controller.js'

const router = express.Router()

router.post('/', authMiddleware, createTurno)
router.get('/', authMiddleware, getTurnos)

export default router
