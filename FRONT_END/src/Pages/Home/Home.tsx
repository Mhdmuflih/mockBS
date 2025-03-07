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
        <>

            {/* top bar */}

            <div className="bg-[#30323A] w-full p-1 flex justify-between items-center fixed top-0 left-0 shadow-md z-50">
                <div>
                    <img onClick={navigateToHomePage} src={logo} alt="Company Logo" className="h-10 w-14 mr-4 ml-3 hover:cursor-pointer" />
                </div>

                <div className="mx-5 mt-2 pb-1">
                    <button onClick={navigateToSignup} type="submit" className="text-white bg-[#171616] px-4 py-2 mr-4 rounded-3xl hover:bg-white hover:text-black">Sign Up</button>
                    <button onClick={navigateToLogin} type="submit" className="text-white bg-[#171616] px-4 py-2 rounded-3xl hover:bg-white hover:text-black">Login</button>
                </div>
            </div>

            {/* 1 part */}

            <div className="flex justify-between mt-20 flex-col md:flex-row ">
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

            <>
                <h1 className="text-[#999999] font-bold font-serif text-[100px] mt-32 text-center">How It Works?</h1>


                <div className="flex justify-evenly mt-32">
                    <div className="flex  ">
                        <div className="bg-[rgba(50,173,230,0.36)] w-20 h-20 rounded-3xl">
                            <h1 className="text-2xl font-bold text-center mt-6">1</h1>
                        </div>
                        <div className="mt-5 ml-3 font-bold font-sans">
                            <h2>Find your interviewer or </h2>
                            <h2>mentor</h2>
                        </div>
                    </div>
                    <div className="flex  ">
                        <div className="bg-[rgba(50,173,230,0.36)] w-20 h-20 rounded-3xl">
                            <h1 className="text-2xl font-bold text-center mt-6">2</h1>
                        </div>
                        <div className="mt-5 ml-3 font-bold font-sans">
                            <h2>Participate in your</h2>
                            <h2>session</h2>
                        </div>
                    </div>
                    <div className="flex  ">
                        <div className="bg-[rgba(50,173,230,0.36)] w-20 h-20 rounded-3xl">
                            <h1 className="text-2xl font-bold text-center mt-6">3</h1>
                        </div>
                        <div className="mt-5 ml-3 font-bold font-sans">
                            <h2>Get a top-notch reliable</h2>
                            <h2>feedback</h2>
                        </div>
                    </div>
                </div>
            </>

            {/* part 4 content part */}

            <div className="flex justify-evenly mt-4">
                <div className="ml-24 font-extralight">
                    <p>Browse and find interviewers from top</p>
                    <p>companies best matching your targeted</p>
                    <p>position, and book a session with them.</p>
                </div>
                <div className="ml-20 font-extralight">
                    <p>Join the call with your interviewers and mentors</p>
                    <p>on the scheduled time. The style of the mock</p>
                    <p>interviews are in the way that you expect in a</p>
                    <p>job interview.</p>
                </div>
                <div className="mr-2 font-extralight">
                    <p>Practice on the areas for improvement based on</p>
                    <p>the provided feedback. Learn, strengthen your</p>
                    <p>skills, and go on to get your dream job!</p>
                </div>
            </div>

            <>
                {/* Footer */}
                <div className="bg-[#30323A] h-full flex flex-col md:flex-row justify-between px-5 md:px-20 py-10 space-y-10 md:space-y-0 mt-48">
                    {/* Logo & Name */}
                    <div className="flex items-center">
                        <img
                            onClick={navigateToHomePage}
                            src={logo}
                            alt="Company Logo"
                            className="h-10 w-14 mr-4 hover:cursor-pointer"
                        />
                        <h1 className="font-bold text-white">mockBS</h1>
                    </div>

                    {/* Contact Information */}
                    <div className="text-white font-extralight text-center md:text-left">
                        <h1 className="font-bold">Contact Information</h1>
                        <div className="mt-2">
                            <p>Email: mockbs@gmail.com</p>
                            <p>Phone: +91 9495891255</p>
                            <p>Address: 1232, Finland, Tech</p>
                            <p>City</p>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="text-white font-extralight text-center md:text-left">
                        <h1 className="font-bold">Company</h1>
                        <div className="mt-2">
                            <p>About Us</p>
                            <p>Careers</p>
                            <p>Privacy Policy</p>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="bg-[#30323A] p-5">
                    <h1 className="text-center text-white">@ 2025 mock BS, All rights reserved.</h1>
                </div>

            </>


        </>



    )
}

export default Home;
