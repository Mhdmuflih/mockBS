import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const CandidateRouteProtector = () => {

    const isLoggedIn = useSelector((state: any) => state.candidateAuth.isLoggedIn);
    const navigate = useNavigate();

    console.log("is Logged in Protector", isLoggedIn);

    useEffect(()=> {
        if(!isLoggedIn) {
            navigate('/');
        }
    },[]);

    return (
        isLoggedIn ? <Outlet /> : null
    )
}

export default CandidateRouteProtector;
