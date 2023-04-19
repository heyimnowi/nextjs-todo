import { ObjectId } from 'mongodb'

export interface TodoItem {
  _id?: ObjectId;
  text: string;
  category: string;
  completed: boolean;
}