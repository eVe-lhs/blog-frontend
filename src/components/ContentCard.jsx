import { motion } from "framer-motion";
import moment from "moment";
import { Link } from "react-router-dom";

export const ContentCard = ({ heading, imageUrl, date, text, tags, id,author,profile }) => {
  return (
    <motion.div
      className={`${profile?'md:w-3/4' : 'w-full'} mx-auto bg-white dark:bg-gray-800 p-4 my-4 md:rounded-lg md:shadow-lg`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col gap-2">
        <img className="w-full rounded-md mx-auto" alt="" src={imageUrl} />
        <span class="line-clamp-2 text-ellipsis visible md:text-justify font-header font-bold text-lg md:text-xl">
          {heading}
        </span>
        <div className="flex flex-row justify-between mt-2">
          <div className="flex flex-row gap-2 justify-start">
            {tags.map((tag) => (
              <div className="p-2 text-white font-normal bg-primary rounded-lg text-xs md:m-auto">
                #{tag}
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-2">
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
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            {!profile ? (
              <>
                <svg
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
                </svg>
                {/* dropdown menu */}
                <div
                  id={`dropdown${id}`}
                  class="z-10 hidden bg-white  rounded-md shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 divide-y divide-gray-200 dark:text-gray-200"
                    aria-labelledby={`dropdownBtn${id}`}
                  >
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Delete
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="text-gray-400 text-xs">{moment(date).fromNow()}</div>
        <span class="line-clamp-4 text-ellipsis visible text-justify font-body font-normal text-sm">
          {text}
        </span>
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
              <span className="text-gray-400 text-sm">2345</span>
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
              <span className="text-gray-400 text-sm">12345</span>
            </div>
          </div>
          <Link
            className="float-right text-sm text-primary_assent hover:underline"
            to={`posts/${id}`}
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
