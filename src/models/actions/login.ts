export interface GetLogin {
    payload: {
        email: string;
        password: string;
        checked: boolean;
        component?: string;
        name?: string;
    }
}

export interface SetLogin {
    token: string;
}
