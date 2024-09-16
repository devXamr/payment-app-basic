import express from "express"
import {authMiddleware} from "../middleware.js";
import {Account, User} from "../db.js";
import {z} from "zod"
import mongoose from "mongoose";
import user from "./user.js";

const accountRouter = express.Router()
export default accountRouter

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    const id = req.userId

    const userAccount = await Account.findOne({
        userId : id
    })

    const bal = userAccount.balance

    res.json({
        msg: "account balance" + bal,
        balance : bal,
        name: userAccount.firstname

    })
})

const transferBody = z.object(
    {
        to : z.string(),
        amount : z.number()
    }

)


accountRouter.post("/transfer", authMiddleware, async (req, res) => {

    const session = await mongoose.startSession()

    session.startTransaction()
    const to = req.body.to
    const amount = req.body.amount

    const {success} = transferBody.safeParse({to, amount})

    if (!success){
        await session.abortTransaction()
        return res.status(409).json({

            msg: "invalid data type for receiver address or transfer amount"
        })
    }

    const isLegit = await User.findOne({
        _id: to
    }).session(session)

    const sender = await Account.findOne({
        userId: req.userId
    }).session(session)

    if(!sender) {
        await session.abortTransaction()
        return res.status(409).json({
            msg: "the sender account does not exist"
        })
    }

    console.log(sender.balance)

    console.log(isLegit)

    if(!isLegit || sender.balance < amount){
        await session.abortTransaction()
        return res.status(409).json({
            msg: "invalid transfer details: account balance or receiver details"
        })
    }

    await Account.updateOne({
        userId : req.userId
    }, {$inc :{ balance : -amount}}).session(session)

    await Account.updateOne({
        userId: to
    }, {$inc : {balance : amount}}).session(session)

    await session.commitTransaction()

    res.json({
        msg: "Transaction Successful!"
    })

    


})