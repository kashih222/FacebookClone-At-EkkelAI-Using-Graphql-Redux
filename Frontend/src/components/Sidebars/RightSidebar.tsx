import { EllipsisVertical, Plus, Search } from "lucide-react";
import MetaLogo from "../../assets/Meta-AI-Logo-Mark-PNG.png";
const RightSidebar = () => {
  return (
    <div className="sticky overflow-auto  h-[calc(100vh-150px)] pr-4 top-20 right-0 w-74">
     <div className="">
       <div className="flex  justify-between items-center mb-2">
        <h3 className="font-bold text-gray-500">Contacts</h3>
        <div className="flex space-x-2">
          <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
            <span className="text-lg">
              <Search />
            </span>
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
            <span className="text-lg">
              <EllipsisVertical />
            </span>
          </button>
        </div>
      </div>
        <div className="flex items-center space-x-3 px-2 rounded-lg hover:bg-gray-200 cursor-pointer">
        <div className="w-12 h-12 flex items-center justify-center text-white font-bold">
          <img src={MetaLogo} alt="" className="mr-2" />
        </div>
        <span className="font-medium">Meta AI</span>
      </div>
     </div>
      <div className="border-t border-gray-100"></div>

    

      <div>
        <h3 className="font-bold text-gray-500 mb-3">Sponsored</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="space-y-4">
            <div className="cursor-pointer">
              <div className="w-full h-40 bg-linear-to-r from-black to-white rounded-lg mb-2"></div>
              <p className="text-xs text-gray-500">Sponsored · Ad</p>
              <p className="font-medium">Learn React with our new course!</p>
              <p className="text-sm text-gray-500">reactcourse.com</p>
            </div>
            <div className="cursor-pointer">
              <div className="w-full h-40 bg-linear-to-r from-white to-black rounded-lg mb-2"></div>
              <p className="text-xs text-gray-500">Sponsored · Ad</p>
              <p className="font-medium">Amazon Prime Day Deals</p>
              <p className="text-sm text-gray-500">amazon.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 my-1"></div>
      <div>
        <h3 className="font-medium text-gray-500">Group chats</h3>
        <div className=" flex items-center gap-4 py-4">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
            <Plus className="text-gray-800" />
          </div>
          Creat group chat
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
