import { motion } from "framer-motion";
import { useState, useEffect,useRef, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { ThemeContext, UserContext } from "../App";
import axios from "axios";
import { topics } from "../constants/Interests";
import { toast } from "react-toastify";


export default function ChooseInterest() {
  let [activeTab, setActiveTab] = useState(tabs[0].id);
  
  const Tabs = () => {
    return (
        <div className="flex space-x-5 mt-5 justify-center">
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
      setHeader("Update your info");
      setText("Describe yourself for other users to know who you are");
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
            src="/favicon.ico"
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


const Interests = ({selectedInterest,setSelectedInterest}) => {
  // const [selected, setSelected] = useState([]);
  const toggleClass = (topicId) => {
    if (!selectedInterest.includes(topicId)) setSelectedInterest([...selectedInterest, topicId]);
    else
      setSelectedInterest((current) =>
        current.filter((id) => {
          return id !== topicId;
        })
      );
  };
  return (
    <div className="h-3/4 grid items-center ">
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
              selectedInterest.includes(topic.id)
                ? "border-primary border-2 text-primary"
                : "dark:border-white dark:text-white border-gray-400 border-2 text-gray-400 "
            } md:py-auto md:w-auto min-w-fit md:px-auto px-3 py-2 md:text-base text-xs py-auto md:h-20 fill-none text-center transition-colors duration-300 md:hover:bg-primary md:hover:border-primary md:hover:text-white hover:cursor-pointer grid items-center justify-center `}
          >
            {topic.name}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const Personal = ({bio,name,selectedProfileImage,coverImage, setBio,setName,setSelectedProfileImage,setCoverImage}) => {
  // const [bio, setBio] = useState('')
  // const [name,setName] = useState('')
  const profileImg = useRef(null)
  const coverImg = useRef(null)
  
  // const [selectedProfileImage, setSelectedProfileImage] = useState(null)
  // const [coverImage, setCoverImage] = useState(null)
  const profileImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedProfileImage(e.target.files[0]);
    }
  };
  const coverImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverImage(e.target.files[0]);
    }
  };
  return (
    <div className="h-3/4 grid items-center ">
      <label
        class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
        htmlFor="fname"
      >
        Full Name
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 dark:text-white dark:bg-gray-800 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="fname"
        type="text"
        maxLength={20}
        placeholder={"Write your full name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label
        class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
        htmlFor="bio"
      >
        A short bio about yourself
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 dark:text-white dark:bg-gray-800 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="bio"
        type="text"
        maxLength={20}
        placeholder={"Write your bio"}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <div class="w-full mt-5">
        <label
          class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
          htmlFor="image"
        >
          Profile Picture
        </label>
        <input
          class="hidden"
          id="profileImageChange"
          ref={profileImg}
          accept="image/*"
          type="file"
          onChange={profileImageChange}
        />
        <div className="mt-3 gap-5 flex flex-row justify-start mb-2 items-center">
          <img
            src={selectedProfileImage !== '' ? URL.createObjectURL(selectedProfileImage) : "/no_image.jpg"}
            className="w-32 h-32 rounded-lg object-center object-cover"
            alt="Profile Image"
          />
          <input
            className="bg-primary h-10 px-5 text-white dark:text-black rounded-lg shadow cursor-pointer"
            type="button"
            value="Change"
            onClick={(event) => profileImg.current.click()}
          />
        </div>
      </div>
      <div class="w-full mt-5">
        <label
          class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
          htmlFor="image"
        >
          Cover Picture
        </label>
        <input
          class="hidden"
          id="profileImageChange"
          ref={coverImg}
          accept="image/*"
          type="file"
          onChange={coverImageChange}
        />
        <div className="mt-3 gap-5 flex flex-col justify-start mb-2 items-center">
          <img
            src={coverImage !== '' ? URL.createObjectURL(coverImage) : "/no_cover_img.jpg"}
            className="h-64 w-full rounded-lg object-center object-cover"
            alt="Cover Image"
          />
          <input
            className="bg-primary h-10 px-5 text-white dark:text-black rounded-lg shadow cursor-pointer"
            type="button"
            value="Change"
            onClick={(event) => coverImg.current.click()}
          />
        </div>
      </div>
    </div>
  );
}

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState()
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { colorTheme } = useContext(ThemeContext) 
  useEffect(() => {
    
      const fetchData = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/suggestedUsers`,
        );
        setSuggestions(data);
      }
      fetchData().catch((err) => console.log(err));
    
  }, [currentUser])
  // console.log(suggestions)
  const handleFollow = async (suggestionId) => {
    const username = currentUser?.username
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/follow/${suggestionId}`,
        {
          username: username,
        }
      );
      toast.success(data.message, {
        position: "top-center",
        hideProgressBar: false,
        pauseOnHover: true,
        theme: colorTheme === "dark" ? "light" : "dark",
      });
      await setCurrentUser({ ...currentUser, followings:[...currentUser.followings,suggestionId] });
      
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
        theme: colorTheme === "dark" ? "dark" : "light",
      });
    }
    
  }
  const handleUnfollow = async (suggestionId) => {
    const username = currentUser?.username;
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/unfollow/${suggestionId}`,
        {
          username: username,
        }
      );
      await setCurrentUser({
        ...currentUser,
        followings: [...currentUser.followings, !suggestionId],
      });
      console.log(currentUser);
      toast.success(data.message, {
        position: "top-center",
        hideProgressBar: false,
        pauseOnHover: true,
        theme: colorTheme === "dark" ? "light" : "dark",
      });
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
        theme: colorTheme === "dark" ? "dark" : "light",
      });
    }
  };
  if (!suggestions) {
    return <div>Loading</div>
  }
  return (
    <div className="h-3/4 grid items-center ">
      <div class="flow-root overflow-y-auto h-80 p-2">
        <ul class="divide-y divide-gray-300 dark:divide-gray-700">
          {suggestions?.map((suggestion) => (
            <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img
                    class="w-16 h-16 object-cover object-center rounded-lg"
                    src={
                      suggestion?.profile_info.profile_picture === ""
                        ? "/no_image.jpg"
                        : suggestion.profile_info.profile_picture
                    }
                    alt=""
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {suggestion.username}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    {suggestion.email}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    Followers: {suggestion.followers.length}
                  </p>
                </div>
                <div
                  class={`inline-flex items-center text-base font-semibold ${
                    !currentUser?.followings.includes(suggestion.id)
                      ? "text-primary"
                      : "text-gray-400"
                  } `}
                >
                    {!currentUser?.followings.includes(suggestion.id) ? (
                      <button onClick={() => handleFollow(suggestion.id)}>
                        Follow
                      </button>
                    ) : (
                      <button onClick={() => handleUnfollow(suggestion.id)}>
                        Unfollow
                      </button>
                    )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

let tabs = [
  { id: "interests", label: "Interests" },
  { id: "personal1", label: "Personal1" },
  { id: "suggestions", label: "Suggestions" },
];

const ChooseInterests = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [selectedInterest, setSelectedInterest] = useState([])
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [selectedProfileImage, setSelectedProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const { currentUser } = useContext(UserContext);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append("bio", bio);
  //     formData.append("username", name);
  //     formData.append("profile_img", selectedProfileImage);
  //     formData.append("cover_img", coverImage);
  //     formData.append("interests", selectedInterest)
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/profile/${currentUser.id}`,
  //       formData
  //     );
  //     alert(data.message);
  //     setActiveTab(tabs[2].id);
  //   } catch (err) {
  //     alert(err.response.data.error);
  //   }
  // };

  const handleUpdateInfo = async () => {
    const {colorTheme} = useContext(ThemeContext)
    try {
      const formData = new FormData();
      formData.append("bio", bio);
      formData.append("name", name);
      formData.append("profile_img", selectedProfileImage);
      formData.append("cover_img", coverImage);
      formData.append("interests", JSON.stringify(selectedInterest));
      // alert(JSON.stringify(selectedInterest));
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/profile/${currentUser.id}`,
        formData
      );
      toast.success(data.message, {
        position: "top-center",
        hideProgressBar: false,
        pauseOnHover: true,
        theme: colorTheme === "dark" ? "light" : "dark",
      });
      setActiveTab(tabs[2].id);
    } catch (err) {
      toast.error(err.response.data.error, {
        position: "top-center",
        hideProgressBar:false,
        pauseOnHover: true,
        theme: colorTheme === "dark" ? "light" : "dark",
      });
    }
  }
  // choosing interests
  if (activeTab === tabs[0].id) {
    return (
      <div className="mt-5">
        <Interests
          activeTab={activeTab}
          selectedInterest={selectedInterest}
          setSelectedInterest={setSelectedInterest}
        />
        {activeTab === tabs[0].id ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => selectedInterest.length>=2 ? setActiveTab(tabs[1].id) : null}
            transition={{
              delay: topics.length * 0.15 + 0.2,
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 1,
                delay: 0,
              },
            }}
            className={`mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary focus:outline-none  ${
              selectedInterest.length < 2
                ? "cursor-default bg-gray-600"
                : "hover:bg-emerald-500 cursor-pointer"
            }`}
          >
            Next
          </motion.button>
        ) : null}
      </div>
    );
  } else if (activeTab === tabs[1].id) {
    return (
      <div className="mt-5">
        <Personal bio={bio} name={name} selectedProfileImage={selectedProfileImage} coverImage={coverImage} setBio={setBio} setName={setName} setSelectedProfileImage={setSelectedProfileImage} setCoverImage={setCoverImage}/>
        <div className="flex flex-row gap-5">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setActiveTab(tabs[0].id)}
            transition={{
              delay: 0.15 + 0.2,
            }}
            className="mb-10 mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-emerald-500 focus:outline-none  "
          >
            Previous
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={
              handleUpdateInfo
            }
            transition={{
              delay: 0.25 + 0.2,
            }}
            className="mb-10 mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-emerald-500 focus:outline-none  "
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
            className="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-emerald-500 focus:outline-none  "
          >
            Previous
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => {
              toast(" Let's Go !!!!!!!")
              navigate('/home')
            }}
            transition={{
              delay: 0.25 + 0.2,
            }}
            className="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-emerald-500 focus:outline-none  "
          >
            Let's Go
          </motion.button>
        </div>
      </div>
    );
  }
      
}