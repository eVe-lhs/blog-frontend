import { motion } from "framer-motion";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { ThemeContext, UserContext } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { SmallProfile } from "../components/SmallProfile";
import { ContentCard } from "../components/ContentCard";
import { RightBar } from "../components/RightBar";

export default function SearchResults() {
  const [notiTab, setNotiTab] = useState("users");
  useEffect(() => {
    document.title = "Leaflet | Search Result";
  }, []);
  return (
    <div className="md:mt-5 mt-20 relative z-0 font-body ">
      <SearchBar />
      <RightBar />
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
        <div className="text-3xl font-bold font-body md:px-0 md:mt-0 mt-5 px-4">
          Search Results
        </div>
        <div className="flex flex-row md:gap-10 gap-4 text-lg font-body mt-10 md:px-0 px-4">
          <div
            className={`${notiTab === "users" && "underline"} cursor-pointer`}
            onClick={() => setNotiTab("users")}
          >
            Users
          </div>
          <div
            className={`${notiTab === "posts" && "underline"} cursor-pointer`}
            onClick={() => setNotiTab("posts")}
          >
            Posts
          </div>
        </div>
        <div className="mt-5 w-full flex flex-col gap-4 md:px-0 px-2">
          <TabContents activeTab={notiTab} />
        </div>
      </motion.div>
    </div>
  );
}

const TabContents = ({ activeTab, setShowModal, setModalData, userId }) => {
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState();
    const { currentUser } = useContext(UserContext)
    const {query} = useParams()

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/search/users?q=${query}`
      );
      setUsers(data);
    };
    fetchUserData().catch((err) => console.log(err));
  }, [query]);

  useEffect(() => {
    const fetchPostsData = async () => {
      setPosts("");
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/search/posts?q=${query}`
      );
      setPosts(data);
    };
    fetchPostsData().catch((err) => console.log(err));
  }, [query,currentUser]);

  const override = {
    display: "block",
    position: "fixed",
    top: "80%",
    left: "50%",
    margin: "auto auto",
    transform: "translate(-50%,-50%)",
    };
    if ((!users && users !== []) && (!posts && posts !== [])) {
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
  } 
  else{
    if (activeTab === "posts") {
      if (posts?.length === 0) {
        return (
          <div className="mx-auto my-16 text-2xl w-full h-full text-center">
            Nothing To Show
          </div>
        );
      } else {
        return posts?.map((data) => (
          <ContentCard
            id={data.id}
            heading={data.title}
            imageUrl={data.post_photo}
            author={data.author}
            date={data.date_of_creation}
            tags={data.tags}
            like_count={data.like_count}
            comment_count={data.comment_count}
            uid={data.uid}
            //   self={self}
          />
        ));
      }
    } else if (activeTab === "users") {
      if (users?.length === 0) {
        return (
          <div className="mx-auto my-16 text-2xl w-full h-full text-center">
            Nothing To Show
          </div>
        );
      }
      if (users)
        return (
          <div className="mt-5">
            <SmallProfile users={users} search={true} />
          </div>
        );
    }
  }
};



const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
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
};