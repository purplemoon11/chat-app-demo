import { Request, Response, NextFunction } from "express";
import { getAllMessages, saveMessage } from "../services/message.service";
import { IRequestWithUser } from "../utils/type";

export const sendMessageHandler = async (
  req: IRequestWithUser<any, any, any, any>,
  res: Response
) => {
  try {
    const sender = req.user?.id;
    const { content } = req.body;

    if (!sender) {
      return res.status(400).json({ message: "Sender not authenticated" });
    }

    const message = await saveMessage({ sender, content });
    return res.status(201).json({ message });
  } catch (error) {
    return res.status(500).json({ message: "Error sending message", error });
  }
};

export const getMessagesHandler = async (req: Request, res: Response) => {
  try {
    const messages = await getAllMessages();
    return res.status(200).json({ messages });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving messages", error });
  }
};
