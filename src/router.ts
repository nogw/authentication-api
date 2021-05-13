import express from 'express'
import userController from './controllers/user.controller'
import auth from './middlewares/auth'

const router = express.Router()

router.route("/register")
  .post(userController.createUser)

router.route("/login")
  .all(auth)
  .post(userController.logUser)

export default router