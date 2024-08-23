'use server';

import { UserService } from '@/lib/user/UserService';
import User from '@/lib/user/User';

const userService = new UserService();


export const getUsers = async () => {
    return await userService.getUsers();
};

export const getUserById = async (id: string) => {
    return await userService.getUserById(id);
};

export const createUser = async (user: User) => {
    const id = await userService.createUser(user);
    return id;
};

export const updateUser = async (id: string, user: Partial<User>) => {
    await userService.updateUser(id, user);
};
