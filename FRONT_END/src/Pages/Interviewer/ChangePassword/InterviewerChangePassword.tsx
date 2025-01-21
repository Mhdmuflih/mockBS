import React, { FormEvent, useState } from "react";
import ChangePassword from "../../../components/ChangePassword";
import { formValidation } from "../../../Validations/formValidation";

const InterviewerChangePassword = () => {

    const [formData, setFormData] = useState<{ password: string, confirmPassword: string }>({
        password: "",
        confirmPassword: ""
    });

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

        } catch (error: any) {
            console.log(error.message);
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
