import { useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import TopBar from "../TopBar";
import { ReactNode, useEffect, useState } from "react";

interface sideBarProps {
    handleToLogout: () => void;
    heading: string;
    children?: ReactNode;
}


const SideBar = (props: sideBarProps) => {

    const navigate = useNavigate();
    const location = useLocation();

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
                        <img src="" alt="" /> icon
                    </div>

                    <div className="pt-2">
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
                                ${activePath === "/candidate/profile" ? "bg-white text-black" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/profile");
                                        navigate("/candidate/profile");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <FaHome />
                                    </span>
                                    <span>Profile</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/candidate/interviews" ? "bg-white text-black" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/intervierws");
                                        navigate("/candidate/interviews");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <FaHome />
                                    </span>
                                    <span>Outsourced Interviews</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/candidate/analytics" ? "bg-white text-black" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/analytics");
                                        navigate("/candidate/analytics");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <FaHome />
                                    </span>
                                    <span>Analytics</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/candidate/community" ? "bg-white text-black" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/community");
                                        navigate("/candidate/community");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <FaHome />
                                    </span>
                                    <span>Community</span>
                                </div>
                            </li>


                            {/* logout button */}
                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/candidate/password" ? "bg-white text-black" : ""}`}
                                    onClick={() => {
                                        setActivePath("/candidate/password");
                                        navigate("/candidate/password");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <FaHome />
                                    </span>
                                    <span>Change Password</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#FF3B30] rounded-lg cursor-pointer hover:bg-[#912626] transition-all duration-300 group 
                                ${activePath === "/candidate/home" ? "bg-white text-black" : ""}`}
                                    onClick={props.handleToLogout}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <FaHome />
                                    </span>
                                    <span>Logout</span>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Heading Section */}
                    <div className="bg-[#181A22] mt-3 ml-1 rounded-t-lg p-5">
                        <h1 className="text-2xl font-bold text-white">{props.heading}</h1>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar;
