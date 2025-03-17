import { useNavigate } from "react-router-dom";
import Login from "../../../components/Login";
import { useDispatch } from "react-redux";
import React, { FormEvent, useState } from "react";
import { loginSuccess } from "../../../Store/Slice/AdminSlice";
import { formValidation } from "../../../Validations/formValidation";
import { IFormDataLogin } from "../../../Interface/Interface";
import Swal from "sweetalert2";
import { loginAdmin } from "../../../Services/authService";
import { RiAdminFill } from "react-icons/ri";

const AdminLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formDataLogin, setFormDataLogin] = useState<IFormDataLogin>({
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
            const response: any = await loginAdmin(formDataLogin);
            if (response.success) {
                console.log(response.adminData);
                if (response.adminData.isBlocked) {
                    Swal.fire({
                        title: 'Error!',
                        text: "Your account is blocked. Please contact support.",
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    return;
                } else {

                    dispatch(loginSuccess({
                        token: response.token,
                        refreshToken: response.refreshToken,
                        storedData: response.adminData,
                        isLoggedIn: true
                    }))

                    // Swal.fire({
                    //     title: "Success!",
                    //     text: response.message,
                    //     icon: "success",
                    //     confirmButtonText: 'OK'
                    // });

                    navigate("/admin/dashboard");
                }
            } else {
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

    const handleNavigate = () => {
        navigate('/admin/sign-up');
    }

    const handleToForgotPassword = () => {
        navigate('/admin/forgot-password');
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
                forgotPassword={handleToForgotPassword}
                icon={<RiAdminFill className="text-[50px]" />}
            />
        </div>
    )
}

export default AdminLogin;
