import { IUser } from "@entities/"

declare module 'express' {
    export interface Request {
        body: {
            user: IUser
        };
    }
}

declare global {
    namespace Express {
        export interface Response {
            sessionUser: IClientData;
        }
    }
}