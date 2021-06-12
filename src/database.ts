import mongoose from 'mongoose'

const mgURI = process.env.MG_URI

const connect = () => {
  mongoose.connect(mgURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
  // const db = mongoose.connection
  
  // db.on("error", () => {
  //   console.error.bind(console, "connection error:")
  // })
  
  // db.once("open", () => {
  //   console.log("database connect")
  // })
}

export default {
  connect
}

