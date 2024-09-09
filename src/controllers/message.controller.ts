import { Request, Response, NextFunction } from "express";
import {
  getAllMessages,
  saveMessage,
  searchMessages,
} from "../services/message.service";
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

export const getMessagesHandler = async (
  req: IRequestWithUser<any, any, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const messages = await getAllMessages();
    const currentUser = req.user?.id;
    res.status(200).send({ messages, currentUser });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching messages", error });
  }
};

export const searchMessagesHandler = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.q as string;
    const messages = await searchMessages(searchTerm);
    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ message: "Error searching messages", error });
  }
};
