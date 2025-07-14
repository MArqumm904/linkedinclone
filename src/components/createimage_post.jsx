import React, { useState, useRef } from 'react';
import { X, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import CreateImagePost from "../assets/images/create_post_image.png";

export default function CreatePostImage({ onClose, selectedImage }) {
  const [description, setDescription] = useState('');
  const [currentSelectedImage, setCurrentSelectedImage] = useState(selectedImage);
  const fileInputRef = useRef(null);

  const handleAddPhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrentSelectedImage({
        file: file,
        url: imageUrl,
        name: file.name
      });
    }
  };

  const handleRemoveImage = () => {
    if (currentSelectedImage && currentSelectedImage.url) {
      URL.revokeObjectURL(currentSelectedImage.url);
    }
    setCurrentSelectedImage(null);
  };

  const handleClose = () => {
    if (currentSelectedImage && currentSelectedImage.url) {
      URL.revokeObjectURL(currentSelectedImage.url);
    }
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {/* Modal */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h2 className="text-lg font-semibold">Create Post</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">TR</span>
            </div>
            <span className="font-medium text-gray-900">The Ransom</span>
          </div>
        </div>

        {/* Description Input */}
        <div className="p-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Post Preview */}
        <div className="px-4 pb-4">
          <div className="bg-black rounded-lg overflow-hidden relative">
            {/* Top buttons */}
            <div className="absolute top-3 right-3 flex gap-2 z-10">
              <button 
                onClick={handleAddPhotoClick}
                className="bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm hover:bg-opacity-90 transition-all"
              >
                Add Photo/Video
              </button>
              {currentSelectedImage && (
                <button 
                  onClick={handleRemoveImage}
                  className="bg-gray-800 bg-opacity-70 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Image Display */}
            <div className="relative">
              <div className="text-center">
                <img 
                  src={currentSelectedImage ? currentSelectedImage.url : CreateImagePost} 
                  alt={currentSelectedImage ? currentSelectedImage.name : "Default post image"} 
                  className="w-full h-auto object-cover max-h-96"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Post Button */}
        <div className="p-4 sticky bottom-0 bg-white border-t">
          <button 
            onClick={handleClose}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}