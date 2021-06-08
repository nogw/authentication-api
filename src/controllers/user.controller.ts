import { Request, Response } from 'express'
import validateLogin from '../validation/validateLogin'
import validateRegister from '../validation/validateRegister'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.model'
import nodemailer from 'nodemailer'
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

const createUser = async ( req: Request, res: Response ) => {
  // * this function needs an email, user, password and confirm password
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
        error: { email: 'This email has already been registered' }
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
      .catch((error: Error) => {
        return res.status(400).json({
          error: error
        })
      })
    })
  } catch (error: any) {
    return res.status(400).json({
      error: error
    })
  }
}

const logUser = async ( req: Request, res: Response ) => {
  // * this function needs an email and a user

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
          password: 'Password does not matched!',
        })
      }

    })
  } catch (err) {
    return res.status(400).json({ message: err })
  }
}

const sendEmail2PasswordUser = async ( req: Request, res: Response ) => {
  // find email to check if exists in database
  const user = await User.find({ email: req.body.emailToReset }).exec()

  if (user.length < 1) {
    return res.status(404).json({
      error: "user not found"
    })
  }

  // TODO: create temporary ids generation to reset password
  // try sending an email with a link to reset the password 
  try {
    let token = jwt.sign(
      { id: user[0]._id },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 5 }
    )
    // email template to reset password
    const filePath = path.join(__dirname, '../html_email/template.hbs');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
      link: `${process.env.FRONTEND_URL}/reset/${token}`
    };
    const htmlToSend = template(replacements);

    const credentials = {
      user: process.env.EMAIL2SEND,
      pass: process.env.PASSWORD2SEND
    }

    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: credentials
    });
    
    var mailOptions = {
      from: 'testandotermux@gmail.com',
      to: req.body.emailToReset,
      subject: 'no-reply',
      html: htmlToSend
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        res.send(process.env.EMAIL2SEND);
      }
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    })
  }
}

const resetPasswordUser = ( req: Request, res: Response ) => {
  const token = req.params.token

  const decodedJWT = jwt.decode(token)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded: any) => {
    if (err) {
      return res.status(400).json({
        error: "your token inspired, try again"
      })
    }

    return bcrypt.hash(req.body.password, 10, (err, hashedNewPassword) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }

      User.findByIdAndUpdate(
        decoded.id, 
        { password: hashedNewPassword }, 
        { useFindAndModify: false },
        (err, doc) => {
          if (err) {
            return res.status(400).json({
              error: err
            })
          }

          return res.status(200).json({
            message: doc
          })
        }
      )
    })
  })
}

export default {
  createUser,
  logUser,
  sendEmail2PasswordUser,
  resetPasswordUser,
}