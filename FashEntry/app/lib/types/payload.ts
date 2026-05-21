import { JwtPayload } from "jwt-decode";


export interface TokenPayload extends JwtPayload {
    userId: string;
    role: string;
    email: string;
}