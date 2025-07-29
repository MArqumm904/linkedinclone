import React, { useState, useEffect } from 'react';
import { X, Volume2, Play, Pause, MoreHorizontal, Trash2, Eye } from 'lucide-react';
import ViewersModal from './viewersmodal'; // Import the ViewersModal component
import { viewersData } from './viewersData'; // Import the viewers data
import avator from "../../assets/images/person-1.png"
import volumn from "../../assets/images/volume.png"
import pause from "../../assets/images/pause.png"
import dots from "../../assets/images/dots.png"
import deletee from "../../assets/images/delete.png"
import viewss from "../../assets/images/viewss.png"
import poststoryy from "../../assets/images/poststory.png"

const StoryViewer = ({ isOpen, onClose, stories, currentStoryIndex, currentUserStories }) => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showViewersModal, setShowViewersModal] = useState(false);
  const [progress, setProgress] = useState(0);

  const storiesToShow = currentUserStories || stories;
  const currentStoryData = storiesToShow[currentStory];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentStory < storiesToShow.length - 1) {
            setCurrentStory(prev => prev + 1);
            return 0;
          } else {
            onClose();
            return 0;
          }
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, currentStory, storiesToShow.length, onClose]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStory(currentStoryIndex || 0);
      setProgress(0);
    }
  }, [isOpen, currentStoryIndex]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleDeleteStory = () => {
    alert('Story deleted successfully!');
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
    if (currentStory < storiesToShow.length - 1) {
      setCurrentStory(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const prevStory = () => {
    if (currentStory > 0) {
      setCurrentStory(prev => prev - 1);
      setProgress(0);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-[#333333] z-50 flex items-center justify-center">
        <div className="relative w-full max-w-md h-full bg-black">
          {/* Progress bars */}
          <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
            {storiesToShow.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width: index < currentStory ? '100%' : 
                           index === currentStory ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-12 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <img
                src={avator}
                alt={currentStoryData?.name || ""}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-white font-medium text-sm">{currentStoryData?.name || ""}</p>
                <p className="text-gray-300 text-xs">{currentStoryData?.timeAgo || "30m ago"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-white">
                <img src={volumn} alt="Volume" className="w-6 h-6" />
              </button>
              <button onClick={togglePlayPause} className="text-white">
                {isPlaying ? (
                  <img src={pause} alt="Pause" className="w-6 h-6" />
                ) : (
                  <Play />
                )}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowDeleteMenu(!showDeleteMenu)}
                  className="text-white flex"
                >
                  <img src={dots} alt="More" className="w-5 h-1" />
                </button>
                {showDeleteMenu && (
                  <div className="absolute top-8 right-0 bg-white rounded-lg shadow-lg py-2 px-4 min-w-[160px]">
                    <button
                      onClick={handleDeleteStory}
                      className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-2 py-1 rounded w-full text-left"
                    >
                      <img src={deletee} alt="Delete" className="w-4 h-4" />
                      Delete Story
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="relative w-full h-full">
            {currentStoryData?.type === 'image' ? (
              <img
                src={poststoryy}
                alt="Story"
                className="w-full h-full object-cover"
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center text-white text-center p-8"
                style={{
                  background: currentStoryData?.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <div className="space-y-4">
                  {currentStoryData?.textElements?.map((element, index) => (
                    <div
                      key={index}
                      className="text-2xl font-bold"
                      style={{
                        color: element.color || 'white',
                        fontSize: element.fontSize || '24px'
                      }}
                    >
                      {element.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation areas */}
            <div className="absolute inset-0 flex">
              <div className="flex-1" onClick={prevStory} />
              <div className="flex-1" onClick={nextStory} />
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 z-10">
            <button 
              onClick={handleViewersClick}
              className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors"
            >
              <img src={viewss} alt="Views" className="w-4" />
              <span className="text-sm">{viewersData.length} Views</span>
            </button>
          </div>

          {/* Close button */}
        </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white z-20 p-1"
          >
            <X size={40} />
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