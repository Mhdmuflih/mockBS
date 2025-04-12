import React, { FormEvent, useState } from "react";
import ForgotPassword from "../../../components/ForgotPassword";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { formValidation } from "../../../Validations/formValidation";
import { forgotPasswordCandidate } from "../../../Services/authService";
import Swal from "sweetalert2";
import { ICandidateForgotPasswordApiResponse } from "../../../Interface/candidateInterfaces/IApiResponce";

const CandidateForgotPassword: React.FC = () => {

    const navigate: NavigateFunction = useNavigate();
    const [formData, setFromData] = useState<{ email: string }>({
        email: ""
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleTakeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFromData({ ...formData, [name]: value });

        const validation = formValidation({ ...formData, [name]: value }, "forgot", name);
        setErrors((prevErrors: { [key: string]: string }) => ({ ...prevErrors, [name]: validation.errors[name] || "" }));
    }

    const handleToSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const validation = formValidation(formData, "forgot");
        if (!validation.valid) {
            return;
        }

        try {
            const response: ICandidateForgotPasswordApiResponse = await forgotPasswordCandidate(formData);
            console.log(response, 'forgot')
            if (response.success) {
                Swal.fire({
                    title: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: 'OK'
                });
                console.log(response.candidateData.email, ' this data');
                navigate('/candidate/otp', { state: { email: response.candidateData.email, context: "CandidateForgotPassword" } });
            } else {
                console.log("failed sen sen");
                Swal.fire({
                    title: "Error!",
                    text: response.message,
                    icon: "error",
                    confirmButtonText: 'OK'
                });
            }
        } catch (error: unknown) {
            let errorMessage = "An unexpected error occurred. Please try again later.";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            console.error("Error while verifying OTP:", errorMessage);
            Swal.fire({
                titleText: "Error!",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK",
            });

        }
    }

    const handleToNavigate = (): void => {
        navigate('/candidate/login');
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

export default CandidateForgotPassword;
