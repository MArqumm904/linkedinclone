import React from "react";
import photo from "../../../assets/images/testimage.png"
import photo2 from "../../../assets/images/test2image.png"
import postimage from "../../../assets/images/postimage.png"

const PhotoStoryView = ({ story, onAddToStory, onAddText }) => {
  return (
    <div className="w-full h-full relative bg-[#9B9B9B] flex items-center justify-center">
       <div 
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-30"
        style={{
          backgroundImage: `url(${story?.url || "https://images.unsplash.com/photo-1698778573682-346d219322b2?w=1080&auto=format"})`
        }}
      />
      <img
        src={
          story?.url ||
          "https://images.unsplash.com/photo-1682686580391-615b5f41556b?w=1080&auto=format"
        }
        // src={postimage}
        alt="Story"
        // className="max-w-[80%] h-[50%] object-cover rounded-lg shadow-lg"
        className="h-full w-full object-contain  rounded-lg"
      />

      {/* Overlay text if any */}
      {story?.textElements && (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="space-y-4 text-center">
            {story.textElements.map((element, index) => (
              <div
                key={index}
                className="font-bold drop-shadow-lg"
                style={{
                  color: element.color || "white",
                  fontSize: element.fontSize || "24px",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                }}
              >
                {element.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoStoryView;
