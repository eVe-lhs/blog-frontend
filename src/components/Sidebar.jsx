import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const variant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
      staggerChildren: 0.3,
    },
  },
};

const navChildVariant = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const SideBar = ({ showModal, setShowModal, colorTheme, setTheme }) => {
  const changeThemeHandler = (e) => {
    e.preventDefault();
    setTheme(colorTheme);
  };
   const { currentUser, setCurrentUser } = useContext(UserContext);
  const [activeTab,setActiveTab] = useState('home')
  
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleSidebar = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const logoutHandler = () => {
    if (window.confirm("Are you sure you want to Log out?")) {
      const logout = async () => {
         const { data } = await axios.post(
           `${process.env.REACT_APP_BASE_URL}/logout`,
        );
      };
      localStorage.removeItem("token");
      logout().catch((err) => console.log(err));
      window.location.reload();
    }
  };
  // if (loading) {
  //   return null;
  // } else {
  return (
    <>
      <div className="lg:hidden block relative z-50 w-screen">
        {/* <div
          className="right-3 top-3 w-5 h-5 z-10 flex flex-col justify-between fixed"
          onClick={toggleSidebar}
        >
          <motion.div
            initial={false}
            animate={
              !open
                ? {
                    translateY: [8, 8, 0],
                    rotate: [45, 0, 0],
                  }
                : { translateY: [0, 8, 8], rotate: [0, 0, 45] }
            }
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="origin-center w-full h-1/5 bg-secondary_assent dark:bg-white rounded-sm"
          />
          <motion.div
            initial={false}
            animate={
              open
                ? {
                    scaleX: 0,
                    translateX: -15,
                    rotate: 0,
                    translateY: 0,
                  }
                : { scaleX: 1, translateX: 0, translateY: 0, rotate: 0 }
            }
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="origin-center w-full h-1/5 bg-secondary_assent dark:bg-white rounded-sm"
            style={{}}
          />
          <motion.div
            initial={false}
            animate={
              !open
                ? {
                    translateY: [-8, -8, 0],
                    rotate: [-45, 0, 0],
                  }
                : { translateY: [0, -8, -8], rotate: [0, 0, -45] }
            }
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="origin-center w-full h-1/5 bg-secondary_assent dark:bg-white rounded-sm"
          />
        </div> */}
      </div>
      <motion.div
        onClick={toggleSidebar}
        className={`md:hidden block fixed px-2 py-0.5 rounded-t-xl border-x border-t drop-shadow-2xl shadow-2xl bg-gray-50 dark:bg-gray-900 justify-center transition-bottom translate-y-1 ease-linear duration-200 z-20 ${
          open ? "bottom-32" : "bottom-20"
        } left-1/2 -translate-x-1/2`}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 origin-center transition duration-200 ease-linear ${
            open ? "rotate-180" : ""
          } `}
          animate={{ y: -2, rotate: open ? 180 : 0 }}
          transition={{
            y: {
              repeat: Infinity,
              type: "spring",
              mass: 0.4,
              repeatType: "reverse",
              duration: 0.4,
              repeatDelay: 1,
            },
            rotate: {
              duration: 0.2,
              type: "tween",
            },
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </motion.svg>
      </motion.div>
      <motion.aside
        href="/"
        className={`lg:w-64 md:w-1/4 w-full md:pt-5 px-4 fixed z-20 ease-linear bottom-0 left-0 md:inset-y-0 mr-5 transform md:h-screen md:overflow-y-auto 
        ${
          !open ? "h-20" : "h-32"
        }   md:translate-y-0  md:transition-none transition-height md:border-t-0 md:rounded-none rounded-t-3xl duration-200 md:bg-gray-200 bg-gray-100 font-body text-gray-800 dark:md:bg-gray-800 dark:bg-gray-900 dark:text-white border-t shadow-2xl drop-shadow-2xl md:shadow-xl md:border-r border-r-gray-300`}
        variants={variant}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          class="md:block hidden py-3 sm:py-4"
          variants={navChildVariant}
        >
          <div class="flex md:flex-col flex-row md:items-center md:mx-auto mx-8 items-start space-y-2">
            <div class="flex-shrink-0">
              <img
                class="md:w-2/3 w-24 mx-auto rounded-lg"
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2 md:mx-0 ml-5 md:items-center">
              <div class="flex-1 min-w-0">
                <p class="text-2xl font-medium text-gray-900 truncate dark:text-white font-header">
                  {currentUser? currentUser.username: '[Username]'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <nav
          nav
          className="md:block flex flex-col md:mx-auto md:w-40 font-thin md:space-y-0 md:mt-6 md:text-lg text-xs"
        >
          <div className="md:block flex flex-row md:gap-5 justify-evenly">
            <motion.div className="mx-auto" variants={navChildVariant}>
              <div
                className="navigation w-full"
                onClick={() => navigate("/home")}
              >
                <div className="flex md:flex-row p-1 flex-col md:gap-5 gap-1 md:justify-normal justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="md:w-6 md:h-6 w-8 h-8 stroke-current text-gray-800 dark:text-gray-50 hover:scale-110 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>

                  <div className="md:block hidden">Home</div>
                </div>
              </div>
            </motion.div>
            <motion.div className="mx-auto" variants={navChildVariant}>
              <div
                className="navigation w-full"
                onClick={(e) => navigate("Profile/1")}
              >
                <div className="flex md:flex-row p-1 flex-col md:gap-5 gap-1 md:justify-normal justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="md:w-6 md:h-6 w-8 h-8 stroke-current text-gray-800 dark:text-gray-50 hover:scale-110 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>

                  <div className="md:block hidden">Profile</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="md:hidden block mx-auto"
              variants={navChildVariant}
            >
              <div
                href="Bookmarks"
                className="navigation w-full"
                onClick={() => setShowModal(true)}
              >
                <div className="flex md:flex-row p-1 flex-col rounded-full bg-primary drop-shadow-2xl md:gap-5 gap-1 md:justify-normal justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="md:w-6 md:h-6 w-8 h-8 stroke-current text-gray-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div className="mx-auto" variants={navChildVariant}>
              <div
                className="navigation w-full"
                onClick={() => navigate("Bookmarks")}
              >
                <div className="flex md:flex-row p-1 flex-col md:gap-5 gap-1 md:justify-normal justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="md:w-6 md:h-6 w-8 h-8 stroke-current text-gray-800 dark:text-gray-50 hover:scale-110 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>

                  <div className="md:block hidden">Bookmarks</div>
                </div>
              </div>
            </motion.div>
            <motion.div className="mx-auto" variants={navChildVariant}>
              <div
                className="navigation w-full"
                onClick={() => navigate("Notifications")}
              >
                <div className="flex md:flex-row p-1 flex-col md:gap-5 gap-1 md:justify-normal justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="md:w-6 md:h-6 w-8 h-8 stroke-current text-gray-800 dark:text-gray-50 hover:scale-110 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>

                  <div className="md:block hidden">Notifications</div>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="flex flex-row gap-2"
            variants={navChildVariant}
          >
            <div
              className="md:block hidden shadow-lg mt-5 md:my-auto text-md text-white font-medium rounded bg-primary hover:bg-emerald-500 transition duration-200 mx-auto cursor-pointer text-center px-2 md:px-1.5 py-1.5"
              onClick={() => setShowModal(true)}
            >
              New Post
            </div>{" "}
            <motion.div
              className="py-2 mx-auto md:grid hidden items-center"
              variants={navChildVariant}
            >
              {colorTheme === "dark" ? (
                <button
                  className="mx-auto border-2 px-1.5 py-1.5 rounded-lg shadow-lg  bg-gray-900 hover:bg-gray-700 text-white  text-center transition-all duration-200"
                  onClick={changeThemeHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className="mx-auto border-2 px-1.5 py-1.5 rounded-lg bg-white text-gray-900 hover:bg-gray-100 shadow-lg text-center"
                  onClick={changeThemeHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                  </svg>
                </button>
              )}
            </motion.div>
          </motion.div>
          <div class="md:inline-flex block items-center text-base font-semibold text-white w-full">
            <button className="text-base w-full py-2 rounded-md hover:bg-red-600 bg-red-500  cursor-pointer transition duration-100" onClick={logoutHandler}>
              Log Out
            </button>
          </div>
        </nav>
        <motion.div
          class="md:block hidden py-3 sm:py-4"
          variants={navChildVariant}
        >
          <div class="flex md:flex-col flex-row md:items-center md:mx-auto mx-8 items-start mt-16">
            <div className="flex flex-col gap-2 md:mx-0 ml-5 md:items-center">
              <div class="flex-1 min-w-0">
                <img
                  src="/logo.png"
                  className="object-contain w-32 drop-shadow-lg dark:shadow-white"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
  
};
// };
export default SideBar;
