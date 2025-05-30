import { useNavigate } from "react-router-dom";
import logo from "../../assets/Creative Logo Templates.jpeg";
// import landingFirst from "../../assets/executives-ready-meeting-removebg-preview.png";
import landingMain from '../../assets/landing page image.jpeg';
// import sky from "../../assets/fantastic-blue-sky.jpg"
import React from "react";
import { motion } from 'framer-motion';


const Home: React.FC = () => {

    const navigate = useNavigate();

    const navigateToSignup = (): void => {
        navigate('/sign-up');
    }

    const navigateToLogin = (): void => {
        navigate('/login')
    }

    const navigateToHomePage = (): void => {
        navigate('/')
    }

    return (
        <>

            {/* top bar */}


            <div className="min-h-screen bg-slate-900 text-white flex flex-col">
                {/* Navbar */}
                <motion.nav
                    className="flex items-center justify-between px-6 py-4 bg-slate-800 shadow-md"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center">
                        <img onClick={navigateToHomePage} src={logo} alt="Company Logo" className="h-8 w-12 mr-4 ml-3 shadow-md rounded-xl hover:cursor-pointer" />
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 text-transparent bg-clip-text">
                            mockBS
                        </h1>
                    </div>
                    <ul className="flex space-x-6 text-sm">
                        <li className="hover:text-emerald-300 cursor-pointer text-emerald-400 transition">Home</li>
                        <li className="hover:text-emerald-300 cursor-pointer text-emerald-400 transition">About</li>
                        <li className="hover:text-emerald-300 cursor-pointer text-emerald-400 transition">Contact</li>
                    </ul>
                    <div>
                        <button onClick={navigateToSignup} className="text-slate-900 bg-emerald-400 px-4 py-1 mr-4 rounded-3xl hover:bg-emerald-500 hover:text-white transition duration-300">
                            Sign Up
                        </button>
                        <button onClick={navigateToLogin} className="text-slate-900 bg-white px-4 py-1 rounded-3xl hover:bg-slate-700 hover:text-white transition duration-300">
                            Login
                        </button>
                    </div>
                </motion.nav>

                {/* Hero Section */}
                <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
                    <motion.h2
                        className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-300 to-teal-500 text-transparent bg-clip-text"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Every mock interview brings you one step closer to your dream job.
                    </motion.h2>

                    <motion.p
                        className="text-lg md:text-xl text-slate-300 mb-6 max-w-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Enhance your skills with mock interviews led by industry experts, and receive personalized feedback to boost your confidence.
                    </motion.p>

                    <motion.button
                        onClick={navigateToSignup}
                        className="bg-emerald-500 hover:bg-emerald-400 px-6 py-3 rounded-full text-white font-semibold transition duration-300"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started
                    </motion.button>
                </div>
            </div>

            {/* <div className=" w-full p-1 flex justify-between items-center fixed top-0 left-0 shadow-md bg-white z-50">
                <div className="flex">
                    <img onClick={navigateToHomePage} src={logo} alt="Company Logo" className="h-10 w-14 mr-4 ml-3 shadow-md rounded-xl hover:cursor-pointer" />
                    <h1 className="mt-2 font-semibold text-[#0d97ff]">mock BS</h1>
                </div>

                <div className="mx-5 mt-2 pb-1">
                    <button onClick={navigateToSignup} type="submit" className="text-white bg-[#0d97ff] px-4 py-2 mr-4 rounded-3xl hover:bg-[#a0d9ef] hover:text-black duration-700">Sign Up</button>
                    <button onClick={navigateToLogin} type="submit" className="text-white bg-[#0d97ff] px-4 py-2 rounded-3xl hover:bg-[#a0d9ef] hover:text-black duration-700">Login</button>
                </div>
            </div>

            <div
                style={{ backgroundImage: `url(${sky}) ` }}
                className="flex justify-between flex-col md:flex-row  h-screen bg-no-repeat ">
                <div className="mt-40 ml-32 ">
                    <h1 className="text-black font-bold font-serif text-6xl">Every mock interview </h1>
                    <h1 className="font-bold font-serif text-5xl">brings you one step closer to </h1>
                    <h1 className="font-bold font-serif text-5xl">your dream job.</h1>

                    <div className="mt-10 text-xl font-extralight">
                        <p className="text-black">Enhance your skills with mock interviews led by industry experts, </p>
                        <p className="text-black  ">and receive personalized feedback to boost your confidence.</p>
                    </div>

                    <button onClick={navigateToSignup} type="submit" className="bg-[#0d97ff] px-4 py-3 rounded-2xl font-serif mt-10 hover:bg-[#30323A] hover:text-white" >Get Started Now</button>
                </div> */}

            {/* <div className="mr-10 mt-32">
                    <img src={mainLapLogo} alt="Main Lap Logo" className="h-[380px]" />
                </div> */}

            {/* <div className=" w-96 rounded-es-[200px]">
                    <img src={landingFirst} alt="" className="mt-[330px] " />
                </div>
            </div> */}

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
