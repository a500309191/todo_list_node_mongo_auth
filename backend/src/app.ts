// require('dotenv').config();
import express, { Application }  from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { connectDB } from "./db/mongo"
import { userRouter } from "./routers/userRouter"
import { notesRouter } from "./routers/notesRouter"


const { PORT = "8080" } = process.env

const app: Application = express()

app.use(bodyParser.json())
app.use( cors({ origin: "http://localhost:3000", credentials: true, }) )
app.use("/user", userRouter)
app.use("/notes", notesRouter)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectDB()
})