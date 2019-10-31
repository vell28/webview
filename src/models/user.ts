export interface User {
    isLogged: boolean;
    token: string;
    firstName?: string;
    lastName?: string;
    email: string;
    image: string;
    phone: string;
}
