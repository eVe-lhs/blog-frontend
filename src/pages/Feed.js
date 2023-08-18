import { motion } from "framer-motion";
import { TempData } from "../TempData";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { ContentCard } from "../components/ContentCard";

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
            author={data.author}
          />
        ))}
      </motion.div>
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