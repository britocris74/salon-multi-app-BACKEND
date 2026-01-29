import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { uploadExcel } from '../middlewares/uploadExcel.js'
import {
  createServicio,
  getServicio,
  importServicesFromExcel,
} from '../controllers/servicios.controller.js'

const router = express.Router()

router.post('/', authMiddleware, createServicio)
router.get('/', authMiddleware, getServicio)
router.post(
  '/update-from-excel',
  authMiddleware,
  uploadExcel.single('file'),
  importServicesFromExcel,
)

export default router
