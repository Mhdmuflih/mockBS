import { FaPhoneSquareAlt, FaUser } from "react-icons/fa";
import { SignupProps } from "../Interface/Interface";
import backgroundImage from '../assets/Free Vector _ Gradient black background with wavy lines.jpeg';
import TopBar from "./TopBar";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

const SignUp = (props: SignupProps) => {
  return (
    <>
      <TopBar />

      <div className={`h-screen w-full flex items-center justify-center pb-10 ${props.heading === "Admin Registration" ? 'bg-black' : 'bg-white'}`}>
      <div
          style={{ backgroundImage: `url(${backgroundImage})` }}
          className="bg-black bg-cover bg-center text-white p-6 w-[600px] rounded-xl shadow-[8px_8px_10px_rgba(0,0,0,1)]"
        >
          <div className='flex justify-center items-center '>
            {props.icon}
          </div>

          <h2 className="text-center text-2xl font-semibold mb-4 text-white">{props.heading}</h2>

          {props.chaild ? props.chaild : <></>}

          <form className="space-y-2" onSubmit={props.handleToSubmit}>
            <div className="pt-4 flex relative justify-center">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={props.formData.name}
                onChange={props.handleTakeInput}
                className="rounded-xl p-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-white bg-[#30323A]"
              />
              <FaUser className='absolute mt-3 ml-64' />
              {props.errors.name && (
                <p className="text-red-500 text-sm absolute top-full mt-1">
                  {props.errors.name}
                </p>
              )}
            </div>

            <div className="pt-3 flex relative justify-center">
              <input
                type="text"
                id="mobile"
                name="mobile"
                placeholder="Mobile"
                value={props.formData.mobile}
                onChange={props.handleTakeInput}
                className="rounded-xl p-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-white bg-[#30323A]"
              />
              <FaPhoneSquareAlt className='absolute mt-3 ml-64' />
              {props.errors.mobile && (
                <p className="text-red-500 text-sm absolute top-full mt-1">
                  {props.errors.mobile}
                </p>
              )}
            </div>

            <div className="pt-3 flex relative justify-center">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={props.formData.email}
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

            <div className="pt-3 flex flex-col items-center relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={props.formData.password}
                onChange={props.handleTakeInput}
                className="rounded-xl p-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-white bg-[#30323A]"
              />
              <RiLockPasswordLine className='absolute mt-3 ml-64' />
              {props.errors.password && (
                <p className="text-red-500 text-sm mt-1 text-center w-full">
                  {props.errors.password}
                </p>
              )}
            </div>


            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#30323A] text-white rounded-md hover:bg-black hover:text-white transition duration-200 px-6 py-1"
              >
                Signup
              </button>
            </div>

            <div className="flex justify-center">
              <p className="text-gray-500 text-sm">
                Already have an account?{" "}
                <span
                  onClick={props.onNavigate}
                  className="text-gray-500 cursor-pointer hover:underline hover:text-white"
                >
                  Sign In
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
