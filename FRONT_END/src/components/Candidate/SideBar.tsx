import { useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
// import TopBar from "../TopBar";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Slice/CandidateSlice";
import Heading from "./Heading";
import profileImageDemo from "../../assets/profile image.jpg";

import { CgProfile } from "react-icons/cg";
import { SiGooglemeet } from "react-icons/si";
import { IoMdAnalytics } from "react-icons/io";
import { RiLogoutCircleFill, RiUserCommunityFill } from "react-icons/ri";
import { GoShieldLock } from "react-icons/go";

interface sideBarProps {
    heading: string;
    subHeading?: string;
    children?: ReactNode;
}

const SideBar = (props: sideBarProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [profileImage, setProfileImage] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, profileURL } = useSelector((state: any) => state.candidateAuth);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/candidate/login");
        } else {
            setProfileImage(profileURL);
        }
    }, [isLoggedIn, navigate, profileURL]);

    const handleToLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    return (
        <>
            {/* <TopBar /> */}
            <div className="flex flex-1">
                {/* Side Bar */}
                <div
                    className={` p-4 bg-gray-800 transition-all duration-300 ${isOpen ? 'w-52' : 'w-20'}`}
                    onMouseOver={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    {/* Profile Image */}
                    <div className="flex flex-col items-center mt-3" onClick={() => setIsOpen(true)}>
                        <img
                            src={profileImage ? profileImage : profileImageDemo}
                            alt="Profile"
                            className={` transition-all ${isOpen ? 'rounded-2xl w-24 h-24' : ' rounded-full w-12 h-12'}`}
                        />
                    </div>

                    {/* Sidebar Menu */}
                    <div className="pt-4">
                        <ul className={`mt-7 ${isOpen? 'space-y-3' : 'space-y-7'}`}>
                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-black rounded-lg cursor-pointer hover:bg-gray-500 transition-all duration-300 group 
                                    ${activePath === "/candidate/home" ? "bg-gray-500" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/home");
                                        navigate("/candidate/home");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-1">
                                        <FaHome />
                                    </span>
                                    {isOpen && <span>Home</span>}
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                    ${activePath === "/candidate/profile" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/profile");
                                        navigate("/candidate/profile");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-1">
                                        <CgProfile />
                                    </span>
                                    {isOpen && <span>Profile</span>}
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                    ${activePath === "/candidate/outsourced-interviews" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/outsourced-interviews");
                                        navigate("/candidate/outsourced-interviews");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-1">
                                        <SiGooglemeet />
                                    </span>
                                    {isOpen && <span>Outsourced Interviews</span>}
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                    ${activePath === "/candidate/analytics" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/analytics");
                                        navigate("/candidate/analytics");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-1">
                                        <IoMdAnalytics />
                                    </span>
                                    {isOpen && <span>Analytics</span>}
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                    ${activePath === "/candidate/community-chat" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/community-chat");
                                        navigate("/candidate/community-chat");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-1">
                                        <RiUserCommunityFill />
                                    </span>
                                    {isOpen && <span>Community</span>}
                                </div>
                            </li>

                            {/* Change Password */}
                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                    ${activePath === "/candidate/password" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/password");
                                        navigate("/candidate/password");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-1">
                                        <GoShieldLock />
                                    </span>
                                    {isOpen && <span>Change Password</span>}
                                </div>
                            </li>

                            {/* Logout */}
                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#FF3B30] rounded-lg cursor-pointer hover:bg-[#912626] transition-all duration-300 group`}
                                    onClick={handleToLogout}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-2">
                                        <RiLogoutCircleFill />
                                    </span>
                                    {isOpen && <span>Logout</span>}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <Heading heading={props.heading} subHeading={props.subHeading} children={props.children} />
            </div>
        </>
    );
};

export default SideBar;
