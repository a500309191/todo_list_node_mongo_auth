import mongoose from 'mongoose';

const { DB_HOST, DB_PORT, DB_NAME } = process.env;
// const dbUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
const dbUrl = `mongodb://root:123456@localhost:7017/mongodb?authSource=admin`


export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbUrl)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
