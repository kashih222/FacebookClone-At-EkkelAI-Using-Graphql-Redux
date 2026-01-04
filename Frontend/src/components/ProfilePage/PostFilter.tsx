import {  Funnel, LayoutGrid, Menu, Settings} from "lucide-react";

const PostFilter = () => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-col items-center gap-2  w-full">
        <div className="flex  justify-between items-center w-full">
          <div className=" text-black font-bold text-xl">
            Posts
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <div className=" flex items-center justify-center gap-1  bg-gray-200 py-2 px-3 rounded-lg font-medium cursor-pointer"><Funnel/> Filters</div>
            <div className=" flex items-center justify-center gap-1  bg-gray-200 py-2 px-3 rounded-lg font-medium cursor-pointer"><Settings/> Management</div>
          </div>
        </div>
            <div className="w-full h-1 bg-gray-200"></div>
        <div className="flex items-center justify-between w-full mt-2">
         <div className="flex items-center justify-center gap-2 w-1/2 cursor-pointer "><Menu/> List view</div>
         <div className="flex items-center justify-center gap-2 w-1/2 cursor-pointer "><LayoutGrid/> Grid view</div>
        </div>
      </div>
    </div>
  );
};

export default PostFilter;
