import backgroundImage from '../assets/Free Vector _ Gradient black background with wavy lines.jpeg';
import { changePassword } from '../Interface/Interface';
import TopBar from './TopBar';

const ChangePassword = (props: changePassword) => {
    return (
        <>
            <TopBar />
            <div className="bg-white h-screen flex w-full items-center justify-center pb-10">
                <div
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                    className="bg-black bg-cover bg-center text-white p-6 w-[550px] rounded-xl shadow-[8px_8px_10px_rgba(0,0,0,1)]"
                >
                    <div>
                        <img src="" alt="Icon" className="" />
                        {/* If no icon is available, you can remove or add one */}
                        <span>Image Icon</span>
                    </div>

                    <h2 className="text-center text-2xl font-serif text-white mb-6">
                        Change Your Password!
                    </h2>

                    <form className="space-y-2" onSubmit={props.handleToSubmit}>
                        <div className="pt-3 flex flex-col items-center relative">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Change Password"
                                value={props.formData.password}
                                onChange={props.handleTakeInput}
                                className="rounded-xl p-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-white bg-[#30323A]"
                            />
                            {props.errors.password && (
                                <p className="text-red-500 text-sm mt-1 text-center w-full">
                                    {props.errors.password}
                                </p>
                            )}
                        </div>
                        <div className="pt-3 flex flex-col items-center relative">
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={props.formData.confirmPassword}
                                onChange={props.handleTakeInput}
                                className="rounded-xl p-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-white bg-[#30323A]"
                            />
                            {props.errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1 text-center w-full">
                                    {props.errors.confirmPassword}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-center relative top-3">
                            <button
                                type="submit"
                                className="bg-[#30323A] text-white rounded-md hover:bg-black hover:text-white transition duration-200 px-6 py-1 mb-14"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
