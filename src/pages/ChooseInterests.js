import Header from "../components/Header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

const topics = [
  {
    id: 1,
    name: "Science",
    active: "false",
  },
  {
    id: 2,
    name: "Sports",
    active: "false",
  },
  {
    id: 3,
    name: "Music",
    active: "false",
  },
  {
    id: 4,
    name: "Movies",
    active: "false",
  },
  {
    id: 5,
    name: "Computer Science",
    active: "false",
  },
  {
    id: 6,
    name: "AI",
    active: "false",
  },
  {
    id: 7,
    name: "Agriculture",
    active: "false",
  },
  {
    id: 8,
    name: "Medical Science",
    active: "false",
  },
  {
    id: 9,
    name: "Celebrity",
    active: "false",
  },
  {
    id: 10,
    name: "Politics",
    active: "false",
  },
  {
    id: 11,
    name: "Animals",
    active: "false",
  },
  {
    id: 12,
    name: "Natural Disasters",
    active: "false",
  },
];

const ChooseInterests = () => {
    const [selected, setSelected] = useState([])
    const toggleClass = (topicId) => {
        if (!selected.includes(topicId)) setSelected([...selected, topicId])
        else setSelected(current => current.filter(id => {return id !== topicId}))
        console.log(selected)
    }
      return (
        <div className="mt-5 ">
          <motion.div
            layout
            transition={{ duration: 0.3 }}
            className="grid grid-flow-row gap-4 grid-cols-4 justify-center"
          >
                  {topics.map((topic) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => toggleClass(topic.id)}
                transition={{
                  type: "tween",
                  stiffness: 200,
                  damping: 20,
                  delay: topic.id * 0.15,
                }}
                key={topic.id}
                id={topic.id}
                className={`rounded-lg ${
                    selected.includes(topic.id)
                    ? "border-red-500 border-2 text-red-500"
                    : "border-red-300 border"
                } py-2 fill-none text-center transition-colors duration-300 hover:bg-red-500 hover:text-white hover:cursor-pointer grid items-center justify-center `}
              >
                {topic.name}
              </motion.div>
            ))}
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: topics.length * 0.15 + 0.2,
            }}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          >
            Next
          </motion.button>
        </div>
      );
}