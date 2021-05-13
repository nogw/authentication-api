import { Request, Response, NextFunction } from "express";
import User from '../models/user.model'
import jwt from 'jsonwebtoken' 

const auth = ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const token: any = req.headers.authorization
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id    

    User.findById(userId)
    .then(( responseUserId ) => {
      if ( userId === null ) {
        const err: any = new Error("not authorized!");
        err.status = 400;
        return next()
      } else {
        return next()
      }
    })
    .catch(( error ) => {
      return res.status(400).json({
        error: decoded
      })
    })
  } catch (error) {
    return res.status(400).json({
      error: error
    })
  }
}

export default auth