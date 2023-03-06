// require('dotenv').config();
import express, { Application, Request, Response, NextFunction }  from "express"
import bodyParser from "body-parser"
import { connectDB } from "./db/mongo"
import { userModel, User } from "./db/schemas"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


const SECRET_JWT_CODE = "psmR3Hu0jhHKfqZymo1m"
const PORT = process.env.PORT || 8080
const app: Application = express()
app.use(bodyParser.json())


app.get("/test", (req: Request, res: Response) => {
    res.send("test test test")
})


app.post("/user/signup", async (req: Request, res: Response): Promise<Response> => {
    const newUser: User = await userModel.create({
        name: req.body.name,
        password: req.body.password
    })
    return res.status(201).json(newUser)
})




app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectDB()
})