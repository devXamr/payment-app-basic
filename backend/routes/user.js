import express from "express"
import {string, z} from "zod"
import {Account, User} from "../db.js";
import jwt from "jsonwebtoken";
const {sign} = jwt
import JWT_SECRET from "../config.js";
import {authMiddleware} from "../middleware.js";

const user = express.Router()
export default user

const userSchema = z.object({
    username: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string()

})

user.post('/signup', async (req, res) => {
    const username = req.body.username
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const password = req.body.password


    const {success} = userSchema.safeParse({username, firstname, lastname, password})

    const alreadyExists = await User.findOne({username, firstname, lastname, password})

    if (alreadyExists || !success){
        return res.status(409).json({
            msg: "Email already taken/ Incorrect Inputs"
        })
    }
    const newUser = await User.create({
        username,
        firstname,
        lastname,
        password
    })

    const userId = newUser._id


    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })


    const token = sign({userId}, JWT_SECRET)
    res.status(200).json({
        msg: "user has been created successfully",
        token : token

    })

})

const signInValidate = z.object({
    username : z.string(),
    password : z.string()
})

user.post('/signin', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const {success} = signInValidate.safeParse({username, password})

    const isLegit = await User.findOne({
        username,
        password
    })

    if(!isLegit || !success){
        return res.status(409).json({
            msg: "Error while logging in"
        })
    }

    const token = sign({userId : isLegit._id}, JWT_SECRET)



    res.json({
        token: token
    })



})

const validUpdate = z.object({
    password: z.string().optional(),
    firstname : z.string().optional(),
    lastname : z.string().optional()
})

user.put('/', authMiddleware, async (req, res) => {
    const {success} = validUpdate.safeParse(req.body)

    if(!success){
        res.status(409).json({
            msg: "There was an error, try again."
        })
    }

    await User.updateOne({_id : req.userId}, req.body)

    res.json({
        msg: "information updated successfully"
    })

})

user.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || " "

    const searchedUsers = await User.find({
        $or :
            [ {firstname : {"$regex": filter, "$options": "i"}},
                {lastname: {"$regex": filter, "$options": "i"}}] })

    if(!searchedUsers){
        res.status(403).json({
            msg: "no matching user found."
        })
    }

    console.log(searchedUsers)
    res.json({
        users: searchedUsers.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            userId : user._id


        }))
    })
})
