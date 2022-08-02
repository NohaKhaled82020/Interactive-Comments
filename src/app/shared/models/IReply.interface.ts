import { IUser } from './IUser.model';

export interface IReply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: IUser;
}
