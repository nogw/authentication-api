require('dotenv').config()

import express from 'express'
import cors from 'cors'
import router from './router'
import mongoose from 'mongoose'
import helmet from 'helmet'
import { createServer } from "http";
import * as socketio from "socket.io";

// express server & websocket config
const app = express()
const port = process.env.PORT || 8000

app.set("port", port)
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use("/", router)

const httpServer = createServer(app);

const io = new socketio.Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  }
})

io.sockets.on("connection", (socket: socketio.Socket) => {
  socket.on("join", (room) => {
    socket.join(room)

    socket.on("jwt", (jwt) => {
      socket.broadcast.to(room).emit("auth", jwt)
    })
  })
})

// database config
const mgURI = process.env.MG_URI

mongoose.connect(mgURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

// db.on("error", () => {
//   console.error.bind(console, "connection error:")
// })

// db.once("open", () => {
//   console.log("database connect")
// })

// start server
httpServer.listen(port, () => {
  console.log(`run in ${port}`)
})