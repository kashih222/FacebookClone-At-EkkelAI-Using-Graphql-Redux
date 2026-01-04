import {
  Calendar,
  ChartNoAxesColumn,
  ChevronDown,
  Clapperboard,
  ClockCheck,
  IdCard,
  Store,
  Users,
} from "lucide-react";
import MetaLogo from "../../assets/Meta-AI-Logo-Mark-PNG.png";
import { FaSave } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <div className="sticky top-0 h-[calc(100vh-90px)] ">
      {/* User Profile */}
      <div className="mb-6 h-[calc(100vh-150px)]  overflow-auto">
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            U
          </div>
          <span className="font-medium">User Name</span>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <div className="w-12 h-12 flex items-center justify-center text-white font-bold">
            <img src={MetaLogo} alt="" className="mr-2" />
          </div>
          <span className="font-medium">Meta AI</span>
        </div>
        <Link to={"/friends"}>
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <div className="rounded-full flex items-center justify-center text-purple-500 font-bold">
            <Users className=" w-10 h-10" />
          </div>
          <span className="font-medium">Friends</span>
        </div>
        </Link>
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <div className="rounded-full flex items-center justify-center text-purple-500 font-bold">
            <ClockCheck className="  w-10 h-10" />
          </div>
          <span className="font-medium">Memories</span>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <div className="rounded-full flex items-center justify-center text-purple-500 font-bold">
            <FaSave className="  w-9 h-9" />
          </div>
          <span className="font-medium">Saved</span>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <div className="  w-10 h-10 rounded-full flex items-center justify-center text-white bg-blue-500 font-bold">
            <MdGroups2 className="  w-8 h-8" />
          </div>
          <span className="font-medium">Reels</span>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <div className="  w-10 h-10 rounded-full flex items-center justify-center text-white bg-orange-500 font-bold">
            <Clapperboard className="  w-8 h-8" />
          </div>
          <span className="font-medium">Reels</span>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <div className="  w-10 h-10 rounded-full flex items-center justify-center text-blue-600 font-bold">
            <Store className="  w-10 h-10" />
          </div>
          <span className="font-medium">Markeetplace</span>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <div className="  w-10 h-10 rounded-full flex items-center justify-center text-blue-600 font-bold">
            <IdCard className="  w-10 h-10" />
          </div>
          <span className="font-medium">Feed</span>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <div className="  w-10 h-10 rounded-full flex items-center justify-center text-red-500 font-bold">
            <Calendar className="  w-10 h-10" />
          </div>
          <span className="font-medium">Event</span>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <div className="  w-10 h-10 rounded-full flex items-center justify-center text-blue-400 font-bold">
            <ChartNoAxesColumn className="  w-10 h-10" />
          </div>
          <span className="font-medium">Ads Manager</span>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <div className="  w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 text-black font-bold">
            <ChevronDown className="  w-8 h-8" />
          </div>
          <span className="font-medium">See more</span>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-6 pt-4 border-t border-gray-300 absolute bottom-0">
        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          <a href="#" className="hover:underline">
            Privacy
          </a>{" "}
          ·
          <a href="#" className="hover:underline">
            Terms
          </a>{" "}
          ·
          <a href="#" className="hover:underline">
            Advertising
          </a>{" "}
          ·
          <a href="#" className="hover:underline">
            Ad choices
          </a>{" "}
          ·
          <a href="#" className="hover:underline">
            Cookies
          </a>{" "}
          ·
          <a href="#" className="hover:underline">
            More
          </a>{" "}
          ·<span className="text-gray-400">Meta © 2026</span>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
