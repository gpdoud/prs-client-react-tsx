export interface IUser {
    id: number;
    username: string;
    password: any;
    firstname: string;
    lastname: string;
    phone: string | null;
    email: string | null;
    isReviewer: boolean;
    isAdmin: boolean;
}