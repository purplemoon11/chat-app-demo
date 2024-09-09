import mongoose, { Schema } from "mongoose";
import { IMessage } from "../constants/message.interface";

const MessageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);
