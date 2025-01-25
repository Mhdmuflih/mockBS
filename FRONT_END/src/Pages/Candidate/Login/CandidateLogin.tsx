import { useNavigate } from "react-router-dom";
import Login from "../../../components/Login";
import { FormEvent, useState } from "react";
import { IFormDataLogin } from "../../../Interface/Interface";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../Store/Slice/CandidateSlice";
import { formValidation } from "../../../Validations/formValidation";
import { loginCandidate } from "../../../Services/authService";
import GoogleAuth from "../../../components/GoogleAuth";
import { FaUserGraduate } from "react-icons/fa6";


const CandidateLogin = () => {

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
            console.log(formDataLogin, 'this is the login formData')
            const response: any = await loginCandidate(formDataLogin);
            if (response.success) {
                if (response.candidateData.isBlocked) {
                    Swal.fire({
                        title: 'Error!',
                        text: "Your account is blocked. Please contact support.",
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    return;
                } else if (!response.candidateData.isVerified) {
                    Swal.fire({
                        title: 'Error!',
                        text: "Your account is not verified. Please verify your accound.",
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    navigate('/candidate/otp', { state: { email: response.candidateData.email, context: "Registration" } })
                    return;
                } else {

                    dispatch(loginSuccess({
                        token: response.token,
                        storedData: response.candidateData,
                        isLoggedIn: true
                    }))

                    Swal.fire({
                        title: "Success!",
                        text: response.message,
                        icon: "success",
                        confirmButtonText: 'OK'
                    });

                    navigate("/candidate/home");
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
                chaild={<GoogleAuth />}
                icon={<FaUserGraduate className='text-[50px]' />}
            />
        </div>
    )
}

export default CandidateLogin;
