import { IMessage } from "../constants/message.interface";
import { MessageModel } from "../models/message.model";

/**
 *
 * @param messageData
 * @returns
 */

export const saveMessage = async (
  messageData: Partial<IMessage>
): Promise<IMessage> => {
  const message = new MessageModel(messageData);
  return await message.save();
};

/**
 *
 * @returns
 */

export const getAllMessages = async () => {
  return await MessageModel.find()
    .populate("sender", "fullName _id")
    .sort({ createdAt: 1 });
};

/**
 *
 * @param searchTerm
 * @returns
 */

export const searchMessages = async (searchTerm: string) => {
  if (!searchTerm) {
    return [];
  }
  return await MessageModel.find({
    content: { $regex: searchTerm, $options: "i" },
  }).sort({ createdAt: 1 });
};
