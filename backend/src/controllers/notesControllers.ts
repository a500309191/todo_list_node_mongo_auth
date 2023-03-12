import { Request, Response, NextFunction }  from "express"
import jwt from "jsonwebtoken"
import { userModel, noteModel, Note } from "../db/schemas"
const { JWT_ACCESS = "123456" } = process.env


type Payload = { [key: string]: any }
type ExtendedRequest = Request & Payload


export const authenticateToken = (
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


export const getNotes = async (req: ExtendedRequest, res: Response): Promise<Response> => {
    const user = await userModel.findOne({ name: req.user.name })
    if (user) {
        const notes = await noteModel.find({ user: user._id })
            .catch(error => res.status(500).json({ error }))
        return res.status(201).json({ username: user.name, notes })
    } else {
        return res.status(401).json({ success: false, error: "No access rights" })
    }
}


export const createNote = async (req: ExtendedRequest, res: Response): Promise<Response> => {
    
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


export const updateNote = async (req: ExtendedRequest, res: Response): Promise<Response> => {
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


export const deleteNote = async (req: Request, res: Response): Promise<Response> => {
    try {
        await noteModel.deleteOne({ _id:  req.params.id })
        return res.status(201).json({ success: true })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
