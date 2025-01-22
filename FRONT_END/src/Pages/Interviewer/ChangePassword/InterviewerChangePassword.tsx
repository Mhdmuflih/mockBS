import React, { FormEvent, useState } from "react";
import ChangePassword from "../../../components/ChangePassword";
import { formValidation } from "../../../Validations/formValidation";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { changeInterviewerPassword } from "../../../Services/authService";

const InterviewerChangePassword = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState<{ password: string, confirmPassword: string }>({
        password: "",
        confirmPassword: ""
    });

    const location = useLocation();
    const email = location?.state?.email; // Safely access email

    if (!email) {
        console.error("Email is missing in the state");
        return <div>Email is required to proceed.</div>;
    }


    const [errors, setErrors] = useState<any>({});

    const handleTakeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        const validation = formValidation({ ...formData, [name]: value }, "changePassword", name);
        setErrors((prevErrors: any) => ({ ...prevErrors, [name]: validation.errors[name] || "" }));
    };

    const handleToSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const validation = formValidation(formData, "changePassword");
        if (!validation.valid) {
            return;
        }

        try {
            const response: any = await changeInterviewerPassword({ email, password: formData.password, confirmPassword: formData.confirmPassword });

            if (response.success) {
                Swal.fire({
                    title: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: 'OK'
                });
                navigate('/interviewer/login');
                console.log("Password changed successfully!");
            } else {
                console.log("Password change failed!");
                Swal.fire({
                    title: "Error!",
                    text: response.message,
                    icon: "error",
                    confirmButtonText: 'OK'
                });
            }
        } catch (error: any) {
            console.error("Error changing password:", error.message);
            Swal.fire({
                titleText: "Error!",
                text: error?.message || "An unexpected error occurred. Please try again later.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    }

    return (
        <>
            <ChangePassword
                formData={formData}
                handleTakeInput={handleTakeInput}
                handleToSubmit={handleToSubmit}
                errors={errors}
            />
        </>
    )
}

export default InterviewerChangePassword;
