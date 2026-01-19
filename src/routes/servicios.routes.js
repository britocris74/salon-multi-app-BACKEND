import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { createServicio, getServicio } from '../controllers/servicios.controller.js'

const router = express.Router()

router.post('/', authMiddleware, createServicio)
router.get('/', authMiddleware, getServicio)

export default router
