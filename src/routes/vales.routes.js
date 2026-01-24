import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getVales, createVales } from '../controllers/vales.controller.js'
const router = express.Router()

router.get('/', authMiddleware, getVales)
router.post('/', authMiddleware, createVales)
export default router
