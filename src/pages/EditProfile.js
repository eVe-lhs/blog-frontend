import { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../App";
import axios from "axios";

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

const Interests = ({ selectedTags, setTags }) => {
  const [selected, setSelected] = useState([]);
  let selectedIds = [];
  selectedTags?.map((selectedTag) => {
    selectedIds.push(
      topics.findIndex((topic) => topic.id === selectedTag) + 1
    );
  });
  useEffect(() => {
    setSelected(selectedIds);
  }, [selectedTags]);
  // console.log(selected)
  const toggleClass = (topicId, topicName) => {
    // setTags([...selectedTags, topicName]);
    if (!selected.includes(topicId)) {
      setSelected([...selected, topicId]);
    } else
      setSelected((current) =>
        current.filter((id) => {
          return id !== topicId;
        })
      );
  };
  return (
    <div className="p-3 grid items-center">
      <label
        class="block uppercase font-body text-lg tracking-wide dark:text-white text-gray-700 font-bold mb-2"
        htmlFor="content"
      >
        Your Interests
      </label>
      <motion.div
        transition={{ duration: 0.3 }}
        className="md:grid md:grid-flow-row md:gap-2 gap-3 md:grid-cols-3 flex flex-wrap justify-start md:justify-center md:mt-0 my-auto p-5 flex-1 bg-gray-50 dark:bg-gray-800 shadow-md rounded-md"
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
              scale: selected.length < 3 ? 0.95 : 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 10,
                duration: 0.2,
              },
            }}
            onClick={() => toggleClass(topic.id, topic.name)}
            key={topic.id}
            className={`md:rounded-lg rounded-full ${
              selected.includes(topic.id)
                ? "border-primary border-2 text-primary"
                : "border-gray-400 border-2 text-gray-400"
            }
                md:hover:bg-primary md:hover:border-primary md:hover:text-white hover:cursor-pointer 
               md:w-auto md:px-1 md:py-2 p-2 md:text-base text-xs fill-none text-center transition-colors duration-300 
             grid items-center justify-center `}
          >
            {topic.name}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export const EditProfile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  //   const currentUser = {
  //     username: "linhtetswe",
  //     name:"Lin Htet Swe",
  //       email:'linhtetswe@email.com',
  //     bio: "This is the bio",
  //     profilePicture:
  //       "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
  //     coverPicture:
  //       "https://images.unsplash.com/photo-1526512340740-9217d0159da9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  //     Interests: [1,2,3]
  // };
  // const [interests, setInterests] = useState(currentUser.Interests);
  const [username,setUsername] = useState(currentUser?.username)
    const [name, setName] = useState(currentUser?.profile_info.name)
    const [bio, setBio] = useState(currentUser?.profile_info.bio)
    const [selectedProfileImage, setSelectedProfileImage] = useState(currentUser?.profile_info.profile_picture);
    const [coverPicture, setCoverPicture] = useState(
      currentUser?.profile_info.cover_photo
  );
  const [profileFile, setProfileFile] = useState('')
  const [coverFile,setCoverFile] = useState('')
    const [email,setEmail] = useState(currentUser?.email)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [interests, setIntersts] = useState(currentUser?.interests)
  // console.log(currentUser)

  const handleUpdateInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("bio", bio);
      formData.append("name", name);
      formData.append("profile_img", profileFile);
      formData.append("cover_img", coverFile);
      formData.append("interests", JSON.stringify(interests));
      // alert(JSON.stringify(selectedInterest));
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/profile/${currentUser.id}`,
        formData
      );
      alert(data.message);
      window.location.reload();
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  let goodPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(false);
  useEffect(() => {
    if (goodPassword.test(newPassword) === true ){
      setPasswordStrength(true);
    } else if (goodPassword.test(newPassword) === false ){
      setPasswordMatch(false);
    }
    if (newPassword !== confirmPassword) {
      document.getElementById("newpassword").classList.add("border-red-500");
      document
        .getElementById("confirmpassword")
        .classList.add("border-red-500");
      setPasswordMatch(false);
    } else if (newPassword === confirmPassword) {
      document.getElementById("newpassword").classList.remove("border-red-500");
      document
        .getElementById("confirmpassword")
        .classList.remove("border-red-500");
      setPasswordMatch(true);
    }
  }, [newPassword,confirmPassword, passwordStrength]);
  const handleAuth = async () => {
    try {
      const formData = new FormData();
      formData.append("newPassword", newPassword);
      formData.append("currentPassword",currentPassword)
      formData.append("email", email);
      // alert(JSON.stringify(selectedInterest));
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/profile/${currentUser.id}/changePassword`,
        formData
      );
      alert(data.message);
      setNewPassword('')
      setCurrentPassword('')
      setConfirmPassword('')
    } catch (err) {
      alert(err.response.data.error);
    }
  };

    const profileImg = useRef(null)
    const coverImg = useRef(null)

    // useEffect(() => {
    //    setImgUrl(
    //      selectedProfileImage
    //        ? URL.createObjectURL(selectedProfileImage)
    //        : modalData?.imageUrl
    //    );
    //  }, [selectedImage, modalData, showModal]);
     // console.log(imgDom)
     // This function will be triggered when the file field change
     const profileImageChange = (e) => {
       if (e.target.files && e.target.files.length > 0) {
         setSelectedProfileImage(URL.createObjectURL(e.target.files[0]));
         setProfileFile(e.target.files[0])
       }
    };
    const coverPictureChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          setCoverPicture(URL.createObjectURL(e.target.files[0]));
          setCoverFile(e.target.files[0])
        }
    }
    return (
      <div className="md:w-3/5 w-full lg:ml-96 md:mt-10 mt-20 md:p-0 p-1">
        <h1 className="font-bold font-body text-xl">User Settings</h1>
        <div className="w-full mt-5 flex md:flex-row flex-col gap-2">
          <div className="p-5 flex-1 bg-gray-50 dark:bg-gray-800 shadow-md rounded-md">
            <h1 className="font-bold font-body text-lg">General Settings</h1>
            <div class="w-full mt-5">
              <label
                class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                htmlFor="title"
              >
                Username (Name to be displayed)
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 dark:text-white dark:bg-gray-800 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="title"
                type="text"
                maxLength={20}
                placeholder={"Write the username"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div class="w-full mt-5">
              <label
                class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                htmlFor="title"
              >
                Name
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 dark:text-white dark:bg-gray-800 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="title"
                type="text"
                maxLength={20}
                placeholder={"Write the name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="w-full mt-5">
              <label
                class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                htmlFor="title"
              >
                Bio
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 dark:text-white dark:bg-gray-800 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="title"
                type="text"
                maxLength={100}
                placeholder="Write the bio"
                value={bio}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                  src={selectedProfileImage}
                  className="w-32 h-32 rounded-lg"
                  alt="Thumb"
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
                onChange={coverPictureChange}
              />
              <div className="mt-3 gap-5 flex flex-col justify-start mb-2 items-center">
                <img
                  src={coverPicture}
                  className="w-full rounded-lg"
                  alt="Thumb"
                />
                <input
                  className="bg-primary h-10 px-5 text-white dark:text-black rounded-lg shadow cursor-pointer"
                  type="button"
                  value="Change"
                  onClick={(event) => coverImg.current.click()}
                />
              </div>
            </div>
            <div
              onClick={handleUpdateInfo}
              className="mt-10 w-full py-4 rounded-lg shadow bg-blue-400 text-center font-bold font-body text-white cursor-pointer"
            >
              Submit Changes
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="p-5 bg-gray-50 dark:bg-gray-800 shadow-md rounded-md">
              <Interests selectedTags={interests} />
            </div>
            <div className="p-5 bg-gray-50 dark:bg-gray-800 shadow-md rounded-md">
              <h1 className="font-bold font-body text-lg">
                Authentication Settings
              </h1>{" "}
              <div class="w-full mt-5">
                <label
                  class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                  htmlFor="title"
                >
                  Email
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 dark:text-white dark:bg-gray-800 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="title"
                  type="text"
                  placeholder={"Write the username"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="w-full mt-5">
                <label
                  class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                  htmlFor="title"
                >
                  Current Password
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 dark:text-white dark:bg-gray-800 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="currentpassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div class="w-full mt-5">
                <label
                  class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                  htmlFor="title"
                >
                  New Password
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 dark:text-white dark:bg-gray-800 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="newpassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div class="w-full mt-5">
                <label
                  class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                  htmlFor="title"
                >
                  Confirm Password
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 dark:text-white dark:bg-gray-800 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="confirmpassword"
                  type="password"
                  maxLength={20}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {newPassword === "" ? (
                <></>
              ) : passwordStrength ? (
                <></>
              ) : (
                <div className="mt-2 text-red-500">
                  Password must contain at least 8 letters: <br/> at least a capital
                  letter, a small letter and a symbol.
                </div>
              )}
              {confirmPassword === "" ? (
                <></>
              ) : passwordMatch ? (
                <div className="mt-2 text-green-500">
                  Passwords are OK &#9989;
                </div>
              ) : (
                <div className="mt-2 text-red-500">Passwords Do Not Match</div>
              )}
              <div className={`${passwordMatch && passwordStrength ? 'bg-blue-500' : 'bg-gray-400'} mt-10 w-full py-4 rounded-lg shadow  text-center font-bold font-body text-white cursor-pointer`}
                onClick={() => {
                  if (passwordMatch && passwordStrength)
                    handleAuth()
                  else
                    alert("Fix the problems first")
              }}>
                Submit Changes
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}