import React, { useState, useEffect } from "react";
import { CirclePlus, Pencil, Plus } from "lucide-react";
import OverviewModal from "./about_overview_tab";
import AddEducation from "./add_education";
import EducationCard from "./added_education_card";
import AddCertificate from "./add_certificate"; // New import
import CertificateCard from "./certificate_card"; // New import
import AddSkill from "./add_skill";
import SkillCard from "./added_skill_card";

const ProfileAbout = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [overviewText, setOverviewText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEducation, setEducation] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showCertificate, setCertificate] = useState(false);
  const [certificateList, setCertificateList] = useState([]);
  const [editingEducation, setEditingEducation] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [isCertificateEditMode, setIsCertificateEditMode] = useState(false);
  const [showSkill, setShowSkill] = useState(false);
  const [skillList, setSkillList] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);
  const [isSkillEditMode, setIsSkillEditMode] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [showLanguageInput, setShowLanguageInput] = useState(false);
  const [languageInput, setLanguageInput] = useState("");
  const [websiteLinks, setWebsiteLinks] = useState([]);
  const [showWebsiteInput, setShowWebsiteInput] = useState(false);
  const [websiteInput, setWebsiteInput] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [showSocialInput, setShowSocialInput] = useState(false);
  const [socialInput, setSocialInput] = useState("");
  const [gender, setGender] = useState("");
  const [showGenderInput, setShowGenderInput] = useState(false);
  const [dob, setDob] = useState("");
  const [showDobInput, setShowDobInput] = useState(false);

  useEffect(() => {
    if (showModal || showEducation || showCertificate || showSkill) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal, showEducation, showCertificate, showSkill]);

  useEffect(() => {
    console.log("Skills List Updated:", skillList);
  }, [skillList]);

  const tabs = ["Overview", "Education", "Skill", "Info"];

  const handleEducationSave = (educationData) => {
    if (isEditMode && editingEducation !== null) {
      setEducationList((prev) =>
        prev.map((item, index) =>
          index === editingEducation ? educationData : item
        )
      );
    } else {
      setEducationList((prev) => [...prev, educationData]);
    }

    setEducation(false);
    setEditingEducation(null);
    setIsEditMode(false);
  };

  const handleCertificateSave = (certificateData) => {
    if (isCertificateEditMode && editingCertificate !== null) {
      setCertificateList((prev) =>
        prev.map((item, index) =>
          index === editingCertificate ? certificateData : item
        )
      );
    } else {
      setCertificateList((prev) => [...prev, certificateData]);
    }

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

  const handleCloseCertificateModal = () => {
    setCertificate(false);
    setEditingCertificate(null);
    setIsCertificateEditMode(false);
  };

  const handleSkillSave = (skillData) => {
    if (isSkillEditMode && editingSkill !== null) {
      setSkillList((prev) =>
        prev.map((item, idx) => (idx === editingSkill ? skillData : item))
      );
    } else {
      setSkillList((prev) => [...prev, skillData]);
    }
    setShowSkill(false);
    setEditingSkill(null);
    setIsSkillEditMode(false);
  };

  const handleAddSkill = () => {
    setEditingSkill(null);
    setIsSkillEditMode(false);
    setShowSkill(true);
  };

  const handleSkillEdit = (skill, idx) => {
    setEditingSkill(idx);
    setIsSkillEditMode(true);
    setShowSkill(true);
  };

  const handleCloseSkillModal = () => {
    setShowSkill(false);
    setEditingSkill(null);
    setIsSkillEditMode(false);
  };

  const handleAddLanguageClick = () => {
    setShowLanguageInput(true);
    setLanguageInput("");
  };

  const handleSaveLanguage = () => {
    if (languageInput.trim() !== "") {
      setLanguages([...languages, languageInput.trim()]);
    }
    setShowLanguageInput(false);
    setLanguageInput("");
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
            <div className="border border-[#000] rounded-lg p-6 bg-gray-50">
              <h3 className="text-lg font-sf font-semibold text-gray-900 mb-2">
                Add Skill
              </h3>
              <p className="text-gray-600 text-sm mb-4 font-sf">
                Show your skills to build trust with employers or clients.
              </p>
              <button
                onClick={handleAddSkill}
                className="bg-[#0017e7] mt-7 font-sf text-white px-4 py-2 rounded-md text-sm hover:bg-[#0013bf] transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Skill
              </button>
            </div>
            {skillList.length > 0 && (
              <div className="space-y-2">
                {skillList.map((skill, idx) => (
                  <SkillCard
                    key={idx}
                    skill={skill}
                    onEdit={() => handleSkillEdit(skill, idx)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      case "Info":
        return (
          <div className="space-y-8 -mt-5">
            {/* Contact & Email */}
            <div className="flex items-start w-full gap-20">
              <div>
                {/* Contact */}
                <div className="font-sf font-semibold text-2xl mb-1">
                  Contact
                </div>
                <div className="flex items-center text-gray-700 mt-3">
                  <span className="mr-2">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      className="text-[#4c4c4c]"
                    >
                      <path d="M2 3.5C2 3.224 2.224 3 2.5 3H6.25C6.388 3 6.519 3.056 6.612 3.153L8.862 5.471C9.044 5.663 9.048 5.963 8.871 6.162L7.21 8.03a.25.25 0 0 0-.02.306A12.002 12.002 0 0 0 15.664 16.81a.25.25 0 0 0 .306-.02l1.868-1.662a.25.25 0 0 1 .307-.02l2.317 2.25a.75.75 0 0 1 .238.557V21.5a.5.5 0 0 1-.5.5h-.001C9.798 22 2 14.202 2 4.5V3.5Z" />
                    </svg>
                  </span>
                  <span className="font-sf text-base font-medium text-[#636363]">+92 300 1234567</span>
                </div>
              </div>
              <div className="flex-1">
                {/* Email */}
                <div className="font-sf font-semibold text-2xl mb-1">Email</div>
                <div className="flex items-center text-gray-700 mt-3">
                  <span className="mr-2">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      className="text-[#4c4c4c]"
                    >
                      <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Z" />
                      <path d="M2 7l10 6 10-6" />
                    </svg>
                  </span>
                  <span className="font-sf text-base font-medium text-[#636363]">
                    ransom.design@email.com
                  </span>
                </div>
              </div>
              <div className="flex items-center ml-auto mr-5">
                <button className="p-1.5 text-gray-500 hover:text-gray-600 rounded-full border border-gray-500 hover:border-gray-500 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Languages Spoken */}
            <div>
              <div className="flex items-center mb-1">
                <div className="font-sf font-semibold text-2xl">
                  Languages Spoken
                </div>
                {languages.length > 0 && !showLanguageInput && (
                  <button
                    className="p-1.5 text-gray-500 hover:text-gray-600 rounded-full border border-gray-500 hover:border-gray-500 transition-colors ml-auto"
                    onClick={handleAddLanguageClick}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                )}
              </div>
              {showLanguageInput ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    className="border border-[#5a5a5a] rounded px-3 py-2 font-sf w-[40%]"
                    placeholder="Add Language"
                    value={languageInput}
                    onChange={(e) => setLanguageInput(e.target.value)}
                  />
                  <button
                    onClick={handleSaveLanguage}
                    className="bg-[#0017e7] text-white px-8 py-2 rounded font-sf"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  className="flex items-center text-[#0017e7] font-sf font-medium text-lg mt-3 hover:text-[#0013bf] transition-colors"
                  onClick={handleAddLanguageClick}
                >
                  <CirclePlus className="w-7 h-7 mr-1" />
                  Add Language
                </button>
              )}
              <div className="mt-2">
                {languages.map((lang, idx) => (
                  <div key={idx} className="flex items-center gap-2 mt-3">
                    <span>
                      <svg
                        width="25"
                        height="25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        className="text-[#636363]"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
                      </svg>
                    </span>
                    <span className="font-sf text-md text-[#636363] text-md font-medium">
                      {lang}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Website and social link */}
            <div>
              <div className="font-sf font-semibold text-2xl mb-1">
                Website and social link
              </div>
              <div className="flex flex-col gap-2 mt-1">
                {/* Website Links */}
                {websiteLinks.length > 0 && (
                  <div className="mb-2">
                    <div className="font-sf text-base font-medium text-gray-700 mb-1">Website link</div>
                    {websiteLinks.map((link, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-1">
                        <span>{renderWebsiteIcon(link)}</span>
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-[#0017e7] underline truncate max-w-xs block">{link}</a>
                      </div>
                    ))}
                  </div>
                )}
                {showWebsiteInput ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      className="border border-[#5a5a5a] rounded px-3 py-2 font-sf w-[40%]"
                      placeholder="Add website link"
                      value={websiteInput}
                      onChange={(e) => setWebsiteInput(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        if (websiteInput.trim() !== "") {
                          setWebsiteLinks([...websiteLinks, websiteInput.trim()]);
                        }
                        setShowWebsiteInput(false);
                        setWebsiteInput("");
                      }}
                      className="bg-[#0017e7] text-white px-8 py-2 rounded font-sf"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button className="flex mt-3 items-center text-lg text-[#0017e7] font-sf font-medium hover:text-[#0013bf] transition-colors" onClick={() => setShowWebsiteInput(true)}>
                    <CirclePlus className="w-7 h-7 mr-1" />
                    Add a website
                  </button>
                )}
                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <div className="mb-2">
                    <div className="font-sf text-base font-medium text-gray-700 mb-1">Social link</div>
                    <div className="flex flex-wrap gap-6">
                      {socialLinks.map((link, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-1">
                          <span>{renderSocialIcon(link)}</span>
                          <a href={link} target="_blank" rel="noopener noreferrer" className="text-[#0017e7] underline truncate max-w-xs block">{link}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {showSocialInput ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      className="border border-[#5a5a5a] rounded px-3 py-2 font-sf w-[40%]"
                      placeholder="Add social link"
                      value={socialInput}
                      onChange={(e) => setSocialInput(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        if (socialInput.trim() !== "") {
                          setSocialLinks([...socialLinks, socialInput.trim()]);
                        }
                        setShowSocialInput(false);
                        setSocialInput("");
                      }}
                      className="bg-[#0017e7] text-white px-8 py-2 rounded font-sf"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button className="flex mt-3 items-center text-lg text-[#0017e7] font-sf font-medium hover:text-[#0013bf] transition-colors" onClick={() => setShowSocialInput(true)}>
                    <CirclePlus className="w-7 h-7 mr-1" />
                    Add a social link
                  </button>
                )}
              </div>
            </div>

            {/* Gender & Date of Birth */}
            <div className="flex gap-20">
              <div>
                <div className="font-sf font-semibold text-2xl mb-1">
                  Gender
                </div>
                {gender && !showGenderInput ? (
                  <div className="flex items-center mt-3">
                    <span className="font-sf text-md text-[#636363] font-medium mr-2">{gender}</span>
                    <button
                      className="p-1.5 text-gray-500 hover:text-gray-600 rounded-full border border-gray-500 hover:border-gray-500 transition-colors ml-2"
                      onClick={() => setShowGenderInput(true)}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                ) : showGenderInput ? (
                  <div className="flex items-center gap-2 mt-3">
                    <select
                      className="border border-[#5a5a5a] rounded px-3 py-2 font-sf"
                      value={gender}
                      onChange={e => setGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                    <button
                      onClick={() => setShowGenderInput(false)}
                      className="bg-[#0017e7] text-white px-8 py-2 rounded font-sf"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button className="flex items-center text-[#0017e7] font-sf font-medium  mt-3 hover:text-[#0013bf] transition-colors" onClick={() => setShowGenderInput(true)}>
                    <CirclePlus className="w-7 h-7 mr-1" />
                    Add Gender
                  </button>
                )}
              </div>
              <div>
                <div className="font-sf font-semibold text-2xl mb-1">
                  Date of Birth
                </div>
                {dob && !showDobInput ? (
                  <div className="flex items-center mt-3">
                    <span className="font-sf text-md text-[#636363] font-medium mr-2">{dob}</span>
                    <button
                      className="p-1.5 text-gray-500 hover:text-gray-600 rounded-full border border-gray-500 hover:border-gray-500 transition-colors ml-2"
                      onClick={() => setShowDobInput(true)}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                ) : showDobInput ? (
                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="date"
                      className="border border-[#5a5a5a] rounded px-3 py-2 font-sf"
                      value={dob}
                      onChange={e => setDob(e.target.value)}
                    />
                    <button
                      onClick={() => setShowDobInput(false)}
                      className="bg-[#0017e7] text-white px-8 py-2 rounded font-sf"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button className="flex items-center text-[#0017e7] font-sf font-medium  mt-3  hover:text-[#0013bf] transition-colors" onClick={() => setShowDobInput(true)}>
                    <CirclePlus className="w-7 h-7 mr-1" />
                    Add Date of Birth
                  </button>
                )}
              </div>
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

      <AddSkill
        isOpen={showSkill}
        initialData={
          isSkillEditMode && editingSkill !== null
            ? skillList[editingSkill]
            : ""
        }
        isEditMode={isSkillEditMode}
        onClose={handleCloseSkillModal}
        onSave={handleSkillSave}
      />
    </div>
  );
};

function renderWebsiteIcon(link) {
  return (
    <img src={`https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(link)}&sz=32`} alt="website" className="w-6 h-6" />
  );
}

function renderSocialIcon(link) {
  // Return the correct icon based on the link
  if (link.includes("facebook.com")) {
    return <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png" alt="fb" className="w-6 h-6" />;
  }
  if (link.includes("instagram.com")) {
    return <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpNPYBLb6Z4PIJSlr6qXbUy8VZ0w2w4BPPVQ&s" alt="instagram" className="w-6 h-6" />;
  }
  if (link.includes("linkedin.com")) {
    return <img src="https://i.pinimg.com/736x/b2/f8/28/b2f828513f21444829a619ce563d4d4e.jpg" alt="linkedin" className="w-6 h-6" />;
  }
  if (link.includes("x.com") || link.includes("twitter.com")) {
    return <img src="https://img.freepik.com/premium-vector/x-rounded-icon_1144215-148.jpg" alt="x" className="w-6 h-6" />;
  }
  // fallback generic icon
  return <img src="https://cdn-icons-png.flaticon.com/512/7046/7046086.png" alt="link" className="w-6 h-6" />;
}

export default ProfileAbout;
