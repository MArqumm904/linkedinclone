import { X } from "lucide-react";
import cross from "../../assets/images/cross_icon.png";
import ImageStory from "./storycomponents/ImageStory";
import TextStory from "./storycomponents/TextStory";
import PostImageStory from "./storycomponents/PostImageStory";

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
  handleRemoveText,
}) => {
  if (!showStoryCreator) return null;

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
          {storyType === "photo" ? (
            <ImageStory
              selectedImage={selectedImage}
              textBoxes={textBoxes}
              handleMouseMove={handleMouseMove}
              handleMouseUp={handleMouseUp}
              handleMouseDown={handleMouseDown}
              handleTextClick={handleTextClick}
              handleTextChange={handleTextChange}
              handleAddText={handleAddText}
              handleAddToStory={handleAddToStory}
              handleRemoveText={handleRemoveText}
            />
          ) : storyType === "poststory" ? (
            <PostImageStory
              selectedImage={selectedImage}
              textBoxes={textBoxes}
              handleMouseMove={handleMouseMove}
              handleMouseUp={handleMouseUp}
              handleMouseDown={handleMouseDown}
              handleTextClick={handleTextClick}
              handleTextChange={handleTextChange}
              handleAddText={handleAddText}
              handleAddToStory={handleAddToStory}
              handleRemoveText={handleRemoveText}
            />
          ) : (
            <TextStory
              textBoxes={textBoxes}
              handleMouseMove={handleMouseMove}
              handleMouseUp={handleMouseUp}
              handleMouseDown={handleMouseDown}
              handleTextClick={handleTextClick}
              handleTextChange={handleTextChange}
              handleAddText={handleAddText}
              handleAddToStory={handleAddToStory}
              handleRemoveText={handleRemoveText}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostStory;