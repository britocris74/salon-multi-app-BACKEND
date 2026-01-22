import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getTiposPago, createTiposPago } from '../controllers/tiposPago.controller.js'
const router = express.Router()

router.get('/', authMiddleware, getTiposPago)
router.post('/', authMiddleware, createTiposPago)
export default router
