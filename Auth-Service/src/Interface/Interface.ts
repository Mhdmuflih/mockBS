export interface OTP {
    generateOtp(): Promise<number>;
}