import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ChooseSignup from "./Pages/Choose Signup/ChooseSignup";
import ChooseLogin from "./Pages/Choose Login/ChooseLogin";
// import Otp from "./components/Otp";
import AdminRoutes from "./Routes/AdminRoutes";
import CandidateRoutes from "./Routes/CandidateRoutes";
import InterviewerRoutes from "./Routes/InterviewerRoutes";

// src/App.tsx
function App() {
  return (
    <>
      <Routes>

        <Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-up" element={<ChooseSignup />}></Route>
          <Route path="/login" element={<ChooseLogin />}></Route>
          {/* <Route path="/otp" element={<Otp />}></Route> */}
        </Route>

        <Route>
          <Route path="/admin/*" element={<AdminRoutes />}></Route>
          <Route path="/candidate/*" element={<CandidateRoutes />}></Route>
          <Route path="/interviewer/*" element={<InterviewerRoutes />}></Route>
        </Route>

      </Routes>
    </>
  );
}

export default App;
