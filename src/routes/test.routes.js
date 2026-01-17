import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/private', authMiddleware, (req, res) => {
  res.json({
    message: 'Acceso permitido',
    user: req.user,
  })
})

export default router
