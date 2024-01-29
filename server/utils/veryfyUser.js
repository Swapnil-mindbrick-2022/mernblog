import jwt from 'jsonwebtoken';

import {errorHandler} from './error.js';

export const verifyToken = ( req,res,next)=>{

    const token = req.cookies && req.cookies.access_token; // Check if cookies object exists
    console.log(token)

    if(!token){
        return next(errorHandler(401,'Unautherozed '))
    }

    jwt.verify(token, process.env.JWTSECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401,'Unautherozed '))
        }

        req.user = user;

        next()
    });

}