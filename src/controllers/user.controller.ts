import { Request, Response } from 'express'
import validateLogin from '../validation/validateLogin'
import validateRegister from '../validation/validateRegister'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.model'

const createUser = async ( req: Request, res: Response ) => {
  const { errors, isValid } = validateRegister(req.body)

  if (!isValid) {
    return res.status(400).json({
      error: errors
    })
  }

  try {
    const user = await User.find({ email: req.body.email }).exec()

    if (user.length > 0) {
      return res.status(400).json({
        error: 'user exists'
      })
    }

    return bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }

      let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
      })

      user.save()
      .then((user: any) => {
        let token = jwt.sign({
          name: user.name,
          userId: user._id
        },
          process.env.JWT_SECRET
        )

        return res.status(200).json({
          message: token
        })
      })
      .catch((error) => {
        return res.status(400).json({
          error: error
        })
      })
    })
  } catch (error) {
    return res.status(400).json({
      error: error
    })
  }
}

const logUser = async ( req: Request, res: Response ) => {
  const { errors, isValid } = validateLogin(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  try {
    const user: any = await User.findOne({ email: req.body.email }).exec()

    if (!user) {
      return res.status(400).json({
        email: 'Could not find email.',
      })
    }

    return bcrypt.compare(req.body.password, user.password, function (err, result) {
      
      if (err) {
        return res.status(400).json({
          errorMessage: err,
        })
      }
      
      if (result) {
        let token: any = jwt.sign(
          { 
            id: user._id,
	          name: user.name,
            avatarColor: user.avatarColor,
            description: user.description
          }, 
          process.env.JWT_SECRET
        )

        return res.status(200).json({
          auth: true,
          token: token,
        })
      } 
      
      else {
        return res.status(400).json({
          message: 'password does not matched!',
        })
      }

    })
  } catch (err) {
    return res.status(400).json({ message: err })
  }
}

export default {
  createUser,
  logUser
}