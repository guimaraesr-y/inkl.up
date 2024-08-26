'use server';

import { UserService } from '@/lib/user/UserService';
import User from '@/lib/user/User';
import { CreateUserDto, UpdateUserDto } from '@/lib/user/interfaces';
import Unauthorized from '@/errors/Unauthorized';

const userService = new UserService();


export const getUsers = async () => {
    return await userService.getUsers();
};

export const getUserById = async (id: string) => {
    return await userService.getUserById(id);
};

export const createUser = async (user: CreateUserDto) => {
    const id = await userService.createUser(user);
    return id;
};

export const updateUser = async (user: UpdateUserDto) => {
    const authenticatedUser = await userService.getUserById(user.id);

    if(authenticatedUser?.id !== user.id) {
        throw new Unauthorized();
    }

    await userService.updateUser(user);
};
