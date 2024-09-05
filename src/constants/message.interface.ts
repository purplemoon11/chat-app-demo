export interface IMessage extends Document {
  sender: string;
  content: string;
  createdAt?: Date;
}
