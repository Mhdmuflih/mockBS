import { useNavigate } from "react-router-dom";
import Login from "../../../components/Login";
import { FormEvent, useState } from "react";
import { formDataLogin } from "../../../Interface/Interface";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../Store/Slice/InterviewerSlice";
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
            const response: any = await axios.post("http://localhost:8080/auth-service/interviewer/login", formDataLogin);
            if (response.data.success) {
                console.log(response.data, ' this ist response candidate');
                if (response.data.interviewerData.isBlocked) {
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
                        storedData: response.data.interviewerData,
                        isLoggedIn: true
                    }));

                    Swal.fire({
                        title: "Success!",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: 'OK'
                    });
                }
                if (!response.data.interviewerData.isDetails) {
                    navigate("/interviewer/details");
                } else {
                    navigate("/interviewer/profile");
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
        navigate('/interviewer/sign-up');
    }

    return (
        <div>
            <Login
                heading="Interviewer Login"
                onNavigate={handleNavigate}
                formDataLogin={formDataLogin}
                handleTakeInput={handleTakeInput}
                handleToSubmit={handleToSubmit}
                errors={errors}
            />
        </div>
    )
}

export default CandidateLogin;
