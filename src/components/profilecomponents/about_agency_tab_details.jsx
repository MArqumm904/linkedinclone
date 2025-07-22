import React from "react";
import { Upload } from "lucide-react";

const AgencyDetailsModal = ({ open, onClose, agency, readable = true }) => {
  if (!open) return null;

  // Dummy data for demonstration
  const data = agency || {
    name: "Iphone",
    email: "support@iphone.com",
    city: "Karachi",
    country: "Pakistan",
    province: "Sindh",
    district: "Karachi South",
    product: "Iphone 15",
    mainCategory: "Electronics",
    subCategory: "Smartphones",
    startDate: "15th March 2023",
    endDate: "1st July 2024",
    description:
      "A line of sleek, high-performance smartphones built for modern life. Features include advanced cameras, fast charging, and iOS security.",
    agreementImg: "https://dummyimage.com/300x80/cccccc/000000&text=View+Agreement",
    confirmationImg: "https://dummyimage.com/300x80/cccccc/000000&text=View+Letter",
  };

  // Input/textarea class for both modes
  const inputClass =
    "w-full rounded border border-gray-300 text-sm px-3 py-2 font-sf bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100 disabled:text-gray-500";
  const inputReadOnlyClass = readable ? "bg-gray-100 text-black cursor-not-allowed font-sf" : "bg-white text-gray-900 font-sf";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-lg hide-scrollbar shadow-lg w-full max-w-lg p-0 relative overflow-y-auto max-h-[95vh] border border-[#7c87bc]">
        {/* Header: Flex row, left heading, right close */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-blue-100">
          <h2 className="text-xl font-semibold font-sf text-gray-900">View Details</h2>
          <button
            className="text-black hover:text-gray-700 ml-2"
            onClick={onClose}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <form className="space-y-4 px-6 py-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-500 mb-1 font-sf">Name / Company Organization</label>
            <input value={data.name} readOnly={readable} disabled={readable} className={`${inputClass} ${inputReadOnlyClass}`} />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-500 mb-1 font-sf">Email</label>
            <input value={data.email} readOnly={readable} disabled={readable} className={`${inputClass} ${inputReadOnlyClass}`} />
          </div>
          {/* City / Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-sf">City</label>
              <input value={data.city} readOnly={readable} disabled={readable} className={`${inputClass} ${inputReadOnlyClass}`} />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-sf">Country</label>
              <input value={data.country} readOnly={readable} disabled={readable} className={`${inputClass} ${inputReadOnlyClass}`} />
            </div>
          </div>
          {/* Province / District */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-sf">Governate</label>
              <input value={data.province} readOnly={readable} disabled={readable} className={`${inputClass} ${inputReadOnlyClass}`} />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-sf">District</label>
              <input value={data.district} readOnly={readable} disabled={readable} className={`${inputClass} ${inputReadOnlyClass}`} />
            </div>
          </div>
          {/* Product Name */}
          <div>
            <label className="block text-sm text-gray-500 mb-1 font-sf">Product Name</label>
            <input value={data.product} readOnly={readable} disabled={readable} className={`${inputClass} ${inputReadOnlyClass}`} />
          </div>
          {/* Main/Sub Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-sf">Main Category</label>
              <input value={data.mainCategory} readOnly={readable} disabled={readable} className={`${inputClass} ${inputReadOnlyClass}`} />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-sf">Sub-Category</label>
              <input value={data.subCategory} readOnly={readable} disabled={readable} className={`${inputClass} ${inputReadOnlyClass}`} />
            </div>
          </div>
          {/* Start Date */}
          <div>
            <label className="block text-sm text-gray-500 mb-1 font-sf">Start Date</label>
            <input value={data.startDate} readOnly={readable} disabled={readable} className={`${inputClass} ${inputReadOnlyClass}`} />
          </div>
          {/* End Date */}
          <div>
            <label className="block text-sm text-gray-500 mb-1 font-sf">End Date</label>
            <input value={data.endDate} readOnly={readable} disabled={readable} className={`${inputClass} ${inputReadOnlyClass}`} />
          </div>
          {/* Product Description */}
          <div>
            <label className="block text-sm text-gray-500 mb-1 font-sf">Product Description</label>
            <textarea
              value={data.description}
              readOnly={readable}
              disabled={readable}
              className={`${inputClass} ${inputReadOnlyClass} min-h-[60px] resize-none`}
            />
          </div>
          {/* View Agreement */}
          <div>
            <label className="block text-sm text-gray-500 mb-1 font-sf">View Agreement</label>
            <div className="relative w-full">
              <div className="relative rounded overflow-hidden w-full" style={{ background: "#222" }}>
                <img
                  src={data.agreementImg}
                  alt="Agreement"
                  className="w-full h-24 object-cover opacity-60"
                  style={{ display: "block" }}
                />
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center w-full h-full text-white font-semibold text-base font-sf bg-black bg-opacity-30 hover:bg-opacity-50 transition"
                  style={{ pointerEvents: "auto" }}
                >
                  View Agreement
                </button>
              </div>
            </div>
          </div>
          {/* View Confirmation Letter */}
          <div>
            <label className="block text-sm text-gray-500 mb-1 font-sf">View Confirmation Letter</label>
            <div className="relative w-full">
              <div className="relative rounded overflow-hidden w-full" style={{ background: "#222" }}>
                <img
                  src={data.confirmationImg}
                  alt="Confirmation"
                  className="w-full h-24 object-cover opacity-60"
                  style={{ display: "block" }}
                />
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center w-full h-full text-white font-semibold text-base font-sf bg-black bg-opacity-30 hover:bg-opacity-50 transition"
                  style={{ pointerEvents: "auto" }}
                >
                  View Letter
                </button>
              </div>
            </div>
          </div>
          {/* Confirm iOS-style Buttons */}
          <div className="flex items-center mt-2 ">
            <label className="text-sm text-gray-700 font-sf mr-3">I confirm this data is correct.</label>
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-md bg-red-500 hover:bg-red-600 transition-colors ml-1"
              style={{
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
              tabIndex={-1}
              disabled={readable}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect width="22" height="22" rx="5" fill="#FF3B30"/>
                <path d="M7 7L15 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M15 7L7 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-md bg-green-500 hover:bg-green-600 transition-colors ml-2"
              style={{
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
              tabIndex={-1}
              disabled={readable}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect width="22" height="22" rx="5" fill="#34C759"/>
                <path d="M6 12.5L10 16L16 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <button
            type="button"
            className="w-48 mt-5 bg-[#0214b5] cursor-pointer hover:bg-[#000f82] text-white font-medium py-2 rounded text-sm transition-colors font-sf flex items-center justify-center gap-2"
            disabled={readable}
          >
            <Upload className="w-5 h-5" />
            <span className="font-sf">Upload Agreement</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgencyDetailsModal;
