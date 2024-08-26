import User from "./User";

export interface CreateUserDto extends User {}

export interface UpdateUserDto extends Partial<User> {
    id: string
}