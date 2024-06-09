import { User } from "./user.model";

export interface TopicDTO {
    id: number;
    title: string;
    content: string;
    user: User;
  }