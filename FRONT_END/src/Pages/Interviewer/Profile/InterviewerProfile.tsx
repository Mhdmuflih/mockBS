import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../../components/Interviewer/Sidebar";
import { logout } from "../../../Store/Slice/InterviewerSlice";
import { useNavigate } from "react-router-dom";

const InterviewerProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const interviewerData = useSelector((state: any) => state.interviewerAuth);

    const handleToLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <>
            <SideBar handleToLogout={handleToLogout} heading="Profile">
                <div className="bg-[#30323A] ml-1 p-4 rounded-b-lg shadow-md h-[426px]">
                    {!interviewerData.isVerified ? (
                        <div>
                            <h1 className="text-[#FF0000] font-extrabold text-xl">Access to the website is only granted upon
                            approval by the administrator! Please Wait..</h1>
                        </div>
                    ):(
                        <div>

                        </div>
                    )}
                </div>
            </SideBar>
        </>
    )
}

export default InterviewerProfile;
