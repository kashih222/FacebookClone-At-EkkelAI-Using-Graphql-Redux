import { Camera, LogOut, Logs, MessageCircleQuestionMark, MessageSquareDot, Moon, Settings, UserRoundPen, X, } from "lucide-react";
import { FaBell, FaCaretDown, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateStoryPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<"photo" | "text" | null>(
    null
  );

  const handleBack = () => {
    navigate(-1);
  };

 

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <div className="w-90 h-screen bg-[#FFFFFF] flex-col shadow-lg">
        <div className="px-3 py-2 flex items-center justify-start w-full gap-2 shadow-sm">
          <div>
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="font-medium">
                  <X className="text-white" />
                </span>
              </div>
            </button>
          </div>
          <div className="">
            <Link to="/" className="flex items-center space-x-2">
              <FaFacebook className="text-blue-600 text-4xl h-10 w-10" />
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-4">
          <div>
            <p className="font-bold text-2xl">Your Story</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <Settings />
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-4 border-b border-b-gray-300">
          <div className="w-14 h-14 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            K
          </div>
          <div className="cursor-pointer">
            <p className="font-medium text-xl">Kasinu Mənka</p>
            <p className="text-sm text-gray-500">Your story</p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className=" h-14 px-4 flex items-center justify-end">
          {/* Right Section: User Actions */}
          <div className="flex items-center space-x-2">
            <button className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full hover:bg-gray-200 text-gray-700 relative cursor-pointer">
              <Logs className="text-xl" />
            </button>
           

            <button className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full hover:bg-gray-200 text-gray-700 relative cursor-pointer">
              <FaBell className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                5
              </span>
            </button>

            {/* Account Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1 cursor-pointer">
                <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  U
                </div>
                <FaCaretDown className="hidden lg:inline text-gray-500" />
              </button>

              {/* Account Dropdown */}
              <div className="absolute right-0 mt-2 w-64 bg-[#FDFDFD] rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex flex-col gap-4 bg-[#F2F2F2] p-4 rounded-xl">
                    <div className="flex items-center gap-2.5 bg-[#F2F2F2]">
                      <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        U
                      </div>
                      <div className="cursor-pointer">
                        <p className="font-semibold">User Name</p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex items-center bg-[#D6D9DD] rounded-xl gap-4 p-4 cursor-pointer">
                      <div>
                        <UserRoundPen />
                      </div>
                      <div className="font-medium">See all profiles</div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100 my-1"></div>

                <div className="py-2">
                  <button className="w-full flex items-center px-4 py-2 hover:bg-[#F2F2F2] text-left">
                    <Settings className="text-black mr-3" />
                    <span className="font-medium text-gray-700">
                      Settings & Privacy
                    </span>
                  </button>
                  <button className="w-full flex items-center px-4 py-2 hover:bg-[#F2F2F2] text-left">
                    <MessageCircleQuestionMark className="text-black mr-3" />
                    <span className="font-medium text-gray-700">
                      Help & Support
                    </span>
                  </button>
                  <button className="w-full flex items-center px-4 py-2 hover:bg-[#F2F2F2] text-left">
                    <Moon className="text-black mr-3" />
                    <span className="font-medium text-gray-700">
                      Display & accessibility
                    </span>
                  </button>
                  <button className="w-full flex items-center px-4 py-2 hover:bg-[#F2F2F2] text-left">
                    <MessageSquareDot className="text-black mr-3" />
                    <div className="flex flex-col mr-3">
                      <span className="font-medium text-gray-700">
                        Give feedback
                      </span>
                      <span className=" text-sm text-gray-700">CTRL B</span>
                    </div>
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full flex items-center px-4 py-2 hover:bg-red-500 hover:text-white text-left"
                  >
                    <LogOut className="mr-3" />
                    <span className="font-medium">Log Out</span>
                  </button>
                  <div className="flex flex-wrap gap-2 py-2 px-4 text-sm text-gray-700">
                    <a className="hover:underline" href="">
                      Terms
                    </a>
                    <a className="hover:underline" href="">
                      Advertising
                    </a>
                    <a className="hover:underline" href="">
                      Ad choice
                    </a>
                    <a className="hover:underline" href="">
                      Privacy
                    </a>
                    <a className="hover:underline" href="">
                      Cookies
                    </a>
                    <a href="">More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className=" flex items-center justify-center h-[calc(100vh-100px)] gap-4">
          <div
            onClick={() => setSelectedOption("photo")}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all w-60 h-80 flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-500 ${
              selectedOption === "photo"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-3xl text-black"><Camera/></span>
              </div>
            </div>
          </div>

          {/* Text Story Option */}
          <div
            onClick={() => setSelectedOption("text")}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all  w-60 h-80 flex items-center justify-center bg-linear-to-r from-pink-500 to-purple-500 ${
              selectedOption === "text"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <span className="text-3xl text-black">Aa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryPage;
