import TopBar from "../../components/TopBar";
import SignupLogo from '../../assets/signUpImage.png';
import { useNavigate } from "react-router-dom";

import LoginBAckground from '../../assets/White Minimalistic Background Texture Wallpaper Image For Free Download - Pngtree.jpeg';


const ChooseSignup = () => {

    const navigate = useNavigate();

    const navigateToCandidate = () => {
        navigate('/candidate/sign-up')
    }

    const navigateToInterviewer = () => {
        navigate('/interviewer/sign-up')
    }

    return (
        <>
            <div
                className="h-screen w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${LoginBAckground})` }}
            >

                <TopBar />

                <div className="text-center mt-6">
                    <h1 className="text-black font-bold text-2xl md:text-3xl">
                        How do you want to use mock BS?
                    </h1>
                    <h4 className="text-black text-sm md:text-base pt-1">
                        We'll personalize your experience accordingly
                    </h4>
                </div>

                <div className="flex flex-col lg:flex-row justify-center lg:items-start relative items-center top-20 gap-12 px-32 w-full max-w-6xl ">

                    <div className="space-y-5 w-full max-w-md">

                        <div onClick={navigateToInterviewer} className="bg-gray-800 p-6 text-white text-center rounded-lg cursor-pointer hover:bg-black shadow-lg transition-transform transform hover:scale-105">
                            <h3 className="text-white font-semibold text-lg">I am a tech professional</h3>
                            <p className="text-white text-xs font-normal">I want to take interviews and earn money</p>
                        </div>
                        <div onClick={navigateToCandidate} className="bg-gray-800 p-6 text-white text-center rounded-lg cursor-pointer hover:bg-black shadow-lg transition-transform transform hover:scale-105">
                            <h3 className="text-white font-semibold text-lg">I am a Candidate</h3>
                            <p className="text-white text-xs font-normal">I want to interivew experience with industry experts</p>
                        </div>

                    </div>

                    <div className="md:h-64 mx-auto ">
                        <img src={SignupLogo} alt="Signup Logo" className="h-64  mx-auto shadow-[8px_8px_10px_rgba(0,0,0,1)]" />
                        <h2 className="text-xl font-bold text-center text-white relative bottom-10">Made 2X with mock BS</h2>
                    </div>

                </div>
            </div>

        </>
    )
}

export default ChooseSignup;
