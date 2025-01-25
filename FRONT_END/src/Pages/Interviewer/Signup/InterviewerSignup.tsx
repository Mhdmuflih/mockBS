import { useNavigate } from "react-router-dom";
import SignUp from "../../../components/SignUp";
import { FormEvent, useState } from "react";
import { IFormData } from "../../../Interface/Interface";
import Swal from "sweetalert2";
import { formValidation } from "../../../Validations/formValidation";
import { signUpInterviewer } from "../../../Services/authService";
import { FaUserTie } from "react-icons/fa";

const InterviewerSignup = () => {

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

        const validation = formValidation({ ...formData, [name]: value }, "signup", name);
        setErrors((prevErrors: any) => ({ ...prevErrors, [name]: validation.errors[name] || "" }));
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
            const response: any = await signUpInterviewer(formData)
            console.log(response, 'this is the response of the interviewer');
            if (response.success) {
                Swal.fire({
                    title: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: 'OK'
                });
                console.log(response.interviewerData.email, ' this data');
                navigate('/interviewer/otp', { state: { email: response.interviewerData.email, context:"Registration" } })
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
        navigate('/interviewer/login')
    }

    return (
        <div>
            <SignUp
                heading="Interviewer Registration"
                onNavigate={handleNavigate}
                formData={formData}
                handleTakeInput={handleTakeInput}
                handleToSubmit={handleToSubmit}
                errors={errors}
                icon={<FaUserTie className="text-[50px]" />}
            />
        </div>
    )
}

export default InterviewerSignup;
