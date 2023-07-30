import React, { useState } from "react";
import { motion } from "framer-motion";

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

const SideBar = ({ data, setTheme, colorTheme }) => {
  const [open, setOpen] = useState(false);
  const toggleSidebar = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  // if (loading) {
  //   return null;
  // } else {
  return (
    <>
      <div className="lg:hidden block fixed z-50 w-screen">
        <div
          className="m-5 float-right w-5 h-5 flex flex-col gap-5 relative"
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
            className="origin-center w-full h-1/5 bg-black dark:bg-white rounded-sm"
          />
          <motion.div
            initial={false}
            animate={
              open
                ? {
                    scaleX: 0,
                    translateX: -15,
                  }
                : { scaleX: 1, translateX: 0 }
            }
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="origin-center w-full h-1/5 bg-black dark:bg-white rounded-sm"
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
            className="origin-center w-full h-1/5 bg-black dark:bg-white rounded-sm"
          />
        </div>
      </div>

      <motion.aside
        href="/"
        className={`lg:w-64 md:w-1/4 w-2/3 pt-5 px-4 fixed inset-y-0 mr-5  transform z-50 lg:h-screen overflow-y-auto ${
          !open ? "-translate-x-full" : ""
        }   lg:translate-x-0  transition duration-500 ease-out bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white shadow-xl border-r border-r-gray-300`}
        variants={variant}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col items-center text-center justify-center space-x-2 px-4"
          variants={navChildVariant}
        >
          <div className="relative h-32 w-32 rounded-full">
            <img
              alt="lin htet swe"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/2048px-BMW_logo_%28gray%29.svg.png"
              className="rounded-full object-fill"
            />
          </div>
          <div className="mt-5">
            <p className="text-bold text-2xl font-head font-thin">
              Lin Htet Swe
            </p>
            <p className="text-sm  font-light font-body">
              A student and web-developer
            </p>
          </div>
        </motion.div>

        <nav className="mx-auto w-36 font-light space-y-0 mt-6 font-body">
          <motion.div className="mx-auto" variants={navChildVariant}>
            <div
              href="/skills"
              className="navigation w-full"
              onClick={toggleSidebar}
            >
              <div className="flex flex-row gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>

                <div>Home</div>
              </div>
            </div>
          </motion.div>
          <motion.div className="mx-auto" variants={navChildVariant}>
            <div
              href="/skills"
              className="navigation w-full"
              onClick={toggleSidebar}
            >
              <div className="flex flex-row gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>

                <div>Profile</div>
              </div>
            </div>
          </motion.div>
          <motion.div className="mx-auto" variants={navChildVariant}>
            <div
              href="/skills"
              className="navigation w-full"
              onClick={toggleSidebar}
            >
              <div className="flex flex-row gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>

                <div>Bookmarks</div>
              </div>
            </div>
          </motion.div>
          <motion.div className="mx-auto" variants={navChildVariant}>
            <div
              href="/skills"
              className="navigation w-full"
              onClick={toggleSidebar}
            >
              <div className="flex flex-row gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <div>Gallery</div>
              </div>
            </div>
          </motion.div>
          <motion.div className="mx-auto" variants={navChildVariant}>
            <div
              href="/skills"
              className="navigation w-full"
              onClick={toggleSidebar}
            >
              <div className="flex flex-row gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <div>Settings</div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={navChildVariant}>
            <div
              href="/contact"
              className="shadow-lg text-white font-bold rounded bg-primary hover:scale-105 transition duration-200 mx-auto cursor-pointer text-center mt-4 px-2 w-24 py-2"
              onClick={toggleSidebar}
            >
              New Post
            </div>
          </motion.div>
        </nav>
      </motion.aside>
    </>
  );
};
// };
export default SideBar;
