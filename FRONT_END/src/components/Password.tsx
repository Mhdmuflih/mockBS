import { IPassword } from "../Interface/Interface";

const Password = (props: IPassword) => {
    return (
        <div className="mt-10 ml-20">
            <form className="space-y-2" onSubmit={props.handleToSubmit}>
                <div className="pt-3 flex flex-col items-center relative">
                    <div>
                        {/* <label className="text-gray-800"> Current Password: </label> */}
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Current Password"
                            value={props.formData.currentPassword}
                            onChange={props.handleTakeInput}
                            className="rounded-xl p-2 ml-3 w-[300px] focus:outline-none focus:ring-2 focus:ring-white bg-black text-white"
                        />
                        {props.errors.password && (
                            <p className="text-red-500 text-sm mt-1 text-center w-full">
                                {props.errors.password}
                            </p>
                        )}
                    </div>
                </div>
                <div className="pt-3 flex flex-col items-center relative">
                    <div>
                        {/* <label className="text-gray-800"> Change Password: </label> */}
                        <input
                            type="password"
                            id="changePassword"
                            name="password"
                            placeholder="Change Password"
                            value={props.formData.password}
                            onChange={props.handleTakeInput}
                            className="rounded-xl p-2 ml-3 w-[300px] focus:outline-none focus:ring-2 focus:ring-white bg-black text-white"
                        />
                        {props.errors.password && (
                            <p className="text-red-500 text-sm mt-1 text-center w-full">
                                {props.errors.password}
                            </p>
                        )}
                    </div>
                </div>
                <div className="pt-3 flex flex-col items-center relative">
                    <div>
                        {/* <label className="text-gray-800"> Confirm Password: </label> */}
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={props.formData.confirmPassword}
                            onChange={props.handleTakeInput}
                            className="rounded-xl p-2 ml-3 w-[300px] focus:outline-none focus:ring-2 focus:ring-white bg-black text-white"
                        />
                        {props.errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1 text-center w-full">
                                {props.errors.confirmPassword}
                            </p>
                        )}
                    </div>

                </div>
                <div className="flex justify-center relative top-3">
                    <button
                        type="submit"
                        className="bg-black text-white rounded-md hover:bg-[#1d212f] hover:text-white transition duration-200 px-6 py-1 mb-14"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Password;
