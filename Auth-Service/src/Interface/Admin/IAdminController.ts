import { Request, Response } from "express";

export interface IAdminController {
    signUp(req: Request, res: Response): Promise<{success: boolean, message: string}>;
    loginAdmin(req: Request, res: Response): Promise<void>;
    validateRefreshToken(req: Request, res: Response): Promise<any>;
}