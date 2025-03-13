import { Request, Response } from "express";
import { IAdminController } from "../Interface/Admin/IAdminController";
import { IAdminService } from "../Interface/Admin/IAdminService";
import { HTTP_STATUS } from "../Constants/httpStatus";


export class AdminControllers implements IAdminController {
    constructor(private readonly adminService: IAdminService) { }

    async signUp(req: Request, res: Response): Promise<any> {
        try {
            const { name, mobile, email, password } = req.body;
            await this.adminService.createAdmin(name, mobile, email, password);

            res.status(200).json({ success: true, message: "Admin Registration Successfully completed" })
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }

    async loginAdmin(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            console.log(req.body, "this is the data in req body in admin login");
            if (!email || !password) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Email and password are required." });
                return
            }

            const { accessToken, refreshToken, admin } = await this.adminService.loginAdmin(email, password);

            console.log("successfully login in admin");
            res.status(HTTP_STATUS.OK).json({ success: true, message: "Login successfully completed.", token: accessToken, adminData: admin, refreshToken: refreshToken });

        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }

    async validateRefreshToken(req: Request, res: Response): Promise<any> {
        try {

            if (!req.body.refreshToken) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "Token not found" });
                return;
            }

            const { accessToken, refreshToken, admin } = await this.adminService.validateRefreshToken(req.body.refreshToken);

            res.status(HTTP_STATUS.OK).json({ success: true, message: "token created", token: accessToken, refreshToken: refreshToken, adminData: admin });
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }

}