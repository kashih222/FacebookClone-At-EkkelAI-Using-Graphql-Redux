import { UserPlus, X, Check, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import FriendsPageSidebar from "./FriendsPageSidebar";
import {
  GET_FRIEND_SUGGESTIONS_QUERY,
  GET_MY_FRIENDS_QUERY,
} from "../../GraphqlOprations/queries";
import { SEND_FRIEND_REQUEST_MUTATION } from "../../GraphqlOprations/mutations";
import toast from "react-hot-toast";

const FriendsSuggestion = () => {
  type Person = {
    id: string;
    firstName: string;
    surname: string;
    email: string;
  };

  type SuggestionWithStatus = Person & {
    status: 'pending' | 'sent' | 'idle';
  };

  const [suggestions, setSuggestions] = useState<SuggestionWithStatus[]>([]);
  const [, setMyFriends] = useState<Person[]>([]);

 

  
  useEffect(() => {
    const load = async () => {
      const resSug = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ query: GET_FRIEND_SUGGESTIONS_QUERY }),
      });
      const jsonSug = await resSug.json();
      const suggestionsData = (jsonSug.data?.friendSuggestions || []) as Person[];
      
      // Initialize all suggestions with 'idle' status
      setSuggestions(suggestionsData.map(suggestion => ({
        ...suggestion,
        status: 'idle' as const
      })));

      const resMy = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ query: GET_MY_FRIENDS_QUERY }),
      });
      const jsonMy = await resMy.json();
      setMyFriends((jsonMy.data?.myFriends || []) as Person[]);
    };
    load();
  }, []);

  const handleSendRequest = async (id: string) => {
    try {
      // Update status to 'pending' immediately for better UX
      setSuggestions(prev => prev.map(suggestion => 
        suggestion.id === id ? { ...suggestion, status: 'pending' as const } : suggestion
      ));

      const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          query: SEND_FRIEND_REQUEST_MUTATION,
          variables: { userId: id },
        }),
      });
      const json = await res.json();
      
      if (json.errors && json.errors.length) {
        toast.error(json.errors[0].message || "Failed to send friend request");
        // Revert to idle status if there's an error
        setSuggestions(prev => prev.map(suggestion => 
          suggestion.id === id ? { ...suggestion, status: 'idle' as const } : suggestion
        ));
        return;
      }
      
      // Update status to 'sent' after successful request
      setSuggestions(prev => prev.map(suggestion => 
        suggestion.id === id ? { ...suggestion, status: 'sent' as const } : suggestion
      ));
      
      // Show success message
      const sentUser = suggestions.find(s => s.id === id);
      if (sentUser) {
        toast.success(`Friend request sent to ${sentUser.firstName} ${sentUser.surname}!`);
      }
    } catch (error) {
      toast.error("Failed to send friend request");
      console.error(error);
      // Revert to idle status on error
      setSuggestions(prev => prev.map(suggestion => 
        suggestion.id === id ? { ...suggestion, status: 'idle' as const } : suggestion
      ));
    }
  };

  const handleDeleteRequest = (id: string) => {
    setSuggestions(prev => prev.filter((request) => request.id !== id));
  };

  const handleSeeAll = () => {
    console.log("See all friend requests");
  };

  const getInitials = (firstName: string, surname: string) => {
    return `${firstName.charAt(0)}${surname.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Header */}
      <Navbar />
      <div className="flex">
        <FriendsPageSidebar />

        {/* Main Content */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 w-full">
         

          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 mt-40 md:mt-16">
            <h1 className="text-xl sm:text-2xl font-bold">Friend suggestion</h1>
            <button
              onClick={handleSeeAll}
              className="text-blue-600 hover:underline cursor-pointer font-medium text-sm sm:text-base"
            >
              See all
            </button>
          </div>

          {/* Friend Suggestions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 ">
            {suggestions.map((request) => {
              const isRequestSent = request.status === 'sent';
              const isPending = request.status === 'pending';
              const initials = getInitials(request.firstName, request.surname);
              
              return (
                <div
                  key={request.id}
                  className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Profile Image */}
                  <div className={`h-32 sm:h-40 md:h-48 relative bg-linear-to-r from-blue-500 to-purple-500`}>
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
                      {request.firstName} {request.surname}
                    </h3>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      {isRequestSent ? (
                        <button
                          disabled
                          className="flex-1 bg-gray-100 text-gray-500 font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 cursor-not-allowed text-xs sm:text-sm"
                        >
                          <Check className="w-3 h-3 sm:w-4 sm:h-5 text-gray-400" />
                          <span>Request Sent</span>
                        </button>
                      ) : isPending ? (
                        <button
                          disabled
                          className="flex-1 bg-gray-100 text-gray-500 font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 cursor-not-allowed text-xs sm:text-sm"
                        >
                          <Clock className="w-3 h-3 sm:w-4 sm:h-5 animate-spin" />
                          <span>Sending...</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSendRequest(request.id)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 transition-colors text-xs sm:text-sm"
                        >
                          <Check className="w-3 h-3 sm:w-4 sm:h-5" />
                          <span>Add friend</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDeleteRequest(request.id)}
                        className={`flex-1 ${
                          isRequestSent 
                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        } font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 transition-colors text-xs sm:text-sm`}
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-5" />
                        <span>
                          {isRequestSent ? 'Remove card' : 'Remove'}
                        </span>
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

          {/* No Suggestions Message */}
          {suggestions.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                No friend suggestions
              </h3>
              <p className="text-gray-500 text-sm sm:text-base px-4">
                When suggestions are available, they'll appear here.
              </p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg text-sm sm:text-base">
                Find Friends
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsSuggestion;