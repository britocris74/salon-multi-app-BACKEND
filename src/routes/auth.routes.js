import express from 'express'
import { me, login, logout, createUsuario } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.get('/me', authMiddleware, me)
router.post('/create', authMiddleware, createUsuario)

export default router
