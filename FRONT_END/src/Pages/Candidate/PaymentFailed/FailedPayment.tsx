// import { useNavigate } from "react-router-dom";
// import SideBar from "../../../components/Candidate/SideBar";

// const FailedPayment = () => {

//     const navigate = useNavigate();

//     const handleToHomePage = () => {
//         navigate('/candidate/home');
//     };


//     return (
//         <>

//             <SideBar heading="Payment Failed">
//                 <div className="bg-[#30323A] ml-1 p-4 rounded-b-lg shadow-md h-[439px] flex justify-center items-center">
//                     <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
//                         <svg
//                             viewBox="0 0 24 24"
//                             className="text-red-600 w-16 h-16 mx-auto my-4"
//                             fill="currentColor"
//                         >
//                             <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.656 15.656a1.5 1.5 0 0 1-2.121 2.121L12 14.121l-3.535 3.656a1.5 1.5 0 1 1-2.121-2.121L9.879 12 6.344 8.465a1.5 1.5 0 1 1 2.121-2.121L12 9.879l3.535-3.535a1.5 1.5 0 1 1 2.121 2.121L14.121 12l3.535 3.656z" />
//                         </svg>

//                         <h3 className="md:text-2xl text-lg text-gray-900 font-semibold">Payment Failed</h3>
//                         <p className="text-gray-600 mt-2">Your payment was unsuccessful. Please try again.</p>
//                         <p className="text-gray-600">Contact support if the issue persists.</p>
//                         <div className="mt-6">
//                             <div className="flex justify-between">
//                                 <button
//                                     onClick={handleToHomePage}
//                                     className="p-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg"
//                                 >
//                                     Home
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </SideBar>

//         </>
//     )
// }

// export default FailedPayment;
