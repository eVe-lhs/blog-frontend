import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext, UserContext } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";


export const RightBar = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState();
  const { currentUser, setCurrentUser } = useContext(UserContext);
    const { colorTheme } = useContext(ThemeContext);
    const override = {
      display: "block",
      position: "fixed",
      top: "50%",
      left: "50%",
      margin: "auto auto",
      transform: "translate(-50%,-50%)",
    };
  useEffect(() => {
    {
      const fetchData = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/suggestedUsers`
        );
        setSuggestions(data);
      };
      fetchData().catch((err) => console.log(err));
    }
  }, []);
  const handleFollow = async (suggestionId) => {
    const username = currentUser?.username;
    try {
      setCurrentUser({
        ...currentUser,
        followings: [...currentUser.followings, suggestionId],
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/follow/${suggestionId}`,
        {
          username: username,
        }
      );
      toast.success(data.message, {
        position: "top-center",
        hideProgressBar: false,
        pauseOnHover: false,
        autoClose:3000,
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
  const handleUnfollow = async (suggestionId) => {
    const username = currentUser?.username;
    try {
      setCurrentUser((current) => {
        const { followings, ...currentUser } = current;
        const removedFollowing = followings.filter(
          (following) => following != suggestionId
        );
        return { followings: removedFollowing, ...currentUser };
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/unfollow/${suggestionId}`,
        {
          username: username,
        }
      );
      toast.success(data.message, {
        position: "top-center",
        hideProgressBar: false,
        pauseOnHover: false,
        autoClose: 3000,
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
  return (
    <div
      className={`right-0 fixed lg:w-80 md:w-1/4 md:block hidden pt-5 px-4 inset-y-0 transform lg:h-screen overflow-y-autolg:translate-x-0  transition duration-500 ease-out bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white shadow-xl border-r border-r-gray-300`}
    >
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-normal font-bold leading-none text-gray-900 dark:text-white">
          Bloggers you may like
        </h5>
      </div>
      {suggestions ? (
        <>
          <div class="flow-root">
            <ul class="divide-y divide-gray-300 dark:divide-gray-700">
              {suggestions?.map((suggestion) =>
                suggestion.id !== currentUser.id ? (
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <img
                          class="w-9 h-9 object-cover object-center rounded-lg"
                          src={
                            suggestion?.profile_info.profile_picture === ""
                              ? "/no_image.jpg"
                              : suggestion.profile_info.profile_picture
                          }
                          alt=""
                        />
                      </div>
                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm cursor-pointer font-medium text-gray-900 truncate dark:text-white hover:underline"
                          onClick={() => navigate(`Profile/${suggestion.id}`)}
                        >
                          {suggestion.username}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          {suggestion.email}
                        </p>
                      </div>
                      <div
                        class={`inline-flex items-center text-base font-semibold ${
                          !currentUser?.followings?.includes(suggestion.id)
                            ? "text-primary"
                            : "text-gray-400"
                        } `}
                      >
                        {!currentUser?.followings?.includes(suggestion.id) ? (
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
                ) : (
                  <></>
                )
              )}
            </ul>
          </div>
        </>
      ) : (
        <BounceLoader
          color={"#59B2A2"}
          loading={true}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
};