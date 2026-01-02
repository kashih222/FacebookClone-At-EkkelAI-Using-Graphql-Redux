import { EllipsisVertical, Plus, Search } from "lucide-react";

const RightSidebar = () => {
  
  return (
    <div className="sticky top-20 right-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-500">Contacts</h3>
        <div className="flex space-x-2">
         
          <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
            <span className="text-lg"><Search/></span>
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
            <span className="text-lg"><EllipsisVertical/></span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-bold text-gray-500 mb-3">Sponsored</h3>
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

      <div className="border-t border-gray-100 my-1"></div>
     <div>
        <h3 className="font-medium text-gray-500">Group chats</h3>
        <div className=" flex items-center gap-4 py-4">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
            <Plus className="text-gray-800"/>
          </div>
          Creat group chat
        </div>
     </div>
    </div>
  );
};

export default RightSidebar;