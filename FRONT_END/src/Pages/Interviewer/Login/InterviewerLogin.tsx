import { useNavigate } from "react-router-dom";
import Login from "../../../components/Login";
import { FormEvent, useState } from "react";
import { IFormDataLogin } from "../../../Interface/Interface";
// import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../Store/Slice/InterviewerSlice";
import { formValidation } from "../../../Validations/formValidation";
import { loginInterviewer } from "../../../Services/authService";
import { FaUserTie } from "react-icons/fa";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

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
                    toast.error("Your account is blocked. Please contact support.");

                    return;
                } else if (!response.interviewerData.isVerified) {
                    toast.error("Your account is not verified. Please verify your accound.");

                    navigate('/interviewer/otp', { state: { email: response.interviewerData.email, context: "Registration" } })
                    return;
                } else {
                    dispatch(loginSuccess({
                        token: response.token,
                        storedData: response.interviewerData,
                        isLoggedIn: true
                    }));

                    toast.success(response.message);

                }
                if (!response.interviewerData.isDetails) {
                    navigate("/interviewer/details");
                } else {
                    navigate("/interviewer/profile");
                }

            } else {
                toast.error( response?.message)
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error(error?.message || "An unexpected error occurred. Please try again later.")
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
            <Toaster position="top-right" reverseOrder={false} />
            <Login
                heading="Interviewer Login"
                onNavigate={handleNavigate}
                forgotPassword={handleToForgotPassword}
                formDataLogin={formDataLogin}
                handleTakeInput={handleTakeInput}
                handleToSubmit={handleToSubmit}
                errors={errors}
                icon={<FaUserTie className="text-[50px]" />}
            />
        </div>
    )
}

export default InterviewerLogin;

