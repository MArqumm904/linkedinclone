import { useState, useRef } from "react";
import { X } from "lucide-react";
import addtext from "../../../assets/images/text.png";
import addstory from "../../../assets/images/add_Story.png";

const PostImageStory = ({
  selectedImage,
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
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

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

  const handleTouchStart = (e) => {
    if (!selectedImage) return;

    const touch = e.touches[0];
    setIsDraggingImage(true);
    setDragStart({
      x: touch.clientX - imagePosition.x,
      y: touch.clientY - imagePosition.y,
    });
  };

  const handleTouchMove = (e) => {
    if (!isDraggingImage) return;

    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;

    setImagePosition({ x: newX, y: newY });
    e.preventDefault(); // Prevent scrolling
  };

  const handleTouchEnd = () => {
    setIsDraggingImage(false);
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="relative w-full h-full bg-[#9b9b9b] flex items-center justify-center overflow-hidden"
        onMouseMove={isDraggingImage ? handleImageMouseMove : handleMouseMove}
        onMouseUp={isDraggingImage ? handleImageMouseUp : handleMouseUp}
        onMouseLeave={isDraggingImage ? handleImageMouseUp : handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {selectedImage && (
          <div
            className="relative  p-4 rounded-md "
            style={{ width: "340px", height: "400px" }}
          >

            <img
              src={selectedImage}
              alt="Post content"
              className={`max-w-full rounded-lg max-h-full object-contain ${isDraggingImage ? "cursor-grabbing" : "cursor-grab"
                }`}
              style={{
                transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
                transition: isDraggingImage ? "none" : "transform 0.2s ease",
              }}
              onMouseDown={handleImageMouseDown}
              draggable={false}
            />
            <div className="text-white text-left mt-2 text-sm font-medium">@ JR Graphics</div>

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

      {/* Image controls */}
      {selectedImage && (
        <div className="absolute top-4 left-4 flex gap-2">
          <button
            onClick={() => setImageScale((prev) => Math.max(0.5, prev - 0.1))}
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

export default PostImageStory;