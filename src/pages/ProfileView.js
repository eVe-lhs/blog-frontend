import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { ContentCard } from "../components/ContentCard";
import { TempData } from "../TempData";
import { SmallProfile } from "../components/SmallProfile";
import { DraftPosts } from "../components/DraftPosts";
import { UserContext } from "../App";
export default function ProfileView({setShowModal,setModalData}) {
  const [activeTab, setActiveTab] = useState("articles");
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [user,setUser] = useState()
  const {uid} = useParams()
  useEffect(() => {
    if (currentUser?.id === uid) {
      setUser(currentUser)
    }
},[uid])
  // const currentUser = {
  //   username: "linhtetswe",
  //   name: "Lin Htet Swe",
  //   email: "linhtetswe@email.com",
  //   bio: "This is the bio",
  //   profilePicture:
  //     "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
  //   coverPicture:
  //     "https://images.unsplash.com/photo-1526512340740-9217d0159da9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  // };
  if (user) {
    return (
      <div className="relative md:mt-0 mt-20 z-0 font-body">
        <motion.div
          className="md:w-3/5 w-full lg:ml-96 md:mt-10 "
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
          <div className="md:w-full max-h-96 w-screen relative mb-10">
            <img
              className="object-cover w-full md:h-80 h-52 object-center rounded-b-xl md:rounded-t-none rounded-t-xl"
              src={user.profile_info.cover_photo}
            />
            <div class="flex flex-col md:flex-row gap-2">
              <img
                class="md:w-40 md:h-40 w-32 h-32 border-2 object-cover object-center border-gray-200 dark:border-gray-800 rounded-full md:mx-0 mx-auto -translate-y-2/3"
                src={user.profile_info.profile_picture}
                alt=""
              />
              <div className="mx-auto text-lg font-header font-bold md:ml-0 -mt-20 md:mt-2 flex flex-col">
                <div className="md:text-left text-center flex flex-row gap-4 md:justify-normal justify-center">
                  <div>
                    {user.username}{" "}
                    <span className="text-gray-500 font-normal">
                      ({user.profile_info.name})
                    </span>
                  </div>
                  {/* follow icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 hover:cursor-pointer hover:scale-105"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                  {/* edit icon */}
                  <Link to="edit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer hover:scale-105"
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
                  </Link>
                </div>
                <div className=" font-normal md:divide-x-0 divide-x text-sm flex flex-row mt-2 md:text-left text-center">
                  <div className="flex md:flex-row gap-1 flex-col md:pr-2 md:pl-0 px-4">
                    <span className="font-bold">100 </span>
                    <span className="text-gray-400">Followers</span>
                  </div>
                  <div className="flex md:flex-row gap-1 flex-col md:pr-2 md:pl-0 px-4">
                    <span className="font-bold">100 </span>
                    <span className="text-gray-400">Followings</span>
                  </div>
                  <div className="flex md:flex-row gap-1 flex-col md:pr-2 md:pl-0 px-4">
                    <span className="font-bold">100 </span>
                    <span className="text-gray-400">Posts</span>
                  </div>
                </div>
                <div className="md:text-left text-center mt-5 text-lg">
                  {user.profile_info.bio}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabContents
              activeTab={activeTab}
              setShowModal={setShowModal}
              setModalData={setModalData}
            />
          </div>
        </motion.div>
      </div>
    );
  }
  else {
    return (<div>Loading</div>)
  }
}

const Tabs = ({activeTab,setActiveTab}) => {
  return (
    <div class="text-xs md:text-lg font-medium font-body text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul class="flex justify-evenly -mb-px text-center">
        <li class="md:mr-2 mr-1">
          <a
            href="#"
            onClick={() => setActiveTab("articles")}
            class={`${
              activeTab === "articles"
                ? "border-primary border-b-2 text-primary hover:text-primary hover:border-primary"
                : "hover:text-gray-600 border-gray-300 dark:border-gray-700 hover:border-gray-300 dark:hover:text-gray-300"
            } inline-block md:p-4 py-4 px-1 border-b-2  rounded-t-lg `}
          >
            Articles
          </a>
        </li>
        <li class="mr-2">
          <a
            href="#"
            onClick={() => setActiveTab("followers")}
            class={`${
              activeTab === "followers"
                ? "border-primary text-primary hover:text-primary hover:border-primary"
                : "hover:text-gray-600 border-gray-300 dark:border-gray-700  hover:border-gray-300 dark:hover:text-gray-300"
            } inline-block p-4  border-b-2  rounded-t-lg`}
            aria-current="page"
          >
            Followers
          </a>
        </li>
        <li class="mr-2">
          <a
            href="#"
            onClick={() => setActiveTab("followings")}
            class={`${
              activeTab === "followings"
                ? "border-primary text-primary hover:text-primary hover:border-primary"
                : "hover:text-gray-600  border-gray-300 dark:border-gray-700 hover:border-gray-300 dark:hover:text-gray-300"
            } inline-block p-4  border-b-2 rounded-t-lg`}
          >
            Followings
          </a>
        </li>
        <li class="mr-2">
          <a
            href="#"
            onClick={() => setActiveTab("draft")}
            class={`${
              activeTab === "draft"
                ? "border-primary text-primary hover:text-primary hover:border-primary"
                : "hover:text-gray-600 border-gray-300 dark:border-gray-700 hover:border-gray-300 dark:hover:text-gray-300"
            } inline-block p-4  border-b-2  rounded-t-lg`}
          >
            Drafts
          </a>
        </li>
      </ul>
    </div>
  );

}

const TabContents = ({activeTab,setShowModal,setModalData}) => {
  if (activeTab === 'articles') {
    {
      return (
      TempData.map((data) => (
        <ContentCard
          id={data.id}
          heading={data.heading}
          imageUrl={data.imageUrl}
          date={data.date}
          text={data.text}
          tags={data.tags}
          author={data.author}
          profile={true}
          self = {true}
        />
      )))
    }
  }
  else if (activeTab === 'followers')
    return (
      <div className="mt-5">
        <SmallProfile type="followers" />
      </div>
    );
  else if (activeTab === 'followings')
    return (
      <div className="mt-5">
        <SmallProfile type="followings" />
      </div>
    )
  else
    return <DraftPosts setShowModal={setShowModal} setModalData={setModalData} />
}


