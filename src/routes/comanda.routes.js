import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {
  /* getComandas,
  getComandaById, */
  getComandas,
  createComanda,
  /* updateComanda, */
} from '../controllers/comanda.controller.js'
const router = express.Router()

router.get('/', authMiddleware, getComandas)
//router.get('/:id', authMiddleware, getComandaById)
router.post('/', authMiddleware, createComanda)
// router.put('/:id', authMiddleware, updateComanda)
export default router
