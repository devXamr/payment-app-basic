import jwt from "jsonwebtoken";
const {verify} = jwt

import JWT_SECRET from "./config.js";


export const authMiddleware = async (req, res, next) => {
   const auth = req.headers.authorization

   if(!auth || !auth.startsWith('Bearer ')) {
       return res.status(403).json({
           msg: "user non-existent"
       })
   }

   const token = auth.split(' ')[1]

    try {
        const verified = await verify(token, JWT_SECRET)

        req.userId = verified.userId
        next();
    } catch (err){
       return res.status(403).json({
           error: err.message
       })
    }


}