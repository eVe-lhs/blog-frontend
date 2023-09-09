import { color, motion } from "framer-motion";
import moment from "moment";
import { Suspense, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { topics } from "../constants/Interests";
import { ModelDataContext, ThemeContext, UserContext } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

export const ContentCard = ({like_count,comment_count, heading, imageUrl, date,  tags, uid,id, author, profile}) => {
  const [openBookmarks, setOpenbookmarks] = useState(false)
  const { currentUser,setCurrentUser } = useContext(UserContext)
  const { colorTheme } = useContext(ThemeContext)
  const { setModalData } = useContext(ModelDataContext);
  const navigate = useNavigate()
  const addBookmarks = async (suggestionId) => {
    const username = currentUser?.username;
    try {
      setCurrentUser({
        ...currentUser,
        bookmarks: [...currentUser.bookmarks, suggestionId],
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/bookmark/${suggestionId}`,
        {
          username: username,
        }
      );
      toast.success(data?.message, {
        position: "top-center",
        hideProgressBar: false,
        pauseOnHover: false,
        autoClose: 2000,
        theme: colorTheme === "dark" ? "light" : "dark",
      });
    } catch (err) {
      toast.error("something went wrong", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        hideProgressBar: true,
        theme: colorTheme === "dark" ? "dark" : "light",
      });
    }
  };

  const removeBookmarks = async (suggestionId) => {
    const username = currentUser?.username;
    try {
     setCurrentUser((current) => {
       const { bookmarks, ...currentUser } = current;
       const removedBookmarks = bookmarks.filter(
         (bookmark) => bookmark != suggestionId
       );
       return { bookmarks: removedBookmarks, ...currentUser };
     });
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/remove-bookmark/${suggestionId}`,
        {
          username: username,
        }
      );
      toast.success(data?.message, {
        position: "top-center",
        hideProgressBar: false,
        pauseOnHover: false,
        autoClose: 2000,
        theme: colorTheme === "dark" ? "light" : "dark",
      });
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        hideProgressBar: true,
        theme: colorTheme === "dark" ? "dark" : "light",
      });
    }
  };
const handleDelete = async (postId) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}/posts/${postId}`,
    {
      data: {
        access_token: localStorage.getItem("token"),
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  toast.success(data.message, {
    position: "top-center",
    hideProgressBar: false,
    autoClose:2000,
    pauseOnHover: true,
    theme: colorTheme === "dark" ? "light" : "dark",
  });
  setTimeout(() => window.location.reload(), 3000);
};
  return (
    <motion.div
      className={`${
        profile ? "md:w-3/4" : "w-full"
      } mx-auto bg-white dark:bg-gray-800 p-4 my-4 md:rounded-lg md:shadow-lg`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col gap-2">
        <Suspense
          fallback={
            <img
              className="w-full rounded-md mx-auto"
              alt="post_img"
              src="/no_cover_img.jpg"
            />
          }
        >
          <img
            className="w-full rounded-md mx-auto"
            alt="post_img"
            src={imageUrl}
          />
        </Suspense>

        <span class="line-clamp-2 text-ellipsis visible md:text-justify font-header font-bold text-lg md:text-xl">
          {heading}
        </span>
        {profile ? (
          <></>
        ) : (
          <div className="text-gray-400 text-sm">
            By&nbsp;
            <span
              className="hover:underline font-bold cursor-pointer"
              onClick={() => navigate(`/home/Profile/${uid}`)}
            >
              {author}
            </span>
          </div>
        )}
        <div className="flex flex-row justify-between mt-2">
          <div className="flex flex-row gap-2 justify-start">
            {tags?.map((tag) => (
              <div className="p-2 text-white font-normal bg-primary rounded-lg text-xs md:m-auto">
                {topics.find((topic) => topic.id === tag).name}
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-3">
            {author === currentUser?.username ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-current text-red-500 cursor-pointer hover:scale-105"
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to delete this post?") ==
                      true
                    )
                      handleDelete(id);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                
              </>
            ) : (
              <>
                <div class="flex">
                  <button
                    type="button"
                    onClick={() => {
                      if (!currentUser?.bookmarks.includes(id))
                        addBookmarks(id);
                      else removeBookmarks(id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 stroke-current text-secondary_assent hover:scale-110 cursor-pointer ${
                        currentUser?.bookmarks.includes(id)
                          ? "fill-current"
                          : "fill-none"
                      }`}
                      // onClick={() => setOpenbookmarks(!openBookmarks)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                  </button>
                  <div
                    id={`dropdownBookmarks${id}`}
                    class={` z-10 ${
                      openBookmarks ? "block" : "hidden"
                    } bg-white divide-y divide-gray-100 rounded-lg shadow border w-44 dark:bg-gray-700`}
                  >
                    <ul
                      class="text-sm text-gray-700 dark:text-gray-200 divide-y h-36 overflow-y-auto"
                      aria-labelledby="states-button"
                    >
                      <li>
                        <button
                          type="button"
                          class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <div class="inline-flex items-center">Politics</div>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <div class="inline-flex items-center">Politics</div>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <div class="inline-flex items-center">AI</div>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <div class="inline-flex items-center">Science</div>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="text-gray-400 text-xs">
          Post Uploaded {moment(date).fromNow()}
        </div>
        {/* <span class="line-clamp-4 text-ellipsis visible text-justify font-body font-normal text-sm">
          {text}
        </span> */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-3">
            <div className="flex flex-row gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-6 h-6 fill-red-500 hover:scale-110 cursor-pointer "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <span className="text-gray-400 text-sm">{like_count}</span>
            </div>
            <div className="flex flex-row gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-current text-secondary_assent hover:scale-110 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              <span className="text-gray-400 text-sm">{comment_count}</span>
            </div>
          </div>
          <Link
            className="float-right text-sm text-primary_assent hover:underline"
            to={`/home/posts/${id}`}
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
