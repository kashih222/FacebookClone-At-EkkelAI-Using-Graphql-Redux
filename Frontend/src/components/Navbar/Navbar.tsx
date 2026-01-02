import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaSearch,
  FaHome,
  FaPlayCircle,
  FaStore,
  FaUsers,
  FaGamepad,
  FaBell,
  FaCommentDots,
  FaCaretDown,
} from "react-icons/fa";
import {
  LogOut,
  Logs,
  MessageCircleQuestionMark,
  MessageSquareDot,
  Moon,
  Settings,
  UserRoundPen,
} from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const navItems = [
    { icon: <FaHome className="text-2xl text-[#606366]" />, label: "Home", active: true },
    { icon: <FaUsers className="text-2xl text-[#606366]" />, label: "Groups" },
    { icon: <FaPlayCircle className="text-2xl text-[#606366]" />, label: "Watch" },
    { icon: <FaStore className="text-2xl text-[#606366]" />, label: "Marketplace" },
    { icon: <FaGamepad className="text-2xl text-[#606366]" />, label: "Gaming" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className=" mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left Section: Logo & Search */}
          <div className="flex items-center space-x-2 flex-1">
            <Link to="/" className="flex items-center space-x-2">
              <FaFacebook className="text-blue-600 text-4xl" />
            </Link>

            <form
              onSubmit={handleSearch}
              className="hidden md:block relative flex-1 max-w-md"
            >
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Facebook"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className=" pl-10 pr-4 py-2 bg-gray-100 rounded-3xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </form>
          </div>

          {/* Center Section: Navigation Icons */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-1">
            {navItems.map((item, index) => (
              <button
                key={index}
                className={`flex items-center justify-center w-20 h-14 rounded-md hover:bg-gray-100`}
                title={item.label}
              >
                {item.icon}
              </button>
            ))}
          </div>

          {/* Right Section: User Actions */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
             <button className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-700 relative">
              <Logs className="text-xl"/> 
              
            </button>
            {/* Messenger */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-700 relative">
              <FaCommentDots className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            <button className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-700 relative">
              <FaBell className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                5
              </span>
            </button>

            {/* Account Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1">
                <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
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
                    className="w-full flex items-center px-4 py-2 hover:bg-red-500 hover:text-white text-lef"
                  >
                    <LogOut className="mr-3" />
                    <span className="font-medium  ">Log Out</span>
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
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden flex items-center justify-between py-2 border-t border-gray-200 mt-2">
          <button className="flex flex-col items-center text-blue-600">
            <FaHome className="text-xl" />
            <span className="text-xs mt-1">Home</span>
          </button>

          <button className="flex flex-col items-center text-gray-500">
            <FaPlayCircle className="text-xl" />
            <span className="text-xs mt-1">Watch</span>
          </button>

          <button className="flex flex-col items-center text-gray-500">
            <FaUsers className="text-xl" />
            <span className="text-xs mt-1">Groups</span>
          </button>

          <button className="flex flex-col items-center text-gray-500 relative">
            <FaBell className="text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              5
            </span>
            <span className="text-xs mt-1">Notifs</span>
          </button>

          <button className="flex flex-col items-center text-gray-500">
            <FaCommentDots className="text-xl" />
            <span className="text-xs mt-1">Chat</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
