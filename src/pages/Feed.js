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
import { RightBar } from "../components/RightBar";
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
    document.title = "Leaflet | Home";
  }, []);
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
  const [openSort, setOpenSort] = useState(false)
  const [sortCondition, setSortCondition] = useState("-date_of_creation")
  const [sortText, setSortText] = useState('Most Recent')
  const [isFetching,setIsFetching] = useState(false)
  const [posts, setPosts] = useState([])
  const { currentUser } = useContext(UserContext)
  const [page, setPage] = useState(1)
  useEffect(() => {
    
    // setPosts([]);
    fetchFeedPosts().catch((err) => console.log(err));
    window.addEventListener("scroll", handleScroll);
    setOpenSort(false)
    
  }, [sortCondition]);

  const handleScroll = () => {
    if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) < document.documentElement.offsetHeight || isFetching)
      return;
    setIsFetching(true)
    console.log("scroll")
  }
  const fetchFeedPosts = async () => {
    setTimeout(async () => { 
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/posts/feed/${currentUser.id}/${sortCondition}/${page}`
      );
      setPage(page+1)
      setPosts(() => {
      return [...posts,...data]
    });},1000)
  };
  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems()
  }, [isFetching])
  const fetchMoreListItems = () => {
    fetchFeedPosts()
    setIsFetching(false)
  }
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
                    setPage(1);
                    setPosts([]);
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
                    setPage(1);
                    setPosts([]);
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
                    setPage(1);
                    setPosts([]);
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
                    setPage(1);
                    setPosts([]);
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
        {posts.map((data) => (
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


const SearchBar = () => {
  const navigate = useNavigate()
  const [searchQuery,setSearchQuery] = useState('')
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="search"
              id="default-search"
              className="block w-full py-4 px-4 md:pl-10 text-sm text-gray-900 border border-gray-300 md:rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Posts and Users"
              required
            />
            <button
              onClick={() => {
                if (searchQuery === "") alert("Search String is Empty");
                else navigate(`/home/searchresults/${searchQuery}`);
              }}
              className="md:block hidden text-white absolute right-2.5 bottom-2.5 bg-secondary_assent hover:bg-primary_assent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
            <div
              className="md:hidden block text-primary_assent absolute right-0 bottom-2.5 font-medium text-sm p-2 dark:text-blue-500"
              onClick={() => {
                if (searchQuery === "") alert("Search String is Empty");
                else navigate(`/home/searchresults/${searchQuery}`);
              }}
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