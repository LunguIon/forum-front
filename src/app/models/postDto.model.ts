import { UserDTO } from "./UserDTO.model";

export interface postDto{
    postId: string,
    user: UserDTO,
    title: string,
    content: string,
    imageURL: string,
    createdDate: string,
    updateDate: string
}