import React, { FormEvent, useState } from "react";
import ForgotPassword from "../../../components/ForgotPassword";
import { useNavigate } from "react-router-dom";
import { formValidation } from "../../../Validations/formValidation";
import Swal from "sweetalert2";
import { forgotPasswordInterviewer } from "../../../Services/authService";

const InterviewerForgotPassword = () => {
    const navigate = useNavigate();
    const [formData, setFromData] = useState<{ email: string }>({
        email: ""
    });

    const [errors, setErrors] = useState<any>({});

    const handleTakeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFromData({ ...formData, [name]: value });

        const validation = formValidation({ ...formData, [name]: value }, "forgot", name);
        setErrors((prevErrors: any) => ({ ...prevErrors, [name]: validation.errors[name] || "" }));
    }

    const handleToSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const validation = formValidation(formData, "forgot");
        if (!validation.valid) {
            return;
        }

        try {
            console.log(formData, 'this is the form data');
            const response: any = await forgotPasswordInterviewer(formData);
            if (response.success) {
                Swal.fire({
                    title: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: 'OK'
                });
                console.log(response.candidateData.email, ' this data');
                console.log("success true ok ok ok");
                navigate('/interviewer/otp', { state: { email: response.candidateData.email, context: "InterviewerForgotPassword" } });
            } else {
                console.log("failed sen sen");
                Swal.fire({
                    title: "Error!",
                    text: response.message,
                    icon: "error",
                    confirmButtonText: 'OK'
                });
            }
        } catch (error: any) {
            console.log(error.message);
            Swal.fire({
                titleText: "Error!",
                text: error?.message || "An unexpected error occurred. Please try again later.",
                icon: "error",
                confirmButtonText: "OK"
            });

        }
    }

    const handleToNavigate = () => {
        navigate('/interviewer/login');
    };


    return (
        <div>
            <ForgotPassword
                formData={formData}
                onNavigate={handleToNavigate}
                handleTakeInput={handleTakeInput}
                handleToSubmit={handleToSubmit}
                errors={errors}
            />
        </div>
    )
}

export default InterviewerForgotPassword;
