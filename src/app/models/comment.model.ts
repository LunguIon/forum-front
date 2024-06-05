import { User } from "./user.model";
import { VoteStatus } from "./voteStatus.type";

export interface Comment{
    id: number;
    valueOfLikes: number
    nrComments: number;
    voteStatus: VoteStatus;
    content: string;
    user: User;
  }
  