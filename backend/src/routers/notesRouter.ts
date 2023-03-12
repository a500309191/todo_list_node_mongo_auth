import express from "express"
import { authenticateToken, getNotes, createNote, updateNote, deleteNote } from "../controllers/notesControllers"

export const notesRouter = express.Router()    

notesRouter.get("/", authenticateToken, getNotes)
notesRouter.post("/", authenticateToken, createNote)
notesRouter.put("/:id", authenticateToken, updateNote)
notesRouter.delete("/:id", authenticateToken, deleteNote)
