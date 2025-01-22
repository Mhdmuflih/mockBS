import { Request, Response } from "express";
import { IAdminController } from "../Interface/Admin/IAdminController";
import { IAdminService } from "../Interface/Admin/IAdminService";
import { HTTP_STATUS } from "../Constants/httpStatus";


export class AdminControllers implements IAdminController {
    constructor(private readonly adminService: IAdminService) { }

    async signUp(req: Request, res: Response): Promise<void> {
        try {
            const { name, mobile, email, password } = req.body;
            await this.adminService.createAdmin(name, mobile, email, password);

            res.status(200).json({ success: true, message: "Admin Registration Successfully completed" })

        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ success: false, message: "Internel Server Error in create admin" })
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
            // res.cookie("refreshToken", refreshToken, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === "production",
            //     maxAge: 10 * 1000
            // });

            console.log("successfully login in admin");
            res.status(HTTP_STATUS.OK).json({ success: true, message: "Login successfully completed.", token: accessToken, adminData: admin });

        } catch (error: any) {
            console.log(error.message);
        }
    }

}