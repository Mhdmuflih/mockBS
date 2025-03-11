import jwt, { JwtPayload } from "jsonwebtoken";
import {configDotenv} from 'dotenv';
import { MESSAGES } from "../Constants/messages";
import { HTTP_STATUS } from "../Constants/httpStatus";
configDotenv();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

// Token expiration times
// const ACCESS_TOKEN_EXPIRES_IN = '15m'; // 15 minutes
// const REFRESH_TOKEN_EXPIRES_IN = '7d'; // 7 days

export const generateAccessToken = (userId: string): string => {
    return jwt.sign(
        { userId },
        JWT_ACCESS_SECRET,
        { expiresIn: '1m' }
    );
};

export const generateRefreshToken = (userId: string): string => {
    return jwt.sign(
        { userId },
        JWT_REFRESH_SECRET,
        { expiresIn: '15m' }
    );
};

export const verifyToken = (token: string) => {
    try {
        const decode = jwt.verify(token, JWT_REFRESH_SECRET as string ) as JwtPayload;
        console.log(decode , "decode in url");
        return decode;
    } catch (error: any) {
        console.log(error.message, 'this error occur in verify token');
    }
}