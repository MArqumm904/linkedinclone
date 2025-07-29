import { useState, useRef } from "react";
import { X } from "lucide-react";
import addtext from "../../../assets/images/text.png";
import addstory from "../../../assets/images/add_Story.png";

const PostTextStory = ({
  postContent,
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
  const containerRef = useRef(null);

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="relative w-full h-full bg-[#9b9b9b] flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Post Content Display */}
        <div className="w-full h-full flex flex-col items-center justify-center px-6">
          {/* Profile Section */}
          <div className="bg-white rounded-xl p-4 w-full max-w-[280px] shadow-lg">
            {/* Profile Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">JR</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">JR Graphics</h3>
                <p className="text-gray-500 text-xs">2h ago</p>
              </div>
            </div>

            {/* Post Text Content */}
            <div className="bg-black text-white p-12 rounded-lg text-center">
              <p className="text-md font-medium leading-relaxed">
                {postContent || "Amazing new features. Created playlists and exclusive content for you."}
              </p>
            </div>

            {/* Footer Text */}
            <div className="mt-3 text-center">
              <p className="text-gray-600 text-xs">
                Discover new features, created playlists and exclusive content from your story.
              </p>
            </div>
          </div>

        </div>

        {/* Text boxes */}
        {textBoxes.map((textBox) => (
          <div
            key={textBox.id}
            className="absolute cursor-move group"
            style={{
              left: `${textBox.x}px`,
              top: `${textBox.y}px`,
              fontSize: textBox.fontSize,
              color: textBox.color
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
                  minWidth: "120px"
                }}
                autoFocus
              />
            ) : (
              <div
                className="font-bold cursor-pointer select-none"
                onClick={() => handleTextClick(textBox.id)}
                style={{
                  fontSize: textBox.fontSize,
                  color: textBox.color
                }}
              >
                {textBox.text}
              </div>
            )}
          </div>
        ))}
      </div>

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

export default PostTextStory;