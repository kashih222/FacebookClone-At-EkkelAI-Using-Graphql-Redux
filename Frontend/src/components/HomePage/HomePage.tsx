import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import LeftSidebar from "../Sidebars/LeftSidebar";
import RightSidebar from "../Sidebars/RightSidebar";
import Feed from "../FeedPage/Feed";
import CreatePost from "../CreatePostPage/CreatePost";
import Stories from "../StoriesPage/Stories";

const HomePage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handlePostCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  

 

  return (
    <div className="min-h-screen bg-gray-100 mt-14  md:mt-32 lg:mt-14 ">
      <Navbar />
      
      <div className="mx-auto px-2 sm:px-4 pt-2 sm:pt-4 pb-20 md:pb-4">
       

        <div className="flex gap-2 md:gap-4 mt-16 md:mt-0">
             <div className="hidden xl:block shrink-0 w-74">
              <LeftSidebar/>
              </div>     
          <div className="flex-1 max-w-2xl mx-auto w-full">
             <div className="mb-3 sm:mb-4">
              <CreatePost onPostCreated={handlePostCreated} />
            </div>
            <div className="mb-3 sm:mb-4">
              <Stories />
            </div>
           
            <div>
              <Feed refreshTrigger={refreshTrigger} />
            </div>
          </div>
          
          <div className="hidden xl:block shrink-0 w-74">
            <RightSidebar />
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;