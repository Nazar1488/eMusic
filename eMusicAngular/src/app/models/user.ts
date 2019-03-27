import { UserRole } from '.';

export class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    balance: number;
    role: UserRole;
}