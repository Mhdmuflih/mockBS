import { FormEvent, useState } from "react";
import Password from "../../../components/Password";
import { formValidation } from "../../../Validations/formValidation";
import { changePassword } from "../../../Services/interviewerService";
import SideBar from "../../../components/Interviewer/Sidebar";

import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const InterviewerProfileChangePassword = () => {

    const [formData, setFormData] = useState<{ currentPassword: string, password: string, confirmPassword: string }>({
        currentPassword: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleTakeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));

        const validation = formValidation({ ...formData, [name]: value }, "changePassword", name);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: validation.errors[name] || "" }));
    };

    const handleToSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const validation = formValidation(formData, "changePassword");
        if (!validation.valid) {
            setErrors(validation.errors);
            return;
        }

        // console.log(email, "this is location email");

        try {
            const response: any = await changePassword({ currentPassword: formData.currentPassword, password: formData.password, confirmPassword: formData.confirmPassword });

            if (response.success) {
                toast.success(response.message);

                setFormData({
                    currentPassword: "",
                    password: "",
                    confirmPassword: ""
                });
            } else {
                console.log("Password change failed!");
                toast.error(response.message);
            }
        } catch (error: any) {
            console.error("Error changing password:", error.message);
            toast.error(error?.message || "An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <>

            <Toaster position="top-right" reverseOrder={false} />

            <SideBar heading="Change Password">
                <div className="bg-[#30323A] ml-1 p-4 rounded-b-lg shadow-md h-[426px]">
                    <div className="flex space-x-28 ml-7 mt- w-[980px]">
                        <Password
                            errors={errors}
                            formData={formData}
                            handleTakeInput={handleTakeInput}
                            handleToSubmit={handleToSubmit}
                        />
                    </div>
                </div>
            </SideBar>
        </>
    )
}

export default InterviewerProfileChangePassword;

