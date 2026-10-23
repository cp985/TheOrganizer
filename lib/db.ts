import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI



interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongooseCache: MongooseCache | undefined
}

let cached = global.mongooseCache



export async function connectDB() {
  if (!MONGODB_URI) {
  throw new Error('Variabile db env non trovata / No environment db variable found')
}
if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null }
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      return mongooseInstance
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}