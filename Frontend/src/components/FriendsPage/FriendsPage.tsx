import { Camera, Columns3Cog, Gift, Settings, UserPlus, UserRoundCheck, Users, UsersRound, X, Check,} from "lucide-react";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";

const FriendsPage = () => {
  const [friendRequests, setFriendRequests] = useState([
    {
      id: 1,
      name: "Ahsan Mian",
      mutualFriends: 15,
      avatar: "A",
      time: "2 days ago",
      mutualConnections: ["Ali", "Sarah", "Usman"]
    },
    {
      id: 2,
      name: "Madiha Guil",
      mutualFriends: 8,
      avatar: "M",
      time: "1 week ago",
      mutualConnections: ["Zara", "Hassan"]
    },
    {
      id: 3,
      name: "Makrishan Ali",
      mutualFriends: 23,
      avatar: "M",
      time: "3 days ago",
      mutualConnections: ["Ahmed", "Fatima", "Bilal", "Sana"]
    },
    {
      id: 4,
      name: "Jaquelin De Aza",
      mutualFriends: 5,
      avatar: "J",
      time: "1 day ago",
      mutualConnections: ["David", "Maria"]
    },
    {
      id: 5,
      name: "Asif Gujjar",
      mutualFriends: 12,
      avatar: "A",
      time: "5 hours ago",
      mutualConnections: ["Kamran", "Nadia", "Rizwan"]
    },
    {
      id: 6,
      name: "Sarah Miller",
      mutualFriends: 18,
      avatar: "S",
      time: "2 weeks ago",
      mutualConnections: ["John", "Emma", "Michael", "Sophia"]
    }
  ]);

  const handleAcceptRequest = (id: number) => {
    setFriendRequests(prev => prev.filter(request => request.id !== id));
    console.log(`Accepted friend request ${id}`);
  };

  const handleDeleteRequest = (id: number) => {
    setFriendRequests(prev => prev.filter(request => request.id !== id));
    console.log(`Deleted friend request ${id}`);
  };

  const handleSeeAll = () => {
    console.log("See all friend requests");
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-14">
      {/* Header */}
      <Navbar />
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-90 h-screen bg-[#FFFFFF] flex-col shadow-lg sticky top-10  overflow-y-auto">
          <div className="flex items-center justify-between px-3 py-2">
            <div>
              <p className="font-bold text-2xl">Friends</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-200 cursor-pointer flex items-center justify-center">
              <Settings />
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2  border-b-gray-300 hover:bg-gray-200 cursor-pointer bg-blue-50">
            <div className="w-12 h-10 bg-gray-300 rounded-full flex items-center justify-center text-blue-600 font-bold">
              <Users />
            </div>
            <div className="w-full ">
              <p className="font-medium text-lg ">Home</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2  border-b-gray-300 hover:bg-gray-200 cursor-pointer ">
            <div className="w-12 h-10 bg-blue-100 rounded-full flex items-center justify-center text-black font-bold">
              <UserPlus />
            </div>
            <div className="w-full ">
              <p className="font-medium text-lg">Friend requests</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2  border-b-gray-300 hover:bg-gray-200 cursor-pointer">
            <div className="w-12 h-10 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold">
              <UsersRound />
            </div>
            <div className="w-full ">
              <p className="font-medium text-lg">Suggestions</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2  border-b-gray-300 hover:bg-gray-200 cursor-pointer">
            <div className="w-12 h-10 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold">
              <UserRoundCheck />
            </div>
            <div className="w-full ">
              <p className="font-medium text-lg">All friends</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2  border-b-gray-300 hover:bg-gray-200 cursor-pointer">
            <div className="w-12 h-10 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold">
              <Gift />
            </div>
            <div className="w-full ">
              <p className="font-medium text-lg">Birthday</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2  border-b-gray-300 hover:bg-gray-200 cursor-pointer">
            <div className="w-12 h-10 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold">
              <Columns3Cog />
            </div>
            <div className="w-full ">
              <p className="font-medium text-lg">Custom list</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Friend requests</h1>
            <button 
              onClick={handleSeeAll}
              className="text-blue-600 hover:underline cursor-pointer font-medium"
            >
              See all
            </button>
          </div>

          {/* Friend Requests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friendRequests.map((request) => (
              <div 
                key={request.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Profile Image */}
                <div className="h-48 bg-linear-to-r from-blue-500 to-purple-500 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white">
                      <span className="text-4xl font-bold text-gray-800">
                        {request.avatar}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-sm">
                    <Camera className="w-5 h-5 text-gray-600" />
                  </div>
                </div>

                {/* User Info */}
                <div className="p-2">
                  <h3 className="font-bold text-xl text-gray-900 mb-1">
                    {request.name}
                  </h3>
                  
                  {/* Mutual Friends */}
                  <div className="flex items-center text-gray-600 mb-4">
                    <div className="flex -space-x-2 mr-2">
                      {request.mutualConnections.slice(0, 3).map((friend, index) => (
                        <div 
                          key={index}
                          className="w-7 h-7 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium"
                        >
                          {friend.charAt(0)}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm">
                      {request.mutualFriends} mutual friends
                    </span>
                  </div>

                  {/* Time */}
                  <p className="text-sm text-gray-500 mb-4">
                    {request.time}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Check className="w-4 h-5" />
                      <span className="text-sm">Confirm</span>
                    </button>
                    <button
                      onClick={() => handleDeleteRequest(request.id)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                      <X className="w-4 h-5" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Friend Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-linear-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="w-10 h-10 text-gray-600" />
                  </div>
                  <p className="text-gray-600 font-medium">Add more friends</p>
                </div>
              </div>
              <div className="p-4">
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors">
                  Find Friends
                </button>
              </div>
            </div>
          </div>

          {/* No Requests Message */}
          {friendRequests.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No friend requests
              </h3>
              <p className="text-gray-500">
                When you have friend requests, they'll appear here.
              </p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg">
                Find Friends
              </button>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-gray-300">
            <p className="text-sm text-gray-500">
              People you may know based on your mutual friends and activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;