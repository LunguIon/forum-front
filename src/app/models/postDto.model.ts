import { UserDTO } from "./UserDTO.model";

export interface postDto{
    postDto: string,
    user: UserDTO,
    title: string,
    content: string,
    imageURL: string,
    createdDate: string,
    updateDate: string
}