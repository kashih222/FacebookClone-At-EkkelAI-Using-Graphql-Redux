import {
  Camera,
  MapPin,
  GraduationCap,
  Briefcase,
  Heart,
  Edit,
  BarChart,
  ChevronDown,
  Ellipsis,
} from "lucide-react";
import Navbar from "../Navbar/Navbar";
import CreatePost from "../CreatePostPage/CreatePost";
import PostFilter from "./PostFilter";
import PersonalFeed from "./PersonalFeed";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/hooks";
import { fetchMe } from "../../Redux Toolkit/slices/userSlice";
import { GET_MY_FRIENDS_QUERY } from "../../GraphqlOprations/queries";

interface Friend {
  id: string;
  firstName: string;
  surname: string;
  email: string;
}

const ProfilePage = () => {
  const personalFeedRef = useRef<{ refresh: () => void } | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendsCount, setFriendsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const dispatch = useAppDispatch();
  const me = useAppSelector((s) => s.user.user);
  
  const displayName = me ? `${me.firstName} ${me.surname}` : "Konsus Mysvak";
  const initials = displayName
    .split(" ")
    .map((p) => p[0]?.toUpperCase() || "")
    .join("")
    .slice(0, 2);

  // Mock user data - replace with actual data
  const userData = {
    name: displayName,
    username: "Demo",
    followers: "0",
    following: "0",
    bio: {
      job: "Web Site Designer at Freshnear",
      education1: "Ghazali education trust school (BMS) per",
      education2: "Government Islamic College, Civil Lines, Lahore",
      location: "Lahore, Pakistan",
      hometown: "Shakespeare, Punjab, Pakistan",
      relationship: "In a relationship",
    },
  };

  useEffect(() => {
    dispatch(fetchMe());
    loadFriendsData();
  }, [dispatch]);

  const loadFriendsData = async () => {
    try {
      setLoading(true);
      
      // Use the actual GraphQL query
      const response = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
          query: GET_MY_FRIENDS_QUERY 
        }),
      });
      
      const json = await response.json();
      
      if (json.errors && json.errors.length) {
        console.error("Error loading friends:", json.errors[0].message);
        // Fallback mock data in case of error
        setFriends([
          { id: "1", firstName: "John", surname: "Doe", email: "john@example.com" },
          { id: "2", firstName: "Jane", surname: "Smith", email: "jane@example.com" },
          { id: "3", firstName: "Robert", surname: "Johnson", email: "robert@example.com" },
          { id: "4", firstName: "Emily", surname: "Williams", email: "emily@example.com" },
          { id: "5", firstName: "Michael", surname: "Brown", email: "michael@example.com" },
          { id: "6", firstName: "Sarah", surname: "Davis", email: "sarah@example.com" },
        ]);
        setFriendsCount(6);
        return;
      }
      
      if (json.data?.myFriends) {
        setFriends(json.data.myFriends);
        setFriendsCount(json.data.myFriends.length);
      } else {
        // No friends found
        setFriends([]);
        setFriendsCount(0);
      }
    } catch (error) {
      console.error("Failed to load friends:", error);
      // Fallback mock data
      setFriends([
        { id: "1", firstName: "John", surname: "Doe", email: "john@example.com" },
        { id: "2", firstName: "Jane", surname: "Smith", email: "jane@example.com" },
        { id: "3", firstName: "Robert", surname: "Johnson", email: "robert@example.com" },
      ]);
      setFriendsCount(3);
    } finally {
      setLoading(false);
    }
  };

  // Get initials for friend avatars
  const getFriendInitials = (firstName: string, surname: string) => {
    return `${firstName.charAt(0)}${surname.charAt(0)}`.toUpperCase();
  };

  // Display first 6 friends for the friends card
  const displayedFriends = friends.slice(0, 6);

  return (
    <div className="w-full">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-[#FFFFFF] w-full min-h-screen flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-center bg-linear-to-t from-white to-gray-200">
            <div className="lg:container xl:container w-full px-4 md:px-6 lg:px-24 xl:px-40">
              {/* Cover Photo Section */}
              <div className="relative h-96 bg-linear-to-r from-blue-600 to-purple-600">
                <div className="absolute bottom-4 right-4">
                  <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                    <Camera size={20} />
                    <span className="font-semibold ">Edit cover photo</span>
                  </button>
                </div>

                {/* Profile Picture */}
                <div className="absolute -bottom-10 xl:-bottom-16 left-8">
                  <div className="relative">
                    <div className="w-20 h-20 lg:w-40 lg:h-40 rounded-full border-4 border-white bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-2xl lg:text-6xl font-bold">
                      {initials}
                    </div>
                    <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-1 rounded-full">
                      <Camera  className="w-3 h-3   lg:w-6 lg:h-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="px-8 pt-20 pb-6 bg-[#FFFFFF]">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {displayName}
                    </h1>
                    <p className="text-gray-600 mt-1">
                      {userData.followers} followers • {friendsCount} friends
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
                      <BarChart size={20} />
                      <span>Dashboard</span>
                    </button>

                    <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-300 transition">
                      <Edit size={20} />
                      <span className="font-medium">Edit </span>
                    </button>
                    <button className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg cursor-pointer hover:bg-gray-300 transition">
                      <ChevronDown size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 border-gray-200 border-t">
                  <div className="flex items-center">
                    <button className="flex items-center pt-4 px-4 text-sm cursor-pointer font-semibold text-gray-500 hover:text-gray-800">
                      Post
                    </button>
                    <button className="flex items-center pt-4 px-4 text-sm cursor-pointer font-semibold text-gray-500 hover:text-gray-800">
                      About
                    </button>
                    <button className="flex items-center pt-4 px-4 text-sm cursor-pointer font-semibold text-gray-500 hover:text-gray-800">
                      Reel
                    </button>
                    <button className="flex items-center pt-4 px-4 text-sm cursor-pointer font-semibold text-gray-500 hover:text-gray-800">
                      Photos
                    </button>
                    <button className="flex items-center pt-4 px-4 text-sm cursor-pointer font-semibold text-gray-500 hover:text-gray-800">
                      Group
                    </button>
                    <button className="flex items-center pt-4 px-4 text-sm cursor-pointer font-semibold text-gray-500 hover:text-gray-800">
                      Events
                    </button>
                    <button className="flex items-center pt-4 px-4 text-sm cursor-pointer font-semibold text-gray-500 hover:text-gray-800">
                      <span>More</span>
                      <ChevronDown className="w-4" />
                    </button>
                  </div>
                  <div className="bg-[#D6D9DD] text-black rounded-sm py-2 px-3 mt-2 cursor-pointer">
                    <Ellipsis />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F2F4F7] w-full">
            <div className="lg:container xl:container  px-4 md:px-6 lg:px-24 xl:px-40 w-full mx-auto py-6 grid grid-cols-3 gap-6">
              {/* Left Sidebar */}
              <div className="col-span-1 space-y-6">
                {/* Intro Card */}
                <div className="bg-white rounded-lg shadow p-3">
                  <h2 className="text-xl font-bold mb-4">Intro</h2>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Briefcase size={20} className="text-gray-500" />
                      <span>{userData.bio.job}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <GraduationCap size={30} className="text-gray-500" />
                      <div>
                        <p>Studies at {userData.bio.education1}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-gray-500" />
                      <span>Lives in {userData.bio.location}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-gray-500" />
                      <span>From {userData.bio.hometown}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Heart size={20} className="text-gray-500" />
                      <span>{userData.bio.relationship}</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-semibold">
                    Edit details
                  </button>
                  <button className="w-full mt-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-semibold">
                    Add feature
                  </button>
                </div>

                {/* Photos Card */}
                <div className="bg-white rounded-lg shadow p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Photos</h2>
                    <button className="text-blue-600 hover:underline cursor-pointer">
                      See All Photos
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gray-200 aspect-square bg-linear-to-br from-blue-500 to-purple-500 rounded-lg"></div>
                    <div className="bg-gray-200 aspect-square bg-linear-to-br from-blue-500 to-purple-500 rounded-lg"></div>
                    <div className="bg-gray-200 aspect-square bg-linear-to-br from-blue-500 to-purple-500 rounded-lg"></div>
                    <div className="bg-gray-200 aspect-square bg-linear-to-br from-blue-500 to-purple-500 rounded-lg"></div>
                    <div className="bg-gray-200 aspect-square bg-linear-to-br from-blue-500 to-purple-500 rounded-lg"></div>
                    <div className="bg-gray-200 aspect-square bg-linear-to-br from-blue-500 to-purple-500 rounded-lg"></div>
                    <div className="bg-gray-200 aspect-square bg-linear-to-br from-blue-500 to-purple-500 rounded-lg"></div>
                    <div className="bg-gray-200 aspect-square bg-linear-to-br from-blue-500 to-purple-500 rounded-lg"></div>
                  </div>
                </div>

                {/* Friends Card */}
                <div className="bg-white rounded-lg shadow p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Friends</h2>
                    <Link to={"/friends"}>
                      <button className="text-blue-600 hover:underline cursor-pointer">
                        See all friends
                      </button>
                    </Link>
                  </div>

                  <p className="text-gray-600 mb-4">{friendsCount} friends</p>

                  {loading ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500">Loading friends...</p>
                    </div>
                  ) : displayedFriends.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No friends yet</p>
                      <Link to="/friends">
                        <button className="mt-2 text-blue-600 hover:underline">
                          Find friends
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-4">
                      {displayedFriends.map((friend) => (
                        <div key={friend.id} className="text-center">
                          <div className="w-full aspect-square bg-linear-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-2">
                            {getFriendInitials(friend.firstName, friend.surname)}
                          </div>
                          <p className="text-sm font-semibold truncate">
                            {friend.firstName} {friend.surname.charAt(0)}.
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="col-span-2 space-y-6">
                {/* Create Post */}
                <div>
                  <CreatePost onPostCreated={() => {
                    // Trigger refresh in PersonalFeed
                    if (personalFeedRef.current) {
                      personalFeedRef.current.refresh();
                    }
                  }} />
                </div>

                <div>
                  <PostFilter />
                </div>

                <div>
                  <PersonalFeed ref={personalFeedRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;