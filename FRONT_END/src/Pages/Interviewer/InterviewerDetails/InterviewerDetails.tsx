import { FormEvent, useState } from "react";
import TopBar from "../../../components/TopBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { updateDetails } from "../../../Store/Slice/InterviewerSlice";
import { addDetailsInterviewer } from "../../../Services/interviewerService";
import { addDetailsFormValidation } from "../../../Validations/addDetailsValidation";

const InterviewerDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const interviewerData = useSelector((state: any) => state.interviewerAuth.storedData);

    const [formData, setFomrData] = useState({
        experience: "",
        designation: "",
        organization: "",
        university: "",
        introduction: "",
    });



    const [fileData, setFileData] = useState({
        image: null as File | null,
        salarySlip: null as File | null,
        resume: null as File | null
    });

    const [errors, setErrors] = useState<any>({})

    const handleTakeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFomrData({ ...formData, [name]: value });

        const validation = addDetailsFormValidation({ ...formData, [name]: value }, name);
        setErrors((prevErrors: any) => ({ ...prevErrors, [name]: validation.errors[name] || "" }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setFileData((prev) => ({ ...prev, [field]: file }));
        }
    };


    const handleToSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const validation = addDetailsFormValidation(formData);
        setErrors(validation.errors);

        if (!validation.valid) {
            return;
        }

        const email: string = interviewerData.email;
        try {
            const form = new FormData();
            form.append("email", email);
            form.append("experience", formData.experience);
            form.append("designation", formData.designation);
            form.append("organization", formData.organization);
            form.append("university", formData.university);
            form.append("introduction", formData.introduction);

            if (fileData.image) {
                form.append('image', fileData.image);
            }
            if (fileData.salarySlip) {
                form.append('salary', fileData.salarySlip);
            }
            if (fileData.resume) {
                form.append('resume', fileData.resume);
            }

            // form.forEach((value, key) => {
            //     console.log(key, value);
            // });

            const response: any = await addDetailsInterviewer(form);
            if (response.success) {
                dispatch(updateDetails(response.interviewerData));

                Swal.fire({
                    title: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: "OK"
                });
                if(response.interviewerData.isDetails){
                    navigate('/interviewer/profile');
                }else {
                    navigate('/interviewer/details')
                }

                // navigate(response.interviewerData.isDetails ? "/interviewer/profile" : "/interviewer/details");
            } else {
                Swal.fire({
                    title: "Error!",
                    text: response.message,
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        } catch (error: any) {
            console.error("Submission Error:", error);
            Swal.fire({
                title: "Error!",
                text: error?.message || "An unexpected error occurred. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };



    return (
        <>
            <TopBar />
            <form onSubmit={handleToSubmit}>
                <div className="flex">
                    <div>
                        <h1 className="font-bold text-2xl mt-2 ml-10">Great, Let's configure your profile</h1>
                        <p className="font-thin text-sm ml-10">You are recommended to fill out this information</p>
                        <p className="font-thin text-sm ml-10">which will be used for your profile verification</p>

                        <div>
                            <h3 className="font-extralight ml-10 mt-3 text-xl">Year Of Experience</h3>
                            <p className="font-thin ml-10 text-sm">How many years of experience do you have working in the industry?</p>
                            <div className="ml-10 mt-2">
                                <input
                                    type="text"
                                    id="yearOfExpr"
                                    name="experience"
                                    placeholder="Year of Experience"
                                    value={formData.experience}
                                    onChange={handleTakeInput}
                                    className="w-[654px] p-2 text-sm rounded-md bg-[#181A22] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                            </div>
                            {errors.experience && (
                                <p className="text-red-500 text-sm ml-10">{errors.experience}</p>
                            )}
                        </div>

                        <div>
                            <div className="flex space-x-48">
                                <h3 className="font-extralight ml-10 mt-2 text-xl">Current Designation</h3>
                                <h3 className="font-extralight ml-10 mt-2 text-xl">Organization</h3>
                            </div>
                            <div className="flex">
                                <div>
                                    <input
                                        type="text"
                                        id="designation"
                                        name="designation"
                                        placeholder="Designation"
                                        value={formData.designation}
                                        onChange={handleTakeInput}
                                        className="w-[300px] p-2 ml-10 text-sm rounded-md bg-[#181A22] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    />
                                    {errors.designation && (
                                        <p className="text-red-500 text-sm ml-10">{errors.designation}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        id="organization"
                                        name="organization"
                                        placeholder="Organization"
                                        value={formData.organization}
                                        onChange={handleTakeInput}
                                        className="w-[300px] p-2 ml-14 text-sm rounded-md bg-[#181A22] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    />
                                    {errors.organization && (
                                        <p className="text-red-500 text-sm ml-14">{errors.organization}</p>
                                    )}
                                </div>
                            </div>


                        </div>

                        <div>
                            <h3 className="font-extralight ml-10 mt-2 text-xl">College / University</h3>
                            <p className="font-thin ml-10 text-sm">We would love to learn more about your college or university</p>
                            <div className="ml-10 mt-2">
                                <input
                                    type="text"
                                    id="university"
                                    name="university"
                                    placeholder="Eg : University of Calicut"
                                    value={formData.university}
                                    onChange={handleTakeInput}
                                    className="w-[654px] p-2 text-sm rounded-md bg-[#181A22] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                            </div>
                            {errors.university && (
                                <p className="text-red-500 text-sm ml-10">{errors.university}</p>
                            )}
                        </div>

                        <div>
                            <h3 className="font-extralight ml-10 mt-2 text-xl">Introduction</h3>
                            <p className="font-thin ml-10 text-sm">Enhance your profile with a one-liner about your current position or a key highlight - it’s the first thing that grabs someone’s attention</p>
                            <div className="ml-10 mt-2">
                                <input
                                    type="text"
                                    id="introduction"
                                    name="introduction"
                                    placeholder="Write a one line introduction"
                                    value={formData.introduction}
                                    onChange={handleTakeInput}
                                    className="w-[654px] p-2 text-sm rounded-md bg-[#181A22] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                            </div>
                            {errors.introduction && (
                                <p className="text-red-500 text-sm ml-10">{errors.introduction}</p>
                            )}
                        </div>
                    </div>

                    {/* file upload section */}

                    <div className="flex mt-36 ml-32">
                        <div className="bg-[#181A22] w-[400px] h-[300px] p-4">
                            <h1 className="text-sm font-thin text-white">Upload Your Image</h1>
                            <input
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={(event) => handleFileChange(event, 'image')}
                                className="mt-2 p-1 text-white bg-gray-700"
                            />

                            <h1 className="text-sm font-thin text-white mt-4">Upload Your Salary Slip</h1>
                            <input
                                type="file"
                                accept="application/pdf,image/*"
                                name="salary"
                                onChange={(event) => handleFileChange(event, 'salarySlip')}
                                className="mt-2 p-1 text-white bg-gray-700"
                            />

                            <h1 className="text-sm font-thin text-white mt-4">Upload Your Resume</h1>
                            <input
                                type="file"
                                accept=".pdf, .docx, .doc"
                                name="resume"
                                onChange={(event) => handleFileChange(event, 'resume')}
                                className="mt-2 p-1 text-white bg-gray-700"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mr-14">
                    <button type="submit" onClick={handleToSubmit} className="bg-[#4B4F60] p-2 rounded-lg hover:bg-black hover:text-white duration-300 font-extralight ">Save & Continue</button>
                </div>
            </form >
        </>
    )
}

export default InterviewerDetails;
