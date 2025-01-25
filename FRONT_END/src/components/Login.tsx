import { RiLockPasswordLine } from "react-icons/ri";
import backgroundImage from '../assets/Free Vector _ Gradient black background with wavy lines.jpeg'
import { LoginProps } from '../Interface/Interface';
import TopBar from './TopBar';
import { MdEmail } from 'react-icons/md';


const Login = (props: LoginProps) => {
    return (
        <>
            <TopBar />

            <div className={`h-screen flex w-full items-center justify-center pb-10 ${props.heading === "Admin Login" ? 'bg-black' : 'bg-white'}`}>
            <div style={{ backgroundImage: `url(${backgroundImage})` }} className="bg-black bg-cover bg-center text-white p-6 w-[600px] rounded-xl shadow-[8px_8px_10px_rgba(0,0,0,1)]">

                    <div className='flex justify-center items-center '>
                        {props.icon}
                    </div>

                    <h2 className="text-center text-2xl font-semibold mb-4 text-white"> {props.heading} </h2>

                    {props.chaild ? props.chaild : <></>}

                    <form className="space-y-8" onSubmit={props.handleToSubmit}>

                        <div className="flex justify-center pt-4 relative">
                            <input
                                type="email"
                                id="email"
                                name='email'
                                placeholder="Email"
                                value={props.formDataLogin.email}
                                onChange={props.handleTakeInput}
                                className="rounded-xl p-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-white bg-[#30323A]"
                            />
                            <MdEmail className='absolute mt-3 ml-64' />
                            {props.errors.email && (
                                <p className="text-red-500 text-sm absolute top-full mt-1">
                                    {props.errors.email}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-center bottom-3 relative">
                            <input
                                type="password"
                                id="password"
                                name='password'
                                placeholder="Password"
                                value={props.formDataLogin.password}
                                onChange={props.handleTakeInput}
                                className="rounded-xl p-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-white bg-[#30323A]"
                            />
                            <RiLockPasswordLine className='absolute mt-3 ml-64' />
                            {props.errors.password && (
                                <p className="text-red-500 text-sm absolute top-full mt-1">
                                    {props.errors.password}
                                </p>
                            )}
                            <p className='absolute right-32 top-14 text-sm text-gray-400 cursor-pointer hover:text-white' onClick={props.forgotPassword}>forgot password?</p>
                        </div>

                        <div className=" flex justify-center relative top-3">
                            <button type="submit" className=" bg-[#30323A] text-white  rounded-md hover:bg-black hover:text-white transition duration-200 px-6 py-1">Login</button>
                        </div>

                        <div className="flex justify-center relative bottom-2">
                            <p className="text-gray-500 text-sm">Don't have any account yet? <span onClick={props.onNavigate} className="text-gray-500 cursor-pointer hover:underline hover:text-white">Sign Up</span></p>
                        </div>

                    </form>

                </div>
            </div>
        </>
    )
}

export default Login;
