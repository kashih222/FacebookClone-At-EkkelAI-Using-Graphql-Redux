import { UserPlus, X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import FriendsPageSidebar from "./FriendsPageSidebar";
import { GET_FRIEND_REQUESTS_QUERY } from "../../GraphqlOprations/queries";
import { ACCEPT_FRIEND_REQUEST_MUTATION, REJECT_FRIEND_REQUEST_MUTATION } from "../../GraphqlOprations/mutations";
import toast from "react-hot-toast";

type FriendRequestData = {
  id: string;
  from: {
    id: string;
    firstName: string;
    surname: string;
    email: string;
  };
  createdAt: string;
};

const FriendRequest = () => {
  const [friendRequests, setFriendRequests] = useState<FriendRequestData[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    loadFriendRequests();
  }, []);

  const loadFriendRequests = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ query: GET_FRIEND_REQUESTS_QUERY }),
      });
      const json = await res.json();
      if (json.errors && json.errors.length) {
        console.error("Error loading friend requests:", json.errors[0].message);
        return;
      }
      setFriendRequests(json.data?.friendRequests || []);
    } catch (error) {
      console.error("Failed to load friend requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
          query: ACCEPT_FRIEND_REQUEST_MUTATION, 
          variables: { requestId } 
        }),
      });
      const json = await res.json();
      if (json.errors && json.errors.length) {
        toast.error(json.errors[0].message || "Failed to accept friend request");
        return;
      }
      // Remove from list
      setFriendRequests(prev => prev.filter(request => request.id !== requestId));
    } catch (error) {
      toast.error("Failed to accept friend request");
      console.error(error);
    }
  };

  const handleDeleteRequest = async (requestId: string) => {
    try {
      const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
          query: REJECT_FRIEND_REQUEST_MUTATION, 
          variables: { requestId } 
        }),
      });
      const json = await res.json();
      if (json.errors && json.errors.length) {
        toast.error(json.errors[0].message || "Failed to reject friend request");
        return;
      }
      // Remove from list
      setFriendRequests(prev => prev.filter(request => request.id !== requestId));
    } catch (error) {
      toast.error("Failed to reject friend request");
      console.error(error);
    }
  };

  const handleSeeAll = () => {
    console.log("See all friend requests");
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Header */}
      <Navbar />
      <div className="flex">
        <FriendsPageSidebar  />

        {/* Main Content */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 w-full">
         

          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 mt-42 md:mt-16">
            <h1 className="text-xl sm:text-2xl font-bold">Friend Request</h1>
            <button 
              onClick={handleSeeAll}
              className="text-blue-600 hover:underline cursor-pointer font-medium text-sm sm:text-base"
            >
              See all
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-500 text-sm sm:text-base">Loading friend requests...</p>
            </div>
          ) : friendRequests.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                No friend requests
              </h3>
              <p className="text-gray-500 text-sm sm:text-base px-4">
                When you have friend requests, they'll appear here.
              </p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg text-sm sm:text-base">
                Find Friends
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                {friendRequests.map((request) => {
                  const initials = `${request.from.firstName.charAt(0)}${request.from.surname.charAt(0)}`.toUpperCase();
                  return (
                    <div 
                      key={request.id} 
                      className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Profile Image */}
                      <div className="h-32 sm:h-40 md:h-48 bg-linear-to-r from-blue-500 to-purple-500 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center border-2 sm:border-4 border-white">
                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                              {initials}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="p-3 sm:p-4">
                        <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-900 mb-1 truncate">
                          {request.from.firstName} {request.from.surname}
                        </h3>
                        
                        {/* Time */}
                        <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                          {formatTimeAgo(request.createdAt)}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-1.5 sm:gap-2">
                          <button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 transition-colors text-xs sm:text-sm"
                          >
                            <Check className="w-3 h-3 sm:w-4 sm:h-5" />
                            <span>Confirm</span>
                          </button>
                          <button
                            onClick={() => handleDeleteRequest(request.id)}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 transition-colors text-xs sm:text-sm"
                          >
                            <X className="w-3 h-3 sm:w-4 sm:h-5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Add Friend Card */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-32 sm:h-40 md:h-48 bg-linear-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                        <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600" />
                      </div>
                      <p className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Add more friends</p>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm">
                      Find Friends
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer Info */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-300">
                <p className="text-xs sm:text-sm text-gray-500 px-2">
                  People you may know based on your mutual friends and activities.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;