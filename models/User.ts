import mongoose, { Schema, Document, Model } from 'mongoose'

export interface User {
    _id: string
    username: string
    password: string
    isAdmin: boolean
}

interface UserDocument extends Document {
    username: string
    password: string
    isAdmin: boolean

}

const UserSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

export const UserModel: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema)