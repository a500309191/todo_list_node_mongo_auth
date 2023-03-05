const mongoose = require("mongoose")
const { Schema } = mongoose

const noteSchema = new Schema(
    {
        body: {
            type: String,
            required: true,
        },
        created: {
            type: Date,
            default: Date.now()
        }
    },
    {
        timestamps: true,
    }
)

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 100,
            minlength: 2,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)
