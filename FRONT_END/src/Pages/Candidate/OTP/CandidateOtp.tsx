import { useEffect, useRef, useState } from "react";
import Otp from "../../../components/Otp";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CandidateOtp = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [timer, setTimer] = useState<number>(30);
    const [canResend, setCanResend] = useState<boolean>(false);
    const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

    const inputs = useRef<HTMLInputElement[]>([]); // References to input fields

    // timer counting and resend call
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
            const email = location.state.email;
            console.log(email, 'this is the email form location')
            const response: any = await axios.post('http://localhost:8080/auth-service/candidate/resend-otp', { email });
            if (response.data.success) {
                console.log(email, 'okokoko');
            } else {
                console.log("failed guysss");
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    // change input
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

    // backspace function
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
            const email = location.state.email
            // console.log(location.state.email, 'what is this');
            // console.log(otp, ' this is the otp for the candidate');
            const response: any = await axios.post('http://localhost:8080/auth-service/candidate/otp', { otp: Number(OtpData), email: email });
            if (response.data.success) {
                Swal.fire({
                    titleText: "Success!",
                    text: response.data.message,
                    icon: "success",
                    confirmButtonText: "OK"
                });
                navigate('/');
            } else {
                Swal.fire({
                    titleText: "Error!",
                    text: response.data.message,
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        } catch (error: any) {
            console.log(error.message);
            Swal.fire({
                titleText: "Error!",
                text: error.response?.data?.message || "An unexpected error occurred. Please try again later.",
                icon: "error",
                confirmButtonText: "OK"
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
    )
}

export default CandidateOtp;
