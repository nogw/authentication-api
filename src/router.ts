import express from 'express'
import userController from './controllers/user.controller'

const router = express.Router()

router.route("/register")
  .post(userController.createUser)

router.route("/login")
  .post(userController.logUser)

export default router