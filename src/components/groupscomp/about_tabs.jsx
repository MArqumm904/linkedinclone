import { useState } from "react";
import { Plus, Edit3 } from "lucide-react";
import DescriptionModal from "../groupscomp/descriptionmodal";
import CategoryModal from "../groupscomp/categorymodal";
import HistoryModal from "../groupscomp/historymodal";

const SimpleAboutTab = ({ groupId }) => {
  const [description, setDescription] = useState("");
  const [groupCategory, setGroupCategory] = useState("");
  const [groupHistory, setGroupHistory] = useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  console.log("group id recieve on about tab of groups:" , groupId);

  const SectionCard = ({ title, content, onAddClick, onEditClick }) => (
    <div className="py-4 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[1.7rem] font-semibold text-gray-900">{title}</h3>
        {content && (
          <button
            onClick={onEditClick}
            className="bg-white border border-[#707070] p-2 rounded-full hover:bg-gray-50 transition-colors"
          >
            <Edit3 className="w-4 h-4 text-gray-600" />
          </button>
        )}
      </div>

      {content ? (
        <p className="text-gray-700 text-sm whitespace-pre-line">{content}</p>
      ) : (
        <div className="flex items-center space-x-2 mt-5">
          <button
            onClick={onAddClick}
            className="flex items-center space-x-2 text-[#0017e7] text-lg font-medium hover:text-[#0012b7] transition-colors"
          >
            <div className="w-6 h-6 rounded-full border border-[#0017e7] flex items-center justify-center">
              <Plus className="w-4 h-4 text-[#0017e7]" />
            </div>
            <span>Add Overview</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="mx-auto mt-5 border border-[#7c87bc] rounded-lg">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Content */}
        <div className="px-7 py-3">
          {/* Description Section */}
          <SectionCard
            title="Description"
            content={description}
            onAddClick={() => setShowDescriptionModal(true)}
            onEditClick={() => setShowDescriptionModal(true)}
          />

          {/* Group Category Section */}
          <SectionCard
            title="Group Category"
            content={groupCategory}
            onAddClick={() => setShowCategoryModal(true)}
            onEditClick={() => setShowCategoryModal(true)}
          />

          {/* Group History Section */}
          <SectionCard
            title="Group History"
            content={groupHistory}
            onAddClick={() => setShowHistoryModal(true)}
            onEditClick={() => setShowHistoryModal(true)}
          />
        </div>
      </div>

      {/* Modals */}
      <DescriptionModal
        isOpen={showDescriptionModal}
        onClose={() => setShowDescriptionModal(false)}
        onSave={setDescription}
        title="Description"
        initialText={description}
      />

      <CategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSave={setGroupCategory}
        title="Group Category"
        initialText={groupCategory}
      />

      <HistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        onSave={setGroupHistory}
        title="Group History"
        initialText={groupHistory}
      />
    </div>
  );
};

export default SimpleAboutTab;
