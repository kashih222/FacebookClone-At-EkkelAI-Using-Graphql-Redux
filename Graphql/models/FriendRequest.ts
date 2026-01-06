import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFriendRequest extends Document {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}

const FriendRequestSchema: Schema<IFriendRequest> = new Schema<IFriendRequest>(
  {
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { 
      type: String, 
      enum: ["pending", "accepted", "rejected"], 
      default: "pending",
      required: true 
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

FriendRequestSchema.index({ from: 1, to: 1 }, { unique: true });

export const FriendRequest: Model<IFriendRequest> =
  mongoose.models.FriendRequest || mongoose.model<IFriendRequest>("FriendRequest", FriendRequestSchema);
