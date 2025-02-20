import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleAuthenticationCandidate } from "../Services/authService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, setProfileImage } from "../Store/Slice/CandidateSlice";


const GoogleAuth: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSuccess = async (credentialResponse: any) => {
        console.log("Google Credential Response:", credentialResponse);
        // Extract the credential token
        const token = credentialResponse.credential;
        console.log("Token:", token);

        try {
            const userData: any = jwtDecode(token); // Decode JWT to extract user info
            console.log(userData,'this is user data in google')
            const response: any = await googleAuthenticationCandidate({email: userData.email, name: userData.name, profileImage: userData.picture});
            console.log(response,'this is the responce data in google')
            if (response.success) {
                dispatch(loginSuccess({
                    token: response.token,
                    storedData: response.candidateData,
                    isLoggedIn: true
                }));
                dispatch(setProfileImage(
                    {profileURL: response.candidateData.profileURL}
                ))
                navigate('/candidate/home');
            }else {
                navigate('/candidate/login');
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const handleError = () => {
        console.log("Google Login Failed");
    };

    return (
        <GoogleOAuthProvider clientId="976888538452-spislbvir2jpkc9uqjnvstbbqbsirc2h.apps.googleusercontent.com">
            <div className="google-auth-container w-[300px] ml-[125px]">
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                    theme="outline" // Button theme: "outline" or "filled_blue"
                    size="large" // Button size: "large", "medium", or "small"
                    text="signin_with" // Button text: "signin_with" or "signup_with"
                    shape="pill" // Button shape: "pill", "rectangular", or "circle"
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;
