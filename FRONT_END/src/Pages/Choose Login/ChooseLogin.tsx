import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";

const ChooseLogin = () => {

    const navigate = useNavigate();

    const navigateToCandidateLogin = () => {
        navigate('/candidate/login');
    }

    const navigateToInterviewerLogin = () => {
        navigate('/interviewer/login');
    }


    return (
        <>

            <TopBar />

            <div className="font-bold text-center text-3xl pt-8">
                <h1>Elevate Your Career</h1>
                <h1>Choose Your Path</h1>
            </div>

            <div className="flex justify-between relative items-center top-20 gap-8 px-32 ">
                <div className="bg-[#30323A] text-white p-6 max-w-md shadow-[8px_8px_10px_rgba(0,0,0,1)]  transition-all duration-300 hover:z-50 hover:scale-105">
                    <h1 className="text-2xl p-6 font-bold mb-4">Beome an Interviewer</h1>
                    <p className="text-gray-300 leading-6 text-base">
                        Join our elite community of freelance
                        interviewers. Expand your horizons, share
                        your expertise, and shape the future of tech
                        talent.
                    </p>

                    <button onClick={navigateToInterviewerLogin} type="submit" className="bg-black rounded-2xl mt-10 px-32 py-2 ml-14">Login</button>
                </div>

                <div className="bg-[#30323A] text-white p-6 max-w-md shadow-[8px_8px_10px_rgba(0,0,0,1)] transition-all duration-300 hover:z-50 hover:scale-105">
                    <h1 className="text-2xl p-6 font-bold mb-4">For Candidate</h1>
                    <p className="text-gray-300 leading-6 text-base">
                        Unlock your potential with expert-led mock
                        interviews. Gain invaluable insights, boost
                        your confidence, and ace your next tech
                        interview.
                    </p>

                    <button onClick={navigateToCandidateLogin} type="submit" className="bg-black rounded-2xl mt-10 px-32 py-2 ml-14">Login</button>
                </div>
            </div>
        </>
    )
}

export default ChooseLogin;
