import { motion } from "framer-motion";
import { useState,useEffect } from "react";

export default function ChooseInterest() {
  let [activeTab, setActiveTab] = useState(tabs[0].id);
  const Tabs = () => {
    return (
      
        <div className="flex space-x-5 mt-2 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id ? "" : "bg-gray-400"
              } relative flex-auto w-20 rounded-full px-3 py-1 text-sm font-medium  outline-sky-400 transition focus-visible:outline-2`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-gray-800 mix-blend-difference"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
   
    );
  };
  const [header, setHeader] = useState()
  const [text, setText] = useState()
  
  useEffect(() => {
    if (activeTab === tabs[0].id) {
      setHeader("Let's Dive into Your Interests");
      setText("Select at least 2 topics from the followings:");
    } else if (activeTab === tabs[1].id) {
      setHeader("Update in some of your personal info");
      setText("This let people know who you are and recongnized much easier");
    } else{
      setHeader("Here are some people you might want to follow");
      setText("These people are actively sharing vast amount of knowledge in their respective areas");
    }
  },[header,text,activeTab])
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className="w-full h-screen"
    >
      <div className="mb-10 mt-16">
        <div className="flex justify-center">
          <img
            alt=""
            className="h-14 w-14"
            src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
          />
        </div>
        <Tabs />
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            {header}
          </h2>
          <p className="text-center text-sm text-gray-600 mt-5">{text}</p>
        </div>
        <ChooseInterests activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
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

const Interests = () => {
  const [selected, setSelected] = useState([]);
  const toggleClass = (topicId) => {
    if (!selected.includes(topicId)) setSelected([...selected, topicId]);
    else
      setSelected((current) =>
        current.filter((id) => {
          return id !== topicId;
        })
      );
  };
  return (
    <div className="h-3/4 grid items-center">
      <motion.div
        transition={{ duration: 0.3 }}
        className="md:grid md:grid-flow-row md:gap-4 gap-3 md:grid-cols-4 flex flex-wrap justify-start md:justify-center md:h-72 md:mt-0 my-auto"
        exit={{ opacity: 0 }}
      >
        {topics.map((topic) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                type: "tween",
                stiffness: 200,
                damping: 20,
                delay: topic.id * 0.15,
              },
            }}
            exit={{
              opacity: 0,
              y: 10,
              transition: {
                type: "tween",
                stiffness: 200,
                damping: 20,
                delay: topic.id * 0.15,
              },
            }}
            whileTap={{
              scale: 0.95,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 10,
                duration: 0.2,
              },
            }}
            onClick={() => toggleClass(topic.id)}
            key={topic.id}
            className={`md:rounded-lg rounded-full ${
              selected.includes(topic.id)
                ? "border-primary border-2 text-primary"
                : "border-gray-400 border-2 text-gray-400"
            } md:py-auto md:w-auto min-w-fit md:px-auto px-3 py-2 md:text-base text-xs py-auto md:h-20 fill-none text-center transition-colors duration-300 md:hover:bg-primary md:hover:border-primary md:hover:text-white hover:cursor-pointer grid items-center justify-center `}
          >
            {topic.name}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const Personal = () => {
  return <div className="h-3/4 grid items-center "></div>;
}

const Suggestions = () => {
  return <div className="h-3/4 grid items-center "></div>;
}

let tabs = [
  { id: "interests", label: "Interests" },
  { id: "personal1", label: "Personal1" },
  { id: "suggestions", label: "Suggestions" },
];

const ChooseInterests = ({activeTab,setActiveTab}) => {
  // choosing interests
  if (activeTab === tabs[0].id) {
    return (
      <div className="mt-5">
        <Interests activeTab={activeTab} />
          {activeTab === tabs[0].id ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setActiveTab(tabs[1].id)}
              transition={{
                delay: topics.length * 0.15 + 0.2,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 1,
                  delay:0
              }}}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary_assent hover:bg-secondary_assent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary_assent mt-5"
            >
              Next
            </motion.button>
          ): null}
        
      </div>
    );
  } else if (activeTab === tabs[1].id) {
    return (
      <div className="mt-5">
        <Personal />
        <div className="flex flex-row gap-5">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setActiveTab(tabs[0].id)}
            transition={{
              delay: 0.15 + 0.2,
            }}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary_assent hover:bg-secondary_assent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary_assent"
          >
            Previous
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setActiveTab(tabs[2].id)}
            transition={{
              delay: 0.25 + 0.2,
            }}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary_assent hover:bg-secondary_assent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary_assent"
          >
            Next
          </motion.button>
        </div>
      </div>
    );
  } else{
    return (
      <div className="mt-5">
        <Suggestions />
        <div className="flex flex-row gap-5">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setActiveTab(tabs[1].id)}
            transition={{
              delay: 0.15 + 0.2,
            }}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary_assent hover:bg-secondary_assent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary_assent"
          >
            Previous
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => window.alert("Let's go")}
            transition={{
              delay: 0.25 + 0.2,
            }}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary_assent hover:bg-secondary_assent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary_assent"
          >
            Let's Go
          </motion.button>
        </div>
      </div>
    );
  }
      
}