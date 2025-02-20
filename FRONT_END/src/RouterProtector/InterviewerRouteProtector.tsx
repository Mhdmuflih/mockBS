import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setProfileImage } from "../Store/Slice/InterviewerSlice";
import { fetchProfileImage } from "../Services/interviewerService";

const InterviewerRouteProtector = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.interviewerAuth.isLoggedIn);
  const interviewerData = useSelector((state: any) => state.interviewerAuth.storedData);

  const location = useLocation();
  const navigate = useNavigate();

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

    const takeProfileImage = async () => {
      try {
        const response: any = await fetchProfileImage();
        if (response.success) {
          dispatch(setProfileImage({
            profileURL: response.profileURL
          }));
        } else {
          console.log("Can't fetch profile image.");
        }
      } catch (error: any) {
        console.log(error.message, 'Error in InterviewerRouteProtector');
      }
    };

    takeProfileImage();

  }, [isLoggedIn, interviewerData, location.pathname, navigate, dispatch]);

  return isLoggedIn ? <Outlet /> : null;
};

export default InterviewerRouteProtector;
