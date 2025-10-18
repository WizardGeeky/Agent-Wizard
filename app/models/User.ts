import mongoose, { Schema, Document, Model } from "mongoose";

// TypeScript interface
export interface IUser extends Document {
  name: string;
  metamask: string;
  email: string;
  password: string;
  loginType: string;
  isTelegramNotificationOn: boolean;
  isEmailNotificationOn: boolean;
  status: "active" | "blocked";
}

// Mongoose schema
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, unique: true },
    metamask: { type: String, unique: true },
    password: { type: String },
    loginType: { type: String },
    isTelegramNotificationOn: { type: Boolean, default: false },
    isEmailNotificationOn: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "blocked"], default: "active" },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
