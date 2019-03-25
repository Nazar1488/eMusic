import { UserRole } from '.';

export class User {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    balance: number;
    role: UserRole;
}