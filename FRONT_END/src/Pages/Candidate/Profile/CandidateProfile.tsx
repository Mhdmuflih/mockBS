import { FormEvent, useEffect, useState, useCallback } from "react";
import SideBar from "../../../components/Candidate/SideBar";
import { editProfileCandidate, fetchCandidateProfileData } from "../../../Services/candidateService";
import profileImage from "../../../assets/profile image.jpg";
import { FaCamera } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { formValidation } from "../../../Validations/formValidation";
import { useDispatch } from "react-redux";
import { setProfileImage } from "../../../Store/Slice/CandidateSlice";

const CandidateProfile = () => {

    const dispatch = useDispatch();

    const [isHovered, setIsHovered] = useState(false);
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
    const [candidateData, setCandidateData] = useState({
        name: "",
        mobile: "",
        profileURL: "",
    });

    const [errors, setErrors] = useState<any>({});
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    useEffect(() => {
        const takeProfileData = async () => {
            try {
                const response: any = await fetchCandidateProfileData();
                if (response.success) {
                    setCandidateData(response.candidateData);
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
        setEditMode((prev) => {
            const newEditMode = { ...prev, [field]: !prev[field] };
            return newEditMode;
        });
    }, []);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        // First create the new updated data
        const updatedData = { ...candidateData, [name]: value };
        setCandidateData(updatedData);
    
        // Then validate the updatedData, not the old candidateData
        const validation = formValidation(updatedData, "signup", name);
        setErrors((prevErrors: any) => ({ ...prevErrors, [name]: validation.errors[name] || "" }));
    }, [candidateData]);
    

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setSelectedImage(file);
            setCandidateData((prev) => ({ ...prev, profileURL: URL.createObjectURL(file) }));
        }
    };

    const handleToSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const validation = formValidation(candidateData, "signup");
        setErrors(validation.errors);

        // Stop if the form is not valid
        if (!validation.valid) {
            return;
        }

        const formData = new FormData();
        formData.append("name", candidateData.name);
        formData.append("mobile", candidateData.mobile);

        if (selectedImage) {
            formData.append("profileImage", selectedImage);
        }

        try {
            const response: any = await editProfileCandidate(formData);
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
            console.log(error.message);
            toast.error(error?.message || "An unexpected error occurred. Please try again later.");
        }
    };

    const displayImage = selectedImage
        ? URL.createObjectURL(selectedImage)
        : candidateData.profileURL || profileImage;

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            
            <SideBar heading="Profile">
                <div className="bg-gray-200 p-4 shadow-md h-screen">
                    <form onSubmit={handleToSubmit}>
                        <div className="flex space-x-28 ml-14 w-[990px] relative">
                            <div
                                className="relative mt-10 w-24 h-24 rounded-full cursor-pointer"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <img src={displayImage} alt="Profile" className="rounded-full w-full h-full object-cover" />
                                {isHovered && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                                        <label htmlFor="fileInput" className="cursor-pointer">
                                            <FaCamera className="text-white text-lg" />
                                        </label>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dynamic Editable Fields */}
                        <div className="mt-10 space-y-4 ml-10">
                            {["name", "mobile"].map((field) => (
                                <div key={field} className="flex items-center">
                                    <h2 className="text-gray-800 font-medium w-28">{field.charAt(0).toUpperCase() + field.slice(1)}:</h2>
                                    {editMode[field] ? (
                                        <input
                                            type={field === "email" ? "email" : "text"}
                                            name={field}
                                            value={candidateData[field as keyof typeof candidateData]}
                                            onChange={handleInputChange}
                                            className="p-1 rounded bg-gray-100 text-black"
                                        />

                                        
                                    ) : (
                                        <h1 className="text-gray-800 font-semibold ml-4">{candidateData[field as keyof typeof candidateData] || "Loading..."}</h1>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => handleEditClick(field)}
                                        className="ml-4 text-sm text-blue-500 hover:underline"
                                    >
                                        {editMode[field] ? <IoMdRemoveCircleOutline /> : <MdModeEditOutline />}
                                    </button>
                                    {errors[field] && (
                                        <p className="text-red-500 text-sm ml-10">{errors[field]}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Show Update Button only when changes are made */}
                        {(Object.values(editMode).includes(true) || selectedImage) && (
                            <div className="flex justify-end mr-10">
                                <button type="submit" className="bg-black text-white p-3 rounded-xl mt-20 hover:bg-white hover:text-black duration-500">
                                    Update
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </SideBar>
        </div>
    );
};

export default CandidateProfile;
