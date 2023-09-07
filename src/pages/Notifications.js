import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { RightBar } from "../components/RightBar";

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
  useEffect(() => {
    document.title = "Leaflet | Notifications";
  }, []);
  return (
    <div className="md:mt-5 mt-20 relative z-0 font-body ">
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
        <div className="text-3xl font-bold font-body md:px-0 md:mt-0 mt-5 px-4">Notifications</div>
        <div className="flex flex-row md:gap-10 gap-4 text-lg font-body mt-10 md:px-0 px-4">
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
        <div className="mt-5 w-full flex flex-col gap-4 md:px-0 px-2">
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
        <img src={postImg} className="h-12 w-12"/>
      </div>
    </div>
  );
  
}
