import {
  Camera,
  LogOut,
  Logs,
  MessageCircleQuestionMark,
  MessageSquareDot,
  Moon,
  Settings,
  UserRoundPen,
  X,
  Menu,
} from "lucide-react";
import { FaBell, FaCaretDown, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/hooks";
import { fetchMe, clearUser } from "../../Redux Toolkit/slices/userSlice";
import { LOGOUT_MUTATION } from "../../GraphqlOprations/mutations";

const CreateStoryPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<"photo" | "text" | null>(
    null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useAppDispatch();
  const me = useAppSelector((s) => s.user.user);
  const displayName = me ? `${me.firstName} ${me.surname}` : "User";
  const initials = displayName
    .split(" ")
    .map((p) => p[0]?.toUpperCase() || "")
    .join("")
    .slice(0, 2);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <div className=" bg-gray-100 flex">
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className=" fixed top-2 left-66 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Left Sidebar */}
      <div
        className={`fixed top-0 h-screen ${
          isSidebarOpen ? "w-80" : "w-16"
        } bg-[#FFFFFF] flex-col shadow-lg lg:sticky z-40 transition-all duration-300 ${
          isSidebarOpen ? "left-0" : "-left-full lg:left-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className=" w-full px-3 py-2 flex items-center justify-start  gap-2 shadow-sm">
          <div className="flex items-center justify-center gap-2
          ">
            <div className="">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center shrink-0">
                <span className="font-medium">
                  <X className="text-white" />
                </span>
              </div>
            </button>
          </div>
          <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
            <Link to="/" className="flex items-center space-x-2">
              <FaFacebook className="text-blue-600 text-4xl h-10 w-10" />
            </Link>
          </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex items-center justify-between px-3 py-4">
          <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
            <p className="font-bold text-2xl">Your Story</p>
          </div>

          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
            <Settings />
          </div>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-2 px-3 py-4 border-b border-b-gray-300">
          <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
            {initials}
          </div>
          <div
            className={`${isSidebarOpen ? "block" : "hidden"} cursor-pointer`}
          >
            <p className="font-medium text-xl truncate">{displayName}</p>
            <p className="text-sm text-gray-500">Your story</p>
          </div>
        </div>

        <div className={`${isSidebarOpen ? "block" : "hidden"} px-3 py-4`}>
          <p className="text-gray-600">Create a story to share with friends</p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 `}>
        {/* Header */}
        <header className="fixed top-0 w-full h-14 px-4 flex items-center justify-between lg:justify-end bg-white shadow-sm">
          {/* Mobile Header Title */}
          <div className="lg:hidden">
            <h1 className="text-xl font-bold">Create Story</h1>
          </div>

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
                  {initials}
                </div>
                <FaCaretDown className="hidden lg:inline text-gray-500" />
              </button>

              {/* Account Dropdown */}
              <div className="absolute right-0 mt-2 w-64 bg-[#FDFDFD] rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex flex-col gap-4 bg-[#F2F2F2] p-4 rounded-xl">
                    <Link to={"/myprofile"}>
                      <div className="flex items-center gap-2.5 bg-[#F2F2F2]">
                        <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {initials}
                        </div>
                        <div className="cursor-pointer">
                          <p className="font-semibold">{displayName}</p>
                        </div>
                      </div>
                    </Link>
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
                    onClick={async () => {
                      try {
                        const res = await fetch(
                          import.meta.env.VITE_GRAPHQL_URL,
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            credentials: "include",
                            body: JSON.stringify({ query: LOGOUT_MUTATION }),
                          }
                        );
                        const json = await res.json();
                        if (json.errors && json.errors.length) {
                          console.error(
                            json.errors[0].message || "Logout failed"
                          );
                        }
                      } catch {
                        console.error("Network error during logout");
                      } finally {
                        dispatch(clearUser());
                        navigate("/login");
                      }
                    }}
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
        <div className="p-4 lg:p-8  mt-22 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Story Options */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 min-h-[calc(100vh-200px)]">
              {/* Photo Story Option */}
              <div
                onClick={() => setSelectedOption("photo")}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all w-full lg:w-80 h-80 flex flex-col items-center justify-center bg-linear-to-r from-blue-500 to-purple-500 hover:scale-[1.02] ${
                  selectedOption === "photo"
                    ? "border-blue-500 ring-4 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <span className="text-3xl text-black">
                      <Camera />
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Photo Story
                </h3>
                <p className="text-white/80 text-center px-4">
                  Share a photo or video with your friends
                </p>
                {selectedOption === "photo" && (
                  <button className="mt-6 px-6 py-2 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors">
                    Create Photo Story
                  </button>
                )}
              </div>

              {/* Text Story Option */}
              <div
                onClick={() => setSelectedOption("text")}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all w-full lg:w-80 h-80 flex flex-col items-center justify-center bg-linear-to-r from-pink-500 to-purple-500 hover:scale-[1.02] ${
                  selectedOption === "text"
                    ? "border-pink-500 ring-4 ring-pink-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <span className="text-3xl text-black font-bold">Aa</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Text Story
                </h3>
                <p className="text-white/80 text-center px-4">
                  Share your thoughts with colorful text
                </p>
                {selectedOption === "text" && (
                  <button className="mt-6 px-6 py-2 bg-white text-pink-600 font-semibold rounded-full hover:bg-gray-100 transition-colors">
                    Create Text Story
                  </button>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {selectedOption
                  ? `You've selected ${
                      selectedOption === "photo" ? "Photo" : "Text"
                    } story. Click the button above to create.`
                  : "Click on a story type to get started"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryPage;
