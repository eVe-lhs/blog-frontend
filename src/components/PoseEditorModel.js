import { motion,AnimatePresence } from "framer-motion";
import { useEffect, useState,useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import PreviewPost from "../pages/PreviewPost";

const topics = [
  {
    id: 1,
    name: "Science",
    
  },
  {
    id: 2,
    name: "Sports",
    
  },
  {
    id: 3,
    name: "Music",
    
  },
  {
    id: 4,
    name: "Movies",
    
  },
  {
    id: 5,
    name: "Computer Science",
    
  },
  {
    id: 6,
    name: "AI",
    
  },
  {
    id: 7,
    name: "Agriculture",
    
  },
  {
    id: 8,
    name: "Medical Science",
    
  },
  {
    id: 9,
    name: "Celebrity",
    
  },
  {
    id: 10,
    name: "Politics",
    
  },
  {
    id: 11,
    name: "Animals",
    
  },
  {
    id: 12,
    name: "Natural Disasters",
    
  },
];

// function getBase64Image(img) {
//   var canvas = document.createElement("canvas");
//   canvas.width = img.width;
//   canvas.height = img.height;
//   var ctx = canvas.getContext("2d");
//   ctx.drawImage(img, 0, 0);
//   var dataURL = canvas.toDataURL("image/png");
//   return dataURL.replace(/^data:image\/?[A-z]*;base64,/);
// }

const PoseEditorModal = ({ showModal, setShowModal,modalData,colorTheme }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [date, setDate] = useState('')
  const [tags, setTags] = useState()
  const [showPreview,setShowPreview] = useState(false)
  
  const coverImg = useRef(null)

  useEffect(() => {
    setTitle(modalData?.heading)
    setContent(modalData?.description)
    setDescription(modalData?.text)
    setAuthor(modalData?.author)
    setDate(modalData?.date)
    setTags(modalData?.tags)
  }, [modalData,showModal])
  useEffect(() => {
     setImgUrl(
       selectedImage ? URL.createObjectURL(selectedImage) : modalData?.imageUrl
    );
  },[selectedImage,modalData,showModal])
  // console.log(imgDom)
    // This function will be triggered when the file field change
    const imageChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0]);
      }
  };
  const handlePublish = () => {

  }

  return (
    <>
      <AnimatePresence>
        {showModal ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none md:h-auto"
            >
              <div className="relative my-6 mx-auto md:w-2/3 w-full md:h-auto">
                {/*content*/}

                <div className="md:flex border-0  relative flex flex-col w-full bg-white dark:bg-gray-900 outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Constructing Post
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="md:flex md:flex-row flex-col overflow-y-auto justify-between md:max-h-none max-h-96">
                    <div className="relative p-6 flex-auto">
                      <div class="w-full px-3">
                        <label
                          class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                          htmlFor="title"
                        >
                          Post Title
                        </label>
                        <input
                          class="appearance-none block w-full bg-gray-200 dark:text-white dark:bg-gray-800 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="title"
                          type="text"
                          maxLength={100}
                          placeholder="Write the title of the article"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div class="w-full px-3">
                        <label
                          class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                          htmlFor="image"
                        >
                          Post Cover Image
                        </label>
                        <input
                          class="appearance-none block w-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="image"
                          accept="image/*"
                          type="file"
                          onChange={imageChange}
                          placeholder="Write the title of the article"
                        />
                        {imgUrl && (
                          <div className="mt-3 flex flex-col mb-2">
                            <label
                              class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                              htmlFor="image"
                            >
                              Currently selected image
                            </label>
                            <img
                              ref={coverImg}
                              src={imgUrl}
                              className="w-2/3 max-h-52"
                              alt="Thumb"
                            />
                          </div>
                        )}
                      </div>
                      <div class="md:hidden block w-full px-3">
                        <label
                          class="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2"
                          htmlFor="content"
                        >
                          Post Content
                        </label>
                        <MDEditor
                          className="overflow-x-auto shadow bg-gray-200 dark:text-white dark:bg-gray-800 border-black mt-1 block  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Textarea"
                          value={content}
                          onChange={setContent}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col p-6">
                      <div class="w-full px-3">
                        <label
                          class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                          htmlFor="title"
                        >
                          Post Description
                        </label>
                        <input
                          class="appearance-none block w-full bg-gray-200 dark:text-white dark:bg-gray-800 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="title"
                          type="text"
                          maxLength={100}
                          placeholder="Write the title of the article"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <Interests selectedTags={tags} setTags={setTags} />
                      <button
                        className="text-secondary_assent mt-5 hover:underline underline-offset-2 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          // setShowModal(false)
                          setShowPreview(true);
                        }}
                      >
                        Preview Post before upload
                      </button>
                    </div>
                  </div>
                  <div class="md:block hidden w-full ml-8 mb-5">
                    <label
                      class="block uppercase text-center tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2"
                      htmlFor="content"
                    >
                      Post Content
                    </label>
                    <MDEditor
                      className="overflow-x-auto shadow mx-auto bg-gray-200 dark:text-white dark:bg-gray-800 border-black mt-1 block  border rounded max-w-3xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Textarea"
                      value={content}
                      onChange={setContent}
                      required
                    />
                  </div>
                  {/*footer*/}
                  <div className="flex flex-row justify-between items-center p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setContent("");
                        setDescription("");
                        setTitle("");
                        setSelectedImage("");
                        setShowModal(false);
                      }}
                    >
                      Close
                    </button>
                    <div>
                      <button
                        className="text-primary border-2 border-primary rounded  background-transparent font-bold uppercase px-2 md:px-6 py-2 text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Save to Draft
                      </button>
                      <button
                        className="bg-primary text-white active:bg-secondary font-bold uppercase text-sm px-2 md:px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handlePublish}
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="fixed inset-0 z-40 bg-black dark:bg-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
            ></motion.div>
          </>
        ) : null}
      </AnimatePresence>
      {showPreview ? (
        <PreviewPost
          colorTheme={colorTheme}
          heading={title}
          author={author}
          date={date}
          tags={tags}
          imageUrl={imgUrl}
          description={content}
          setShowPreview={setShowPreview}
        />
      ) : (
        <></>
      )}
    </>
  );
};

const Interests = ({selectedTags,setTags}) => {
  const [selected, setSelected] = useState([]);
  let selectedIds = []
  selectedTags?.map(selectedTag => {
    selectedIds.push(topics.findIndex(topic => topic.name === selectedTag
    )+1)
  })
  useEffect(() => {
    setSelected(selectedIds)
  }, [selectedTags])
  // console.log(selected)
  const toggleClass = (topicId,topicName) => {
    setTags([...selectedTags, topicName]);
    if (!selected.includes(topicId) && selected.length < 3) {
      setSelected([...selected, topicId])
    }
    else
      setSelected((current) =>
        current.filter((id) => {
          return id !== topicId;
        })
      );
  };
  return (
    <div className="p-3 grid items-center">
      <label
        class="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2"
        htmlFor="content"
      >
        Your Tags (Select Up to 3):
      </label>
      <motion.div
        transition={{ duration: 0.3 }}
        className="md:grid md:grid-flow-row md:gap-2 gap-3 md:grid-cols-3 flex flex-wrap justify-start md:justify-center md:mt-0 my-auto"
        exit={{ opacity: 0 }}
      >
        {topics.map((topic) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                type: "tween",
                stiffness: 200,
                damping: 20,
                delay: topic.id * 0.15,
              },
            }}
            exit={{
              opacity: 0,
              y: 10,
              transition: {
                type: "tween",
                stiffness: 200,
                damping: 20,
                delay: topic.id * 0.15,
              },
            }}
            whileTap={{
              scale: selected.length<3? 0.95 : 1,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 10,
                duration: 0.2,
              },
            }}
            onClick={() => toggleClass(topic.id,topic.name)}
            key={topic.id}
            className={`md:rounded-lg rounded-full ${
              selected.includes(topic.id)
                ? "border-primary border-2 text-primary"
                : "border-gray-400 border-2 text-gray-400"
            }
              ${
                selected.length < 3
                  ? "md:hover:bg-primary md:hover:border-primary md:hover:text-white hover:cursor-pointer"
                  : ""
              }  md:w-auto md:px-1 md:py-2 p-2 md:text-base text-xs fill-none text-center transition-colors duration-300 
             grid items-center justify-center `}
          >
            {topic.name}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};


export default PoseEditorModal