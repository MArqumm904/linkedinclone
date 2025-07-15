import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Bookmark, Play, Pause } from "lucide-react";
import SidebarMenu from "../components/sidebarmenu";
import ProfileCard from "../components/profilecard";
import NavbarReplica from "../components/nav";
import PostImage from "../assets/images/postimage.png";
import PostImage2 from "../assets/images/create_post_image.png";

const Saved = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const [savedPosts, setSavedPosts] = useState([
    {
      id: 1,
      title: "If you're an Operation Manager, this is your chance to take your skills to.....",
      author: "Post by Design Foundation",
      media: PostImage,
      mediaType: "image",
      backgroundColor: "#F59E0B"
    },
    {
      id: 2,
      title: "If you're an Operation Manager, this is your chance to take your skills to.....",
      author: "Post by CPA Consulting",
      media: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      mediaType: "video",
      backgroundColor: "#059669"
    },
    {
      id: 3,
      title: "Learning isn't a race — it's a journey. Take your time to understand.....",
      author: "Post by The Ransom",
      media: PostImage2,
      mediaType: "image",
      backgroundColor: "#6B7280"
    }
  ]);

  const [removingPosts, setRemovingPosts] = useState(new Set());
  const [playingVideos, setPlayingVideos] = useState(new Set());

  const onBackToHome = () => {
    navigate("/");
  };

  const handleRemovePost = (postId) => {
    // First, mark the post as being removed (this will turn the icon black)
    setRemovingPosts(prev => new Set(prev).add(postId));
    
    // Then after a short delay, remove the post with animation
    setTimeout(() => {
      setSavedPosts(savedPosts.filter(post => post.id !== postId));
      setRemovingPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }, 300);
  };

  const handleVideoToggle = (postId) => {
    const videoElement = document.getElementById(`video-${postId}`);
    if (videoElement) {
      if (playingVideos.has(postId)) {
        videoElement.pause();
        setPlayingVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
      } else {
        videoElement.play();
        setPlayingVideos(prev => new Set(prev).add(postId));
      }
    }
  };

  const filteredPosts = savedPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
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
                    Saved Posts
                  </h1>
                </div>

                {/* Search Bar */}
                <div className="flex-1 mb-7 relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#343f7b] md:block hidden" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Saved Posts"
                    className="w-full bg-[#efeff3] font-sf rounded-full md:pl-14 pl-4 pr-4 py-2 md:py-4 text-[#343f7b] placeholder-[#343f7b] outline-none"
                  />
                </div>
                <div className="border-t border-gray-200 my-5"></div>

                {/* Saved Posts List */}
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className={`bg-white rounded-md shadow-sm border border-gray-200 p-2 hover:shadow-md transition-all duration-300 ${
                        removingPosts.has(post.id) ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Post Media */}
                        <div className="w-44 h-40 rounded-md overflow-hidden flex-shrink-0 relative" style={{ backgroundColor: post.backgroundColor }}>
                          {post.mediaType === "video" ? (
                            <div className="relative w-full h-full">
                              <video
                                id={`video-${post.id}`}
                                src={post.media}
                                className="w-full h-full object-cover"
                                preload="metadata"
                                loop
                                muted
                                onPlay={() => setPlayingVideos(prev => new Set(prev).add(post.id))}
                                onPause={() => setPlayingVideos(prev => {
                                  const newSet = new Set(prev);
                                  newSet.delete(post.id);
                                  return newSet;
                                })}
                              />
                              {/* Play/Pause Button Overlay */}
                              <div 
                                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                onClick={() => handleVideoToggle(post.id)}
                              >
                                <div className="bg-[#fcfcfc] rounded-full p-2 flex items-center justify-center hover:bg-opacity-70 transition-all">
                                  {playingVideos.has(post.id) ? (
                                    <Pause className="w-6 h-6 text-black" />
                                  ) : (
                                    <Play className="w-6 h-6 text-black" />
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={post.media}
                              alt="Post"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        {/* Post Content */}
                        <div className="flex-1">
                          <h3 className="font-semibold mt-3 text-gray-900 text-xl mb-2 font-sf line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-500 font-sf">
                            {post.author}
                          </p>
                        </div>

                        {/* Bookmark Icon */}
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => handleRemovePost(post.id)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Bookmark className={`w-6 h-6 fill-current transition-colors duration-200 ${
                              removingPosts.has(post.id) ? 'text-black' : 'text-[#fccf1a]'
                            }`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show message if no posts found */}
                {filteredPosts.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 font-sf">No saved posts found matching your search.</p>
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

export default Saved;