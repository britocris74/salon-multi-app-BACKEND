import mongoose from 'mongoose'

const connections = {} // cache de conexiones

export const getTenantDB = async empresaId => {
  const dbName = `empresa_${empresaId}`

  if (connections[dbName]) {
    return connections[dbName]
  }

  const uri = process.env.MONGO_USERS_URI.replace(/\/([^/?]+)(\?|$)/, `/${dbName}$2`)

  const conn = await mongoose.createConnection(uri)

  connections[dbName] = conn

  console.log(`🏢 Conectado a DB: ${dbName}`)

  return conn
}
