import mongoose, { Schema, Document } from "mongoose";

export interface IOtp extends Document {
  email: string;
  otp: string;
  verified: boolean;
  createdAt: Date;
  expiresAt: Date;
}

const Otp: Schema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    verified: { type: Boolean, default: false },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 120,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
);

export default mongoose.models.Otp || mongoose.model<IOtp>("Otp", Otp);
