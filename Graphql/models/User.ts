import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  surname: string;
  email: string;
  passwordHash: string;
  dob: Date;
  gender: string;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female", "custom"], required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

