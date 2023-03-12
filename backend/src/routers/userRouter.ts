import express from "express"
import { userSignup, userSignin } from "../controllers/userControllers"

export const userRouter = express.Router()    

userRouter.post("/signup", userSignup)
userRouter.post("/signin", userSignin)

