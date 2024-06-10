import { UserDTO } from "./UserDTO.model";

export interface GetCommentDTO {
    commentId: string,
    user: UserDTO,
    content: string,
    postId: string,
    valueOfLikes: number,
    creationDate: string,
    updateDate: string
}