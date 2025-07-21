import React, { useState, useEffect } from "react";
import { CirclePlus, Pencil, Plus } from "lucide-react";
import OverviewModal from "./about_overview_tab";
import AddEducation from "./add_education";
import EducationCard from "./added_education_card";
import AddCertificate from "./add_certificate"; // New import
import CertificateCard from "./certificate_card"; // New import

const ProfileAbout = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [overviewText, setOverviewText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEducation, setEducation] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  // Add state for certificates
  const [showCertificate, setCertificate] = useState(false);
  const [certificateList, setCertificateList] = useState([]);

  // Add state for editing education
  const [editingEducation, setEditingEducation] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Add state for editing certificates
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [isCertificateEditMode, setIsCertificateEditMode] = useState(false);

  useEffect(() => {
    if (showModal || showEducation || showCertificate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal, showEducation, showCertificate]);

  const tabs = ["Overview", "Education", "Skill", "Info"];

  const handleEducationSave = (educationData) => {
    if (isEditMode && editingEducation !== null) {
      // Update existing education
      setEducationList((prev) =>
        prev.map((item, index) =>
          index === editingEducation ? educationData : item
        )
      );
    } else {
      // Add new education
      setEducationList((prev) => [...prev, educationData]);
    }

    // Reset states
    setEducation(false);
    setEditingEducation(null);
    setIsEditMode(false);
  };

  // Certificate save handler
  const handleCertificateSave = (certificateData) => {
    if (isCertificateEditMode && editingCertificate !== null) {
      // Update existing certificate
      setCertificateList((prev) =>
        prev.map((item, index) =>
          index === editingCertificate ? certificateData : item
        )
      );
    } else {
      // Add new certificate
      setCertificateList((prev) => [...prev, certificateData]);
    }

    // Reset states
    setCertificate(false);
    setEditingCertificate(null);
    setIsCertificateEditMode(false);
  };

  const handleEducationEdit = (education, index) => {
    console.log("Editing education:", education, "at index:", index);
    setEditingEducation(index);
    setIsEditMode(true);
    setEducation(true);
  };

  // Certificate edit handler
  const handleCertificateEdit = (certificate, index) => {
    console.log("Editing certificate:", certificate, "at index:", index);
    setEditingCertificate(index);
    setIsCertificateEditMode(true);
    setCertificate(true);
  };

  const handleAddEducation = () => {
    setEditingEducation(null);
    setIsEditMode(false);
    setEducation(true);
  };

  // Add certificate handler
  const handleAddCertificate = () => {
    setEditingCertificate(null);
    setIsCertificateEditMode(false);
    setCertificate(true);
  };

  const handleCloseEducationModal = () => {
    setEducation(false);
    setEditingEducation(null);
    setIsEditMode(false);
  };

  // Close certificate modal handler
  const handleCloseCertificateModal = () => {
    setCertificate(false);
    setEditingCertificate(null);
    setIsCertificateEditMode(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-sf font-semibold text-gray-900 mb-6 -mt-3">
              Hello, I'm Ransom.
            </h3>
            {overviewText ? (
              <div className="relative">
                <p className="text-gray-700 text-lg font-sf whitespace-pre-line">
                  {overviewText}
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="absolute -top-10 border rounded-full border-[#707070] right-0 p-2 text-gray-500 hover:text-gray-700"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <CirclePlus className="w-12 h-12 text-[#0017e7]" />
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="text-[#0017e7] font-medium hover:text-[#0013bf] transition-colors"
                >
                  Add Overview
                </button>
              </div>
            )}
          </div>
        );
      case "Education":
        return (
          <div className="space-y-4">
            {/* Education heading - Show above Add Education box when entries exist */}
            {educationList.length > 0 && (
              <h2 className="text-2xl font-sf font-semibold text-gray-900 mb-4">
                Education
              </h2>
            )}

            {/* Add Education Box */}
            <div className="border border-[#000] rounded-lg p-6 bg-gray-50">
              <h3 className="text-lg font-sf font-semibold text-gray-900 mb-2">
                Add Education
              </h3>
              <p className="text-gray-600 text-sm mb-4 font-sf">
                Show your academic background to build trust with employers or
                clients.
              </p>
              <button
                onClick={handleAddEducation}
                className="bg-[#0017e7] mt-7 font-sf text-white px-4 py-2 rounded-md text-sm hover:bg-[#0013bf] transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Education
              </button>
            </div>

            {/* Show added education entries */}
            {educationList.length > 0 && (
              <div className="space-y-4">
                {/* Show only first education or all if showAllEducation is true */}
                {(showAllEducation
                  ? educationList
                  : educationList.slice(0, 1)
                ).map((education, index) => (
                  <EducationCard
                    key={index}
                    education={education}
                    onEdit={() => handleEducationEdit(education, index)}
                  />
                ))}

                {/* Show More/Show Less button only if there are more than 1 education entries */}
                {educationList.length > 1 && (
                  <button
                    onClick={() => setShowAllEducation(!showAllEducation)}
                    className="text-[#000] font-sf text-sm px-4 py-2 border border-black rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {showAllEducation ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            )}

            {/* Certification heading - Show above Add Certification box when entries exist */}
            {certificateList.length > 0 && (
              <h2 className="text-2xl font-sf font-semibold text-gray-900 mb-4">
                Certification
              </h2>
            )}

            {/* Add Certification Box */}
            <div className="border border-[#000] rounded-lg p-6 bg-gray-50">
              <h3 className="text-lg font-sf font-semibold text-gray-900 mb-2">
                Add Certification
              </h3>
              <p className="text-gray-600 font-sf text-sm mb-4">
                Show your certifications to build trust with employers or
                clients.
              </p>
              <button
                onClick={handleAddCertificate}
                className="bg-[#0017e7] mt-7 font-sf text-white px-4 py-2 rounded-md text-sm hover:bg-[#0013bf] transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Certification
              </button>
            </div>

            {/* Show added certificate entries */}
            {certificateList.length > 0 && (
              <div className="">
                {/* Show only first certificate or all if showAllCertificates is true */}
                {(showAllCertificates
                  ? certificateList
                  : certificateList.slice(0, 1)
                ).map((certificate, index) => (
                  <CertificateCard
                    key={index}
                    certificate={certificate}
                    onEdit={() => handleCertificateEdit(certificate, index)}
                  />
                ))}

                {/* Show More/Show Less button only if there are more than 1 certificate entries */}
                {certificateList.length > 1 && (
                  <button
                    onClick={() => setShowAllCertificates(!showAllCertificates)}
                    className="mt-5 text-[#000] font-sf text-sm px-4 py-2 border border-black rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {showAllCertificates ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            )}
          </div>
        );
      case "Skill":
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8  rounded-full flex items-center justify-center">
                <CirclePlus className="w-12 h-12 text-[#0017e7]" />
              </div>
              <button className="text-[#0017e7] font-medium hover:text-[#0013bf] transition-colors">
                Add Skill
              </button>
            </div>
          </div>
        );
      case "Info":
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8  rounded-full flex items-center justify-center">
                <CirclePlus className="w-12 h-12 text-[#0017e7]" />
              </div>
              <button className="text-[#0017e7] font-medium hover:text-[#0013bf] transition-colors">
                Add Info
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-6">
      <div className="bg-white rounded-lg border border-[#7c87bc] overflow-hidden ">
        {/* Header */}
        <div className="p-6 border-gray-200">
          <h2 className="text-3xl font-sf font-semibold text-gray-900 mb-6">
            About
          </h2>

          {/* Tabs */}
          <div className="flex space-x-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-md font-medium font-sf transition-colors relative ${
                  activeTab === tab
                    ? "text-[#0017e7] border-b-2 border-[#0017e7]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">{renderContent()}</div>
      </div>

      {/* Modals */}
      <OverviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={(text) => {
          setOverviewText(text);
          setShowModal(false);
        }}
        initialText={overviewText}
      />

      <AddEducation
        isOpen={showEducation}
        initialData={
          isEditMode && editingEducation !== null
            ? educationList[editingEducation]
            : null
        }
        isEditMode={isEditMode}
        onClose={handleCloseEducationModal}
        onSave={handleEducationSave}
      />

      <AddCertificate
        isOpen={showCertificate}
        initialData={
          isCertificateEditMode && editingCertificate !== null
            ? certificateList[editingCertificate]
            : null
        }
        isEditMode={isCertificateEditMode}
        onClose={handleCloseCertificateModal}
        onSave={handleCertificateSave}
      />
    </div>
  );
};

export default ProfileAbout;
