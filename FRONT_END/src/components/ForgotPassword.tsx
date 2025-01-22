import backgroundImage from '../assets/Free Vector _ Gradient black background with wavy lines.jpeg'
import { forgotProps } from '../Interface/Interface';
import TopBar from "./TopBar";

const ForgotPassword = (props: forgotProps) => {
    return (
        <>
            <TopBar />

            <div className="bg-white h-screen flex w-full items-center justify-center pb-10">
                <div style={{ backgroundImage: `url(${backgroundImage})` }} className="bg-black bg-cover bg-center text-white p-6 w-[550px] rounded-xl shadow-[8px_8px_10px_rgba(0,0,0,1)]">

                    <div>
                        <img src="" alt="" className="" />
                        image icon
                    </div>

                    <h2 className="text-center text-2xl font-serif  text-white"> Forgot Your Password ? </h2>
                    <p className='text-center mb-12 text-[11px] font-extralight'> No worries! We will send you reset instructions. </p>

                    <form className="space-y-8" onSubmit={props.handleToSubmit} >

                        <div className="flex justify-center pt-4 relative">
                            <input
                                type="email"
                                id="email"
                                name='email'
                                placeholder="Email"
                                value={props.formData.email}
                                onChange={props.handleTakeInput}
                                className="rounded-xl p-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-white bg-[#30323A]"
                            />
                            {props.errors.email && (
                                <p className="text-red-500 text-sm absolute top-full mt-1">
                                    {props.errors.email}
                                </p>
                            )}
                        </div>



                        <div className=" flex justify-center relative top-3">
                            <button type="submit" className=" bg-[#30323A] text-white  rounded-md hover:bg-black hover:text-white transition duration-200 px-6 py-1">Send OTP</button>
                        </div>

                        <div className="flex justify-center relative bottom-2">
                            <p className="text-gray-500 text-sm font-serif">Remember your password? <span className="text-gray-500 cursor-pointer hover:underline hover:text-white" onClick={props.onNavigate} >Login</span></p>
                        </div>

                    </form>

                </div>
            </div>
        </>
    )
}

export default ForgotPassword;
