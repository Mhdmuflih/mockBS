import { useEffect, useRef, useState } from "react";
import Otp from "../../../components/Otp";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    resendCandidateOTP,
    verifyCandidateForgotPasswordOTP,
    verifyCandidateOTP,
} from "../../../Services/authService";

const CandidateOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [timer, setTimer] = useState<number>(30);
    const [canResend, setCanResend] = useState<boolean>(false);
    const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

    const inputs = useRef<HTMLInputElement[]>([]); // References to input fields

    // Timer countdown and resend availability
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleResendOTP = async () => {
        console.log("Resend OTP triggered!");
        setTimer(30);
        setCanResend(false);

        try {
            const { email, context }: { email: string; context: string } = location.state;
            console.log(email, context, "Email and context from location state");
            const response: any = await resendCandidateOTP(email, context);

            if (response && response.success) {
                console.log("OTP resent successfully:", response.message);
            } else {
                Swal.fire({
                    titleText: "Error!",
                    text: response?.message || "Failed to resend OTP. Please try again later.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error: any) {
            console.error("Error while resending OTP:", error.message);
            Swal.fire({
                titleText: "Error!",
                text: error.message || "An unexpected error occurred while resending the OTP.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
        const value = e.target.value;

        // Ensure only a single digit is allowed
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to the next input field
        if (value && index < otp.length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
        // Handle backspace to move to the previous field
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const OtpData = otp.join("");
        try {
            const { email, context }: { email: string; context: string } = location.state;
            console.log(location.state, "Location state details");
            console.log(otp, "OTP entered by the candidate");
            let response: any;

            if (context === "Registration") {
                console.log("Verifying OTP for Registration");
                response = await verifyCandidateOTP(Number(OtpData), email);
            } else if (context === "CandidateForgotPassword") {
                console.log("Verifying OTP for Candidate Forgot Password");
                response = await verifyCandidateForgotPasswordOTP(Number(OtpData), email);
            }

            if (!response || typeof response.success === "undefined") {
                console.error("Invalid response from API:", response);
                Swal.fire({
                    titleText: "Error!",
                    text: "Invalid response from server. Please try again later.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return;
            }

            if (response.success) {
                Swal.fire({
                    titleText: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: "OK",
                });
                if (context === "Registration") {
                    navigate("/");
                } else if (context === "CandidateForgotPassword") {
                    navigate("/candidate/change-password", { state: { email: email } });
                }
            } else {
                Swal.fire({
                    titleText: "Error!",
                    text: response.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error: any) {
            console.error("Error while verifying OTP:", error.message);
            Swal.fire({
                titleText: "Error!",
                text: error.message || "An unexpected error occurred. Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div>
            <Otp
                otp={otp}
                inputs={inputs}
                timer={timer}
                canResend={canResend}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
                handleSubmit={handleSubmit}
                handleResendOTP={handleResendOTP}
            />
        </div>
    );
};

export default CandidateOtp;
