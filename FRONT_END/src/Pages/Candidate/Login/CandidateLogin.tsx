import { NavigateFunction, useNavigate } from "react-router-dom";
import Login from "../../../components/Login";
import { FormEvent, useState } from "react";
import { IFormDataLogin } from "../../../Interface/Interface";
// import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../Store/Slice/CandidateSlice";
import { formValidation } from "../../../Validations/formValidation";
import { loginCandidate } from "../../../Services/authService";
import GoogleAuth from "../../../components/GoogleAuth";
import { FaUserGraduate } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";



const CandidateLogin = () => {

    const dispatch: Dispatch<UnknownAction> = useDispatch();
    const navigate: NavigateFunction = useNavigate();

    const [formDataLogin, setFormDataLogin] = useState<IFormDataLogin>({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleTakeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormDataLogin({ ...formDataLogin, [name]: value });

        const validation = formValidation({ ...formDataLogin, [name]: value }, "login", name);
        setErrors((prevErrors: { [key: string]: string }) => ({ ...prevErrors, [name]: validation.errors[name] || "" }));
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
            console.log(response, 'login reponse')
            if (response.success) {
                if (response.candidateData.isBlocked) {
                    toast.error("Your account is blocked. Please contact support.")
                    return;
                } else if (!response.candidateData.isVerified) {
                    toast.error("Your account is not verified. Please verify your accound.")
                    navigate('/candidate/otp', { state: { email: response.candidateData.email, context: "Registration" } })
                    return;
                } else {

                    // console.log(response.candidateData.profileURL);

                    dispatch(loginSuccess({
                        token: response.token,
                        refreshToken: response.refreshToken,
                        storedData: response.candidateData,
                        isLoggedIn: true
                    }))

                    toast.success(response.message);

                    navigate("/candidate/home");
                }
            } else {
                toast.error(response.message)
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
            //  toast.error("An unknown error occurred.");
        }
    }

    const handleNavigate = (): void => {
        navigate('/candidate/sign-up');
    }

    const handleToForgotPassword = (): void => {
        navigate('/candidate/forgot-password');
    }

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
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
