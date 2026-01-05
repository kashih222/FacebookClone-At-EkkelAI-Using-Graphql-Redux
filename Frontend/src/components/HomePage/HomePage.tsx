import Navbar from "../Navbar/Navbar";
import LeftSidebar from "../Sidebars/LeftSidebar";
import RightSidebar from "../Sidebars/RightSidebar";
import Feed from "../FeedPage/Feed";
import CreatePost from "../CreatePostPage/CreatePost";
import Stories from "../StoriesPage/Stories";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 lg:mt-14 sm:mt-30">
      <Navbar />
      
      <div className=" mx-auto px-4 pt-4">
        <div className="flex gap-4">
          <div className="hidden lg:block w-74 shrink-0">
            <LeftSidebar />
          </div>
          
          <div className="flex-1 max-w-2xl mx-auto">
             <div className="mb-4">
              <CreatePost />
            </div>
            <div className="mb-4">
              <Stories />
            </div>
           
            <div>
              <Feed />
            </div>
          </div>
          
          <div className="hidden xl:block  shrink-0 w-74">
            <RightSidebar />
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;