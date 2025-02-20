import { useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import TopBar from "../TopBar";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Slice/CandidateSlice";
import Heading from "./Heading";
import profileImageDemo from "../../assets/profile image.jpg"

import { CgProfile } from "react-icons/cg";
import { SiGooglemeet } from "react-icons/si";
import { IoMdAnalytics } from "react-icons/io";
import { RiLogoutCircleFill, RiUserCommunityFill } from "react-icons/ri";
import { GoShieldLock } from "react-icons/go";



interface sideBarProps {
    heading: string;
    children?: ReactNode;
}


const SideBar = (props: sideBarProps) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [profileImage, setProfileImage] = useState();

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
    }



    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    return (
        <>
            <TopBar />

            <div className="flex">


                {/* Side Bar */}
                <div className="sidebar bg-[#30323A] h-[500px] w-52 p-4 ml-3 mt-3 rounded-2xl">
                    <div className="bg-white  w-24 h-24 ml-10 mt-5">
                        <img src={profileImage ? profileImage : profileImageDemo} alt=""  className="h-24 w-24"/>
                    </div>

                    <div className="pt-2 ">
                        <ul className="space-y-2">
                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/candidate/home" ? "bg-[#999999] " : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/home");
                                        navigate("/candidate/home");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <FaHome />
                                    </span>
                                    <span>Home</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/candidate/profile" ? " bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/profile");
                                        navigate("/candidate/profile");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <CgProfile />
                                    </span>
                                    <span>Profile</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/candidate/outsourced-interviews" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/outsourced-interviews");
                                        navigate("/candidate/outsourced-interviews");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <SiGooglemeet />
                                    </span>
                                    <span>Outsourced Interviews</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/candidate/analytics" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/analytics");
                                        navigate("/candidate/analytics");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <IoMdAnalytics />
                                    </span>
                                    <span>Analytics</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/candidate/community-chat" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/community-chat");
                                        navigate("/candidate/community-chat");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <RiUserCommunityFill />
                                    </span>
                                    <span>Community</span>
                                </div>
                            </li>


                            {/* logout button */}
                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/candidate/password" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/password");
                                        navigate("/candidate/password");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <GoShieldLock />
                                    </span>
                                    <span>Change Password</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#FF3B30] rounded-lg cursor-pointer hover:bg-[#912626] transition-all duration-300 group 
                                ${activePath === "/candidate/home" ? "bg-[#999999]" : ""}`}
                                    onClick={handleToLogout}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <RiLogoutCircleFill />
                                    </span>
                                    <span>Logout</span>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>


                <Heading heading={props.heading} children={props.children} />


            </div>
        </>
    )
}

export default SideBar;
