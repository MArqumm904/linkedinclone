import { useState, useRef, useEffect } from "react";
import { X, Play, Pause } from "lucide-react";
import addtext from "../../../assets/images/text.png";
import addstory from "../../../assets/images/add_Story.png";

const PostVideoStory = ({
  selectedVideo,
  textBoxes,
  handleMouseMove,
  handleMouseUp,
  handleMouseDown,
  handleTextClick,
  handleTextChange,
  handleAddText,
  handleAddToStory,
  handleRemoveText,
}) => {
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const [videoPosition, setVideoPosition] = useState({ x: 0, y: 0 });
  const [videoScale, setVideoScale] = useState(1);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Video time update
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [selectedVideo]);

  // Format time display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Video dragging handlers
  const handleVideoMouseDown = (e) => {
    if (!selectedVideo) return;

    setIsDraggingVideo(true);
    setDragStart({
      x: e.clientX - videoPosition.x,
      y: e.clientY - videoPosition.y,
    });
    e.preventDefault();
  };

  const handleVideoMouseMove = (e) => {
    if (!isDraggingVideo) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setVideoPosition({ x: newX, y: newY });
  };

  const handleVideoMouseUp = () => {
    setIsDraggingVideo(false);
  };

  const handleTouchStart = (e) => {
    if (!selectedVideo) return;

    const touch = e.touches[0];
    setIsDraggingVideo(true);
    setDragStart({
      x: touch.clientX - videoPosition.x,
      y: touch.clientY - videoPosition.y,
    });
  };

  const handleTouchMove = (e) => {
    if (!isDraggingVideo) return;

    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;

    setVideoPosition({ x: newX, y: newY });
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDraggingVideo(false);
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="relative w-full h-full bg-[#9b9b9b] flex items-center justify-center overflow-hidden"
        onMouseMove={isDraggingVideo ? handleVideoMouseMove : handleMouseMove}
        onMouseUp={isDraggingVideo ? handleVideoMouseUp : handleMouseUp}
        onMouseLeave={isDraggingVideo ? handleVideoMouseUp : handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {selectedVideo && (
          <div
            className="relative flex items-center justify-center"
            style={{ width: "260px", height: "450px" }}
          >
            <div
              className={`w-full h-full flex flex-col items-start justify-center relative ${
                isDraggingVideo ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{
                transform: `translate(${videoPosition.x}px, ${videoPosition.y}px) scale(${videoScale})`,
                transition: isDraggingVideo ? "none" : "transform 0.2s ease",
              }}
              onMouseDown={handleVideoMouseDown}
            >
              {/* Video Player */}
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={selectedVideo}
                  className="w-full h-full object-cover pointer-events-none"
                  muted
                  loop
                />

                {/* Video Overlay Controls */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className="bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-70 transition-all"
                    style={{ pointerEvents: "auto" }}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                </div>

                {/* Video Timer */}
                <div className="absolute top-3 left-3 text-white text-sm font-light">
                  The Ransom
                </div>
                <div className="absolute top-3 right-3 text-white text-sm font-light">
                  {formatTime(currentTime)} / {formatTime(duration || 0)}
                </div>

                {/* Profile Name Overlay */}
                {/* <div className="absolute bottom-3 left-3 text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
                  The Reason
                </div> */}
              </div>
            </div>
          </div>
        )}

        {/* Text boxes */}
        {textBoxes.map((textBox) => (
          <div
            key={textBox.id}
            className="absolute cursor-move group"
            style={{
              left: `${textBox.x}px`,
              top: `${textBox.y}px`,
              fontSize: textBox.fontSize,
              color: textBox.color,
            }}
            onMouseDown={(e) => handleMouseDown(e, textBox)}
          >
            {/* Control buttons - shows on hover */}
            <div className="absolute -top-8 left-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveText(textBox.id);
                }}
                className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                title="Remove Text"
              >
                <X size={12} />
              </button>
            </div>

            {textBox.editing ? (
              <input
                type="text"
                value={textBox.text}
                onChange={(e) => handleTextChange(textBox.id, e.target.value)}
                onBlur={() => handleTextClick(textBox.id)}
                className="bg-transparent border-none outline-none font-bold"
                style={{
                  fontSize: textBox.fontSize,
                  color: textBox.color,
                  minWidth: "120px",
                }}
                autoFocus
              />
            ) : (
              <div
                className="font-bold cursor-pointer select-none"
                onClick={() => handleTextClick(textBox.id)}
                style={{
                  fontSize: textBox.fontSize,
                  color: textBox.color,
                }}
              >
                {textBox.text}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Video controls */}
      {selectedVideo && (
        <div className="absolute top-4 left-4 flex gap-2">
          <button
            onClick={() => setVideoScale((prev) => Math.max(0.5, prev - 0.1))}
            className="bg-gray-700 bg-opacity-80 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
          >
            -
          </button>
          <span className="bg-gray-700 bg-opacity-80 text-white px-3 py-1 rounded text-sm">
            {Math.round(videoScale * 100)}%
          </span>
          <button
            onClick={() => setVideoScale((prev) => Math.min(2, prev + 0.1))}
            className="bg-gray-700 bg-opacity-80 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
          >
            +
          </button>
        </div>
      )}

      {/* Bottom buttons */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
        <button
          onClick={handleAddToStory}
          className="bg-gray-700 bg-opacity-80 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors font-medium"
        >
          <img src={addstory} alt="Add" className="w-[18px] h-[18px]" />
          Add to Story
        </button>
        <button
          onClick={handleAddText}
          className="bg-gray-700 bg-opacity-80 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors font-medium"
        >
          <img src={addtext} alt="Text" className="w-[18px] h-[18px]" />
          Add Text
        </button>
      </div>
    </div>
  );
};

export default PostVideoStory;
