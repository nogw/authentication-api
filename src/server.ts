require('dotenv').config()

import express from 'express'
import cors from 'cors'
import router from './router'
import mongoose from 'mongoose'
import helmet from 'helmet'

const app = express()
const port = process.env.PORT || 8000
const mgURI = process.env.MG_URI

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use("/", router)

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

app.listen(port, () => console.log(`run in ${port}`))