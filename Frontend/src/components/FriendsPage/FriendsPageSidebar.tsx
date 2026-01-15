import {
  Columns3Cog,
  Gift,
  Menu,
  Settings,
  UserPlus,
  UserRoundCheck,
  Users,
  UsersRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const FriendsPageSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const sidebarItems = [
    { to: "/friend-home", icon: Users, label: "Home" },
    { to: "/friend-request", icon: UserPlus, label: "Friend requests" },
    { to: "/friends-suggestion", icon: UsersRound, label: "Suggestions" },
  ];

  return (
    <div className="">
      {/* Hamburger Button - Mobile & Desktop */}
      <div className="mt-18 lg:mt-16">
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-32 md:top-34 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-28 h-[calc(100vh-56px)] ${
          isSidebarOpen ? "w-60 xl:w-90" : "w-20"
        } bg-[#FFFFFF] flex-col shadow-lg lg:sticky overflow-y-auto z-40 transition-all duration-300 ${
          isSidebarOpen ? "left-0" : "-left-full lg:left-0"
        }`}
      >
        {/* Close Button - Mobile Only */}
        <div className="lg:hidden h-18 flex items-center justify-between px-3 py-4 border-b border-gray-200"></div>

        {/* Header Section */}
        <div className={`flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"} px-3 py-4 border-b border-gray-200`}>
          <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
            <p className="font-bold text-xl xl:text-2xl">Friends</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Hamburger Icon for Desktop - Only show when sidebar is open */}
            <button
              onClick={toggleSidebar}
              className={`hidden lg:flex w-8 h-8 rounded-full hover:bg-gray-200 cursor-pointer items-center justify-center ${
                isSidebarOpen ? "" : "mx-auto"
              }`}
            >
              <Menu className=" w-6 h-6" />
            </button>

            {isSidebarOpen && (
              <Settings className="w-5 h-5 cursor-pointer hover:text-blue-600" />
            )}
          </div>
        </div>

        {/* Navigation Items */}
        {sidebarItems.map((item) => (
          <NavLink key={item.to} to={item.to} onClick={closeSidebar}>
            {({ isActive }) => (
              <div
                className={`flex items-center gap-2 px-3 py-2 cursor-pointer ${
                  isActive
                    ? "bg-blue-200 text-blue-600"
                    : "text-black hover:bg-gray-200"
                }`}
                title={!isSidebarOpen ? item.label : ""}
              >
                <div className="w-10 h-9 xl:w-12 xl:h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold shrink-0">
                  <item.icon className="w-4 h-4 xl:w-5 xl:h-5" />
                </div>
                <p
                  className={`font-medium text-base xl:text-lg ${
                    isSidebarOpen ? "block" : "hidden"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            )}
          </NavLink>
        ))}

        {/* Static Items (without NavLink) */}
        {[
          { icon: UserRoundCheck, label: "All friends" },
          { icon: Gift, label: "Birthday" },
          { icon: Columns3Cog, label: "Custom list" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 cursor-pointer"
            title={!isSidebarOpen ? item.label : ""}
          >
            <div className="w-10 h-9 xl:w-12 xl:h-10 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold shrink-0">
              <item.icon className="w-4 h-4 xl:w-5 xl:h-5" />
            </div>
            <div className={`${isSidebarOpen ? "block" : "hidden"} w-full`}>
              <p className="font-medium text-base xl:text-lg">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsPageSidebar;
