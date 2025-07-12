import {
  Search,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Forward,
} from "lucide-react";
import { useState } from "react";
import PostProfile from "../assets/images/postprofile.jpg";
import PostImage from "../assets/images/postimage.png";
import PostComment from "../components/post_comment";
import PostShare from "../components/post_share";

const Post = () => {
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [reactions, setReactions] = useState({
    like: 0,
    love: 0,
    laugh: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  });
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

  return (
    <div className="mx-auto space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 mx-auto">
        <div className="border-b rounded-t-lg p-4">
          <h2 className="text-gray-600 font-sf text-sm font-medium ms-2">
            Suggested
          </h2>
        </div>
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-3">
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
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-5 h-5 mb-5 mx-1" />
          </button>
        </div>
        <p className="px-4 text-gray-600 text-sm mb-3">
          If you're an Operation Manager, this is your chance to make a lasting
          impact. Lead with confidence, drive results, and shape the future of
          our operations.
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
            <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
              <ThumbsUp className="w-5 h-5" />
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
  );
};

export default Post;
