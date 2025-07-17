import { useState, useEffect, useRef } from "react";
import {
  Search,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Forward,
} from "lucide-react";
import PostProfile from "../assets/images/postprofile.jpg";
import PostImage from "../assets/images/postimage.png";
import PostComment from "../components/post_comment";
import PostShare from "../components/post_share";
import bookmark from "../assets/images/bookmark 1.png";
import avatorr from "../assets/images/avatorr.png";
import error from "../assets/images/error.png";
import addtostory from "../assets/images/addtostory.png";
import PostStory from "./homecomponents/poststory";

const Post = () => {
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showStoryCreator, setShowStoryCreator] = useState(false);
  const [storyType, setStoryType] = useState("photo");
  const [selectedImage, setSelectedImage] = useState(null);
  const [textBoxes, setTextBoxes] = useState([]);
  const [showFullText, setShowFullText] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const handleLike = () => {
    if (!isLiked) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 600);
    }
    setIsLiked(!isLiked);
  };
  const [reactions, setReactions] = useState({
    like: 0,
    love: 0,
    laugh: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  });
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const recommendations = [
    {
      id: 1,
      name: "Sarah Malik",
      avatar: PostImage,
      description:
        "Freelance Web designer helping startups build bold, modern brand identities",
    },
    {
      id: 2,
      name: "Arshpixels",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      description:
        "Freelance designer helping startups build bold, modern brand identities",
    },
    {
      id: 3,
      name: "Codebyrixa",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      description:
        "Freelance iOS Developer helping startups build bold, modern brand identities",
    },
  ];

  // Story related handlers
  const handleAddToStory = () => {
    setShowStoryCreator(false);
    setSelectedImage(null);
    setTextBoxes([]);
    alert("Post added to your story successfully!");
  };

  const closeStoryCreator = () => {
    setShowStoryCreator(false);
    setSelectedImage(null);
    setTextBoxes([]);
  };

  const handleAddText = () => {
    const newTextBox = {
      id: Date.now(),
      text: "Add text here",
      x: 50,
      y: 50,
      editing: true,
      fontSize: "16px",
      color: "white",
    };
    setTextBoxes([...textBoxes, newTextBox]);
  };

  const handleTextClick = (id) => {
    setTextBoxes(
      textBoxes.map((box) =>
        box.id === id ? { ...box, editing: true } : { ...box, editing: false }
      )
    );
  };

  const handleTextChange = (id, newText) => {
    setTextBoxes(
      textBoxes.map((box) => (box.id === id ? { ...box, text: newText } : box))
    );
  };

  const handleRemoveText = (id) => {
    setTextBoxes(textBoxes.filter((box) => box.id !== id));
  };

  const handleMouseDown = (e, textBox) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggedText(textBox.id);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const [draggedText, setDraggedText] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (draggedText) {
      const container = e.currentTarget.getBoundingClientRect();
      const newX = e.clientX - container.left - dragOffset.x;
      const newY = e.clientY - container.top - dragOffset.y;

      setTextBoxes(
        textBoxes.map((box) =>
          box.id === draggedText
            ? {
                ...box,
                x: Math.max(0, Math.min(newX, container.width - 100)),
                y: Math.max(0, Math.min(newY, container.height - 30)),
              }
            : box
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggedText(null);
  };

  const handleAddToStoryFromMenu = () => {
    setShowMenu(false);
    setStoryType("poststory");
    setSelectedImage(PostImage);
    setShowStoryCreator(true);
  };

  useEffect(() => {
    if (showCommentPopup || showSharePopup || showStoryCreator) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showCommentPopup, showSharePopup, showStoryCreator]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <div className="mx-auto space-y-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 mx-auto">
          <div className="border-b rounded-t-lg p-4">
            <h2 className="text-gray-600 font-sf text-sm font-medium ms-2">
              Suggested
            </h2>
          </div>
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-3 relative">
            {/* Left profile + name block */}
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-md bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center mr-3">
                <img
                  src={PostProfile}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-md cursor-pointer"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 text-sm cursor-pointer">
                    Design Foundation
                  </span>
                  <span className="text-[#0017e7] ml-1 text-xs cursor-pointer font-semibold ms-3">
                    • Follow
                  </span>
                </div>
                <span className="text-gray-500 text-xs">2 Days Ago</span>
              </div>
            </div>

            {/* More icon + dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowMenu(!showMenu)}
              >
                <MoreHorizontal className="w-5 h-5 mb-5 mx-1" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-md z-10 p-2 space-y-2 text-sm">
                  <button className="w-full flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded-md text-left">
                    <img src={bookmark} alt="Save" className="w-4 h-4" />
                    <span>Save Post</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded-md text-left">
                    <img src={avatorr} alt="Profile" className="w-4 h-4" />
                    <span>View The Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded-md text-left text-red-600 font-medium">
                    <img src={error} alt="Report" className="w-4 h-4" />
                    <span>Report Post</span>
                  </button>
                  <button
                    className="w-full flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded-md text-left"
                    onClick={handleAddToStoryFromMenu}
                  >
                    <img src={addtostory} alt="Add" className="w-4 h-4" />
                    <span>Add to story</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="px-4 text-gray-600 text-sm mb-3">
            {/* Mobile: Toggle text */}
            <span className="block md:hidden">
              {showFullText
                ? "If you're an Operation Manager, this is your chance to make a lasting impact. Lead with confidence, drive results, and shape the future of our operations."
                : "If you're an Operation Manager, this is your chance to make a lasting impact..."}
              <span
                className="text-blue-500 font-semibold ml-1 cursor-pointer"
                onClick={() => setShowFullText(!showFullText)}
              >
                {showFullText ? "See Less" : "See More"}
              </span>
            </span>

            {/* Desktop: Always show full text, no toggle */}
            <span className="hidden md:block">
              If you're an Operation Manager, this is your chance to make a
              lasting impact. Lead with confidence, drive results, and shape the
              future of our operations.
            </span>
          </p>
          {/* Content */}
          <div className="pb-3">
            {/* Job Post Image */}
            <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-400 overflow-hidden">
              <img
                src={PostImage}
                alt="Profile"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Reactions */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              {/* Left side - Reaction icons and count */}
              <div className="flex items-center space-x-2 ms-1">
                <div className="flex items-center -space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white z-10">
                    <ThumbsUp className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                    <span className="text-white text-lg">❤️</span>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  1.7k Likes
                </span>
              </div>

              {/* Right side - Comments and views */}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>9 Comments</span>
                <span className="text-gray-300">|</span>
                <span>118 Views</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 px-9 py-5">
            <div className="flex justify-between">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 transition-colors ${
                  isLiked
                    ? "text-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                <div className="relative">
                  <ThumbsUp
                    className={`w-5 h-5 transition-all duration-300 ${
                      showAnimation ? "animate-bounce" : ""
                    }`}
                    fill={isLiked ? "currentColor" : "none"}
                  />

                  {/* Animation effect */}
                  {showAnimation && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute -top-1 left-0 animate-ping opacity-75">
                        <ThumbsUp
                          className="w-5 h-5 text-blue-500"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <span className="text-sm font-medium">Like</span>
              </button>
              <button
                onClick={() => setShowCommentPopup(true)}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Comment</span>
              </button>
              {/* PostComment Component */}
              {showCommentPopup && (
                <PostComment
                  // videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
                  post_image={PostImage}
                  // text={"Ehy"}
                  onClose={() => setShowCommentPopup(false)}
                />
              )}

              <button
                onClick={() => setShowSharePopup(true)}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Forward className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>
              {showSharePopup && (
                <PostShare
                  videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
                  onClose={() => setShowSharePopup(false)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-2 border-gray-200 shadow-sm mx-auto">
          {/* Header */}
          <div className="px-4 py-3 border-b">
            <h2 className="text-gray-600 font-medium text-sm">
              Recommended For You
            </h2>
          </div>

          {/* Recommendations List */}
          <div className="p-4 space-y-4">
            {recommendations.map((person, index) => (
              <div
                key={person.id}
                className="flex items-start space-x-4  border-b pb-3"
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-14 h-14 rounded object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900 text-lg">
                      {person.name}
                    </h3>
                    <span className="text-xs text-[#0017e7]">•</span>
                    <button className="text-[#0017e7] text-xs font-medium hover:underline">
                      Connect
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {person.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      <PostStory
        showStoryCreator={showStoryCreator}
        closeStoryCreator={closeStoryCreator}
        storyType={storyType}
        selectedImage={selectedImage}
        textBoxes={textBoxes}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        handleMouseDown={handleMouseDown}
        handleTextClick={handleTextClick}
        handleTextChange={handleTextChange}
        handleAddText={handleAddText}
        handleAddToStory={handleAddToStory}
        setTextBoxes={setTextBoxes}
        handleRemoveText={handleRemoveText}
      />
    </>
  );
};

export default Post;
