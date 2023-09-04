import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { TempData } from "../TempData";
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";
import moment from "moment";
import { topics } from "../constants/Interests";

export default function PreviewPost({ colorTheme,heading,tags,imageUrl,description,setShowPreview }) {
  // console.log(TempData.find(post => post.id==postId))
    return (
      <div className="fixed inset-0 overflow-auto z-50 bg-gray-200 dark:bg-gray-800">
        <div className= "w-full h-20 bg-gray-300 flex flex-row justify-between">
          <span className="text-red-500 font-bold m-3 ml-10 text-3xl">
            (Post in Preview)
          </span>
          <span
            className="text-red-500 font-bold m-3 mr-10  hover:cursor-pointer text-3xl"
            onClick={() => setShowPreview(false)}
          >
            X
          </span>
        </div>
        <motion.div
          className="md:w-3/5 w-full lg:ml-96 mt-16"
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
              {heading ? heading : <>(No Heading)</>}
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
                By : Author_Name
              </span>
              <span className="ml-3 font-light text-sm text-gray-400">
                {moment(Date.now()).format("DD MMMM YYYY")}
              </span>
            </a>

            <div className="flex md:flex-row justify-between mb-5 px-3 md:px-0">
              <div>
                <div className="flex flex-row justify-start gap-3">
                  {tags?.map((tag, id) => (
                    <span
                      key={id}
                      className="rounded-full text-center text-sm bg-secondary_assent text-white p-2"
                    >
                      {topics.find(topic => topic.id===tag).name}
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
                src={imageUrl}
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
                source={description}
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
