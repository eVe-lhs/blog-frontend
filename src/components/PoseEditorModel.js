import { motion,AnimatePresence } from "framer-motion";
import { useEffect, useState,useRef, useContext } from "react";
import MDEditor from "@uiw/react-md-editor";
import PreviewPost from "../pages/PreviewPost";
import { topics } from "../constants/Interests";
import { toast } from "react-toastify";
import { ModelDataContext, UserContext } from "../App";
import axios from "axios";

const PoseEditorModal = ({ showModal, setShowModal,colorTheme }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [tags, setTags] = useState([])
  const [showPreview,setShowPreview] = useState(false)
  const coverImg = useRef(null)
  const { modalData, setModalData } = useContext(ModelDataContext)
  const { currentUser } = useContext(UserContext)
  const inputField = useRef(null)
  useEffect(() => {
    setTitle(modalData?.title)
    setContent(modalData?.content)
    setTags(modalData?.tags)
  }, [modalData, showModal])
  
  useEffect(() => {
    setTags(modalData?.tags)
  },[modalData])

  useEffect(() => {
    if(showModal)
     setImgUrl(
       selectedImage ? URL.createObjectURL(selectedImage) : modalData?.post_photo
      );
    else
      setImgUrl('')
  },[selectedImage,modalData,showModal])
  // console.log(imgDom)
    // This function will be triggered when the file field change
    const imageChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0]);
      }
  };
  const handlePublish = async () => {
    if ((modalData?.status !== 'Draft' && selectedImage === '') || content === '' || title === '') {
      alert('Please fill all the fields')
    }
    else if (tags.length === 0) {
      alert('Please Choose at least one tag')
    }
    else {
      try {
        const formData = new FormData();
        formData.append('title', title)
        formData.append('content', content)
        formData.append("tags", JSON.stringify(tags));
        formData.append('post_photo', selectedImage)
        formData.append('status', 'Posted')
        if (modalData?.status != 'Draft') {
          const { data } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/posts/${currentUser.id}`,
            formData
            // { withCredentials: true }
          );
          setTitle('');
          setContent('');
          setTags('');
          setSelectedImage('');
          inputField.current.value = null;
          setImgUrl('')
          toast.success(data.message, {
            position: "top-center",
            hideProgressBar: false,
            pauseOnHover: true,
            theme: colorTheme === "dark" ? "light" : "dark",
          });
          setShowModal(false)
        }
        else {
          const { data } = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/update_post/${modalData?.id}`,
          formData
          // { withCredentials: true }
          );
          setTitle('');
          setContent('');
          setTags('');
          setSelectedImage('');
          inputField.current.value = null;
          setImgUrl('')
        toast.success("Published the draft post", {
          position: "top-center",
          hideProgressBar: false,
          pauseOnHover: true,
          theme: colorTheme === "dark" ? "light" : "dark",
        })
      setShowModal(false)
    } 
      }
      catch (err) {
      alert(err.response.data.err)
    }
    }
  }
  const handleSaveDraft = async () => {
     if (content === "" && title === "" && selectedImage === "") {
       alert("Please fill at least one field");
     }
       try {
         const formData = new FormData();
         formData.append("title", title);
         formData.append("content", content);
         formData.append("tags", JSON.stringify(tags));
         formData.append("post_photo", selectedImage);
         formData.append("status", "Draft");
         if (modalData?.status != "Draft") {
           const { data } = await axios.post(
             `${process.env.REACT_APP_BASE_URL}/posts/${currentUser.id}`,
             formData
             // { withCredentials: true }
           );
           setTitle("");
           setContent("");
           setTags("");
           setSelectedImage("");
           inputField.current.value = null;
           setImgUrl("");
           toast.success("Saved To drafts", {
             position: "top-center",
             hideProgressBar: false,
             pauseOnHover: true,
             theme: colorTheme === "dark" ? "light" : "dark",
           });
           setShowModal(!showModal)
         } else {
           const { data } = await axios.put(
             `${process.env.REACT_APP_BASE_URL}/update_post/${modalData?.id}`,
             formData
             // { withCredentials: true }
           );
           setTitle("");
           setContent("");
           setTags("");
           setSelectedImage("");
           inputField.current.value = null;
           setImgUrl("");
           toast.success("Updated the draft", {
             position: "top-center",
             hideProgressBar: false,
             pauseOnHover: true,
             theme: colorTheme === "dark" ? "light" : "dark",
           });
           setShowModal(false);
         }
       } catch (err) {
         alert(err.response.data.err);
       }
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
              <div className="relative my-6 mx-auto md:w-4/5 w-full md:h-auto">
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
                          ref={inputField}
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
                      <Interests selectedTags={tags} setInterests={setTags} /> 
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
                  <div class="md:block hidden w-full mb-5">
                    <label
                      class="block uppercase ml-8 tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2"
                      htmlFor="content"
                    >
                      Post Content
                    </label>
                    <MDEditor
                      className="overflow-x-auto shadow mx-8  bg-gray-200 dark:text-white dark:bg-gray-800 border-black mt-1 block  border rounded md:max-w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        setModalData("")
                        setImgUrl("")
                        inputField.current.value = null;
                        setShowModal(false);
                      }}
                    >
                      Close
                    </button>
                    <div>
                      <button
                        className="text-primary border-2 border-primary rounded  background-transparent font-bold uppercase px-2 md:px-6 py-2 text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSaveDraft}
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

const Interests = ({ selectedTags,setInterests }) => {
  const { modalData } = useContext(ModelDataContext)
    let selectedIds = [];
    modalData?.tags?.map((selectedTag) => {
      selectedIds.push(topics.findIndex((topic) => topic.id === selectedTag) + 1);
    });
    useEffect(() => {
      setInterests(selectedIds);
    }, [modalData]);
    // console.log(selected)
    const toggleClass = (topicId, topicName) => {
      if (!selectedTags.includes(topicId) && selectedTags.length < 3) {
        setInterests([...selectedTags, topicId]);
      } else
        setInterests((current) =>
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
                scale: selectedTags?.length < 3 ? 0.95 : 1,
                transition: {
                  type: "spring",
                  stiffness: 250,
                  damping: 10,
                  duration: 0.2,
                },
              }}
              onClick={() => toggleClass(topic.id, topic.name)}
              key={topic.id}
              className={`md:rounded-lg rounded-full ${selectedTags?.includes(topic.id)
                  ? "border-primary border-2 text-primary"
                  : "border-gray-400 border-2 text-gray-400"
                }
              ${selectedTags?.length < 3
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