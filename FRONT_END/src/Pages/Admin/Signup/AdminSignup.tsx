import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignUp from "../../../components/SignUp";
import React, { FormEvent, useState } from "react";
import { FormData } from "../../../Interface/Interface";
import Swal from "sweetalert2";
import { formValidation } from "../../../Validations/formValidation";

const AdminSignup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
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
            const response: any = await axios.post("http://localhost:8080/auth-service/admin/sign-up", formData);
            console.log(response.data, 'this is the response data');
            if (response.data.response.success) {
                Swal.fire({
                    title: "Success!",
                    text: response.data.response.message,
                    icon: "success",
                    confirmButtonText: 'OK'
                });
                navigate('/admin/login');
            } else {
                Swal.fire({
                    title: "Error!",
                    text: response.data.response.message,
                    icon: "error",
                    confirmButtonText: 'OK'
                });
            }
        } catch (error: any) {
            console.log(error.message);
            Swal.fire({
                title: 'Error!',
                text: 'Interner server error',
                icon: 'error',
                confirmButtonText: 'OK'
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
            />
        </div>
    );
}

export default AdminSignup;
