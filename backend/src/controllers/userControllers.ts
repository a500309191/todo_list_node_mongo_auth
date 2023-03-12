import { Request, Response }  from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { userModel, User } from "../db/schemas"
const { JWT_ACCESS = "123456" } = process.env


export const userSignup = async (req: Request, res: Response): Promise<Response> => {
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


export const userSignin = async (req: Request, res: Response): Promise<Response> => {
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