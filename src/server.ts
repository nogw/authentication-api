require('dotenv').config()

import express from 'express'
import cors from 'cors'
import router from './router'
import mongoose from 'mongoose'
import helmet from 'helmet'
import * as socketio from 'socket.io'

// express server & websocket config
const app = express()
const port = process.env.PORT || 8000
app.set("port", port)
const http = require("http").Server(app);
const io = require("socket.io")(http)

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use("/", router)

io.on("connection", (socket: any) => {
  console.log(socket)
})

// database config
const mgURI = process.env.MG_URI

mongoose.connect(mgURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on("error", () => {
  console.error.bind(console, "connection error:")
})

db.once("open", () => {
  console.log("database connect")
})

// start server
const server = http.listen(port, () => {
  console.log(`run in ${port}`)
})