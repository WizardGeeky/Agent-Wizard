import mongoose, { Schema, Document, Model, model } from "mongoose";

export interface IAssetMonitor extends Document {
  userId: string;
  assets: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AssetMonitorSchema: Schema<IAssetMonitor> = new Schema(
  {
    userId: { type: String, required: true },
    assets: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const AssetMonitor: Model<IAssetMonitor> =
  mongoose.models.AssetMonitor || model<IAssetMonitor>("AssetMonitor", AssetMonitorSchema);

export default AssetMonitor;
