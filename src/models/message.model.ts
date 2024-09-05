import mongoose, { Schema } from "mongoose";
import { IMessage } from "../constants/message.interface";

const MessageSchema: Schema = new Schema({
  sender: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);
