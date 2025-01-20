import TopBar from "../../components/TopBar";
import SignupLogo from '../../assets/signUpImage.png';
import { useNavigate } from "react-router-dom";

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

            <TopBar />

            <div>
                <h1 className="text-black font-bold text-center text-2xl pt-6">How do you want to use mock BS?</h1>
                <h4 className="text-black text-sm text-center pt-1">We'll personalize your experience accordingly</h4>
            </div>

            <div className="flex justify-between relative items-center top-20 gap-8 px-32">

                <div className="space-y-5">

                    <div onClick={navigateToInterviewer} className="bg-[#30323A] p-4 text-white text-center w-[450px] hover:cursor-pointer hover:bg-black">
                        <h3 className="text-white font-semibold text-lg">I am a tech professional</h3>
                        <p className="text-white text-xs font-normal">I want to take interviews and earn money</p>
                    </div>
                    <div onClick={navigateToCandidate} className="bg-[#30323A] p-4 text-white text-center hover:cursor-pointer hover:bg-black">
                        <h3 className="text-white font-semibold text-lg">I am a Candidate</h3>
                        <p className="text-white text-xs font-normal">I want to interivew experience with industry experts</p>
                    </div>

                </div>

                <div className="">
                    <img src={SignupLogo} alt="Signup Logo" className="h-64 mx-auto shadow-[8px_8px_10px_rgba(0,0,0,1)]" />
                    <h2 className="text-xl font-bold text-center text-white relative bottom-10">Made 2X with mock BS</h2>
                </div>

            </div>
        </>
    )
}

export default ChooseSignup;
