import { useContext } from "react";
import { ThemeContext, UserContext } from "../App";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const SmallProfile = ({ users,search }) => {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { colorTheme } = useContext(ThemeContext);
  const handleFollow = async (userId) => {
    const username = currentUser?.username;
    try {
      await setCurrentUser({
        ...currentUser,
        followings: [...currentUser.followings, userId],
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/follow/${userId}`,
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
  const handleUnfollow = async (userId) => {
    const username = currentUser?.username;
    try {
      await setCurrentUser(current => {
        const { followings, ...currentUser } = current
        const removedFollowing = followings.filter((following) => following != userId)
        return {followings:removedFollowing,...currentUser}
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/unfollow/${userId}`,
        {
          username: username,
        }
      );
      toast.success(data.message, {
        position: "top-center",
        hideProgressBar: false,
        pauseOnHover: true,
        theme: colorTheme === "dark" ? "light" : "dark",
        autoClose:3000
      });
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
        theme: colorTheme === "dark" ? "dark" : "light",
        autoClose: 3000,
      });
    }
  };
  if (!users) {
    return (
      <ClipLoader
        color={"#59B2A2"}
        loading={true}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
  if (users === []) {
    return <div>
      Nothing to show
    </div>
  }
  if(users){
    return (
      <div class={`flow-root ${search ? "w-full" : "w-4/5 md:w-3/4"} mx-auto`}>
        <ul class="divide-y divide-gray-300 dark:divide-gray-700">
          {users?.map((user) => (
            <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img
                    class="w-10 h-10 rounded-lg object-cover object-center"
                    src={
                      user.profile_info.profile_picture !== ""
                        ? user.profile_info.profile_picture
                        : "/no_image.jpg"
                    }
                    alt=""
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm cursor-pointer font-medium text-gray-900 truncate dark:text-white hover:underline"
                    onClick={() => navigate(`/home/Profile/${user.id}`)}
                  >
                    {user.username}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
                {user.userId != currentUser.id ? (
                  <div
                    class={`inline-flex items-center text-base font-semibold ${
                      !currentUser?.followings?.includes(user.userId)
                        ? "text-primary"
                        : "text-gray-400"
                    } `}
                  >
                    {!currentUser?.followings?.includes(user.userId) ? (
                      <button onClick={() => handleFollow(user.userId)}>
                        Follow
                      </button>
                    ) : (
                      <button onClick={() => handleUnfollow(user.userId)}>
                        Unfollow
                      </button>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
