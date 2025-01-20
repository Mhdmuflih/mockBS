import { useRef, useState } from "react";
import Otp from "../../../components/Otp";

const AdminOtp = () => {
    const [otp, setOtp] = useState<string[]>(["", "", "", ""])

    const inputs = useRef<HTMLInputElement[]>([]); // References to input fields

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


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Entered OTP:", otp.join(""));
        try {
            console.log(otp,' this is the otp for the admin');
            const response: any = await axios.post('http://localhost:8080/auth-service/admin/otp', otp);
            if(response.data.success) {
                console.log('hiii');
            }else {
                console.log('loooo');
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <Otp otp={otp} inputs={inputs} handleChange={handleChange} handleKeyDown={handleKeyDown} handleSubmit={handleSubmit} />
        </div>
    )
}

export default AdminOtp;
