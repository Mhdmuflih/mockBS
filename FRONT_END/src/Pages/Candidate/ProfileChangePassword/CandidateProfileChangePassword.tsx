import { FormEvent, useState } from "react";
import SideBar from "../../../components/Candidate/SideBar";
import Password from "../../../components/Password";
import { formValidation } from "../../../Validations/formValidation";
import Swal from "sweetalert2";
import { changePassword } from "../../../Services/candidateService";

const CandidateProfileChangePassword = () => {

    const [formData, setFormData] = useState<{ currentPassword: string, password: string, confirmPassword: string }>({
        currentPassword: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleTakeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({...prevState,[name]: value}));

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
                Swal.fire({
                    title: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: 'OK'
                });
                setFormData({
                    currentPassword:"",
                    password:"",
                    confirmPassword:""
                });
            } else {
                console.log("Password change failed!");
                Swal.fire({
                    title: "Error!",
                    text: response.message,
                    icon: "error",
                    confirmButtonText: 'OK'
                });
            }
        } catch (error: any) {
            console.error("Error changing password:", error.message);
            Swal.fire({
                titleText: "Error!",
                text: error?.message || "An unexpected error occurred. Please try again later.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <>
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

export default CandidateProfileChangePassword;
