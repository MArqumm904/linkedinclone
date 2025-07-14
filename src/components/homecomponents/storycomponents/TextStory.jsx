import { X } from "lucide-react";
import addtext from "../../../assets/images/text.png";
import addstory from "../../../assets/images/add_Story.png";

const TextStory = ({
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
  // Default text boxes if empty
  const displayTextBoxes = textBoxes.length > 0 ? textBoxes : [
    {
      id: 1,
      text: "WE ARE HIRING!",
      x: 50,
      y: 100,
      editing: false,
      fontSize: "32px",
      fontWeight: "bold",
      color: "white"
    }
  ];

  return (
    <div className="relative w-full h-full">
      <div
        className="relative w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 p-4"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Text boxes */}
        {displayTextBoxes.map((textBox) => (
          <div
            key={textBox.id}
            className="absolute cursor-move group"
            style={{ 
              left: `${textBox.x}px`, 
              top: `${textBox.y}px`,
              fontSize: textBox.fontSize,
              fontWeight: textBox.fontWeight,
              color: textBox.color
            }}
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
                onChange={(e) => handleTextChange(textBox.id, e.target.value)}
                onBlur={() => handleTextClick(textBox.id)}
                className="bg-transparent border-none outline-none"
                style={{ 
                  fontSize: textBox.fontSize,
                  fontWeight: textBox.fontWeight,
                  color: textBox.color,
                  minWidth: "120px" 
                }}
                autoFocus
              />
            ) : (
              <div
                className="cursor-pointer select-none"
                onClick={() => handleTextClick(textBox.id)}
                style={{
                  fontSize: textBox.fontSize,
                  fontWeight: textBox.fontWeight,
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
  );
};

export default TextStory;