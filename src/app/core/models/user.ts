import { Role } from './role';

export class User {
    _id : string;
    username: string;
    role: Role;
    token?: string;
}