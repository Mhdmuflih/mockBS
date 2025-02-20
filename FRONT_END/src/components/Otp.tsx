import TopBar from "./TopBar";
import backgroundImage from "../assets/Free Vector _ Gradient black background with wavy lines.jpeg";
import { OtpProps } from "../Interface/Interface";

const Otp = (props: OtpProps) => {


    return (
        <>
            <TopBar />
            <div className="bg-white h-screen w-full flex items-center justify-center pb-10">
                <div
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                    className="bg-black bg-cover bg-center text-white p-6 w-[550px] rounded-xl shadow-[8px_8px_10px_rgba(0,0,0,1)]"
                >
                    <h2 className="text-center text-2xl font-semibold mb-4 text-white">
                        Verify Account
                    </h2>
                    <p className="text-center text-xs font-normal">
                        An OTP Code has been sent to your Email
                    </p>

                    <div className="pt-10">
                        <form className="space-y-2" onSubmit={props.handleSubmit}>
                            <div className="space-x-2 mt-4 flex justify-center">
                                {props.otp.map((value: string, index: number) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        value={value}
                                        ref={(el) => {
                                            if (props.inputs.current) {
                                                props.inputs.current[index] = el!;
                                            }
                                        }}
                                        onChange={(e) => props.handleChange(e, index)}
                                        onKeyDown={(e) => props.handleKeyDown(e, index)}
                                        className="w-12 h-12 bg-[#30323A] rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-white shadow-[3px_3px_4px_rgba(255,255,255,0.65)]"
                                    />
                                ))}
                            </div>

                            <div className="flex justify-center pt-10">
                                <button
                                    type="submit"
                                    className="bg-[#30323A] text-white rounded-md hover:bg-black hover:text-white transition duration-200 px-6 py-1"
                                >
                                    Verify
                                </button>
                            </div>
                        </form>

                        <div className="flex justify-center p-4">
                            {props.canResend ? (
                                <p onClick={props.handleResendOTP} className="text-gray-500 text-sm hover:text-white cursor-pointer">
                                    Resend OTP
                                </p>
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    Resend OTP in {props.timer} seconds
                                </p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Otp;
