import { IsString, Matches, MinLength } from "class-validator";

export class ChagnePasswordDTO {
    @IsString()
    currentPassword: string;

    @IsString()
    @MinLength(8, { message: "Password must be atleast 6 characters long" })
    @Matches(/\d/, { message: "Password must contain at least 1 digit" })
    @Matches(/[a-z]/, { message: "Password must contain at least 1 lowercase letter" })
    @Matches(/[A-Z]/, { message: "Password must contain at least 1 uppercase letter" })
    @Matches(/[!@#$%^&*]/, { message: "Password must contain at least 1 special character" })
    password: string;

    @IsString()
    confirmPassword: string;
}