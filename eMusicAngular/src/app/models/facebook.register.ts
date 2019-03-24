export class FacebookRegisterModel {
    userId: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;

    constructor(userId: string, email: string, password: string, confirmPassword: string, firstName: string, lastName:string, dateOfBirth: Date) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
    }
}