import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { TempData } from "../TempData";
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";
import moment from "moment";

export default function SinglePost() {
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
          <div className="md:mt-5 mt-14 relative z-0 font-body">
            <base href="/" />
            <div className="md:w-5/12 w-full mx-auto mt-10 ">
              <div className="md:max-w-6xl max-w-sm mx-auto mb-10 mt-32 flex flex-col gap-5 px-3">
                <div className="text-center font-bold text-3xl">
                  "{post.heading}"
                </div>
                <span className="text-center font-light text-sm">
                  Published on {moment(post.date).format("MMMM Do YYYY, hh:mm")}
                </span>
                <div className="flex flex-row justify-center gap-3">
                  {post.tags.map((tag) => (
                    <span className="rounded-lg text-center text-sm bg-secondary_assent text-white p-2">
                      {tag}
                    </span>
                  ))}
                </div>
                <div>
                  <img
                    className="object-contain h-96 mx-auto"
                    src={post.imageUrl}
                    alt="classroom"
                  />
                </div>
                <div className="text-base">
                  <MDEditor.Markdown
                                style={{
                                    fontFamily: "Play , sans-serif",
                                    whiteSpace: 'pre-wrap',
                                }}
                                className="bg-gray-200"
                    source={post.description}
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
}