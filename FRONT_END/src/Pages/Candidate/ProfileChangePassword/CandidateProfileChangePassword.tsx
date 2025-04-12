import { FormEvent, useState } from "react";
import SideBar from "../../../components/Candidate/SideBar";
import Password from "../../../components/Password";
import { formValidation } from "../../../Validations/formValidation";
import { changePassword } from "../../../Services/candidateService";

import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { ISuccess } from "../../../Interface/candidateInterfaces/IApiResponce";

export interface IProfileChangePassword {
    currentPassword: string;
    password: string;
    confirmPassword: string
}

const CandidateProfileChangePassword = () => {

    const [formData, setFormData] = useState<IProfileChangePassword>({
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

        try {
            const response: ISuccess = await changePassword({ currentPassword: formData.currentPassword, password: formData.password, confirmPassword: formData.confirmPassword });
            if (response.success) {
                toast.success(response.message);
                setFormData({
                    currentPassword: "",
                    password: "",
                    confirmPassword: ""
                });
            } else {
                toast.error(response.message);
            }
        } catch (error: unknown) {
            error instanceof Error ? toast.error(error.message) : toast.error("An unknown error occurred.");
        }
    };

    return (
        <>

            <Toaster position="top-right" reverseOrder={false} />

            <SideBar heading="Change Password">
                <div className="bg-gray-200 p-4 shadow-md h-screen">
                    <div className="flex space-x-28 ml-7 w-[990px]">
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

export default CandidateProfileChangePassword;
