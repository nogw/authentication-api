require('dotenv').config()

import express from 'express'
import cors from 'cors'
import router from './router'
import mongoose from 'mongoose'
import helmet from 'helmet'
import { createServer } from "http";
import * as socketio from "socket.io";

import database from './database'
import websocket from './websocket'

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
    origin: process.env.FRONTEND_URL,
  }
})

database.connect()

websocket.socketListeners(io)

httpServer.listen(port)