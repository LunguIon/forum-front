import { UserDTO } from "./UserDTO.model";
import { User } from "./user.model";

export interface TopicDTO {
    id: number;
    title: string;
    content: string;
    user: UserDTO;
  }