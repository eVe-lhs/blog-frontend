import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { TempData } from "../TempData";
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { BounceLoader } from "react-spinners";
import { topics } from "../constants/Interests";
import axios from "axios";
import { ModelDataContext, ThemeContext, UserContext } from "../App";
import { toast } from "react-toastify";

export default function SinglePost() {
  useEffect(() => {
    document.title = "Leaflet | Post";
  }, []);
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [commentText, setCommentText] = useState();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { setModalData, setShowModal } = useContext(ModelDataContext);
  const { colorTheme } = useContext(ThemeContext);
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
  const like = async (suggestionId) => {
    const username = currentUser?.username;
    try {
      setCurrentUser({
        ...currentUser,
        likes: [...currentUser.likes, suggestionId],
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts/${suggestionId}/like`,
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

  const unlike = async (suggestionId) => {
    const username = currentUser?.username;
    try {
      setCurrentUser((current) => {
        const { likes, ...currentUser } = current;
        const removedlikes = likes.filter(
          (like) => like != suggestionId
        );
        return { likes: removedlikes, ...currentUser };
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts/${suggestionId}/unlike`,
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
  useEffect(() => {
    const fetchSinglePost = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/post/${postId}`
      );
      setPost(data);
    };
    const fetchComments = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${postId}`
      );
      setComments(data);
    };

    fetchSinglePost().catch((err) => console.log(err));
    fetchComments().catch((err) => console.log(err));
  }, [postId]);

  const handleCommentCreate = async () => {
    const jwt = localStorage.getItem("token");
    const response = await toast.promise(
      axios.post(
        `${process.env.REACT_APP_BASE_URL}/comments/${postId}`,
        {
          text: commentText,
          username: currentUser?.username,
        },
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
        // { withCredentials: true }
      ),
      {
        pending: "Processing, Please Wait...",
        success: "Commented Successfully",
        error: "Something Went Wrong",
      },
      {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        hideProgressBar: true,
        theme: colorTheme === "dark" ? "dark" : "light",
      }
    );
    setTimeout(() => window.location.reload(), 2000);
  };
  const navigate = useNavigate()
  const override = {
    display: "block",
    position: "fixed",
    top: "80%",
    left: "50%",
    margin: "auto auto",
    transform: "translate(-50%,-50%)",
  };
  if (!post || !currentUser) {
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
  } else {
    return (
      <div className="relative z-0 font-body">
        <base href="/" />
        <motion.div
          className="md:w-3/5 w-full lg:ml-96 mb-20"
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
          <div className="w-full mb-10 md:mt-10 mt-16 flex flex-col gap-2 md:px-2">
            {currentUser?.username === post?.author ? (
              <div className="flex flex-row gap-3 justify-start">
                <span
                  className="text-xl md:px-0 px-3 font-bold cursor-pointer hover:underline text-blue-500"
                  onClick={async () => {
                    await setModalData(post);
                    setShowModal(true);
                  }}
                >
                  Edit the post
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
            ) : (
              <></>
            )}

            <div className="font-bold font-header text-3xl md:text-4xl px-3 md:px-0">
              {post?.title}
            </div>
            <div class="text-lg truncate md:block flex md:flex-none flex-col">
              <span className="hover:underline hover:cursor-pointer font-base px-3 md:px-0" onClick={() => navigate(`/home/Profile/${post.uid}`)}>
                Posted by {post?.author}
              </span>
              <span className="ml-3 font-light text-sm text-gray-400">
                {moment(post?.date_of_creation).format("DD MMMM YYYY")}
              </span>
            </div>

            <div className="flex md:flex-row justify-between mb-5 px-3 md:px-0">
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row justify-start gap-3">
                  {post?.tags.map((tag, id) => (
                    <span
                      key={id}
                      className="rounded-lg text-center text-sm bg-primary text-white p-2"
                    >
                      {topics.find((topic) => topic.id === tag).name}
                    </span>
                  ))}
                </div>
              </div>
              {/* <div class="items-center space-x-4 md:flex hidden">
                    <div class="flex-1 min-w-0 flex flex-row gap-4">
                      <span className="font-light text-sm text-gray-400">
                        Published on {moment(post.date).format("MMMM Do, YYYY")}
                      </span>
                    </div>
                  </div> */}
            </div>
            <div className="">
              <img
                className="md:object-contain object-fill left-0 w-full"
                src={post?.post_photo}
                alt="classroom"
              />
            </div>

            <div
              className="text-base mt-10 pb-10 border-b border-gray-400 px-3 md:px-0"
              data-color-mode={`${colorTheme === "dark" ? "light" : "dark"}`}
            >
              <MDEditor.Markdown
                style={{
                  fontFamily: "Nunito, sans-serif",
                  whiteSpace: "pre-wrap",
                  marginTop: "20px",
                  backgroundColor: "transparent",
                }}
                source={post?.content}
              />

              <div className="flex flex-row md:justify-normal justify-evenly gap-5 mt-8 px-3 md:px-0 items-center">
                {currentUser && post?.author !== currentUser?.username ? (
                  <>
                    <div className="divide-x flex flex-row rounded-lg shadow-pink-100  bg-red-200 shadow-md items-center px-3 py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        className={`w-8 h-8 pr-2 stroke-current ${
                          currentUser?.likes.includes(postId)
                            ? "fill-current"
                            : "fill-none"
                        } text-red-500 hover:scale-110 cursor-pointer `}
                        onClick={() => {
                          if (!currentUser?.likes.includes(postId))
                            like(postId);
                          else unlike(postId);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                      <span className="pl-2 text-center  text-white font-bold text-lg">
                        {post?.like_count}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (!currentUser?.bookmarks.includes(postId))
                          addBookmarks(postId);
                        else removeBookmarks(postId);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-8 h-8 stroke-current text-secondary_assent hover:scale-110 cursor-pointer ${
                          currentUser?.bookmarks.includes(postId)
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
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <section class="not-format px-4 md:px-0">
            <div class="flex flex-row justify-between items-center mb-6">
              <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Discussion ({post?.comment_count})
              </h2>
            </div>
            <form class="mb-6">
              <div class="py-2 mb-4  rounded-lg rounded-t-lg">
                <label for="comment" class="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows="6"
                  class="w-full text-sm p-4 rounded-lg text-gray-900 p dark:text-white dark:placeholder-gray-400 dark:bg-gray-800 border-b border-gray-400"
                  placeholder="Write a comment..."
                  required
                ></textarea>
                <button
                  type="button"
                  onClick={handleCommentCreate}
                  class="inline-flex items-end mt-4 py-2.5 px-4 text-base font-bold text-white bg-primary rounded-md hover:bg-opacity-80"
                >
                  Post comment
                </button>
              </div>
            </form>
            {comments ? (
              comments.map((comment) => (
                <Comment
                  comment={comment}
                  currentUser={currentUser}
                  colorTheme={colorTheme}
                  postId={postId}
                />
              ))
            ) : (
              <></>
            )}
          </section>
        </motion.div>
      </div>
    );
  }
}

const Comment = ({ comment, currentUser, colorTheme, postId }) => {
  const [editComment, setEditComment] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const handleDeleteComment = async () => {
    const jwt = localStorage.getItem("token");
    const response = await toast.promise(
      axios.delete(
        `${process.env.REACT_APP_BASE_URL}/comments/${postId}/${comment.comment_id}`,
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
          data: {
            username: currentUser.username,
          },
        }
      ),
      {
        pending: "Processing, Please Wait...",
        success: "Comment deleted successfully",
        error: "Something Went Wrong",
      },
      {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        hideProgressBar: true,
        theme: colorTheme === "dark" ? "dark" : "light",
      }
    );
    setTimeout(() => window.location.reload(), 2000);
  };
  const handleUpdateComment = async () => {
    const jwt = localStorage.getItem("token");
    const response = await toast.promise(
      axios.put(
        `${process.env.REACT_APP_BASE_URL}/update_comment/${comment.comment_id}`,
        {
          text: editText,
          username: currentUser?.username,
        },
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
        // { withCredentials: true }
      ),
      {
        pending: "Processing, Please Wait...",
        success: "Comment updated successfully",
        error: "Something Went Wrong",
      },
      {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        hideProgressBar: true,
        theme: colorTheme === "dark" ? "dark" : "light",
      }
    );
    setTimeout(() => window.location.reload(), 2000);
  };
  return (
    <article class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-800">
      <footer class="flex justify-between items-center mb-2">
        <div class="flex items-center">
          <p
            onClick={() => navigate(`/home/Profile/${user.id}`)}
            class="cursor-pointer inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"
          >
            <img
              class="mr-2 w-8 h-8 rounded-full"
              src={
                comment.profile_photo !== ""
                  ? comment.profile_photo
                  : "/no_image.jpg"
              }
              alt={comment.author}
            />
            {comment.author}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            <span>{moment(comment.date_of_creation).fromNow()}</span>
          </p>
        </div>
      </footer>
      {editComment ? (
        <textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="w-full text-base p-2 rounded-lg text-gray-900 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800 border-b border-gray-400"
        />
      ) : (
        <p className="py-2">{comment.text}</p>
      )}

      {comment.author === currentUser.username && editComment === false ? (
        <div className="mt-4">
          <span
            onClick={() => setEditComment(true)}
            className="cursor-pointer hover:underline text-base font-bold text-blue-500"
          >
            Edit
          </span>
          <span
            onClick={handleDeleteComment}
            className="cursor-pointer hover:underline text-base font-bold ml-5 text-red-500"
          >
            Delete
          </span>
        </div>
      ) : (
        <></>
      )}
      {editComment && (
        <div className="mt-4">
          <span
            onClick={() => setEditComment(false)}
            className="cursor-pointer hover:underline text-base font-bold  text-red-500"
          >
            Close
          </span>
          <span
            onClick={handleUpdateComment}
            className="cursor-pointer hover:underline ml-5 text-base font-bold text-primary"
          >
            Save
          </span>
        </div>
      )}
    </article>
  );
};
