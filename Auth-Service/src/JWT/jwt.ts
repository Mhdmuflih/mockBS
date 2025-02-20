import jwt from "jsonwebtoken";
import {configDotenv} from 'dotenv';
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
        { expiresIn: '1h' }
    );
};

export const generateRefreshToken = (userId: string): string => {
    return jwt.sign(
        { userId },
        JWT_REFRESH_SECRET,
        { expiresIn: '10s' }
    );
};