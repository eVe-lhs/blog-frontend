import { motion } from "framer-motion";
import { TempData } from "../TempData";
import moment from "moment/moment";
import { Link } from "react-router-dom";


export default function Feed({showModal, setShowModal}) {
    
    return (
      <>
        <div className="md:mt-5 mt-14 relative z-0 font-body">
          <div className="md:hidden block left-3 top-3 z-10 justify-between fixed"></div>
          <SearchBar />
          <Content showModal={showModal} setShowModal={setShowModal} />
          <RightBar />
        </div>
      </>
    );
}


const Content = ({ showModal, setShowModal }) => {
    return (
      <motion.div
        className="md:w-5/12 w-full mx-auto mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <input
          type="text"
          className="block p-3 md:rounded-3xl w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-800 dark:text-white border border-gray-300"
                placeholder="Write your thoughts here"
                readOnly
          onClick={() => {
            setShowModal(true)
          }}
        />
        {TempData.map((data) => (
          <ContentCard
            id = {data.id}
            heading={data.heading}
            imageUrl={data.imageUrl}
            date={data.date}
            text={data.text}
            tags={data.tags}
          />
        ))}
      </motion.div>
    );
}

const ContentCard = ({ heading, imageUrl, date,text,tags ,id}) => {
    return (
      <div className="w-full bg-white dark:bg-gray-800 p-4 my-4 md:rounded-lg md:shadow-lg">
        <div className="flex flex-col gap-2">
          <img
            className="w-full rounded-md mx-auto"
            alt=""
            src={imageUrl}
          />
          <div className="flex flex-row justify-between mt-2">
            <div className="flex md:flex-row flex-col gap-2 font-bold text-lg">
              <div class="font-header font-extrabold">{heading}</div>
              <div className="flex flex-row gap-2 md:ml-3">
                {tags.map((tag) => (
                  <div className="p-2 text-white font-normal bg-primary rounded-lg text-xs md:m-auto">
                    #{tag}
                  </div>
                ))}
              </div>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 hover:scale-110 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </div>
          <div className="text-gray-400 text-xs">{moment(date).fromNow()}</div>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
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
            <Link className="float-right text-sm text-primary_assent hover:underline" to={`posts/${id}`}>
              Read More
            </Link>
          </div>
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

}

const SearchBar = () => {
    return (
      <motion.div
        className="md:w-5/12 w-screen mx-auto border-gray-300 border-b-2 pb-5"
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
              className="block w-full md:py-4 py-2 px-4 md:pl-10 text-sm text-gray-900 border border-gray-300 md:rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="md:hidden block text-primary_assent absolute right-0 bottom-0.5 font-medium text-sm p-2 dark:text-blue-500"
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