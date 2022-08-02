import { IReply } from './IReply.interface';
import { IUser } from './IUser.model';

export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: IUser;
  replies: IReply[];
}
