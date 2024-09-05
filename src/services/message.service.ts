import { IMessage } from "../constants/message.interface";
import { MessageModel } from "../models/message.model";

export const saveMessage = async (
  messageData: Partial<IMessage>
): Promise<IMessage> => {
  const message = new MessageModel(messageData);
  return await message.save();
};

export const getAllMessages = async () => {
  return await MessageModel.find().sort({ createdAt: 1 });
};
