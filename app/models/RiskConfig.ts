import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRiskConfig extends Document {
  userId: string;
  coinSymbol: string;
  maxPriceDropPercent: number;
  maxTradeVolumePercent: number;
  minLiquidity: number;
  notifications: {
    telegram: boolean;
    email: boolean;
  };
  notificationIds: {
    telegram?: string;
    email?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// Mongoose schema
const RiskConfigSchema: Schema<IRiskConfig> = new Schema(
  {
    userId: { type: String, required: true },
    coinSymbol: { type: String, required: true },
    maxPriceDropPercent: { type: Number, default: 10 },
    maxTradeVolumePercent: { type: Number, default: 50 },
    minLiquidity: { type: Number, default: 1000 },
    notifications: {
      telegram: { type: Boolean, default: true },
      email: { type: Boolean, default: true },
    },

    notificationIds: {
      telegram: { type: String, default: "" },
      email: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

// Avoid model overwrite issue in Next.js hot reload
const RiskConfig: Model<IRiskConfig> =
  mongoose.models.RiskConfig ||
  mongoose.model<IRiskConfig>("RiskConfig", RiskConfigSchema);

export default RiskConfig;
