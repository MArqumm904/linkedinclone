import { useState, useEffect } from "react";
import { Search, User } from "lucide-react";
import Logo from "../assets/images/logo.jpg";
import Homeicon from "../assets/images/home.png";
import Marketplace from "../assets/images/market.png";
import Hand from "../assets/images/hand.png";
import Upload from "../assets/images/upload.png";
import Message from "../assets/images/message.png";
import Groups from "../assets/images/groups.png";
import Bellicon from "../assets/images/bellicon.png";
import AddFriends from "./addfriends";
import { useNavigate } from "react-router-dom";

export default function NavbarReplica() {
  const navigate = useNavigate();
  const [showaddfriendsPopup, setShowaddfriendsPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const ToProfile = () => {
    const textPosts = [
      {
        id: 1,
        type: "text",
        content:
          "Just finished an amazing UI/UX project! Really excited about the results.",
        timestamp: "2024-01-15T10:30:00Z",
        likes: 25,
        comments: 5,
      },
      {
        id: 2,
        type: "text",
        content:
          "Working on some new design patterns today. The creative process never stops!",
        timestamp: "2024-01-14T14:20:00Z",
        likes: 18,
        comments: 3,
      },
    ];

    const imagePosts = [
      {
        id: 3,
        type: "image",
        content: "Check out this new design mockup I created",
        image:
          "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=500&h=400&fit=crop",
        timestamp: "2024-01-13T16:45:00Z",
        likes: 42,
        comments: 8,
      },
    ];

    const videoPosts = [
      {
        id: 4,
        type: "video",
        content: "Behind the scenes of my design process",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=400&fit=crop",
        timestamp: "2024-01-12T09:15:00Z",
        likes: 67,
        comments: 12,
      },
    ];

    navigate("/profile", {
      state: {
        number_of_text_posts: textPosts.length,
        number_of_image_posts: imagePosts.length,
        number_of_video_posts: videoPosts.length,
        text_posts_data: textPosts,
        image_posts_data: imagePosts,
        video_posts_data: videoPosts,
      },
    });
  };

  const onBackToHome = () => {
    navigate("/");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      // Navigate to browse route with search query
      window.location.href = `/browse?q=${encodeURIComponent(
        inputValue.trim()
      )}`;
    }
  };

  useEffect(() => {
    if (showaddfriendsPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showaddfriendsPopup]);
  return (
    <>
      {showaddfriendsPopup && (
        <AddFriends onClose={() => setShowaddfriendsPopup(false)} />
      )}
      {/* Desktop/Tablet Navbar */}
      <div className="w-full bg-gray-50 border-b border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between relative">
            {/* Left Section - Logo and Search */}
            <div className="flex items-center space-x-6">
              {/* Logo - Multi-colored diamond shape */}
              <div className="flex items-center">
                <div className="w-10 h-10">
                  <img
                    src={Logo}
                    alt="Custom Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <div className="flex items-center bg-[#efeff3] rounded-full px-4 py-3 w-72">
                  <Search className="w-5 h-5 text-[#333f7d] mr-3" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-transparent outline-none text-[#333f7d] placeholder-[#333f7d] text-sm w-full"
                  />
                </div>
              </div>
            </div>

            {/* Center Section - Navigation Icons */}
            <div className="flex items-center space-x-12 absolute left-1/2 transform -translate-x-1/2">
              {/* Home Icon - Active */}
              <div className="flex flex-col items-center cursor-pointer relative">
                <img
                  src={Homeicon}
                  onClick={onBackToHome}
                  alt="Custom Icon"
                  className="w-9 h-full object-cover"
                />
                <div className="absolute -bottom-6 w-12 h-[3px] bg-blue-600 rounded-full"></div>
              </div>

              {/* Users Icon */}
              <div className="flex flex-col items-center cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors">
                <img
                  src={Marketplace}
                  alt="Custom Icon"
                  className="w-9 h-full object-cover"
                />
              </div>

              {/* Hand Heart Icon */}
              <div className="flex flex-col items-center cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors">
                <img
                  src={Hand}
                  alt="Custom Icon"
                  className="w-9 h-full object-cover"
                />
              </div>
            </div>

            {/* Right Section - Add Friends Button and Profile */}
            <div className="flex items-center space-x-4">
              {/* Add Friends Button */}
              <button
                onClick={() => setShowaddfriendsPopup(true)}
                className="bg-[#efeff3] border border-[#333f7d] rounded-full px-5 py-2 text-[#333f7d] text-sm font-medium hover:bg-[#e5e5e9] transition-colors shadow-sm"
              >
                Add Friends
              </button>

              {/* Profile Icon */}
              <div
                onClick={ToProfile}
                className="w-9 h-9 bg-[#e4e4e4] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e4e4e4] transition-colors"
              >
                <User className="w-5 h-5 text-[#333f7d]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="w-full bg-white border-b border-gray-200 md:hidden">
        <div className="px-4 py-3">
          {/* First Row - Logo, Profile, Search, Menu */}
          <div className="flex items-center justify-between mb-4">
            {/* Logo/Text */}
            <div className="flex items-center">
              <h1 className="text-green-600 font-bold text-xl">AHMEED</h1>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-2">
              {/* Profile Icon */}
              <div className="w-7 h-7 bg-[#e4e4e4] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e4e4e4] transition-colors">
                <User className="w-5 h-5 text-[#333f7d]" />
              </div>

              {/* Search Icon */}
              <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
                <Search className="w-6 h-6 text-gray-600" />
              </div>

              {/* Menu Icon */}
              <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
                <div className="flex flex-col space-y-1">
                  <div className="w-4 h-0.5 bg-gray-600 rounded"></div>
                  <div className="w-3 h-0.5 bg-gray-600 rounded"></div>
                  <div className="w-4 h-0.5 bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Plus, Messages, Persons, Notification */}
          <div className="flex items-center justify-between px-2 mt-6">
            {/* Plus Icon */}
            <div className="flex items-center justify-center cursor-pointer">
              <img src={Upload} className="w-7 h-7 object-contain" />
            </div>

            {/* Messages Icon */}
            <div className="flex items-center justify-center cursor-pointer relative">
              <img src={Message} className="w-7 h-7 object-contain" />
              <div className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
            </div>

            {/* Persons Icon */}
            <div className="w-10 h-10 flex items-center justify-center cursor-pointer relative">
              <img src={Groups} className="w-8 h-8 object-contain" />
              <div className="absolute top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
            </div>

            {/* Notification Icon */}
            <div className="w-10 h-10 flex items-center justify-center cursor-pointer relative">
              <img src={Bellicon} className="w-7 h-7 object-contain" />
              <div className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="flex items-center justify-around py-3">
          {/* Home Icon - Active */}
          <div className="flex flex-col items-center cursor-pointer p-2 relative">
            <img src={Homeicon} alt="Home" className="w-7 h-7 object-cover" />
            <div className="absolute top-10 w-6 h-[2px] bg-[#0017e7] rounded-full"></div>
          </div>

          {/* Marketplace Icon */}
          <div className="flex flex-col items-center cursor-pointer p-2">
            <img
              src={Marketplace}
              alt="Marketplace"
              className="w-8 h-8 object-cover"
            />
          </div>

          {/* Settings Icon */}
          <div className="flex flex-col items-center cursor-pointer p-2">
            {/* <Settings className="w-7 h-7 text-gray-600" /> */}
            <img src={Hand} alt="Settings" className="w-8 h-8 object-cover" />
          </div>
        </div>
      </div>
    </>
  );
}
