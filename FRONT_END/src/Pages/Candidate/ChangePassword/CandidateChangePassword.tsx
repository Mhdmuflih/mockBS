import React, { FormEvent, useState } from "react";
import ChangePassword from "../../../components/ChangePassword";
import { formValidation } from "../../../Validations/formValidation";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { changeCandidatePassword } from "../../../Services/authService";
import Swal from "sweetalert2";
import { ISuccess } from "../../../Interface/candidateInterfaces/IApiResponce";



const CandidateChangePassword = () => {

    const navigate: NavigateFunction = useNavigate();
    const [formData, setFormData] = useState<{ password: string; confirmPassword: string }>({
        password: "",
        confirmPassword: "",
    });

    const location = useLocation();
    const email: string = location?.state?.email; // Safely access email

    if (!email) {
        console.error("Email is missing in the state");
        return <div>Email is required to proceed.</div>;
    }

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleTakeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        const validation = formValidation({ ...formData, [name]: value }, "changePassword", name);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: validation.errors[name] || "" }));
    };

    const handleToSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const validation = formValidation(formData, "changePassword");
        if (!validation.valid) {
            setErrors(validation.errors);
            return;
        }

        console.log(email, "this is location email");

        try {
            const response: ISuccess = await changeCandidatePassword({ email, password: formData.password, confirmPassword: formData.confirmPassword });
            console.log(response,' cjange ed adsflasdjfoaweoij')
            if (response.success) {
                Swal.fire({
                    title: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: 'OK'
                });
                navigate('/candidate/login');
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
    };

    return (
        <div>
            <ChangePassword
                formData={formData}
                handleTakeInput={handleTakeInput}
                handleToSubmit={handleToSubmit}
                errors={errors}
            />
        </div>
    );
};

export default CandidateChangePassword;
