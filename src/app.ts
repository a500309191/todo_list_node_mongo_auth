// require('dotenv').config();
import express, { Application, Request, Response, NextFunction }  from "express"
import bodyParser from "body-parser"
import { connectDB } from "./db/mongo"
import { userModel, User, noteModel, Note } from "./db/schemas"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


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
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(" ")[1]
        if (token == null) {
            return res.status(401).json({ success: false, error: "unathorized" })
        }
        const payload = jwt.verify(token, JWT_ACCESS)
        if (payload) {
            req.user = payload
            next()
        } else {
            return res.status(400).json({ success: false, error: "no access rights" })
        }
    } catch (error) {
        res.status(400).json({ error })
    }

}


// create new user
app.post(
    "/user/signup",
    async (req: Request, res: Response): Promise<Response> => {
        const name = req.body.name
        const password = req.body.password

        if (!name || !password) {
            return res.status(400).json({ success: false, error: "Send needed params" })
        }
        const newUser: User = await userModel.create({
            name,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        if (newUser) {
            return res.status(201).json({ succes: true, name: newUser.name })
        } else {
            return res.status(500).json({ success: false, error: "Something went wrong"})
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
                const token = await jwt.sign({ name: user.name }, JWT_ACCESS)
                return res.status(201).json({ token })
            }
        }
    }
)


app.post(
    "/notes",
    authenticateToken,
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const newNote: Note = await noteModel.create({ body: req.body.body })
            if (newNote) {
                return res.status(201).json(newNote)
            } else {
                return res.status(500).json({ success: false, error: "Something went wrong"})
            }
        } catch (error) {
            return res.json({ success: false, error })
        }
    }
)

// app.get(
//     "/notes",
//     authenticateToken,
//     async (req: Request, res: Response): Promise<Response> => {

//     }
// )

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectDB()
})