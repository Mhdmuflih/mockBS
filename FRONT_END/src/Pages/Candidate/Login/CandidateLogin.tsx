import { useNavigate } from "react-router-dom";
import Login from "../../../components/Login";
import { FormEvent, useState } from "react";
import { formDataLogin } from "../../../Interface/Interface";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../Store/Slice/CandidateSlice";
import { formValidation } from "../../../Validations/formValidation";

const CandidateLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formDataLogin, setFormDataLogin] = useState<formDataLogin>({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState<any>({});

    const handleTakeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormDataLogin({ ...formDataLogin, [name]: value });

        const validation = formValidation({ ...formDataLogin, [name]: value }, "login", name);
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
            console.log(formDataLogin,'this is the login formData')
            const response: any = await axios.post("http://localhost:8080/auth-service/candidate/login", formDataLogin);
            if (response.data.success) {
                if (response.data.candidateData.isBlocked) {
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
                        storedData: response.data.candidateData,
                        isLoggedIn: true
                    }))

                    Swal.fire({
                        title: "Success!",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: 'OK'
                    });

                    navigate("/candidate/home");
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
            Swal.fire({
                titleText: "Error!",
                text: error.response?.data?.message || "An unexpected error occurred. Please try again later.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    }

    const handleNavigate = () => {
        navigate('/candidate/sign-up');
    }

    const handleToForgotPassword = () => {
        navigate('/candidate/forgot-password');
    }

    return (
        <div>
            <Login
                heading="Candidate Login"
                onNavigate={handleNavigate}
                forgotPassword={handleToForgotPassword}
                formDataLogin={formDataLogin}
                handleTakeInput={handleTakeInput}
                handleToSubmit={handleToSubmit}
                errors={errors}
            />
        </div>
    )
}

export default CandidateLogin;
