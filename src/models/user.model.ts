import mongoose, { Document } from 'mongoose'
const Schema = mongoose.Schema

export interface IData extends Document {
  _id: string,
  name: string,
  email: string,
  password: string
};

const userSchema = new Schema<IData>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  }
)

export default mongoose.model("User", userSchema)