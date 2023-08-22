import { AnimatePresence, motion } from "framer-motion";
import { TempData } from "../TempData";
import { useState } from "react";
import { ContentCard } from "../components/ContentCard";

export default function Bookmarks() {
  const [collection,setCollection] = useState('All Saved Items')
  return (
    <div className="md:mt-5 mt-14 relative z-0 font-body ">
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
        <div className="text-black font-bold w-full text-xl mb-10 ml-2">Currently selected collection: {collection}</div>
        {TempData.map((data) => (
          <ContentCard
            id={data.id}
            heading={data.heading}
            imageUrl={data.imageUrl}
            date={data.date}
            text={data.text}
            tags={data.tags}
            author={data.author}
            bookmarked={true}
          />
        ))}
      </motion.div>
      <RightBar setCollection={setCollection} />
    </div>
  );
}

const RightBar = ({setCollection}) => {
  const [addNewClicked, setAddNewClicked] = useState(false)
  const [collectionName, setCollectionName] = useState('')
  return (
    <div
      className={`divide-y divide-gray-400 border-l border-l-gray-400 right-0 fixed lg:w-80 md:w-1/4 md:block hidden pt-5 px-8 inset-y-0 transform lg:h-screen overflow-y-autolg:translate-x-0  transition duration-500 ease-out bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white shadow-xl border-r border-r-gray-300`}
    >
      <div class="flex flex-col mb-8">
        <div class="mt-4 mb-8 text-center">
          <h5 class="font-body font-bold leading-none text-gray-900 dark:text-white">
            BOOKMARKS
          </h5>
        </div>
        <div className="flex flex-row gap-5 justify-start px-3 w-full mx-auto   rounded-lg py-2 text-center">
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
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
          <span className="cursor-pointer hover:underline" onClick={() => { setCollection('All Saved Items') }}>
            All Saved Items
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-5">
        <div class="text-center mt-8">
          <h5 class="font-body font-bold leading-none text-gray-900 dark:text-white">
            My Collections
          </h5>
        </div>
        <div className="flex flex-row gap-5 justify-start px-3 w-full mx-auto   rounded-lg py-2 text-center">
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
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
          <span className="cursor-pointer hover:underline" onClick={() => {setCollection('Politics')}}>Politics</span>
        </div>
        <div className="flex flex-row gap-5 justify-start px-3 w-full mx-auto   rounded-lg py-2 text-center">
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
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
          <span className="cursor-pointer hover:underline" onClick={() => { setCollection('Science') }}>Science</span>
        </div>
        <div className="flex flex-row gap-5 justify-start px-3 w-full mx-auto   rounded-lg py-2 text-center">
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
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
          <span className="cursor-pointer hover:underline" onClick={() => { setCollection('AI') }}>AI</span>
        </div>
        <AnimatePresence>
          {!addNewClicked ? (
            <motion.div
              className="flex flex-row gap-5 justify-start mt-5 px-3 w-full mx-auto  rounded-lg py-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>

              <span
                className="cursor-pointer hover:underline"
                onClick={() => setAddNewClicked(true)}
              >
                Add a New Collection
              </span>
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col gap-1 justify-start mt-5 px-3 w-full mx-auto  rounded-lg py-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <input
                class="text-sm appearance-none w-full bg-gray-200 dark:text-white dark:bg-gray-800 text-gray-700 border border-gray-400 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="title"
                type="text"
                maxLength={20}
                placeholder="Write something"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
              />{" "}
              <div className="flex flex-row w-full justify-evenly">
                <div
                  className="text-gray-700 dark:text-gray-400 cursor-pointer hover:underline"
                  onClick={() => {
                    setAddNewClicked(false);
                  }}
                >
                  Cancel
                </div>
                <div className="text-gray-700 dark:text-gray-400 cursor-pointer hover:underline">
                  Add
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
