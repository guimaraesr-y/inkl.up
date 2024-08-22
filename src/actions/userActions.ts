'use server';

import { getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { UserService } from '@/lib/user/UserService';
import User from '@/lib/user/User';

const userService = new UserService();


export const getUsers = async () => {
    return await userService.getUsers();
};

export const getUserById = async (id: string) => {
    return await userService.getUserById(id);
};

export const createUser = async (user: Omit<User, 'id'>) => {
    const id = await userService.createUser(user);
    return id;
};

export const updateUser = async (id: string, user: Partial<User>) => {
    await userService.updateUser(id, user);
};
