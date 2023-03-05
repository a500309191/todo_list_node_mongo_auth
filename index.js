const express = require("express")
const jsonWebToken = require("jsonwebtoken")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")

const app = express()



const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})