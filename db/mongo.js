const mongoose = require("mongoose")
const url = "mongodb://mongo:27017/docker-mongo"

const connectDb = async () => {
    mongoose.connect(url, () => {
        console.log("connected to MongoDB")
    })
}

module.exports = connectDb

