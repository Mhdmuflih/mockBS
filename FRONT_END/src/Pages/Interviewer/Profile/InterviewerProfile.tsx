import SideBar from "../../../components/Interviewer/Sidebar";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { editProfileInterviewer, fetchInterviewerProfileData } from "../../../Services/interviewerService";
import profileImage from "../../../assets/profile image.jpg";
import { FaCamera } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { interviewerFormValidation } from "../../../Validations/profileValidation";

import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setProfileImage } from "../../../Store/Slice/InterviewerSlice";

const InterviewerProfile = () => {

    const dispatch = useDispatch();

    const [isHovered, setIsHovered] = useState(false);
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({
        name: false,
        mobile: false,
        profileURL: false,
        currentDesignation: false,
        introduction: false,
        yearOfExperience: false,
        university: false,
        organization: false
    });

    const [interviewer, setInterviewer] = useState<any>({
        name: "",
        mobile: "",
        profileURL: "",
        currentDesignation: "",
        introduction: "",
        yearOfExperience: "",
        university: "",
        organization: ""
    });

    const [errors, setErrors] = useState<any>({});
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    useEffect(() => {
        const takeProfileData = async () => {
            try {
                const response: any = await fetchInterviewerProfileData();
                if (response.success) {
                    setInterviewer(response.interviewerData); // Update state with fetched data
                } else {
                    console.log("Failed to fetch candidate profile data.");
                }
            } catch (error: any) {
                console.log("Error fetching data:", error.message);
            }
        };
        takeProfileData();
    }, []);

    const handleEditClick = useCallback((field: string) => {
        setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
    }, []);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setInterviewer((prev: any) => ({ ...prev, [name]: value }));

        const validation = interviewerFormValidation({ ...interviewer, [name]: value }, name);
        setErrors((prevErrors: any) => ({ ...prevErrors, [name]: validation.errors[name] || "" }));
    }, [interviewer]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setSelectedImage(file);
            setInterviewer((prev: any) => ({ ...prev, profileURL: URL.createObjectURL(file) })); // Update profileURL with the selected image preview
            setEditMode((prev) => ({ ...prev, profileURL: true }));
        }
    };

    const handleToSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const validation = interviewerFormValidation(interviewer);
        setErrors(validation.errors);

        if (!validation.valid) {
            return;
        }

        const formData = new FormData();

        formData.append("name", interviewer.name);
        formData.append("mobile", interviewer.mobile);
        formData.append("currentDesignation", interviewer.currentDesignation);
        formData.append("introduction", interviewer.introduction);
        formData.append("yearOfExperience", interviewer.yearOfExperience);
        formData.append("university", interviewer.university);
        formData.append("organization", interviewer.organization);

        if (selectedImage) {
            formData.append("profileImage", selectedImage); // Fix: Add correct key for image upload
        }

        try {
            const response: any = await editProfileInterviewer(formData);
            if (response.success) {
                dispatch(setProfileImage({
                    profileURL: response.profileURL
                }))

                toast.success(response.message);
                setEditMode({});
                setSelectedImage(null);
            } else {
                toast.error(response.message);
            }
        } catch (error: any) {
            toast.error(error?.message || "An unexpected error occurred. Please try again later.");
        }
    };

    const displayImage = selectedImage
        ? URL.createObjectURL(selectedImage)
        : interviewer.profileURL
            ? interviewer.profileURL
            : profileImage;

    // Ensure interviewer data is not null before accessing properties
    if (!interviewer) {
        return <div>Loading...</div>;
    }

    return (
        <SideBar heading="Profile">
            <Toaster position="top-right" reverseOrder={false} />

            <div className="bg-[#30323A] ml-1 p-3 rounded-b-lg shadow-md max-h-[73vh] overflow-y-auto">
                {!interviewer.isApproved ? (
                    <h1 className="text-[#FF0000] font-extrabold text-lg">Access pending admin approval!</h1>
                ) : (
                    <form onSubmit={handleToSubmit}>
                        <div className="flex flex-col ml-7 mt-4 space-y-4">
                            <div className="flex items-center space-x-4 justify-center">
                                <div className="relative w-24 h-24 rounded-full cursor-pointer"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}>
                                    <img src={displayImage} alt="Profile" className="rounded-full w-full h-full object-cover" />
                                    {isHovered && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                                            <label htmlFor="fileInput" className="cursor-pointer">
                                                <FaCamera className="text-white text-lg" />
                                            </label>
                                            <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleImageChange} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Name */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="font-medium text-sm">Full Name:</h2>
                                        {editMode.name ? (
                                            <input type="text" name="name" value={interviewer.name || ""} onChange={handleInputChange} className="p-1 rounded bg-[#4B4F60] text-white" />
                                        ) : (
                                            <p className="font-semibold mt-1 text-gray-300 text-sm">{interviewer.name || "Not Provided"}</p>
                                        )}
                                        {errors.name && (
                                            <p className="text-red-500 text-sm ml-10">{errors.name}</p>
                                        )}
                                    </div>
                                    <button type="button" onClick={() => handleEditClick("name")} className="text-white text-lg">
                                        {editMode.name ? <IoMdRemoveCircleOutline /> : <MdModeEditOutline />}
                                    </button>
                                </div>

                                {/* Mobile */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="font-medium text-sm">Mobile:</h2>
                                        {editMode.mobile ? (
                                            <input type="text" name="mobile" value={interviewer.mobile || ""} onChange={handleInputChange} className="p-1 rounded bg-[#4B4F60] text-white" />
                                        ) : (
                                            <p className="font-semibold mt-1 text-gray-300 text-sm">{interviewer.mobile || "Not Provided"}</p>
                                        )}
                                        {errors.mobile && (
                                            <p className="text-red-500 text-sm ml-10">{errors.mobile}</p>
                                        )}
                                    </div>
                                    <button type="button" onClick={() => handleEditClick("mobile")} className="text-white text-lg">
                                        {editMode.mobile ? <IoMdRemoveCircleOutline /> : <MdModeEditOutline />}
                                    </button>
                                </div>

                                {/* Current Designation */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="font-medium text-sm">Current Designation:</h2>
                                        {editMode.currentDesignation ? (
                                            <input type="text" name="currentDesignation" value={interviewer.currentDesignation || ""} onChange={handleInputChange} className="p-1 rounded bg-[#4B4F60] text-white" />
                                        ) : (
                                            <p className="font-semibold mt-1 text-gray-300 text-sm">{interviewer.currentDesignation || "Not Provided"}</p>
                                        )}
                                        {errors.currentDesignation && (
                                            <p className="text-red-500 text-sm ml-10">{errors.currentDesignation}</p>
                                        )}
                                    </div>
                                    <button type="button" onClick={() => handleEditClick("currentDesignation")} className="text-white text-lg">
                                        {editMode.currentDesignation ? <IoMdRemoveCircleOutline /> : <MdModeEditOutline />}
                                    </button>
                                </div>

                                {/* Year of Experience */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="font-medium text-sm">Year of Experience:</h2>
                                        {editMode.yearOfExperience ? (
                                            <input type="text" name="yearOfExperience" value={interviewer.yearOfExperience || ""} onChange={handleInputChange} className="p-1 rounded bg-[#4B4F60] text-white" />
                                        ) : (
                                            <p className="font-semibold mt-1 text-gray-300 text-sm">{interviewer.yearOfExperience || "Not Provided"}</p>
                                        )}
                                        {errors.yearOfExperience && (
                                            <p className="text-red-500 text-sm ml-10">{errors.yearOfExperience}</p>
                                        )}
                                    </div>
                                    <button type="button" onClick={() => handleEditClick("yearOfExperience")} className="text-white text-lg">
                                        {editMode.yearOfExperience ? <IoMdRemoveCircleOutline /> : <MdModeEditOutline />}
                                    </button>
                                </div>

                                {/* Organization */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="font-medium text-sm">Organization:</h2>
                                        {editMode.organization ? (
                                            <input type="text" name="organization" value={interviewer.organization || ""} onChange={handleInputChange} className="p-1 rounded bg-[#4B4F60] text-white" />
                                        ) : (
                                            <p className="font-semibold mt-1 text-gray-300 text-sm">{interviewer.organization || "Not Provided"}</p>
                                        )}
                                        {errors.organization && (
                                            <p className="text-red-500 text-sm ml-10">{errors.organization}</p>
                                        )}
                                    </div>
                                    <button type="button" onClick={() => handleEditClick("organization")} className="text-white text-lg">
                                        {editMode.organization ? <IoMdRemoveCircleOutline /> : <MdModeEditOutline />}
                                    </button>
                                </div>

                                {/* university */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="font-medium text-sm">University:</h2>
                                        {editMode.university ? (
                                            <input type="text" name="organization" value={interviewer.university || ""} onChange={handleInputChange} className="p-1 rounded bg-[#4B4F60] text-white" />
                                        ) : (
                                            <p className="font-semibold mt-1 text-gray-300 text-sm">{interviewer.university || "Not Provided"}</p>
                                        )}
                                        {errors.university && (
                                            <p className="text-red-500 text-sm ml-10">{errors.university}</p>
                                        )}
                                    </div>
                                    <button type="button" onClick={() => handleEditClick("organization")} className="text-white text-lg">
                                        {editMode.university ? <IoMdRemoveCircleOutline /> : <MdModeEditOutline />}
                                    </button>
                                </div>

                                {/* introduction */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="font-medium text-sm">Introduction:</h2>
                                        {editMode.introduction ? (
                                            <input type="text" name="organization" value={interviewer.introduction || ""} onChange={handleInputChange} className="p-1 rounded bg-[#4B4F60] text-white" />
                                        ) : (
                                            <p className="font-semibold mt-1 text-gray-300 text-sm">{interviewer.introduction || "Not Provided"}</p>
                                        )}
                                        {errors.introduction && (
                                            <p className="text-red-500 text-sm ml-10">{errors.introduction}</p>
                                        )}
                                    </div>
                                    <button type="button" onClick={() => handleEditClick("organization")} className="text-white text-lg">
                                        {editMode.introduction ? <IoMdRemoveCircleOutline /> : <MdModeEditOutline />}
                                    </button>
                                </div>

                                {/* Submit Button */}

                                {(Object.values(editMode).includes(true) || selectedImage) && (
                                    <div className="flex justify-center mt-4">
                                        <button type="submit" className="px-8 py-2 rounded bg-[#2A2D39] text-white">Submit</button>
                                    </div>
                                )}

                            </div>
                        </div>
                    </form>
                )}
            </div>
        </SideBar>
    );
};

export default InterviewerProfile;
