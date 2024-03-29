import { BrowserRouter, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { useContext, createContext, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import ForgotPw from "./pages/ForgotPw";
import ConfirmCode from "./pages/ConfirmCode";
import ChooseInterest from "./pages/ChooseInterests";
import Sidebar from "./components/Sidebar";
import Feed from "./pages/Feed";
import  Landing  from "./pages/Landing";
import { useState } from "react";
import PoseEditorModal from "./components/PoseEditorModel";
import useDarkMode from './hooks/useDarkMode'
import { color, motion, useScroll } from "framer-motion";
import ProfileView from "./pages/ProfileView";
import Bookmarks from "./pages/Bookmarks";
import Gallery from "./pages/Notifications";
import SinglePost from "./pages/SinglePost";
import Notifications from "./pages/Notifications";
import { EditProfile } from "./pages/EditProfile";
import { BounceLoader } from "react-spinners";
import SearchResults from "./pages/SearchResults";

export const UserContext = createContext();
export const ThemeContext = createContext()
export const ModelDataContext = createContext()

function App() {
  const [setTheme, colorTheme] = useDarkMode();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [currentUser, setCurrentUser] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [suggestions, setSuggestions] = useState();
useEffect(() => {
  const fetchData = async () => {
    const jwt = token
    if (jwt) {
      const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/currentuser`,
      { access_token: jwt },
      {
        // withCredentials: true,
        headers: {
          'Authorization' : 'Bearer ' + jwt
        }
      },
    );
      setCurrentUser(data);
    }
  };
  fetchData().catch((err) => {
    localStorage.removeItem('token')
    setToken()
    setCurrentUser('')
    // window.location.reload()
  });
}, [token]);
    useEffect(() => {
      {
        const fetchData = async () => {
          const { data } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/suggestedUsers`
          );
          setSuggestions(data);
        };
        fetchData().catch((err) => console.log(err));
      }
    }, [token]);
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        theme={`${colorTheme === "dark" ? "light" : "dark"}`}
      />
      <UserContext.Provider value={{ currentUser, setCurrentUser,token,suggestions,setSuggestions }}>
        <ThemeContext.Provider value={{ setTheme, colorTheme }}>
          <ModelDataContext.Provider value={{ modalData, setModalData,setShowModal }}>
            <Routes>
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="forgotpw" element={<ForgotPw />} />
                <Route path="forgotpw/confirmcode" element={<ConfirmCode />} />
                <Route path="chooseinterest" element={<ChooseInterest />} />
              </Route>

              <Route path="/" element={<Landing />} />
              <Route
                path="/home"
                element={
                  <OutletLayout
                    setTheme={setTheme}
                    colorTheme={colorTheme}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    modalData={modalData}
                  />
                }
              >
                <Route
                  index
                  element={
                    <Feed
                      showModal={showModal}
                      setShowModal={setShowModal}
                      setModalData={setModalData}
                    />
                  }
                />
                <Route
                  path="posts/:postId"
                  element={<SinglePost colorTheme={colorTheme} />}
                />
                <Route path="Profile/:uid">
                  <Route
                    index
                    element={
                      <ProfileView
                        setShowModal={setShowModal}
                        setModalData={setModalData}
                      />
                    }
                  />
                  <Route path="edit" element={<EditProfile />} />
                </Route>
                <Route path="Bookmarks" element={<Bookmarks />} />
                <Route path="Notifications" element={<Notifications />} />
                <Route path= "searchresults/:query" element={<SearchResults />} />
              </Route>

              {/* <Route path="*" element={<div>No Route</div>} /> */}
            </Routes>
          </ModelDataContext.Provider>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

const AuthLayout = () => {
  return (
    <div className="min-h-full h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full ">
        <Outlet />
      </div></div>
  )
}

const OutletLayout = ({ showModal, setShowModal, colorTheme, setTheme, modalData }) => {
   const { token } = useContext(UserContext);
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("token") ) {
      navigate("/auth/login");
    }
  }, [token]);
  const changeThemeHandler = (e) => {
    e.preventDefault();
    setTheme(colorTheme);
  };
  const { scrollYProgress } = useScroll();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    if (scrollYProgress > 30)
      setScroll(true)
    else
      setScroll(false)
  }, [scrollYProgress])
  const override = {
    display: "block",
    position: "fixed",
    top: "50%",
    left: "50%",
    margin: "auto auto",
    transform: "translate(-50%,-50%)",
  };
  // if (currentUser === '')
  //   return (
  //     <BounceLoader
  //       color={"#59B2A2"}
  //       loading={true}
  //       cssOverride={override}
  //       size={100}
  //       aria-label="Loading Spinner"
  //       data-testid="loader"
  //     />
  //   );
    
  return (
    <>
      <motion.div
        className={`md:hidden w-screen py-2 block fixed top-0 z-50 transition-all duration-300`}
        id="logobar"
      >
        <img
          src="/logo.png"
          className="mx-auto w-24  drop-shadow-lg dark:shadow-white"
        />
      </motion.div>
      <div className="mx-auto relative w-screen md:pb-0 pb-32">
        <PoseEditorModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalData={modalData}
          colorTheme={colorTheme}
        />
        <motion.div className="py-2 z-20 fixed md:hidden grid items-center">
          {colorTheme === "dark" ? (
            <motion.button
              className="fixed grid items-center justify-center w-12 h-12 top-1/2 right-5 px-2 py-2 rounded-lg drop-shadow-xl shadow-xl  bg-gray-800 hover:bg-gray-700 text-white hover:text-gray-200 text-center"
              onClick={changeThemeHandler}
              animate={{
                scale: [1, 1.1],
                transition: {
                  ease: "linear",
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </motion.button>
          ) : (
            <motion.button
              className="fixed grid justify-center items-center w-12 h-12 top-1/2 right-5 px-2 py-2 rounded-lg drop-shadow-xl shadow-xl  bg-white text-gray-900 hover:bg-gray-100 text-center"
              onClick={changeThemeHandler}
              animate={{
                scale: [1, 1.1],
                transition: {
                  ease: "linear",
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            </motion.button>
          )}
        </motion.div>
        <Sidebar
          showModal={showModal}
          setShowModal={setShowModal}
          setTheme={setTheme}
          colorTheme={colorTheme}
        />
        <Outlet />
      </div>
    </>
  );
};

export default App;
