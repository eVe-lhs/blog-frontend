import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleSidebar = (e,path) => {
    e.preventDefault();
    navigate(path);
    setOpen(!open);
  };
  // if (loading) {
  //   return null;
  // } else {
  return (
    <>
      <div className="lg:hidden block relative z-50 w-screen">
        <div
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
        </div>
      </div>

      <motion.aside
        href="/"
        className={`lg:w-64 md:w-1/4 w-full md:pt-5 pt-10 px-4 fixed z-20 inset-y-0 mr-5 transform lg:h-screen overflow-y-auto ${
          !open ? "-translate-x-full" : ""
        }   lg:translate-x-0  transition duration-500 ease-out md:bg-gray-200 bg-white font-body text-gray-800 dark:bg-gray-800 dark:text-white shadow-xl border-r border-r-gray-300`}
        variants={variant}
        initial="hidden"
        animate="visible"
      >
        <motion.div class="py-3 sm:py-4" variants={navChildVariant}>
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
                  Lin Htet Swe
                </p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-white">
                <button className="text-xs p-2 rounded-md hover:bg-red-600 bg-red-500  cursor-pointer transition duration-100">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <nav
          nav
          className="md:mx-auto mx-8 md:w-36 font-thin space-y-0 mt-6 md:text-lg text-xl"
        >
          <motion.div className="mx-auto" variants={navChildVariant}>
            <a
              href="/home"
              className="navigation w-full"
              onClick={(e) => toggleSidebar(e, "/home")}
            >
              <div className="flex flex-row gap-5 md:justify-normal justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="w-6 h-6 stroke-current text-blue-500 hover:scale-110 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>

                <div>Home</div>
              </div>
            </a>
          </motion.div>
          <motion.div className="mx-auto" variants={navChildVariant}>
            <a
              href="/Profile"
              className="navigation w-full"
              onClick={(e) => toggleSidebar(e, "./Profile")}
            >
              <div className="flex flex-row gap-5 md:justify-normal justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-current text-yellow-500 hover:scale-110 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>

                <div>Profile</div>
              </div>
            </a>
          </motion.div>
          <motion.div className="mx-auto" variants={navChildVariant}>
            <a
              href="/Bookmarks"
              className="navigation w-full"
              onClick={(e) => toggleSidebar(e, "./Bookmarks")}
            >
              <div className="flex flex-row gap-5 md:justify-normal justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-current text-green-500 hover:scale-110 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>

                <div>Bookmarks</div>
              </div>
            </a>
          </motion.div>
          <motion.div className="mx-auto" variants={navChildVariant}>
            <a
              href="/Gallery"
              className="navigation w-full"
              onClick={(e) => toggleSidebar(e, "./Gallery")}
            >
              <div className="flex flex-row gap-5 md:justify-normal justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-current text-red-500 hover:scale-110 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <div>Gallery</div>
              </div>
            </a>
          </motion.div>
          <motion.div
            className="flex flex-row gap-2"
            variants={navChildVariant}
          >
            <div
              className="shadow-lg mt-5 md:my-auto text-md text-white font-medium rounded bg-primary hover:scale-105 transition duration-200 mx-auto cursor-pointer text-center px-2 md:px-1.5 py-1.5"
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
        </nav>
      </motion.aside>
    </>
  );
};
// };
export default SideBar;
