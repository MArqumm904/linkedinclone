import { useState } from "react";
import {
  X,
  Send,
  MoreHorizontal,
  ThumbsUp,
  Forward,
  Bookmark,
  SendHorizontal,
  Smile,
} from "lucide-react";
import VideoComponent from "../components/post_video";

const PostComment = ({ onClose, post_image, text, videoUrl }) => {
  // onClose prop add kiya
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Omar Farooq",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&round=50",
      text: "Interested! Will be sending my resume and applying works",
      time: "2h ago",
      likes: 45,
      replies: [
        {
          id: 101,
          user: "Design Foundation",
          avatar:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face&round=50",
          text: "Great! Please send your resume to the email mentioned.",
          time: "1h ago",
          likes: 12,
        },
        {
          id: 102,
          user: "Sarah Ahmed",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b332c3cd?w=40&h=40&fit=crop&crop=face&round=50",
          text: "Same here! Looking forward to this opportunity.",
          time: "45m ago",
          likes: 8,
        },
      ],
    },
    {
      id: 2,
      user: "Fatik Miftahuha",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b332c3cd?w=40&h=40&fit=crop&crop=face&round=50",
      text: "Great opportunity! Will there be more opening? 🤔",
      time: "1h ago",
      likes: 23,
      replies: [
        {
          id: 201,
          user: "HR Team",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&round=50",
          text: "Yes, we will be posting more positions soon!",
          time: "30m ago",
          likes: 15,
        },
      ],
    },
    {
      id: 3,
      user: "Mufias Raza",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&round=50",
      text: "How about other positions? Is it working remotely? Pleas",
      time: "45m ago",
      likes: 12,
      replies: [],
    },
    {
      id: 4,
      user: "Taria Javed",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&round=50",
      text: "Love this offer youre posting 🥰 Thank you! Best wishes!",
      time: "30m ago",
      likes: 67,
      replies: [
        {
          id: 401,
          user: "Ahmad Ali",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&round=50",
          text: "Totally agree! Such a great company culture.",
          time: "20m ago",
          likes: 5,
        },
        {
          id: 402,
          user: "Zara Khan",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&round=50",
          text: "Best of luck to everyone applying! 💪",
          time: "15m ago",
          likes: 9,
        },
        {
          id: 403,
          user: "Design Foundation",
          avatar:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face&round=50",
          text: "Thank you for the kind words! We appreciate it.",
          time: "10m ago",
          likes: 18,
        },
      ],
    },
  ]);

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [hiddenReplies, setHiddenReplies] = useState({});

  const toggleReplies = (commentId) => {
    setHiddenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: "Your Name",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&round=50",
        text: newComment,
        time: "now",
        likes: 0,
        replies: [],
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleAddReply = (commentId) => {
    if (replyText.trim()) {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(),
                user: "Tahoor",
                avatar:
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&round=50",
                text: replyText,
                time: "now",
                likes: 0,
              },
            ],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyText("");
      setReplyingTo(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-full overflow-hidden">
        {/* Original Post in Popup */}
        <div className="border-b border-gray-200">
          {/* Post Header */}
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                {/* <span className="text-white font-bold text-xs">DF</span> */}
                <img
                  src="./src/assets/images/postprofile.jpg"
                  className="w-full h-full rounded-md object-cover"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">
                    Design Foundation
                  </h3>
                  <p className="text-xs text-gray-500">2 Days Ago</p>
                </div>
                <button className="text-[#0017e7] ml-1 -mt-4 text-xs cursor-pointer font-semibold ms-3">
                  • Follow
                </button>
              </div>
            </div>
            <button
              onClick={onClose} // onClose prop use kiya
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-black  hover:text-gray-600" />
            </button>
          </div>

          {/* Mini Job Post */}
          <div className="border-t">
            {post_image ? (
              <img
                src={post_image}
                alt="Post"
                className="w-full h-96 object-cover"
              />
            ) : text ? (
              <p className="text-center text-lg p-4 text-black font-sf py-8">
                {text}
              </p>
            ) : (
              <VideoComponent videoUrl={videoUrl} />
            )}
          </div>
        </div>

        {/* Comments List */}
        <div className="max-h-52 overflow-y-auto hide-scrollbar">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100">
              <div className="p-3 hover:bg-gray-50 transition-colors">
                <div className="flex space-x-2">
                  <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="rounded-2xl px-1 py-2">
                      <div className="flex items-center gap-1">
                        <p className="font-semibold text-xs mr-1 text-gray-900">
                          {comment.user}
                        </p>
                        <span className="text-[10px] text-gray-500">•</span>
                        <span className="text-[10px] text-gray-500">
                          {comment.time}
                        </span>
                      </div>

                      <p className="text-xs text-gray-800 mt-1">
                        {comment.text}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                      <span>{comment.time}</span>
                      <button className="hover:text-blue-500 transition-colors font-medium">
                        Like
                      </button>
                      <button
                        onClick={() => setReplyingTo(comment.id)}
                        className="hover:text-blue-500 transition-colors font-medium"
                      >
                        Reply
                      </button>
                      {comment.likes > 0 && <span>{comment.likes} likes</span>}
                    </div>

                    {/* Show/Hide Replies Button */}
                    {comment.replies && comment.replies.length > 0 && (
                      <button
                        onClick={() => toggleReplies(comment.id)}
                        className="text-xs text-blue-500 hover:text-blue-600 font-medium mt-2 flex items-center space-x-1"
                      >
                        {replyingTo !== comment.id &&
                          (hiddenReplies[comment.id] ? (
                            <>
                              <button className="flex items-center space-x-2 border border-gray-300 px-3 py-1 rounded-full text-[0.65rem] text-black hover:bg-gray-100 transition">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>

                                <span>Show Replies</span>
                              </button>
                            </>
                          ) : (
                            <button className="flex items-center space-x-2 border border-gray-300 px-3 py-1 rounded-full text-[0.65rem] text-black hover:bg-gray-100 transition">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 15l7-7 7 7"
                                />
                              </svg>
                              <span>Hide Replies</span>
                            </button>
                          ))}
                      </button>
                    )}
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreHorizontal className="w-3 h-3 text-gray-400" />
                  </button>
                </div>

                {/* Reply Input */}
                {replyingTo === comment.id && (
                  <div className="ml-10 mt-2 flex space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&round=50"
                      alt="Your avatar"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Reply to ${comment.user}...`}
                        className="w-full bg-gray-100 rounded-full px-3 py-1 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleAddReply(comment.id)
                        }
                      />
                      <button
                        onClick={() => handleAddReply(comment.id)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="text-xs text-gray-400 hover:text-gray-600 px-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Replies */}
              {comment.replies &&
                comment.replies.length > 0 &&
                !hiddenReplies[comment.id] && (
                  <div className="ml-10 border-l border-gray-200 pl-3">
                    {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="py-2 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex space-x-2">
                          <img
                            src={reply.avatar}
                            alt={reply.user}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className=" rounded-2xl px-1 py-2">
                              <p className="font-semibold text-xs -mt-2 text-gray-900">
                                {reply.user}
                              </p>
                              <p className="text-xs text-gray-800 mt-1">
                                {reply.text}
                              </p>
                            </div>
                            <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                              <span>{reply.time}</span>
                              <button className="hover:text-blue-500 transition-colors font-medium">
                                Like
                              </button>
                              {reply.likes > 0 && (
                                <span>{reply.likes} likes</span>
                              )}
                            </div>
                          </div>
                          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <MoreHorizontal className="w-3 h-3 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>

        {/* Top Action Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <button className="flex items-center space-x-1 text-blue-600 font-medium">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-black">145k</span>
            </button>
            <span className="text-gray-300">|</span>
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <Forward className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
          <button className="text-gray-600 hover:text-black">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Comment Input Bar */}
        <div className="flex items-center px-4 py-3 border-t bg-white">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="I needed this motivation today. Thank you!"
            className="flex-1 bg-transparent text-sm text-gray-700 focus:outline-none"
          />
          <button className="text-gray-500 text-xl hover:text-gray-700 mr-2">
            <Smile className="w-4 h-4" />
          </button>
          <button
            onClick={handleAddComment}
            className="text-gray-600 hover:text-blue-600"
          >
            <SendHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
