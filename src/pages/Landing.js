import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/auth/login");
  };

  const goSignUp = () => {
    navigate("/auth/signup");
  };
  return (
    <div className="h-screen relative bg-gray-100 ">
      <img
        src="/logo.png"
        className="fixed object-contain md:mx-52 mx-8 my-5 w-24 md:w-32 drop-shadow-lg dark:shadow-white "
      />
      <div class="custom-shape-divider-bottom-1690780652">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.5,
            }}
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            class="shape-fill origin-bottom"
          ></motion.path>
          <motion.path
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.75,
            }}
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            class="shape-fill origin-bottom"
          ></motion.path>
          <motion.path
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 1,
            }}
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            class="shape-fill origin-bottom"
          ></motion.path>
        </svg>
      </div>
      <div className="h-screen flex flex-row justify-between md:mx-52 items-center">
        <div className="text-3xl flex flex-col gap-5 mx-auto md:w-2/3 w-4/5">
          <motion.div
            className="md:text-5xl text-3xl font-bold text-green-900 font-header md:text-left text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                type: "tween",
                stiffness: 200,
                damping: 20,
                delay: 0.1,
              },
            }}
          >
            Crafting Conversations Through Content
          </motion.div>
          <motion.div
            className="md:block hidden text-lg font-bold text-green-700 font-body md:text-left text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                type: "tween",
                stiffness: 200,
                damping: 20,
                delay: 0.2,
              },
            }}
          >
            At <span className="text-primary">leaflet</span>, we're passionate about sharing knowledges.
            Our blog is your portal to a world of insights, expertise, and
            captivating stories.
          </motion.div>
          <motion.div className="flex flex-row gap-3 text-lg text-white md:justify-normal justify-center">
            <motion.button
              className="py-2 md:px-7 px-3 font-body border-primary text-primary border-2 rounded-md shadow-md"
              onClick={goLogin}
              initial={{ opacity: 0, y: 10 }}
              whileHover={{
                y: -3,
                transition: {
                  type: "tween",
                  stiffness: 50,
                  damping: 5,
                  duration: 0.1,
                },
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "tween",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.3,
                },
              }}
            >
              Login
            </motion.button>
            <motion.button
              className="py-2 px-3 md:px-7 font-body hover:opacity-95 bg-primary rounded-md shadow-md"
              onClick={goSignUp}
              initial={{ opacity: 0, y: 10 }}
              whileHover={{
                y: -3,
                transition: {
                  type: "tween",
                  stiffness: 50,
                  damping: 5,
                  duration: 0.1,
                },
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "tween",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.4,
                },
              }}
            >
              Sign Up
            </motion.button>
          </motion.div>
        </div>
        <motion.div
          className="md:block hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              type: "tween",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            },
          }}
        >
          <img alt="" className="h-1/2" src="/landing vector.png" />
        </motion.div>
      </div>
    </div>
  );
}
