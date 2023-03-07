// require('dotenv').config();
import express, { Application, Request, Response, NextFunction }  from "express"
import bodyParser from "body-parser"
import { connectDB } from "./db/mongo"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {
    userModel,
    User,
    noteModel,
    Note,
    Token,
    tokenModel
} from "./db/schemas"
import e from "express"
import { NODATA } from "dns"
import { createDeflate } from "zlib"


const {
    PORT = "8080",
    JWT_ACCESS = "123456",
    JWT_REFRESH = "654321"
} = process.env

const app: Application = express()
// middlewares:
app.use(bodyParser.json())



type Payload = { [key: string]: any }
type ExtendedRequest = Request & Payload

const authenticateToken = (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization
        if (token == null) {
            return res.status(401).json({ success: false, error: "Unathorized" })
        }
        const payload = jwt.verify(token, JWT_ACCESS)
        if (payload) {
            req.user = payload
            next()
        } else {
            return res.status(400).json({ success: false, error: "No access rights" })
        }
    } catch (error) {
        res.status(400).json(error)
    }

}


// create new user
app.post(
    "/user/signup",
    async (req: Request, res: Response): Promise<Response> => {
        const name = req.body.name
        const password = req.body.password
        if (name && password) {
            const newUser: User = await userModel.create({
                name,
                password: bcrypt.hashSync(req.body.password, 10)
            })
            if (newUser) {
                return res.status(201).json({ succes: true, name: newUser.name })
            } else {
                return res.status(500).json({ success: false, error: "Something went wrong"})
            }
        } else {
            return res.status(400).json({ success: false, error: "Send needed params" })
        }
    }
)


// user login
app.post(
    "/user/login",
    async (req: Request, res: Response): Promise<Response> => {
        const name = req.body.name
        const password = req.body.password

        if (!name || !password) {
            return res.status(400).json({ success: false, error: "Send needed params" })
        }

        const user = await userModel.findOne({ name })
        if (!user) {
            return res.json({ success: false, error: "User does not exist" })
        } else {
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.json({ success: false, error: "Wrong password" })
            } else {
                const token: Token = await tokenModel.create({
                    accessToken: jwt.sign({ name: user.name }, JWT_ACCESS),
                    user: user._id
                })
                return res.status(201).json({
                    accessToken: token.accessToken,
                    userId: token.user
                })
            }
        }
    }
)


// create note
app.post(
    "/notes",
    authenticateToken,
    async (req: Request, res: Response): Promise<Response> => {
        const user = await tokenModel.findOne({ accessToken: req.headers.authorization })
        if (user) {
            const body = req.body.body
            if (body) {
                const newNote: Note = await noteModel.create({ body, user })
                if (newNote) {
                    console.log(newNote)
                    return res.status(201).json({ success: true, newNote })
                } else {
                    return res.status(500).json({ success: false, error: "Something went wrong"})
                }
            } else {
                return res.status(400).json({ success: false, error: "Send needed params" })
            }
        } else {
            return res.status(401).json({ success: false, error: "No access rights" })
        }
    }
)


// get notes
app.get(
    "/notes",
    authenticateToken,
    async (req: Request, res: Response): Promise<Response> => {
        const userId = await tokenModel.findOne({ accessToken: req.headers.authorization })
        if (userId) {
            const notes = await noteModel.find({ user: userId })
            return res.status(201).json({ notes })
        } else {
            return res.status(401).json({ success: false, error: "No access rights" })
        }
    }
)


// update notes
app.put(
    "/notes/:id",
    authenticateToken,
    async (req: Request, res: Response): Promise<Response> => {
        const user = await tokenModel.findOne({ accessToken: req.headers.authorization })
        if (user) {
            const body = req.body.body
            const isDone = req.body.isDone
            const _id = req.params.id
            if (body && isDone) {
                await noteModel.updateOne({ _id }, { body, isDone, user })
                    .catch(error => res.status(400).json({ error }))
                return res.status(201).json({ succes: true, body, isDone })
            } else {
                return res.status(400).json({ success: false, error: "Send needed params" })
            }
        } else {
            return res.status(401).json({ success: false, error: "No access rights" })
        }
    }
)


app.delete


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectDB()
})