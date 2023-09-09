import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext, UserContext } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";


export const RightBar = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState();
  const { currentUser, setCurrentUser,token } = useContext(UserContext);
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
  }, [token]);
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
      className={`md:right-0 md:top-0 md:mt-0 mt-5 md:fixed  lg:w-80 md:w-1/4 w-screen pt-5 px-4 inset-y-0 transform lg:h-screen overflow-x-auto overflow-y-auto lg:translate-x-0  transition duration-500 ease-out bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white shadow-xl border-r border-r-gray-300`}
    >
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-normal font-bold leading-none text-gray-900 dark:text-white">
          Bloggers you may like
        </h5>
      </div>
      {suggestions ? (
        <>
          <div class="flow-root">
            <ul class="md:divide-y md:divide-x-0 divide-gray-300 dark:divide-gray-700 flex md:flex-col flex-row md:gap-0 gap-10 divide-x ">
              {suggestions?.map((suggestion) =>
                suggestion.id !== currentUser.id ? (
                  <li class="py-3 sm:py-4 md:w-auto w-64 px-3  ">
                    <div class="flex md:items-center item-start md:space-x-4 md:bg-transparent md:dark:bg-transparent md:p-0 p-4 md:rounded-none rounded-lg md:shadow-none shadow-lg dark:bg-gray-600 bg-gray-100 md:space-y-0 space-y-4 md:flex-row flex-col md:gap-0">
                      <div class="md:flex-shrink-0">
                        <img
                          class="md:w-9 md:h-9 w-14 h-14 object-cover object-center rounded-lg"
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