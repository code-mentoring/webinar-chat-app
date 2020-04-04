import { User } from './lib/types';

let me: User | null = null;

export const setMe = (user: User) => me = user;
export const getMe = () => me;
