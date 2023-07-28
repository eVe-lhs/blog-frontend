import Header from "../components/Header";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ChooseInterest() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <div className="mb-10">
        <div className="flex justify-center">
          <img
            alt=""
            className="h-14 w-14"
            src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Let's Dive into Your Interests
        </h2>
        <p className="text-center text-sm text-gray-600 mt-5">
          Select at least 2 topics from the followings: 
        </p>
      </div>
      <ChooseInterests />
    </motion.div>
  );
}
const ChooseInterests = () => {
    const topics = []
    const [selected,setSelected] = useState([])
    console.log(selected)
    for (let i = 0; i < 16; i++){
         topics.push(
           <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 onClick={() => setSelected}
                 transition={{
                     type: "tween",
                     stiffness: 200,
                     damping: 20,
                     delay: (i + 1) * 0.15
                 }}
                 className={` rounded-lg py-2 fill-none text-center border transition-colors duration-300 border-red-300 hover:bg-red-500 hover:text-white hover:cursor-pointer`}
           >
             Technology
           </motion.div>
         );
    }
      return (
        <div className="mt-5 ">
          <motion.div
            layout
            transition={{ duration: 0.3 }}
            className="grid grid-flow-row gap-4 grid-cols-4 justify-center"
          >
            {topics}
          </motion.div>
          <motion.button
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{
              delay: 15 * 0.15 + 0.2,
            }}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          >
            Next
          </motion.button>
        </div>
      );
}