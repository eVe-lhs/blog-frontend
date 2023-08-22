import { motion } from "framer-motion";
import moment from "moment";
import { useState } from "react";

const TempNoti = [
  {
    user: "John",
    type: "follow",
    profileImg:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
    postImg:
      "https://img.freepik.com/free-vector/isometric-people-working-with-technology_52683-19078.jpg",
  },
  {
    user: "May",
    type: "comment",
    profileImg:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
    postImg:
      "https://img.freepik.com/free-vector/isometric-people-working-with-technology_52683-19078.jpg",
  },
  {
    user: "July",
    type: "like",
    profileImg:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
    postImg:
      "https://img.freepik.com/free-vector/isometric-people-working-with-technology_52683-19078.jpg",
  },
  {
    user: "Terry",
    type: "like",
    profileImg:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
    postImg:
      "https://img.freepik.com/free-vector/isometric-people-working-with-technology_52683-19078.jpg",
  },
  {
    user: "Mon",
    type: "follow",
    profileImg:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
    postImg:
      "https://img.freepik.com/free-vector/isometric-people-working-with-technology_52683-19078.jpg",
  },
  {
    user: "Josh",
    type: "like",
    profileImg:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
    postImg:
      "https://img.freepik.com/free-vector/isometric-people-working-with-technology_52683-19078.jpg",
  },
  {
    user: "Ken",
    type: "comment",
    profileImg:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
    postImg:
      "https://img.freepik.com/free-vector/isometric-people-working-with-technology_52683-19078.jpg",
  },
  {
    user: "Barbie",
    type: "comment",
    profileImg:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
    postImg:
      "https://img.freepik.com/free-vector/isometric-people-working-with-technology_52683-19078.jpg",
  },
];

export default function Notifications() {
  const [notiTab, setNotiTab] = useState('all')
  return (
    <div className="md:mt-5 mt-14 relative z-0 font-body ">
      <motion.div
        className="md:w-5/12 w-full mx-auto mt-10"
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
        <div className="text-3xl font-bold font-body">Notifications</div>
        <div className="flex flex-row gap-10 text-lg font-body mt-10">
          <div
            className={`${notiTab === "all" && "underline"} cursor-pointer`}
            onClick={() => setNotiTab("all")}
          >
            All
          </div>
          <div
            className={`${notiTab === "comment" && "underline"} cursor-pointer`}
            onClick={() => setNotiTab("comment")}
          >
            Comments
          </div>
          <div
            className={`${
              notiTab === "followers" && "underline"
            } cursor-pointer`}
            onClick={() => setNotiTab("followers")}
          >
            Followers
          </div>
          <div
            className={`${notiTab === "likes" && "underline"} cursor-pointer`}
            onClick={() => setNotiTab("likes")}
          >
            Likes
          </div>
        </div>
        <div className="mt-5 w-full flex flex-col gap-4">
          {TempNoti.map((notification) => (
            <NotificationCard
              type={notification.type}
              user={notification.user}
              profileImg={notification.profileImg}
              postImg={notification.postImg}
            />
          ))}
        </div>
      </motion.div>
      <RightBar />
    </div>
  );
}

const NotificationCard = ({ type, user, profileImg, postImg }) => {
  let notiString = ''
  if (type === 'follow') notiString = 'has followed you.'
  else if (type === 'like') notiString = 'has liked your post.'
  else notiString = 'has commented on your post.'
  return (
    <div className="bg-white w-full px-4 py-4 rounded border dark:bg-gray-800 shadow-lg hover:brightness-95 cursor-pointer">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-start gap-4">
          <img src={profileImg} className="w-12 h-12 rounded-full" />
          <div className="flex flex-col justify-between">
            <span className="text-gray-400 text-xs">
              {moment("22 June, 2023").fromNow()}
            </span>
            <span>
              {user} {notiString}
            </span>
          </div>
        </div>
        <img src={postImg} className="w-12"/>
      </div>
    </div>
  );
  
}

const suggestions = [
  {
    name: "John",
    email: "john@email.com",
    imageUrl: "",
  },
  {
    name: "ken",
    email: "ken@email.com",
    imageUrl: "",
  },
  {
    name: "anwar",
    email: "anwar@email.com",
    imageUrl: "",
  },
  {
    name: "John",
    email: "john@email.com",
    imageUrl: "",
  },
];

const RightBar = () => {
  return (
    <div
      className={`right-0 fixed lg:w-80 md:w-1/4 md:block hidden pt-5 px-4 inset-y-0 transform lg:h-screen overflow-y-autolg:translate-x-0  transition duration-500 ease-out bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white shadow-xl border-r border-r-gray-300`}
    >
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-normal font-bold leading-none text-gray-900 dark:text-white">
          Bloggers you may like
        </h5>
      </div>
      <div class="flow-root">
        <ul class="divide-y divide-gray-300 dark:divide-gray-700">
          {suggestions.map((suggestion) => (
            <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img
                    class="w-9 h-9 rounded-lg"
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg"
                    alt=""
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {suggestion.name}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    {suggestion.email}
                  </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-primary dark:text-white">
                  <button>Follow</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
