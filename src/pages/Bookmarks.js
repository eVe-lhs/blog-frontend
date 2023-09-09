import { AnimatePresence, motion } from "framer-motion";
import { TempData } from "../TempData";
import { useContext, useEffect, useState } from "react";
import { ContentCard } from "../components/ContentCard";
import { RightBar } from "../components/RightBar";
import axios from "axios";
import { UserContext } from "../App";
import { BounceLoader } from "react-spinners";

export default function Bookmarks() {
  // const [openSort, setOpenSort] = useState(false);
  const [sortText, setSortText] = useState("Most Recent");
  const [bookmarks, setBookmarks] = useState();

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    document.title = "Leaflet | Bookmarks";
  }, []);

  useEffect(() => {
    const fetchBookmarkPosts = async () => {
      setBookmarks("");
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/bookmarks/${currentUser?.id}`
      );
      setBookmarks(data.reverse());
    };
    if (currentUser) {
      fetchBookmarkPosts().catch((err) => console.log(err));
    }
  }, [currentUser]);
  const override = {
    display: "block",
    position: "fixed",
    top: "80%",
    left: "50%",
    margin: "auto auto",
    transform: "translate(-50%,-50%)",
  };
  return (
    <div className="md:mt-5 mt-20 relative z-0 font-body ">
      <RightBar />
      <motion.div
        className="md:w-5/12 w-full mx-auto mt-10 md:px-0 px-5"
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
        <div className="text-3xl font-bold font-body md:px-0 md:mt-0 mt-5 px-4">
          Bookmarks
        </div>

        <div className="w-full flex justify-between mt-10">
          <button
            class="text-gray-400  font-medium rounded-lg text-sm md:px-0 px-5  py-2.5 text-center inline-flex items-center "
            type="button"
            onClick={() => {
              bookmarks?.reverse();
              setSortText(
                sortText === "Most Recent" ? "Lease Recent" : "Most Recent"
              );
            }}
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
          <button class="text-gray-400  font-medium rounded-lg text-sm md:px-0 px-5 py-2.5 text-center inline-flex items-center ">
            Current Sorting : {sortText} Saved
          </button>
        </div>

        {/* the select box for mobile view */}
        {/* <div className="md:hidden block px-4">
          <label for="underline_select" class="sr-only">
            Select a collection
          </label>
          <select
            id="underline_select"
            class="block font-body py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            onChange={(e) => setCollection(e.target.value)}
          >
            <option selected value="All saved item">
              All
            </option>
            <option value="Politics">Politics</option>
            <option value="Science">Science</option>
            <option value="AI">AI</option>
          </select>
          {!addNewClicked ? (
            <motion.div
              className="flex flex-row gap-5 justify-start mt-5 w-full mx-auto  rounded-lg py-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAddNewClicked(true)}
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

              <span className="cursor-pointer hover:underline">
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
        </div> */}
        {bookmarks ? (
          bookmarks.length === 0 ? (
            <>
              <div className="mx-auto my-16 text-2xl w-full h-full text-center">
                Nothing To Show
              </div>
            </>
          ) : (
            bookmarks.map((data) => (
              <ContentCard
                id={data.post_id}
                heading={data.title}
                imageUrl={data.post_photo}
                date={data.date_of_creation}
                tags={data.tags}
                like_count={data?.like_count}
                comment_count={data?.comment_count}
                author={data.author}
                uid={data.uid}
                bookmarked={true}
              />
            ))
          )
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
      </motion.div>
    </div>
  );
}
