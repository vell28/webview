export interface GetSignUp {
    payload: {
        email: string;
        password: string;
        retype: boolean;
        component?: string;
        name?: string;
        image?: string;
    }
}

export interface SetSignUp {
    token: string;
}
