import { BookImage, Globe, Smile, Video } from "lucide-react";
import { useState } from "react";

const CreatePost = () => {
  const [showModal, setShowModal] = useState(false);
  const [postText, setPostText] = useState("");
  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState("Public");

  const options = ["Public", "Private", "Only me"];

  const handlePostSubmit = () => {
    if (postText.trim()) {
      console.log("Post submitted:", postText);
      setPostText("");
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex items-center gap-2  w-full">
        <div className="flex items-center space-x-3 w-full">
          <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            U
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 text-left w-full cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full px-4 py-3 transition-colors"
          >
            <span className="font-medium">What's on your mind, Unstop?</span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className={` text-red-500`}>
                <Video className="w-10 h-10 cursor-pointer" />
              </span>
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className={`text-xl text-green-500`}>
                <BookImage className="w-8 h-8 cursor-pointer" />
              </span>
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className={`text-xl text-yellow-500`}>
                <Smile className="w-8 h-8 cursor-pointer" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-xl">
            <div className="p-4 border-b border-gray-300 flex  items-center w-full">
              <h2 className="text-xl font-bold text-gray-800 w-full text-center">
                Create Post
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
              >
                &times;
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  U
                </div>
                <div className="relative inline-block">
                  <p className="font-semibold">Unstop Sale</p>

                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center cursor-pointer space-x-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm mt-1"
                  >
                    <span className="text-gray-600"><Globe className="w-4 h-4"/></span>
                    <span className="font-medium text-gray-700">
                      {visibility}
                    </span>
                    <span className="text-gray-500">▼</span>
                  </button>

                  {open && (
                    <div className="absolute mt-2 w-32 bg-white border rounded-lg  shadow-md z-10 ">
                      {options.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setVisibility(option);
                            setOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What's on your mind, Unstop?"
                className="w-full h-48 p-3 text-lg border-0 focus:outline-none resize-none placeholder-gray-500"
                autoFocus
              />
            </div>

            <div className="p-4 border-t border-gray-300">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className={` text-red-500`}>
                <Video className="w-10 h-10" />
              </span>
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                  <span className={`text-xl text-green-500`}>
                <BookImage className="w-8 h-8" />
              </span>
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                   <span className={`text-xl text-yellow-500`}>
                <Smile className="w-8 h-8" />
              </span>
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePostSubmit}
                    disabled={!postText.trim()}
                    className={`px-6 py-2 rounded-md font-bold ${
                      postText.trim()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
