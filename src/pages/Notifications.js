import { motion } from "framer-motion";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { RightBar } from "../components/RightBar";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BounceLoader } from "react-spinners";

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
  const [notiTab, setNotiTab] = useState("all");
  const [notifications, setNotifications] = useState();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    document.title = "Leaflet | Notifications";
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/notifications_user/${currentUser?.id}`
      );
      setNotifications(data);
    };
    if (currentUser) {
      fetchNotifications().catch((err) => console.log(err));
    }
  }, [currentUser]);

  const override = {
    display: "block",
    position: "fixed",
    top: "80%",
    left: "50%",
    margin: "auto auto",
    transform: "translate(-50%,-50%)",
  };
  if (!notifications || !currentUser) {
    return (
      <BounceLoader
        color={"#59B2A2"}
        loading={true}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
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
        <div className="text-3xl font-bold font-body md:px-0 md:mt-0 mt-5 px-4">
          Notifications
        </div>
        {notifications.length === 0 ? (
          <div className="mx-auto my-16 text-2xl w-full h-full text-center">
            Nothing To Show
          </div>
        ) : (
          <div className="mt-5 w-full flex flex-col gap-4 md:px-0 px-2">
            {notifications.map((notification) => (
              <NotificationCard notification={notification} />
            ))}
          </div>
        )}
      </motion.div>
      <RightBar />
    </div>
  );
}

const NotificationCard = ({ notification }) => {
  const navigate = useNavigate();
  const markRead = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/mark_notification_as_read/${notification.id}`
      );
    } catch (err) {
      console.error(err.response.data.error);
    }
  };
  if (notification.post) {
    return (
      <div
        onClick={async () => {
          markRead();
          navigate(`/home/posts/${notification.post}`);
        }}
        className={`${
          !notification.is_read
            ? "bg-white dark:bg-gray-800"
            : "bg-gray-200 dark:bg-gray-900"
        } w-full px-4 py-4 rounded border shadow-lg hover:brightness-95 cursor-pointer`}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-start gap-4">
            <img
              src={notification.profile_photo !== "" ? notification.profile_photo: "/no_image.jpg"}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col justify-between">
              <span className="text-gray-400 text-xs">
                {moment(notification.created_at).fromNow()}
              </span>
              <span>{notification.message}</span>
            </div>
          </div>
          <img src={notification.post_photo !== "" ? notification.post_photo: "/no_cover_img.jpg"} className="h-12 w-12" />
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={() => {
          markRead();
          navigate(`/home/Profile/${notification.sender}`);
        }}
        className={`${
          !notification.is_read
            ? "bg-white dark:bg-gray-800"
            : "bg-gray-200 dark:bg-gray-900"
        } w-full px-4 py-4 rounded border shadow-lg hover:brightness-95 cursor-pointer`}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-start gap-4">
            <img
              src={notification.profile_photo}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col justify-between">
              <span className="text-gray-400 text-xs">
                {moment(notification.created_at).fromNow()}
              </span>
              <span>{notification.message}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
