
import mongoose from "mongoose"


mongoose.connect('mongodb+srv://devxamr:KPalr8DjlvEBxGYk@cluster0.xsdhsmt.mongodb.net/paytm')


const userSchema =  new mongoose.Schema({
        username: String,
        password: String,
        firstname: String,
        lastname: String,
})

const accountSchema = new mongoose.Schema({
        userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
        },
        balance: {
                type: Number,
                required: true
        }
})

export const Account = mongoose.model("Account", accountSchema)
export const  User = mongoose.model("User", userSchema)

