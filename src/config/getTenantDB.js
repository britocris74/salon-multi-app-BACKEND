import mongoose from 'mongoose'

const connections = {} // cache de conexiones

const buildTenantUri = (baseUri, dbName) => {
  return baseUri.replace(/\/([^/?]+)(\?|$)/, `/${dbName}$2`)
}

export const getTenantDB = async empresaId => {
  const dbName = `empresa_${empresaId}`

  if (connections[dbName]) {
    return connections[dbName]
  }

  const uri = buildTenantUri(process.env.MONGO_USERS_URI, dbName)
  const conn = await mongoose.createConnection(uri)

  connections[dbName] = conn

  console.log(`🏢 Conectado a DB: ${dbName}`)

  return conn
}
