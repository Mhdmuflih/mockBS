import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { FaUserGraduate, FaUserTie } from "react-icons/fa";

import LoginBAckground from '../../assets/White Minimalistic Background Texture Wallpaper Image For Free Download - Pngtree.jpeg';
import React from "react";

const ChooseLogin: React.FC = () => {

    const navigate = useNavigate();

    const navigateToCandidateLogin = (): void => {
        navigate('/candidate/login');
    }

    const navigateToInterviewerLogin = (): void => {
        navigate('/interviewer/login');
    }


    return (
        <>
            <div
                className="h-screen w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${LoginBAckground})` }}
            >

                <TopBar />

                <div className="font-bold text-center text-3xl pt-8 text-gray-800">
                    <h1>Elevate Your Career</h1>
                    <h1>Choose Your Path</h1>
                </div>

                <div className="flex justify-center flex-col lg:flex-row items-center px-6 md:px-16 lg:px-32 mt-14 gap-10 md:gap-20 lg:gap-32">
                <div className="bg-[#30323A] text-white p-6 max-w-md shadow-[8px_8px_10px_rgba(0,0,0,1)]  transition-all duration-300 hover:z-50 hover:scale-105">
                        <div className="flex">
                            <span className="group-hover:scale-110 transition-transform duration-200 text-3xl border-2 border-white rounded-full p-3">
                                <FaUserTie />
                            </span>
                        </div>
                        <h1 className="text-2xl p-3 font-bold font-serif">Beome an Interviewer</h1>
                        <p className="text-gray-300 leading-6 text-base">
                            Join our elite community of freelance
                            interviewers. Expand your horizons, share
                            your expertise, and shape the future of tech
                            talent.
                        </p>

                        <button onClick={navigateToInterviewerLogin} type="submit" className="bg-black rounded-2xl mt-10 px-32 py-2 ml-14">Login</button>
                    </div>

                    <div className="bg-[#30323A] text-white p-6 max-w-md shadow-[8px_8px_10px_rgba(0,0,0,1)] transition-all duration-300 hover:z-50 hover:scale-105">
                        <div className="flex">
                            <span className="group-hover:scale-110 transition-transform duration-200 text-3xl border-2 border-white rounded-full p-3">
                                <FaUserGraduate />
                            </span>
                        </div>

                        <h1 className="text-2xl p-3 font-bold font-serif">For Candidate</h1>
                        <p className="text-gray-300 leading-6 text-base">
                            Unlock your potential with expert-led mock
                            interviews. Gain invaluable insights, boost
                            your confidence, and ace your next tech
                            interview.
                        </p>

                        <button onClick={navigateToCandidateLogin} type="submit" className="bg-black rounded-2xl mt-10 px-32 py-2 ml-14">Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChooseLogin;
