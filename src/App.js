import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import ForgotPw from "./pages/ForgotPw";
import ConfirmCode from "./pages/ConfirmCode";
import ChooseInterest from "./pages/ChooseInterests";
import Sidebar from "./components/Sidebar";
import Feed from "./pages/Feed";

function App() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgotpw" element={<ForgotPw />} />
            <Route path="/forgotpw/confirmcode" element={<ConfirmCode />} />
            <Route path="chooseinterest" element={<ChooseInterest />} />
            <Route path="/" element={<OutletLayout />}>
              <Route index element={<Feed />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}


const OutletLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default App;
