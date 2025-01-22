import { useNavigate } from "react-router-dom";
import Login from "../../../components/Login";
import { FormEvent, useState } from "react";
import { IFormDataLogin } from "../../../Interface/Interface";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../Store/Slice/InterviewerSlice";
import { formValidation } from "../../../Validations/formValidation";
import { loginInterviewer } from "../../../Services/authService";

const InterviewerLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formDataLogin, setFormDataLogin] = useState<IFormDataLogin>({
        email: "",
        password: ""
    });

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
            const response: any = await loginInterviewer(formDataLogin);
            if (response.success) {
                // console.log(response.data, ' this ist response candidate');
                if (response.interviewerData.isBlocked) {
                    Swal.fire({
                        title: 'Error!',
                        text: "Your account is blocked. Please contact support.",
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    return;
                } else if (!response.interviewerData.isVerified) {
                    Swal.fire({
                        title: 'Error!',
                        text: "Your account is not verified. Please verify your accound.",
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    navigate('/interviewer/otp', { state: { email: response.interviewerData.email, context: "Registration" } })
                    return;
                } else {
                    dispatch(loginSuccess({
                        token: response.token,
                        storedData: response.interviewerData,
                        isLoggedIn: true
                    }));

                    Swal.fire({
                        title: "Success!",
                        text: response.message,
                        icon: "success",
                        confirmButtonText: 'OK'
                    });
                }
                if (!response.interviewerData.isDetails) {
                    navigate("/interviewer/details");
                } else {
                    navigate("/interviewer/profile");
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
        navigate('/interviewer/sign-up');
    }

    const handleToForgotPassword = () => {
        navigate('/interviewer/forgot-password');
    }

    return (
        <div>
            <Login
                heading="Interviewer Login"
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

export default InterviewerLogin;

