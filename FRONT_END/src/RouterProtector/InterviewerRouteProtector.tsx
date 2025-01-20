import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const InterviewerRouteProtector = () => {

    const isLoggedIn = useSelector((state: any) => state.interviewerAuth.isLoggedIn);
    const interviewerData = useSelector((state: any) => state.interviewerAuth.storedData);

    const location = useLocation(); // To check the current route

    console.log(interviewerData, 'stored data in interviewer');

    const navigate = useNavigate();

    console.log("is Loogged In Protector", isLoggedIn);
    
    useEffect(() => {
        if (!isLoggedIn) {
          navigate('/');

        } else if (!interviewerData?.isDetails) {
          if (location.pathname !== '/interviewer/details') {
            navigate('/interviewer/details');
          }
          
        } else if (interviewerData?.isDetails) {
          if (location.pathname === '/interviewer/details') {
            navigate('/interviewer/profile');
          }
        }
      }, [isLoggedIn, interviewerData, location, navigate]);

    return (
        isLoggedIn ? <Outlet /> : null
    )
}

export default InterviewerRouteProtector;
