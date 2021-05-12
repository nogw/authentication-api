import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken' 

const auth = ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const token = req.body.authorization
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id
    
    if ( req.body.authorization != userId ) {
      throw 'Invalid user ID'
    } else {
      next()
    }
  } catch (error) {
    res.status(400).json({
      error: error
    })
  }
}

export default auth