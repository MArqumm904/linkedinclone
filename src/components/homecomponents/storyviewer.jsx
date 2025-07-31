import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import TextStoryView from "./storycomponents/TextStoryView";
import PhotoStoryView from "./storycomponents/PhotoStoryView";
import PostPhotoStoryView from "./storycomponents/PostPhotoStoryView";
import PostTextStoryView from "./storycomponents/PostTextStoryView";
import PostVideoStoryView from "./storycomponents/PostVideoStoryView";
import ViewersModal from "./viewersmodal";
import { viewersData } from "./viewersData";
import cross from "../../assets/images/cross_icon.png";
import dots from "../../assets/images/dots.png";
import pause from "../../assets/images/pause.png";
import volume from "../../assets/images/volume.png";
import viewss from "../../assets/images/viewss.png";
import { Play } from "lucide-react";

const StoryViewer = ({
  isOpen,
  onClose,
  stories,
  currentStoryIndex,
  currentUserStories,
}) => {
  const [currentStory, setCurrentStory] = useState(0);
  const [currentStoryItem, setCurrentStoryItem] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showViewersModal, setShowViewersModal] = useState(false);
  const [progress, setProgress] = useState(0);

  const storiesToShow = currentUserStories || stories;
  const currentStoryData = storiesToShow[currentStory];
  const currentItem =
    currentStoryData?.stories?.[currentStoryItem] || currentStoryData;

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next story item
          if (
            currentStoryData?.stories &&
            currentStoryItem < currentStoryData.stories.length - 1
          ) {
            setCurrentStoryItem((prev) => prev + 1);
            return 0;
          }
          // Move to next user's story
          else if (currentStory < storiesToShow.length - 1) {
            setCurrentStory((prev) => prev + 1);
            setCurrentStoryItem(0);
            return 0;
          }
          // Close viewer
          else {
            onClose();
            return 0;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [
    isOpen,
    isPlaying,
    currentStory,
    currentStoryItem,
    storiesToShow.length,
    currentStoryData?.stories?.length,
    onClose,
  ]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStory(currentStoryIndex || 0);
      setCurrentStoryItem(0);
      setProgress(0);
    }
  }, [isOpen, currentStoryIndex]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleDeleteStory = () => {
    alert("Story deleted successfully!");
    setShowDeleteMenu(false);
    onClose();
  };

  const handleViewersClick = () => {
    setShowViewersModal(true);
    setIsPlaying(false);
  };

  const handleViewersClose = () => {
    setShowViewersModal(false);
    setIsPlaying(true);
  };

  const nextStory = () => {
    if (
      currentStoryData?.stories &&
      currentStoryItem < currentStoryData.stories.length - 1
    ) {
      setCurrentStoryItem((prev) => prev + 1);
      setProgress(0);
    } else if (currentStory < storiesToShow.length - 1) {
      setCurrentStory((prev) => prev + 1);
      setCurrentStoryItem(0);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const prevStory = () => {
    if (currentStoryItem > 0) {
      setCurrentStoryItem((prev) => prev - 1);
      setProgress(0);
    } else if (currentStory > 0) {
      setCurrentStory((prev) => prev - 1);
      // Set to last story item of previous user
      const prevStoryData = storiesToShow[currentStory - 1];
      setCurrentStoryItem(
        prevStoryData?.stories ? prevStoryData.stories.length - 1 : 0
      );
      setProgress(0);
    }
  };

  const renderStoryContent = () => {
    const storyType = currentItem?.type || "photo";

    switch (storyType) {
      case "text":
        return (
          <TextStoryView
            story={currentItem}
            onAddToStory={() => {}}
            onAddText={() => {}}
          />
        );
      case "photo":
        return (
          <PhotoStoryView
            story={currentItem}
            onAddToStory={() => {}}
            onAddText={() => {}}
          />
        );
      case "postphotostory":
        return (
          <PostPhotoStoryView
            story={currentItem}
            onAddToStory={() => {}}
            onAddText={() => {}}
          />
        );
      case "posttextstory":
        return (
          <PostTextStoryView
            story={currentItem}
            onAddToStory={() => {}}
            onAddText={() => {}}
          />
        );
      case "postvideostory":
      case "video":
        return (
          <PostVideoStoryView
            story={currentItem}
            onAddToStory={() => {}}
            onAddText={() => {}}
          />
        );
      default:
        return (
          <PhotoStoryView
            story={currentItem}
            onAddToStory={() => {}}
            onAddText={() => {}}
          />
        );
    }
  };

  const getTotalProgressBars = () => {
    if (currentStoryData?.stories) {
      return currentStoryData.stories.length;
    }
    return 1;
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-[#333333] z-50 flex items-center justify-center">
        <div className="relative w-full max-w-md h-[800px] bg-black overflow-hidden flex flex-col justify-center items-center mx-auto my-auto rounded-xl">
          {/* Progress bars */}
          <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
            {Array.from({ length: getTotalProgressBars() }, (_, index) => (
              <div
                key={index}
                className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width:
                      index < currentStoryItem
                        ? "100%"
                        : index === currentStoryItem
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Story Content */}
          <div className="relative w-full h-full">
            {renderStoryContent()}

            {/* Navigation areas */}
            <div className="absolute inset-0 flex z-10">
              <div className="flex-1" onClick={prevStory} />
              <div className="flex-1" onClick={nextStory} />
            </div>
          </div>

          {/* Header */}
          <div className="absolute top-12 left-4 right-4 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <img
                src={
                  currentStoryData?.avatar ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face"
                }
                alt={currentStoryData?.name || ""}
                className="w-8 h-8 rounded-full object-cover border border-white"
              />
              <div>
                <p className="text-white font-medium text-sm">
                  {currentStoryData?.name || ""}
                </p>
                <p className="text-gray-300 text-xs">30m ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-white p-1">
                <img src={volume} alt="Volume" className="w-5 h-5" />
              </button>
              <button onClick={togglePlayPause} className="text-white p-1">
                {isPlaying ? (
                  <img
                    src={pause}
                    alt={isPlaying ? "Pause" : "Play"}
                    className="w-5 h-5"
                  />
                ) : (
                  <Play
                    className="w-5 h-5 cursor-pointer"
                    onClick={togglePlayPause}
                  />
                )}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowDeleteMenu(!showDeleteMenu)}
                  className="text-white p-1"
                >
                  <img src={dots} alt="Menu" className="w-6 h-2" />
                </button>
                {showDeleteMenu && (
                  <div className="absolute top-8 right-0 bg-white rounded-lg shadow-lg py-2 px-4 min-w-[170px]">
                    <button
                      onClick={handleDeleteStory}
                      className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-2 py-1 rounded w-full text-left"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Delete Story
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer - Views */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 z-20">
            <button
              onClick={handleViewersClick}
              className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors"
            >
              <img src={viewss} alt="Views" className="w-6 h-4" />
              <span className="text-sm">{viewersData.length} Views</span>
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white z-30 p-2 bg-opacity-50 rounded-full"
        >
          <img src={cross} alt="Close" className="w-6 h-6" />
        </button>
      </div>

      {/* Viewers Modal */}
      <ViewersModal
        isOpen={showViewersModal}
        onClose={handleViewersClose}
        viewers={viewersData}
      />
    </>
  );
};

export default StoryViewer;
