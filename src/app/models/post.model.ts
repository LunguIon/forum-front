import { User } from "./user.model";
export interface Post {
    id: number;
    valueOfLikes: number;
    nrComments: number;
    voteStatus: 'upvoted' | 'downvoted' | 'undefined';
    content: string;
    imgLink: string | null;
    user: User; // add the user property here
  }