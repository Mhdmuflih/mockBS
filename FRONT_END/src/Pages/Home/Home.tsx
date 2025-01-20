import { useNavigate } from "react-router-dom";
import logo from "../../assets/Creative Logo Templates.jpeg";
import mainLapLogo from '../../assets/main.png';
import landingMain from '../../assets/landing page image.jpeg';
// import landing from '../../assets/landing.jpeg';

const Home = () => {

    const navigate = useNavigate();

    const navigateToSignup = () => {
        navigate('/sign-up');
    }

    const navigateToLogin = () => {
        navigate('/login')
    }

    const navigateToHomePage = () => {
        navigate('/')
    }

    return (
        <div>

            {/* top bar */}

            <div className="bg-[#30323A] w-full p-1 flex justify-between items-center ">
                <div>
                    <img onClick={navigateToHomePage} src={logo} alt="Company Logo" className="h-10 w-14 mr-4 ml-3 hover:cursor-pointer" />
                </div>

                <div className="mx-5 mt-2 pb-1">
                    <button onClick={navigateToSignup} type="submit" className="text-white bg-[#171616] px-4 py-2 mr-4 rounded-3xl hover:bg-white hover:text-black">Sign Up</button>
                    <button onClick={navigateToLogin} type="submit" className="text-white bg-[#171616] px-4 py-2 rounded-3xl hover:bg-white hover:text-black">Login</button>
                </div>
            </div>

            {/* 1 part */}

            <div className="flex justify-between mt-20">
                <div className="mt-20 ml-52">
                    <h1 className="text-black font-bold font-serif text-[27px]">Ace Your Dream Job Interviews</h1>
                    <h1 className="text-[#32ADE6] font-bold font-serif text-[27px]">with Confidence</h1>

                    <p className="text-black text-xs mt-3 font-semibold">Practice mock interviews with industry experts and receive personalized</p>
                    <p className="text-black text-xs mt-1 font-semibold">feedback to boost your skills and confidence.</p>

                    <button onClick={navigateToSignup} type="submit" className="bg-[#32ADE6] px-4 py-3 rounded-2xl font-serif mt-10 hover:bg-[#30323A] hover:text-white" >Get Started Now</button>
                </div>

                <div className="mr-10">
                    <img src={mainLapLogo} alt="Main Lap Logo" className="h-[380px]" />
                </div>
            </div>

            {/* 2 part */}

            <div className="relative mt-20">
                <img src={landingMain} alt="Landing Main Background" className="w-full rounded-t-[250px] h-[650px]" />
                <div className="absolute inset-0 mt-36">
                    <h1 className="font-bold text-4xl ml-36 mb-4 text-white">Features</h1>
                    <div className="flex justify-evenly">
                        <div className="bg-[#30323A] py-10 px-4 rounded-3xl hover:cursor-pointer hover:bg-white shadow-[8px_8px_10px_rgba(255,255,255,0.17)] hover:shadow-lg transition duration-300 group">
                            <img src="" alt="" className="mb-4" />icon
                            <h1 className="text-white text-xs font-bold group-hover:text-black">Full Stack</h1>
                            <p className="text-white text-xs group-hover:text-black">End-to-end application development</p>
                        </div>
                        <div className="bg-[#30323A] py-10 px-4 rounded-3xl hover:cursor-pointer hover:bg-white shadow-[8px_8px_10px_rgba(255,255,255,0.17)] hover:shadow-lg transition duration-300 group">
                            <img src="" alt="" className="mb-4" />icon
                            <h1 className="text-white text-xs font-bold group-hover:text-black">Full Stack</h1>
                            <p className="text-white text-xs group-hover:text-black">End-to-end application development</p>
                        </div>
                        <div className="bg-[#30323A] py-10 px-4 rounded-3xl hover:cursor-pointer hover:bg-white shadow-[8px_8px_10px_rgba(255,255,255,0.17)] hover:shadow-lg transition duration-300 group">
                            <img src="" alt="" className="mb-4" />icon
                            <h1 className="text-white text-xs font-bold group-hover:text-black">Full Stack</h1>
                            <p className="text-white text-xs group-hover:text-black">End-to-end application development</p>
                        </div>
                    </div>
                    <div className="flex justify-evenly mt-10">
                    <div className="bg-[#30323A] py-10 px-4 rounded-3xl hover:cursor-pointer hover:bg-white shadow-[8px_8px_10px_rgba(255,255,255,0.17)] hover:shadow-lg transition duration-300 group">
                            <img src="" alt="" className="mb-4" />icon
                            <h1 className="text-white text-xs font-bold group-hover:text-black">Full Stack</h1>
                            <p className="text-white text-xs group-hover:text-black">End-to-end application development</p>
                        </div>
                        <div className="bg-[#30323A] py-10 px-4 rounded-3xl hover:cursor-pointer hover:bg-white shadow-[8px_8px_10px_rgba(255,255,255,0.17)] hover:shadow-lg transition duration-300 group">
                            <img src="" alt="" className="mb-4" />icon
                            <h1 className="text-white text-xs font-bold group-hover:text-black">Full Stack</h1>
                            <p className="text-white text-xs group-hover:text-black">End-to-end application development</p>
                        </div>
                        <div className="bg-[#30323A] py-10 px-4 rounded-3xl hover:cursor-pointer hover:bg-white shadow-[8px_8px_10px_rgba(255,255,255,0.17)] hover:shadow-lg transition duration-300 group">
                            <img src="" alt="" className="mb-4" />icon
                            <h1 className="text-white text-xs font-bold group-hover:text-black">Full Stack</h1>
                            <p className="text-white text-xs group-hover:text-black">End-to-end application development</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3 part */}

            <div>
                <h1 className="text-[#999999] font-bold font-serif text-[100px] mt-9 text-center">How It Works?</h1>
            </div>

        </div>
    )
}

export default Home;
