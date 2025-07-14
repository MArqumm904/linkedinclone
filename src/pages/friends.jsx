import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import SidebarMenu from "../components/sidebarmenu";
import ProfileCard from "../components/profilecard";
import NavbarReplica from "../components/nav";

const Friends = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const friends = [
    {
      id: 1,
      name: "Lina Ashraf",
      subtitle: "UI Research, Wireframing, Figma",
      profilePic:
        "https://www.upwork.com/mc/documents/Jenna-Kang-Graham-photo-size.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=120&fit=crop",
    },
    {
      id: 2,
      name: "Junaid Farooq",
      subtitle: "UI Designer, Developing, Adobe XD",
      profilePic:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      coverImage:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=120&fit=crop",
    },
    {
      id: 3,
      name: "Alina Qureshi",
      subtitle: "Web3, Crypto, Designer",
      profilePic:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      coverImage:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=120&fit=crop",
    },
    {
      id: 4,
      name: "Talmoor Siddiqui",
      subtitle: "Specialist, Web3, Graphic",
      profilePic:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      coverImage:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=120&fit=crop",
    },
  ];

  const onBackToHome = () => {
    navigate("/");
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
   <>
      <NavbarReplica />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-[86rem] mx-auto px-0 md:px-4 py-0 md:py-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Sidebar - Hidden on mobile */}
            <div className="hidden md:block md:col-span-3">
              <ProfileCard />
              <SidebarMenu />
            </div>

            {/* Main Content */}
            <div className="col-span-1 md:col-span-9">
              <div className="bg-white rounded-lg shadow-sm border border-[#6974b1] p-4 mx-auto">
                {/* Header */}
                <div className="flex items-center mb-6">
                  <button
                    onClick={onBackToHome}
                    className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                  </button>
                  <h1 className="text-2xl font-semibold font-sf text-gray-900">
                    Friends
                  </h1>
                </div>

                {/* Search Bar */}
                <div className="flex-1 mb-7 relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#343f7b] md:block hidden" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Friends"
                    className="w-full bg-[#efeff3] font-sf rounded-full md:pl-14 pl-4 pr-4 py-2 md:py-4 text-[#343f7b] placeholder:font-semibold placeholder-[#343f7b] outline-none"
                  />
                </div>
                <div className="border-t border-gray-200 my-5"></div>

                {/* Friends Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                  {filteredFriends.map((friend) => (
                    <div
                      key={friend.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                      {/* Cover Image */}
                      <div className="h-20 bg-gradient-to-r from-blue-400 to-purple-500 relative">
                        <img
                          src={friend.coverImage}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Profile Section */}
                      <div className="px-2 pb-2 relative">
                        {/* Profile Picture */}
                        <div className="flex justify-center -mt-8 mb-3">
                          <img
                            src={friend.profilePic}
                            alt={friend.name}
                            className="w-20 h-20 rounded-full border-2 border-white object-cover"
                          />
                        </div>

                        {/* Name and Subtitle */}
                        <div className="text-center mb-8">
                          <h3 className="font-semibold text-gray-900 text-sm mb-1 font-sf">
                            {friend.name}
                          </h3>
                          <p className="text-xs text-gray-500 leading-tight font-sf">
                            {friend.subtitle}
                          </p>
                        </div>

                        {/* Add Friend Button */}
                        <button className="w-full px-4 py-2 bg-[#0017e7] text-white rounded-md hover:bg-[#0015d8] transition-colors text-sm font-medium font-sf">
                          Add Friend
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show message if no friends found */}
                {filteredFriends.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 font-sf">No friends found matching your search.</p>
                  </div>
                )}

                {/* Second Row - Only show if no search term */}
                {searchTerm === "" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-6">
                    {friends.map((friend) => (
                      <div
                        key={`${friend.id}-2`}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                      >
                        {/* Cover Image */}
                        <div className="h-20 bg-gradient-to-r from-blue-400 to-purple-500 relative">
                          <img
                            src={friend.coverImage}
                            alt="Cover"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Profile Section */}
                        <div className="px-2 pb-2 relative">
                          {/* Profile Picture */}
                          <div className="flex justify-center -mt-8 mb-3">
                            <img
                              src={friend.profilePic}
                              alt={friend.name}
                              className="w-20 h-20 rounded-full border-2 border-white object-cover"
                            />
                          </div>

                          {/* Name and Subtitle */}
                          <div className="text-center mb-8">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1 font-sf">
                              {friend.name}
                            </h3>
                            <p className="text-xs text-gray-500 leading-tight font-sf">
                              {friend.subtitle}
                            </p>
                          </div>

                          {/* Add Friend Button */}
                          <button className="w-full px-4 py-2 bg-[#0017e7] text-white rounded-md hover:bg-[#0015d8] transition-colors text-sm font-medium">
                            Add Friend
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;