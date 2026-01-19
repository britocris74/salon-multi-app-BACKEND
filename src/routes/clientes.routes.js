import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
} from '../controllers/clientes.controller.js'

const router = express.Router()

router.get('/', authMiddleware, getClientes)
router.get('/:id', authMiddleware, getClienteById)
router.post('/', authMiddleware, createCliente)
router.put('/:id', authMiddleware, updateCliente)
export default router
