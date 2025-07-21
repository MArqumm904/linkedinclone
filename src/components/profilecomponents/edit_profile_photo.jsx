import React, { useState, useRef } from "react";
import {
  X,
  Camera,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Trash2,
  Crop,
} from "lucide-react";

const EditProfile = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: upload, 2: preview, 3: crop
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setCurrentStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleCropImage = () => {
    setCurrentStep(3);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setCurrentStep(1);
    setZoom(1);
    setRotation(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDone = () => {
    console.log("Image cropped with zoom:", zoom, "rotation:", rotation);
    onClose();
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-1/3 max-w-[90vw] max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-semibold font-sf">
            {currentStep === 1
              ? "Profile Picture"
              : currentStep === 2
              ? "Profile Picture"
              : "Crop Image"}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-700 hover:text-gray-900 "
          >
            <X size={25} />
          </button>
        </div>
        <div className="border-t border-gray-200 my-5"></div>

        {/* Step 1: Upload */}
        {/* Step 1: Upload */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-8">
              <div className="border-2 border-gray-300 rounded-full w-56 h-56 flex items-center justify-center bg-gray-50">
                <button
                  onClick={handleUploadClick}
                  className="flex flex-col items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Camera size={25} />
                  <span>Upload Photo</span>
                </button>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={onClose}
                className="bg-[#0017e7] text-white px-6 py-1 rounded-md hover:bg-[#000f96] transition-colors"
              >
                Save
              </button>
              <button className="border-black flex bg-gray-200 text-black px-6 py-1 rounded-md hover:bg-gray-300 transition-colors border">
                <Crop size={22} className="mr-2" />
                Crop Image
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
          </div>
        )}

        {/* Step 2: Preview */}
        {currentStep === 2 && selectedImage && (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative rounded-full overflow-hidden w-56 h-56 flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center">
                    <button
                      onClick={handleUploadClick}
                      className="flex flex-col items-center gap-2 text-white font-bold hover:text-gray-50 transition-colors"
                    >
                      <Camera size={25} />
                      <span>Upload Photo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <div className="flex gap-2 mt-3">
                <button
                  onClick={closeModal}
                  className="flex items-center justify-center bg-[#0017e7] text-white px-5 py-1 rounded-lg hover:bg-[#000f96] transition-colors"
                >
                  Save
                </button>

                <button
                  onClick={handleCropImage}
                  className="flex items-center justify-center border border-gray-400 text-black px-4 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Crop className="mr-2" size={20} /> Crop Image
                </button>

                <button
                  onClick={handleDeleteImage}
                  className="flex items-center justify-center border border-gray-400 text-black px-4 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Trash2 size={16} className="mr-2" />
                  Clear Image
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Crop */}
        {currentStep === 3 && selectedImage && (
          <div className="space-y-4">
            {/* Circular Crop Preview */}
            <div className=" rounded-lg p-2  flex items-center justify-center overflow-hidden">
              <div className="relative">
                {/* Circular mask container */}
                <div
                  className="w-64 h-64 rounded-full overflow-hidden shadow-lg border"
                  style={{
                    background: "white",
                  }}
                >
                  <img
                    src={selectedImage}
                    alt="Crop preview"
                    className="w-full h-full object-cover transition-transform duration-200"
                    style={{
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      transformOrigin: "center center",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Crop Controls */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zoom
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-1"
                    style={{
                      accentColor: "#0017e7",
                    }}
                  />
                  <button
                    onClick={handleZoomIn}
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Straighten
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRotate}
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={rotation}
                    onChange={(e) => setRotation(parseInt(e.target.value))}
                    className="flex-1"
                    style={{
                      accentColor: "#0017e7",
                    }}
                  />
                  <span className="text-sm text-gray-600 min-w-[40px]">
                    {rotation}°
                  </span>
                </div>
              </div>
            </div>

            {/* Done Button */}
            <div className="flex gap-2">
              <button
                onClick={handleDone}
                className="flex-1 bg-[#0017e7] text-white py-3 px-6 rounded-lg hover:bg-[#0015d3] transition-colors"
              >
                Done
              </button>
              <button
                onClick={handleDeleteImage}
                className="flex bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 size={20} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
