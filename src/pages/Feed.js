import { motion } from "framer-motion";
import { TempData } from "../TempData";
import moment from "moment/moment";
import { Link, useNavigate } from "react-router-dom";
import { ContentCard } from "../components/ContentCard";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, UserContext } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { BounceLoader } from "react-spinners";
const override = {
  display: "block",
  position: "fixed",
  top: "50%",
  left: "50%",
  margin: "auto auto",
  transform: "translate(-50%,-50%)",
};
export default function Feed({ showModal, setShowModal, setModalData }) {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/auth/login");
    }
  }, [localStorage.getItem('token')]);
  
  if (currentUser === '')
    return (
      <div>
        <BounceLoader
          color={"#59B2A2"}
          loading={true}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  else {
    return (
      <>
        <div className="md:mt-5 mt-20 relative z-0 font-body">
          <SearchBar />
          <Content showModal={showModal} setShowModal={setShowModal} setModalData={setModalData} />
          <RightBar />
        </div>
      </>
    );
  }
}


const Content = ({ showModal, setShowModal, setModalData }) => {
  const [openSort, setOpenSort] = useState(true)
  const [sortCondition, setSortCondition] = useState("-date_of_creation")
  const [sortText, setSortText] = useState('Most Recent')
  const [posts, setPosts] = useState()
  const {currentUser} = useContext(UserContext)
  useEffect(() => {
    const fetchFeedPosts = async () => {
      setPosts("");
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/feed/${currentUser.id}/${sortCondition}`
      );
      setPosts(data);
    };
    fetchFeedPosts().catch((err) => console.log(err));
    setOpenSort(!openSort)
  }, [sortCondition]);
  const override = {
    display: "block",
    position: "fixed",
    top: "80%",
    left: "50%",
    margin: "auto auto",
    transform: "translate(-50%,-50%)",
  };
  if (!posts && posts !== []) {
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
  } else if (posts.length === 0) {
    return (
      <div className="mx-auto my-16 text-2xl w-full h-full text-center">
        Nothing To Show
      </div>
    );
  }
    return (
      <motion.div
        className="md:w-5/12 w-full mx-auto mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-full flex justify-between">
          <button
            class="text-gray-400  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
            type="button"
            onClick={() => setOpenSort(!openSort)}
          >
            Sort
            <svg
              class="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            class={`${
              openSort ? "block fixed translate-y-10" : "hidden"
            } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="sortButton"
            >
              <li>
                <a
                  onClick={() => {
                    setSortCondition("-like_count");
                    setSortText("Likes (Decending)");
                  }}
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Likes (Decending)
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setSortCondition("+like_count");
                    setSortText("Likes (Ascending)");
                  }}
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Likes (Ascending)
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setSortCondition("+date_of_creation");
                    setSortText("Least Recent");
                  }}
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Least Recent
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setSortCondition("-date_of_creation");
                    setSortText("Most Recent");
                  }}
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Most Recent
                </a>
              </li>
            </ul>
          </div>
          <button class="text-gray-400  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ">
            Current Sorting : {sortText}
          </button>
        </div>
        {posts?.map((data) => (
          <ContentCard
            id={data?.id}
            heading={data?.title}
            imageUrl={data?.post_photo}
            date={data?.date_of_creation}
            tags={data?.tags}
            author={data?.author}
            like_count={data?.like_count}
            comment_count={data?.comment_count}
            showModal={showModal}
            setShowModal={setShowModal}
            setModalData={setModalData}
          />
        ))}
      </motion.div>
    );
}


const RightBar = () => {
  const navigate = useNavigate()
  const [suggestions, setSuggestions] = useState()
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { colorTheme } = useContext(ThemeContext)
  useEffect(() => {
    {
      const fetchData = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/suggestedUsers`,
        );
        setSuggestions(data);
      }
      fetchData().catch((err) => console.log(err));
    }
  }, [currentUser])
  const handleFollow = async (suggestionId) => {
    const username = currentUser?.username
    try {
      await setCurrentUser({
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
  }
  const handleUnfollow = async (suggestionId) => {
    const username = currentUser?.username;
    try {
      await setCurrentUser({
        ...currentUser,
        followings: [...currentUser.followings, !suggestionId],
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/unfollow/${suggestionId}`,
        {
          username: username,
        }
      );
      
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
                            <button
                              onClick={() => handleUnfollow(suggestion.id)}
                            >
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

}

const SearchBar = () => {
    return (
      <motion.div
        className="md:w-5/12 w-screen px-1 mx-auto border-gray-300 border-b-2 pb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <form>
          <label
            for="default-search"
            className="mb-2 text-xs md:text-sm font-thin md:font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400 md:block hidden"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full py-4 px-4 md:pl-10 text-sm text-gray-900 border border-gray-300 md:rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="submit"
              className="md:block hidden text-white absolute right-2.5 bottom-2.5 bg-secondary_assent hover:bg-primary_assent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
            <div
              className="md:hidden block text-primary_assent absolute right-0 bottom-2.5 font-medium text-sm p-2 dark:text-blue-500"
            >
              <svg
                className="w-4 h-4 text-whitedark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
        </form>
      </motion.div>
    );
    
}