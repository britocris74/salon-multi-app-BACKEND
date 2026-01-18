import bcrypt from 'bcrypt'
import User from '../models/authUser.js'
import { generateToken } from '../utils/jwt.js'

export const me = async (req, res) => {
  const { userId } = req.user

  const user = await User.findById({ _id: userId })

  if (!user) {
    return res.status(401).json({ message: 'Usuario no válido' })
  }

  const token = generateToken({
    userId: user._id,
    empresaId: user.empresaId,
    sucursalId: user.sucursalId,
    rol: user.rol,
  })

  res.cookie(process.env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  })

  res
    .status(200)
    .json({ rol: user.rol, nombre: user.nombre, email: user.email, apellido: user.apellido })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email, activo: true })

  if (!user) {
    return res.status(401).json({ message: 'Usuario no válido' })
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash)
  if (!validPassword) {
    return res.status(401).json({ message: 'Password incorrecto' })
  }

  const token = generateToken({
    userId: user._id,
    empresaId: user.empresaId,
    sucursalId: user.sucursalId,
    rol: user.rol,
  })

  res.cookie(process.env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  })

  res
    .status(200)
    .json({ rol: user.rol, nombre: user.nombre, email: user.email, apellido: user.apellido })
}

export const logout = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  })

  return res.status(200).json({
    ok: true,
    message: 'Logout exitoso',
  })
}

export const createUsuario = async (req, res) => {
  try {
    const { empresaId, sucursalId } = req.user
    const { email, password, rol, nombre, apellido } = req.body

    if (!email) {
      return res.status(400).json({ message: 'El email es obligatorio' })
    }

    if (!password) {
      return res.status(400).json({ message: 'El password es obligatorio' })
    }

    const nuevoUsuario = await User.create({
      empresaId,
      sucursalId,
      email,
      passwordHash: await bcrypt.hash(password, 10),
      rol,
      nombre,
      apellido,
      activo: true,
    })

    res.status(201).json(nuevoUsuario)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creando usuario' })
  }
}
