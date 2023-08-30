import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { TempData } from "../TempData";
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";
import moment from "moment";

export default function SinglePost({colorTheme}) {
    const { postId } = useParams();
    const [post, setPost] = useState()
    // var post = TempData.filter(function (x) {
    //   x.id == postId;
    // });
    useEffect(
      () =>
        setPost(TempData.find(post => post.id==postId)
        ),
      [postId]
    );
    // console.log(TempData.find(post => post.id==postId))
    if (!post) {
        return <div>Loading</div>;
    } else {
        return (
          <div className="relative z-0 font-body">
            <base href="/" />
            <motion.div
              className="md:w-3/5 w-full lg:ml-96"
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
                <div className="font-bold font-header text-3xl md:text-4xl px-3 md:px-0">
                  {post.heading}
                </div>
                {/* <div class="items-center space-x-4 md:hidden flex">
                  <div class="flex-1 min-w-0 flex flex-row gap-4">
                    <span className="font-light text-sm text-gray-400">
                      Published on {moment(post.date).format("MMMM Do, YYYY")}
                    </span>
                  </div>
                </div> */}
                <a class="text-lg truncate">
                  <span className="hover:underline hover:cursor-pointer font-base px-3 md:px-0">
                    {post.author}
                  </span>
                  <span className="ml-3 font-light text-sm text-gray-400">
                    {moment(post.date).format("DD MMMM YYYY")}
                  </span>
                </a>

                <div className="flex md:flex-row justify-between mb-5 px-3 md:px-0">
                  <div>
                    <div className="flex flex-row justify-start gap-3">
                      {post.tags.map((tag, id) => (
                        <span
                          key={id}
                          className="rounded-full text-center text-sm bg-secondary_assent text-white p-2"
                        >
                          {tag}
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
                    src={post.imageUrl}
                    alt="classroom"
                  />
                </div>

                <div
                  className="text-base mt-10 pb-10 border-b border-gray-400 px-3 md:px-0"
                  data-color-mode={`${
                    colorTheme === "dark" ? "light" : "dark"
                  }`}
                >
                  <MDEditor.Markdown
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      whiteSpace: "pre-wrap",
                      marginTop: "20px",
                      backgroundColor: "transparent",
                    }}
                    source={post.description}
                  />
                  <div className="flex flex-row md:justify-normal justify-evenly gap-5 mt-8 px-3 md:px-0 items-center">
                    <div className="flex flex-row divide-x-2 divide-gray-600 rounded-xl bg-gray-200 dark:bg-gray-800 items-center p-3 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7 mr-5 hover:cursor-pointer hover:scale-105"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                        />
                      </svg>
                      <span className="text-center pl-5 text-gray-500">123</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <section class="not-format px-3 md:px-0">
                <div class="flex flex-row justify-between items-center mb-6">
                  <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    Discussion
                  </h2>
                </div>
                <form class="mb-6">
                  <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label for="comment" class="sr-only">
                      Your comment
                    </label>
                    <textarea
                      id="comment"
                      rows="6"
                      class="w-full text-sm p-4 text-gray-900 p dark:text-white dark:placeholder-gray-400 dark:bg-gray-800 border-b border-gray-400"
                      placeholder="Write a comment..."
                      required
                    ></textarea>
                    <button
                      type="submit"
                      class="inline-flex items-end py-2.5 px-4 text-xs font-medium text-white bg-primary rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                      Post comment
                    </button>
                  </div>
                </form>

                <article class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                  <footer class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                      <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <img
                          class="mr-2 w-6 h-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                          alt="Michael Gough"
                        />
                        Michael Gough
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        <time
                          pubdate
                          datetime="2022-02-08"
                          title="February 8th, 2022"
                        >
                          {moment("Feb. 8, 2022").format("DD MMMM YYYY")}
                        </time>
                      </p>
                    </div>
                    {/* <button
                      id="dropdownComment1Button"
                      data-dropdown-toggle="dropdownComment1"
                      class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      type="button"
                    >
                      <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      </svg>
                      <span class="sr-only">Comment settings</span>
                    </button> */}
                    <div
                      id="dropdownComment1"
                      class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <ul
                        class="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton"
                      >
                        <li>
                          <a
                            href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Remove
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Report
                          </a>
                        </li>
                      </ul>
                    </div>
                  </footer>
                  <p>
                    Very straight-to-point article. Really worth time reading.
                    Thank you! But tools are just the instruments for the UX
                    designers. The knowledge of the design tools are as
                    important as the creation of the design strategy.
                  </p>
                  <div class="flex items-center mt-4 space-x-4 gap-2">
                    <button
                      type="button"
                      class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
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
                          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                        />
                      </svg>
                    </button>
                    23
                  </div>
                </article>

                {/* <article class="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                  <footer class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                      <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <img
                          class="mr-2 w-6 h-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                          alt="Jese Leos"
                        />
                        Jese Leos
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        <time
                          pubdate
                          datetime="2022-02-12"
                          title="February 12th, 2022"
                        >
                          {moment("Feb. 8, 2022").format("DD MMMM YYYY")}
                        </time>
                      </p>
                    </div>
                    <button
                      id="dropdownComment2Button"
                      data-dropdown-toggle="dropdownComment2"
                      class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      type="button"
                    >
                      <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      </svg>
                      <span class="sr-only">Comment settings</span>
                    </button>
                    <div
                      id="dropdownComment2"
                      class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <ul
                        class="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton"
                      >
                        <li>
                          <a
                            href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Remove
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Report
                          </a>
                        </li>
                      </ul>
                    </div>
                  </footer>
                  <p>Much appreciated! Glad you liked it ☺️</p>
                  <div class="flex items-center mt-4 space-x-4">
                    <button
                      type="button"
                      class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                    >
                      <svg
                        aria-hidden="true"
                        class="mr-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        ></path>
                      </svg>
                      Reply
                    </button>
                  </div>
                </article> */}
              </section>
            </motion.div>
          </div>
        );
    }
}