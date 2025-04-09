import { useEffect, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import { getPremiumPaymentList, interviewerPayment } from "../../../Services/adminService";
import { Pagination } from "@mui/material";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";

const AdminPaymentDetails = () => {
  const [paymentData, setPaymentData] = useState<[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const [premiumData, setPremiumData] = useState<any>(null);
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response: any = await interviewerPayment(currentPage, limit, searchQuery);
        if (response.success) {
          setPaymentData(response.interviewerPaymentData.interviewerPaymentData);
          setTotalPages(response.interviewerPaymentData.totalPages);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchPaymentDetails();
  }, [searchQuery, currentPage]);

  // const handleToPay = async (id: string) => {
  //   try {
  //     const result = await Swal.fire({
  //       title: "Are you sure?",
  //       text: "You are about to make this payment!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#34C759",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, pay now!",
  //     });

  //     if (result.isConfirmed) {
  //       const response: any = await PayToInterviewer(id);
  //       response.success ? toast.success(response.message) : toast.error(response.message);
  //     }
  //   } catch (error: any) {
  //     toast.error(error?.message || "An unexpected error occurred. Please try again later.");
  //   }
  // };

  const handleChange = (_: unknown, value: number) => {
    setCurrentPage(value);
  };

  const getToPremiumPaymentList = async () => {
    try {
      const response: any = await getPremiumPaymentList();
      if (response.success) {
        setSelected(true);
        console.log(response.premiumData, 'this is premiumData');
        setPremiumData(response.premiumData);
        console.log("okokookok");
      } else {
        console.log("not okokok ");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex ">
      <SideBar heading="Payment Details">
        {/* <Toaster position="top-right" /> */}

        <div className="bg-[#30323A] p-4 shadow-md min-h-screen w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div className="space-x-2 flex flex-wrap">
              <>
                <button
                  className={`px-4 py-1 rounded-full duration-500 ${selected ? "bg-[#999] text-white hover:bg-[#34C759] hover:text-white" : "bg-[#34C759] text-white"
                    }`}
                  onClick={() => setSelected(false)}
                >
                  Review Payment
                </button>

                <button
                  className={`px-4 py-1 rounded-full duration-500 ${selected ? "bg-[#34C759] text-white" : "bg-[#999] text-white hover:bg-[#34C759] hover:text-white"
                    }`}
                  onClick={() => {
                    setSelected(true);
                    getToPremiumPaymentList();
                  }}
                >
                  Premium Payment
                </button>
              </>
              {/* <button className="px-4 py-1 rounded-full bg-[#999] text-[#34C759] hover:bg-[#34C759] hover:text-white duration-500">Paid</button>
              <button className="px-4 py-1 rounded-full bg-[#999] text-[#32ADE6] hover:bg-[#32ADE6] hover:text-white duration-500">Earn</button> */}
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 rounded-md bg-black text-white w-full md:w-64 mt-2 md:mt-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {selected ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="p-2">Date</th>
                      <th className="p-2">id</th>
                      <th className="p-2">amount</th>
                      <th className="p-2">duration</th>
                      {/* <th className="p-2">Payment</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {premiumData && premiumData.map((data: any, index: number) => (
                      <tr key={index} className="border-b border-gray-600">
                        <td className="p-2">{new Date(data.updatedAt).toLocaleString()}</td>
                        <td className="p-2">{data._id}</td>
                        <td className="p-2 text-green-600">{data.amount}</td>
                        <td className="p-2">{data.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="p-2">Date</th>
                    <th className="p-2">Stack</th>
                    <th className="p-2">Technology</th>
                    <th className="p-2">Interviewer</th>
                    <th className="p-2">Total Amount</th>
                    <th className="p-2">Interviewer Amount</th>
                    <th className="p-2">Profit</th>
                    {/* <th className="p-2">Payment</th> */}
                  </tr>
                </thead>
                <tbody>
                  {paymentData && paymentData.map((data: any, index) => (
                    <tr key={index} className="border-b border-gray-600">
                      <td className="p-2">{data.scheduleData.date}</td>
                      <td className="p-2">{data.scheduleData.stack}</td>
                      <td className="p-2">{data.scheduleData.technology}</td>
                      <td className="p-2">{data.interviewerName}</td>
                      <td className="p-2 text-yellow-600">{data.scheduleData.price}</td>
                      <td className="p-2 text-red-600">{(data.scheduleData.price - data.scheduleData.price * 0.1).toFixed(2)}</td>
                      <td className="p-2 text-green-600">{(data.scheduleData.price * 0.1).toFixed(2)}</td>
                      {/* <td className="p-2">
                      <button className="bg-white p-2 rounded-full text-[#34C759] hover:bg-[#34C759] hover:text-black duration-700" onClick={() => handleToPay(data._id)}>
                        Pay
                      </button>
                    </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


          )}

          <div className="flex justify-center items-center mt-40">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handleChange}
              sx={{
                "& .MuiPaginationItem-root": { color: "#FFCC00" },
                "& .MuiPaginationItem-root.Mui-selected": { backgroundColor: "#FFCC00", color: "#000" },
                "& .MuiPaginationItem-root:hover": { backgroundColor: "#FFD633", color: "#000" },
              }}
            />
          </div>
        </div>
      </SideBar>
    </div>
  );
};

export default AdminPaymentDetails;
