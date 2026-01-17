import app from './app.js'
import dotenv from 'dotenv'
import { connectUsersDB } from './config/dbUsers.js'

dotenv.config()

const PORT = process.env.PORT || 3001

connectUsersDB() // 🔑 ESTA LÍNEA ES LA CLAVE

app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en puerto ${PORT}`)
})
