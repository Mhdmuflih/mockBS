import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchProfileImage } from "../Services/candidateService";
import { setProfileImage } from "../Store/Slice/CandidateSlice";

const CandidateRouteProtector = () => {

    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state: any) => state.candidateAuth.isLoggedIn);
    const navigate = useNavigate();

    console.log("is Logged in Protector", isLoggedIn);

    useEffect(()=> {
        if(!isLoggedIn) {
            navigate('/');
        }else {
            const takeProfileImage = async ()=> {
                try {
                    const response: any = await fetchProfileImage();
                    if(response.success) {
                        dispatch(setProfileImage({
                            profileURL: response.profileURL
                        }))
                    }else {
                        console.log("can't take this profile data");
                    }
                } catch (error: any) {
                    console.log(error.message , 'error comes in candidate prodected route');
                }
            }
            takeProfileImage();
        }
    },[isLoggedIn, dispatch, navigate]);

    return (
        isLoggedIn ? <Outlet /> : null
    )
}

export default CandidateRouteProtector;
