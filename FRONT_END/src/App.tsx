import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";

// imported pages
// ======================
const Home = lazy(() => import("./Pages/Home/Home"));
const ChooseSignup = lazy(() => import("./Pages/Choose Signup/ChooseSignup"));
const ChooseLogin = lazy(() => import("./Pages/Choose Login/ChooseLogin"));
const AdminRoutes = lazy(() => import("./Routes/AdminRoutes"));
const CandidateRoutes = lazy(() => import("./Routes/CandidateRoutes"));
const InterviewerRoutes = lazy(() => import("./Routes/InterviewerRoutes"));
const PageNotFound = lazy(() => import("./Pages/404 Page Not Found/PageNotFound"));
// import ChooseSignup from "./Pages/Choose Signup/ChooseSignup";
// import ChooseLogin from "./Pages/Choose Login/ChooseLogin";
// import AdminRoutes from "./Routes/AdminRoutes";
// import CandidateRoutes from "./Routes/CandidateRoutes";
// import InterviewerRoutes from "./Routes/InterviewerRoutes";
// import PageNotFound from "./Pages/404 Page Not Found/PageNotFound";

// src/App.tsx
function App() {
  return (
    <>
      <Suspense fallback={<div><Loading /></div>}>

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

          <Route path="*" element={<PageNotFound />}></Route>

        </Routes>
      </Suspense>
    </>
  );
}

export default App;
