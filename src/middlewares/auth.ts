import { Request, Response, NextFunction } from "express";
import User from '../models/user.model'
import jwt from 'jsonwebtoken' 

interface IDecodedToken {
  name: string,
  userId: string
}

const auth = ( req: Request, res: Response, next: NextFunction ) => {
  const token: string = req.headers['authorization']!
  
  if (!token) {
    return res.status(400).json({
      error: 'token not found!'
    })
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = (decoded as IDecodedToken).userId    

    User.findById(userId)
    .then(( responseUserId ) => {
      if ( userId === null ) {
        return res.status(400).json({
          error: 'not authorized!'
        })
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