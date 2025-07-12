import { X } from "lucide-react";
import { useState, useRef } from "react";
import addtext from "../../assets/images/text.png";
import addstory from "../../assets/images/add_Story.png";
import cross from "../../assets/images/cross_icon.png";

const PostStory = ({
  showStoryCreator,
  closeStoryCreator,
  storyType,
  selectedImage,
  textBoxes,
  handleMouseMove,
  handleMouseUp,
  handleMouseDown,
  handleTextClick,
  handleTextChange,
  handleAddText,
  handleAddToStory,
  setTextBoxes,
}) => {
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  if (!showStoryCreator) return null;

  // Function to remove a text box
  const handleRemoveText = (id) => {
    setTextBoxes((prevTextBoxes) =>
      prevTextBoxes.filter((box) => box.id !== id)
    );
  };

  // Image dragging handlers
  const handleImageMouseDown = (e) => {
    if (!selectedImage) return;

    setIsDraggingImage(true);
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y,
    });
    e.preventDefault();
  };

  const handleImageMouseMove = (e) => {
    if (!isDraggingImage) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setImagePosition({ x: newX, y: newY });
  };

  const handleImageMouseUp = () => {
    setIsDraggingImage(false);
  };

  return (
    <div className="fixed inset-0 bg-[#333333] flex items-center justify-center z-50 overflow-hidden">
      {/* Close button positioned at top right of screen */}
      <button
        onClick={closeStoryCreator}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-opacity-50 rounded-full p-2 flex items-center justify-center"
      >
        <img src={cross} alt="Close" className="w-6 h-6" />
      </button>
      <div className="relative">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ width: "350px", height: "600px" }}
        >
          {/* Story Content Area */}
          <div
            ref={containerRef}
            className={`relative w-full h-full ${
              storyType === "text"
                ? "bg-gradient-to-br from-purple-500 to-pink-500"
                : "bg-[#9b9b9b]"
            }`}
            onMouseMove={
              isDraggingImage ? handleImageMouseMove : handleMouseMove
            }
            onMouseUp={isDraggingImage ? handleImageMouseUp : handleMouseUp}
            onMouseLeave={isDraggingImage ? handleImageMouseUp : handleMouseUp}
          >
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Story content"
                className={`w-full h-full object-contain ${
                  isDraggingImage ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{
                  transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
                  transition: isDraggingImage ? "none" : "transform 0.2s ease",
                }}
                onMouseDown={handleImageMouseDown}
                draggable={false}
              />
            )}

            {/* Text boxes */}
            {textBoxes.map((textBox) => (
              <div
                key={textBox.id}
                className="absolute cursor-move group"
                style={{ left: `${textBox.x}px`, top: `${textBox.y}px` }}
                onMouseDown={(e) => handleMouseDown(e, textBox)}
              >
                {/* Control buttons - shows on hover */}
                <div className="absolute -top-8 left-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Remove Button */}
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
                    onChange={(e) =>
                      handleTextChange(textBox.id, e.target.value)
                    }
                    onBlur={() => handleTextClick(textBox.id)}
                    className="bg-transparent border-none outline-none font-bold text-xl text-white"
                    style={{ minWidth: "120px" }}
                    autoFocus
                  />
                ) : (
                  <div
                    className="font-bold text-xl cursor-pointer select-none text-white"
                    onClick={() => handleTextClick(textBox.id)}
                  >
                    {textBox.text || "Click to edit"}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Image controls */}
          {selectedImage && (
            <div className="absolute top-4 left-4 flex gap-2">
              <button
                onClick={() =>
                  setImageScale((prev) => Math.max(0.5, prev - 0.1))
                }
                className="bg-gray-700 bg-opacity-80 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                -
              </button>
              <span className="bg-gray-700 bg-opacity-80 text-white px-3 py-1 rounded text-sm">
                {Math.round(imageScale * 100)}%
              </span>
              <button
                onClick={() => setImageScale((prev) => Math.min(2, prev + 0.1))}
                className="bg-gray-700 bg-opacity-80 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                +
              </button>
            </div>
          )}

          {/* Bottom buttons */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between">
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
      </div>
    </div>
  );
};

export default PostStory;
