import mongoose from 'mongoose'

export const connectUsersDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_USERS_URI)
    console.log('✅ Conectado a DB de usuarios')
  } catch (error) {
    console.error('❌ Error DB usuarios', error)
    process.exit(1)
  }
}
