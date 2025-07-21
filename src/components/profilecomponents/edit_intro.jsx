import { useState } from "react";
import { X, UserRoundCog, MapPin } from "lucide-react";

export default function EditIntroModal({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "The Ransom",
    workingAs: "UI/UX Designer at Kerone",
    location: "Karachi, Pakistan",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saved data:", formData);
    // Add your save logic here
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-5 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-sf font-semibold text-gray-900">
            Edit Intro
          </h2>
          <button
            onClick={onClose}
            className="text-black hover:text-gray-800 transition-colors"
          >
            <X size={25} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sf">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-sf focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          {/* Working As Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sf">
              Working As
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.workingAs}
                onChange={(e) => handleInputChange("workingAs", e.target.value)}
                className="w-full px-3 font-sf py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your job title"
              />
              <UserRoundCog
                className="absolute right-3 top-2.5 text-[#626262]"
                size={22}
              />
            </div>
          </div>

          {/* Location Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sf">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-3 font-sf py-2 pr-10 border border-gray-300 rounded-md"
                placeholder="Enter your location"
              />
              <MapPin
                className="absolute right-3 top-2.5 text-[#626262]"
                size={22}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4  border-gray-200">
          <button
            onClick={handleSave}
            className="w-28 bg-[#0017e7] text-white py-2 px-4 rounded-md hover:bg-[#0013c4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
