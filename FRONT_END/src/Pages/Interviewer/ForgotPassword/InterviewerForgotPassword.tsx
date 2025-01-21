import React, { FormEvent, useState } from "react";
import ForgotPassword from "../../../components/ForgotPassword";
import { useNavigate } from "react-router-dom";
import { formValidation } from "../../../Validations/formValidation";

const InterviewerForgotPassword = () => {
    const navigate = useNavigate();
    const [formData, setFromData] = useState<{email: string}>({
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
        if(!validation.valid) {
            return;
        }
        
        try {

        } catch (error: any) {
            console.log(error.message);
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
