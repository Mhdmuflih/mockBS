import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const verifyJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    console.log(authHeader, 'what is this')

    // Check if the token is available in the Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    console.log(token, ' this is the jwt token')
    const userType = authHeader.split(' ')[2];
    console.log(userType, 'user type')

    try {
        console.log(process.env.JWT_ACCESS_SECRET, 'this is env data')
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || "access_secret") as JwtPayload;
        console.log("Decoded:", decoded);
        req.headers['x-user-id'] = decoded.userId; // Attach the user ID to the request headers

        if (userType === 'candidate') {
            const candidateisBlockedData: any = await CheckIsBlocked(decoded.userId);
            if (candidateisBlockedData?.data?.isBlocked == true) {
                res.status(403).json({ message: "USER_BLOCKED" });
                return;
            }
        } else if (userType === 'interviewer') {
            const interviewerIsBlockData: any = await checkInterviewerIsBlock(decoded.userId);
            console.log(interviewerIsBlockData, 'interviewer data');
            console.log("okokmo")
            if (interviewerIsBlockData?.data?.isBlocked == true) {
                res.status(403).json({ message: "USER_BLOCKED" });
                return;
            }
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error: any) {
        console.log("Error in validate Token:", error.message);
        res.status(403).json({ message: 'Forbidden: Invalid token' });
        return;
    }
};


const CheckIsBlocked = async (userId: string) => {
    try {
        const data = await axios.get(`${process.env.Auth_Service}/candidate/isBlock/${userId}`);
        return data.data;
    } catch (error: any) {
        console.log("Error in validate Token:", error.message);
        return;
    }
}
const checkInterviewerIsBlock = async (userId: string) => {
    try {
        const data = await axios.get(`${process.env.Auth_Service}/interviewer/isBlock/${userId}`);
        return data.data;
    } catch (error: any) {
        console.log("Error in validate Token:", error.message);
        return;
    }
}