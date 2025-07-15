import { useState, useRef } from "react";
import { X, Plus, Play, Pause } from "lucide-react";
import CreateVideoPost from "../assets/images/create_post_image.png"; // Default video placeholder image
import Person1 from "../assets/images/person-1.png";

export default function CreatePostVideo({ onClose, selectedVideo }) {
  const [description, setDescription] = useState("");
  const [currentSelectedVideo, setCurrentSelectedVideo] = useState(selectedVideo);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleAddVideoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setCurrentSelectedVideo({
        file: file,
        url: videoUrl,
        name: file.name,
      });
    }
  };

  const handleRemoveVideo = () => {
    if (currentSelectedVideo && currentSelectedVideo.url) {
      URL.revokeObjectURL(currentSelectedVideo.url);
    }
    setCurrentSelectedVideo(null);
    setIsPlaying(false);
  };

  const handleClose = () => {
    if (currentSelectedVideo && currentSelectedVideo.url) {
      URL.revokeObjectURL(currentSelectedVideo.url);
    }
    if (onClose) onClose();
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    togglePlayPause();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />

      {/* Modal */}
      <div className="bg-white rounded-md shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h2 className="text-lg font-sf">Create Post</h2>
          <button
            onClick={handleClose}
            className="text-black hover:text-gray-700 hover:bg-gray-100 rounded-full p-1"
          >
            <X size={25} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 mt-4 -mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={Person1}
                className="w-full h-full object-cover"
                alt="User"
              />
            </div>
            <span className="font-medium text-gray-900 font-sf">
              The Ransom
            </span>
          </div>
        </div>

        {/* Description Input */}
        <div className="p-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full h-14 p-3 border border-gray-300 rounded-sm"
          />
        </div>

        {/* Post Preview */}
        <div className="px-4 pb-4">
          <div className="bg-black rounded-lg overflow-hidden relative">
            {/* Top buttons */}
            <div className="absolute top-3 left-3 justify-between items-start right-3 flex gap-2 z-10">
              <button
                onClick={handleAddVideoClick}
                className="flex font-sf bg-[#fcfcfc] bg-opacity-90 text-[#000000] px-3 py-1 rounded-sm text-sm hover:bg-opacity-100 transition-all"
              >
                <Plus size={20} className="mr-1" />  Add Video
              </button>
              {currentSelectedVideo && (
                <button
                  onClick={handleRemoveVideo}
                  className="bg-[#fcfcfc] bg-opacity-90 text-[#000000] w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Video Display */}
            <div className="relative">
              <div className="text-center">
                {currentSelectedVideo ? (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      src={currentSelectedVideo.url}
                      className="w-full h-auto object-cover max-h-96 cursor-pointer"
                      onClick={handleVideoClick}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      controls={false}
                      preload="metadata"
                    />
                    {/* Play/Pause Overlay */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={handleVideoClick}
                    >
                      <div className="bg-[#fcfcfc] bg-opacity-95 rounded-full p-3 hover:bg-opacity-70 transition-all">
                        {isPlaying ? (
                          <Pause size={32} className="text-black" />
                        ) : (
                          <Play size={32} className="text-black" />
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={CreateVideoPost}
                    alt="Default video post placeholder"
                    className="w-full h-auto object-cover max-h-96"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Post Button */}
        <div className="p-4 sticky bottom-0 bg-white border-t">
          <button
            onClick={handleClose}
            className="w-full bg-[#0017e7] text-white py-3 rounded-md font-medium hover:bg-[#0014cc] transition-colors"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}