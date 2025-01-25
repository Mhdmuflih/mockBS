// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../../Store/Slice/CandidateSlice";
import SideBar from "../../../components/Candidate/SideBar";

const CandidateHome = () => {

    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const { isLoggedIn } = useSelector((state: any) => state.candidateAuth);

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         navigate("/candidate/login");
    //     }
    // }, [isLoggedIn, navigate]);

    // const handleToLogout = () => {
    //     dispatch(logout());
    //     navigate('/');
    // }

    return (
        <div>
            <SideBar heading="Request Interviews">

                {/* Dynamic content below the heading */}
                <div className="bg-[#30323A] ml-1 p-4 rounded-b-lg shadow-md h-[426px]">

                    {/* search bar */}
                    <div className="mt-1">
                        <label htmlFor="search" className="sr-only">Search</label>
                        <div className="relative">
                            <input type="text" id="search" placeholder="Search here..." className="w-full p-2 pl-10 text-sm rounded-md bg-[#181A22] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500" />
                            <svg className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.292 4.292a1 1 0 01-1.414 1.414l-4.292-4.292zm-4.9-1.32a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    {/* choose stack part */}

                    <div className="flex space-x-24 ml-7 mt-7 w-[980px]">
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                    </div>

                    <div className="flex space-x-24 ml-7 mt-7">
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                    </div>

                    <div className="flex space-x-24 ml-7 mt-7">
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                    </div>

                    <div className="flex space-x-24 ml-7 mt-7">
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                        <div className="bg-white w-40 text-center p-3 rounded-md hover:cursor-pointer hover:bg-[#999999] hover:text-white">
                            <h1 className="font-bold">Frontend</h1>
                        </div>
                    </div>

                    
                </div>


            </SideBar>

        </div>
    )
}

export default CandidateHome;
