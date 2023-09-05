import { motion } from "framer-motion";
import moment from "moment";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { topics } from "../constants/Interests";
import { UserContext } from "../App";

export const ContentCard = ({like_count,comment_count, heading, imageUrl, date, text, tags, id, author, profile, setModalData, self, bookmarked }) => {
  const [openBookmarks, setOpenbookmarks] = useState(false)
  const {currentUser} = useContext(UserContext)
  return (
    <motion.div
      className={`${
        profile ? "md:w-3/4" : "w-full"
      } mx-auto bg-white dark:bg-gray-800 p-4 my-4 md:rounded-lg md:shadow-lg`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col gap-2">
        <img className="w-full rounded-md mx-auto" alt="" src={imageUrl} />
        <span class="line-clamp-2 text-ellipsis visible md:text-justify font-header font-bold text-lg md:text-xl">
          {heading}
        </span>
        {profile ? (
          <></>
        ) : (
          <div className="text-gray-400 text-sm">By {author}</div>
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
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </>
            ) : (
              <>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 stroke-current text-secondary_assent hover:scale-110 cursor-pointer ${
                    bookmarked ? "fill-current" : "fill-none"
                  }`}
                  onClick={() => setOpenbookmarks(!openBookmarks)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg> */}
                {/* <select
                  id="underline_select"
                  class="block font-body py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  // onChange={(e) => setCollection(e.target.value)}
                >
                  <option selected></option>
                  <option value="Politics">Politics</option>
                  <option value="Science">Science</option>
                  <option value="AI">AI</option>
                </select> */}

                <div class="flex">
                  <button
                    // id={`bookmarkBtn${id}`}
                    // data-dropdown-toggle={`dropdownBookmarks${id}`}
                    // class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    type="button"
                    onClick={() => setOpenbookmarks(!openBookmarks)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 stroke-current text-secondary_assent hover:scale-110 cursor-pointer ${
                        bookmarked ? "fill-current" : "fill-none"
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
            {!profile ? (
              <>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  id={`dropdownBtn${id}`}
                  className="w-6 h-6 hover:scale-110 cursor-pointer"
                  data-dropdown-toggle={`dropdown${id}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg> */}
                {/* dropdown menu */}
                {/* <div
                  id={`dropdown${id}`}
                  class="z-10 hidden bg-white  rounded-md shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 divide-y divide-gray-200 dark:text-gray-200"
                    aria-labelledby={`dropdownBtn${id}`}
                  >
                    <li>
                      <a
                        onClick={() => alert(`delete post:${id}`)}
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                      >
                        Delete
                      </a>
                    </li>
                    <li>
                      <a
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                        onClick={() => {
                          alert(`edit post: ${id}`)
                        }}
                      >
                        Edit
                      </a>
                    </li>
                  </ul>
                </div> */}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="text-gray-400 text-xs">{moment(date).fromNow()}</div>
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
                className="w-6 h-6 stroke-current text-red-500 hover:scale-110 cursor-pointer "
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
