// Updated PostTab Component
import React, { useState, useRef } from "react";
import { usePosts } from "../contexts/PostsContext";
import {
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Forward,
  Pencil,
  Trash2,
  Eye,
  Play,
} from "lucide-react";

const PostTab = ({ 
  number_of_text_posts, 
  number_of_image_posts, 
  number_of_video_posts,
  text_posts_data,
  image_posts_data,
  video_posts_data
}) => {
  const { state, actions } = usePosts(); // KEY CHANGE: Get state from context
  const [showMenu, setShowMenu] = useState({});
  const [showFullText, setShowFullText] = useState({});
  const [isLiked, setIsLiked] = useState({});
  const [showAnimation, setShowAnimation] = useState({});
  const [videoPlaying, setVideoPlaying] = useState({});
  const menuRef = useRef(null);

  const handleLike = (postId) => {
    setIsLiked((prev) => ({ ...prev, [postId]: !prev[postId] }));
    setShowAnimation((prev) => ({ ...prev, [postId]: true }));
    setTimeout(
      () => setShowAnimation((prev) => ({ ...prev, [postId]: false })),
      600
    );
  };

  const handleUpdatePost = (postType, postId, updatedData) => {
    actions.updatePost(postType, postId, updatedData);
  };

  const handleDeletePost = (postType, postId) => {
    actions.deletePost(postType, postId);
    setShowMenu((prev) => ({ ...prev, [postId]: false }));
  };

  const handleEditPost = (post) => {
    // Edit functionality
    const newContent = prompt("Edit your post:", post.content);
    if (newContent && newContent !== post.content) {
      const postTypeMap = {
        text: 'textPosts',
        image: 'imagePosts',
        video: 'videoPosts'
      };
      handleUpdatePost(postTypeMap[post.type], post.id, { content: newContent });
    }
    setShowMenu((prev) => ({ ...prev, [post.uniqueId]: false }));
  };

  const toggleMenu = (postId) => {
    setShowMenu((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // KEY CHANGE: Use state from context instead of props
  const allPosts = [
    ...state.textPosts.map((post, index) => ({
      ...post,
      type: "text",
      id: post.id || `text_${index}`,
      uniqueId: `text_${post.id || index}`,
    })),
    ...state.imagePosts.map((post, index) => ({
      ...post,
      type: "image",
      id: post.id || `image_${index}`,
      uniqueId: `image_${post.id || index}`,
    })),
    ...state.videoPosts.map((post, index) => ({
      ...post,
      type: "video",
      id: post.id || `video_${index}`,
      uniqueId: `video_${post.id || index}`,
    })),
  ];

  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  // KEY CHANGE: Add debug log to check if posts are available
  console.log("Posts available:", {
    textPosts: state.textPosts,
    imagePosts: state.imagePosts,
    videoPosts: state.videoPosts,
    allPosts: allPosts
  });

  const renderPostContent = (post) => {
    switch (post.type) {
      case "text":
        console.log(post.content);
        return (
          <div className="px-5 py-4 bg-gray-50 rounded-lg mb-3">
            <p className="text-gray-800 text-3xl leading-relaxed font-sf">
              {post.content}
            </p>
          </div>
        );

      case "image":
        return (
          <div className="pb-3 w-full">
            <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-400 overflow-hidden w-full">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-[28rem] object-contain"
              />
            </div>
          </div>
        );

      case "video":
        return (
          <div className="pb-3 w-full">
            <div className="relative bg-black overflow-hidden w-full">
              <video
                controls
                className="w-full h-[35rem] object-cover"
                onPlay={() => setVideoPlaying(prev => ({ ...prev, [post.uniqueId]: true }))}
                onPause={() => setVideoPlaying(prev => ({ ...prev, [post.uniqueId]: false }))}
              >
                <source src={post.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {!videoPlaying[post.uniqueId] && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const video = e.currentTarget.previousElementSibling;
                    if (video && video.tagName === "VIDEO") {
                      video.play();
                    }
                  }}
                >
                  <div className="w-16 h-16 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-full py-6">
      <div className="grid grid-cols-12 gap-6 w-full">
        <div className="col-span-12 lg:col-span-7 w-full">
          {sortedPosts.length === 0 ? (
            // KEY CHANGE: Add fallback for empty posts
            <div className="bg-white rounded-lg shadow-sm border border-[#6974b1] p-8 text-center">
              <p className="text-gray-500">No posts available yet.</p>
            </div>
          ) : (
            sortedPosts.map((post) => (
              <div
                key={post.uniqueId}
                className="bg-white rounded-lg shadow-sm border border-[#6974b1] mb-4 w-full"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5 pb-3 relative">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-md flex items-center justify-center mr-3">
                      <div className="w-full h-full bg-gray-300 rounded-md"></div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 text-sm">
                        Design Foundation
                      </span>
                      <div className="text-gray-500 text-xs">
                        2 hours ago
                      </div>
                    </div>
                  </div>

                  {/* Menu */}
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => toggleMenu(post.uniqueId)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>

                    {showMenu[post.uniqueId] && (
                      <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-2 space-y-2 text-sm">
                        <button 
                          onClick={() => handleEditPost(post)}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md text-left"
                        >
                          <Pencil className="w-4 h-4" />
                          <span>Edit Post</span>
                        </button>
                        <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md text-left">
                          <Eye className="w-4 h-4" />
                          <span>View Profile</span>
                        </button>
                        <button 
                          onClick={() => handleDeletePost(
                            post.type === 'text' ? 'textPosts' : 
                            post.type === 'image' ? 'imagePosts' : 'videoPosts',
                            post.id
                          )}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md text-left text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Post</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Post Content */}
                {post.content && post.type !== "text" && (
                  <p className="px-5 text-gray-600 text-sm mb-3">
                    {post.content}
                  </p>
                )}

                {renderPostContent(post)}

                {/* Actions */}
                <div className="border-t border-gray-200 px-9 py-5">
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleLike(post.uniqueId)}
                      className={`flex items-center space-x-2 transition-colors ${
                        isLiked[post.uniqueId] ? "text-blue-500" : "text-gray-600"
                      }`}
                    >
                      <ThumbsUp className="w-5 h-5" />
                      <span>Like</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600">
                      <MessageCircle className="w-5 h-5" />
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600">
                      <Forward className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostTab;