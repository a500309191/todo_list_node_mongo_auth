// require('dotenv').config();
import express, { Application, Request, Response, NextFunction }  from "express"
import bodyParser from "body-parser"
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { connectDB } from "./db/mongo"
import { userModel, User, noteModel, Note } from "./db/schemas"
import { errors } from "@typegoose/typegoose"


const {
    PORT = "8080",
    JWT_ACCESS = "123456",
    JWT_REFRESH = "654321",
} = process.env

const app: Application = express()
// middlewares:
app.use(bodyParser.json())
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );



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
            try {
                const hashedPassword = bcrypt.hashSync(req.body.password, 10)
                const newUser: User = await userModel.create({ name, password: hashedPassword })
                return res.status(201).json({ succes: true, name: newUser.name })
            } catch (error) {
                console.log(error)
                return res.status(500).json({ success: false, error: "This username is already taken"})
            }
        } else {
            return res.status(400).json({ success: false, error: "Send needed params" })
        }
    }
)


// user login
app.post(
    "/user/signin",
    async (req: Request, res: Response): Promise<Response> => {
        const name = req.body.name
        const password = req.body.password

        if (!name || !password) {
            return res.status(400).json({ success: false, error: "Send needed params" })
        }

        const user = await userModel.findOne({ name })
        if (!user) {
            return res.status(500).json({ success: false, error: "User does not exist" })
        } else {
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(500).json({ success: false, error: "Wrong password" })
            } else {
                const accessToken = jwt.sign({ name: user.name }, JWT_ACCESS)
                return res.status(201).json({ success: true, accessToken })
            }
        }
    }
)




// create note
app.post(
    "/notes",
    authenticateToken,
    async (req: ExtendedRequest, res: Response): Promise<Response> => {
        
        const user = await userModel.findOne({ name: req.user.name })
        if (user) {
            const body = req.body.body
            if (body) {
                try {
                    const newNote: Note = await noteModel.create({ body, user: user._id })
                    return res.status(201).json({ success: true, newNote })
                } catch (error) {
                    return res.status(500).json({ success: false, error })
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
    "/data",
    authenticateToken,
    async (req: ExtendedRequest, res: Response): Promise<Response> => {
        const user = await userModel.findOne({ name: req.user.name })
        if (user) {
            const notes = await noteModel.find({ user: user._id })
                .catch(error => res.status(500).json({ error }))
            return res.status(201).json({ username: user.name, notes })
        } else {
            return res.status(401).json({ success: false, error: "No access rights" })
        }
    }
)


// update note
app.put(
    "/notes/:id",
    authenticateToken,
    async (req: ExtendedRequest, res: Response): Promise<Response> => {
        const user = await userModel.findOne({ name: req.user.name })
        if (user) {
            const body = req.body.body
            const _id = req.params.id
            if (body) {
                await noteModel.updateOne({ _id }, { body })
                    .catch(error => res.status(500).json({ error }))
                return res.status(201).json({ succes: true, body })
            } else {
                return res.status(400).json({ success: false, error: "Send needed params" })
            }
        } else {
            return res.status(401).json({ success: false, error: "No access rights" })
        }
    }
)

// delete note
app.delete(
    "/notes/:id",
    authenticateToken,
    async (req: Request, res: Response): Promise<Response> => {

        await noteModel.deleteOne({ _id:  req.params.id })
            .catch(error => res.status(500).json({ error }))

        return res.status(201).json({ success: true })
    }
)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectDB()
})