import { User } from "./user.model";
import { VoteStatus } from "./voteStatus.type";
export interface Post {
    id: number;
    valueOfLikes: number;
    nrComments: number;
    voteStatus: VoteStatus;
    content: string;
    imgLink: string | null;
    user: User; // add the user property here
  }