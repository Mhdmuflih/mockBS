import { useNavigate } from "react-router-dom";
import SignUp from "../../../components/SignUp";
import React, { FormEvent, useState } from "react";
import { IFormData } from "../../../Interface/Interface";
import Swal from "sweetalert2";
import { formValidation } from "../../../Validations/formValidation";
import { signUpAdmin } from "../../../Services/authService";
import { RiAdminFill } from "react-icons/ri";

const AdminSignup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<IFormData>({
        name: "",
        mobile: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState<any>({});

    const handleTakeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        console.log(value, 'this is the value of the form');
    }

    const handleToSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const validation = formValidation(formData, "signup");
        setErrors(validation.errors);

        if (!validation.valid) {
            return;
        }

        try {
            console.log(formData, "This is formData");
            const response: any = await signUpAdmin(formData);
            console.log(response, 'this is the response data');
            console.log(response.sussess, 'this is the response data for success');
            if (response.success) {
                Swal.fire({
                    title: "Success!",
                    text: response.response.message,
                    icon: "success",
                    confirmButtonText: 'OK'
                });
                navigate('/admin/login');
            } else {
                Swal.fire({
                    title: "Error!",
                    text: response.response.message,
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

    const handleNavigate = () => {
        navigate('/admin/login');
    }

    return (
        <div>
            <SignUp
                heading="Admin Registration"
                onNavigate={handleNavigate}
                formData={formData}
                handleTakeInput={handleTakeInput}
                handleToSubmit={handleToSubmit}
                errors={errors}
                icon={<RiAdminFill className="text-[50px]" />}
            />
        </div>
    );
}

export default AdminSignup;
