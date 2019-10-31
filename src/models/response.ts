export interface Response {
    component?: string;
    status?: Status;
    filedName?: string;
    text?: string;
}

type Status = 200 | 400;
