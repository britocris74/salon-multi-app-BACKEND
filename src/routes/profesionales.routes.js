import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getProfesionales, createProfesional } from '../controllers/profesionales.controller.js'

const router = express.Router()

router.get('/', authMiddleware, getProfesionales)
router.post('/', authMiddleware, createProfesional)

export default router
