import express from 'express'
import userController from './controllers/user.controller'
import auth from './middlewares/auth'

const router = express.Router()

router.route("/register")
  .post(userController.createUser)

router.route("/login")
  // .all(auth)
  .post(userController.logUser)

router.route("/reset")
  .post(userController.sendEmail2PasswordUser)

router.route("/reset/password/:token")
  .post(userController.resetPasswordUser)

export default router