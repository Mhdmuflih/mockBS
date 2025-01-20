import { useNavigate } from "react-router-dom";
import Login from "../../../components/Login";
import { useDispatch } from "react-redux";
import React, { FormEvent, useState } from "react";
import { formDataLogin } from "../../../Interface/Interface";
import Swal from "sweetalert2";
import { loginSuccess } from "../../../Store/Slice/AdminSlice";
import axios from "axios";
import { formValidation } from "../../../Validations/formValidation";

const AdminLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formDataLogin, setFormDataLogin] = useState<formDataLogin>({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState<any>({});

    const handleTakeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormDataLogin({ ...formDataLogin, [name]: value });

        const validation = formValidation({ ...formDataLogin, [name]: value }, "signup", name);
        setErrors((prevErrors: any) => ({ ...prevErrors, [name]: validation.errors[name] || "" }));
    }

    const handleToSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const validation = formValidation(formDataLogin, "login");
        setErrors(validation.errors);
        if (!validation.valid) {
            return;
        }

        try {
            const response: any = await axios.post("http://localhost:8080/auth-service/admin/login", formDataLogin);
            if (response.data.success) {
                console.log(response.data.adminData);
                if (response.data.adminData.isBlocked) {
                    Swal.fire({
                        title: 'Error!',
                        text: "Your account is blocked. Please contact support.",
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    return;
                } else {

                    dispatch(loginSuccess({
                        token: response.data.token,
                        storedData: response.data.adminData,
                        isLoggedIn: true
                    }))

                    Swal.fire({
                        title: "Success!",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: 'OK'
                    });

                    navigate("/admin/dashboard");
                }
            } else {
                Swal.fire({
                    title: "Error!",
                    text: response.data.message,
                    icon: "error",
                    confirmButtonText: 'OK'
                });
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const handleNavigate = () => {
        navigate('/admin/sign-up');
    }

    return (
        <div>
            <Login
                heading="Admin Login"
                onNavigate={handleNavigate}
                formDataLogin={formDataLogin}
                handleTakeInput={handleTakeInput}
                handleToSubmit={handleToSubmit}
                errors={errors}
            />
        </div>
    )
}

export default AdminLogin;
