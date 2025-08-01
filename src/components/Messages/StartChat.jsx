import { X } from "lucide-react"
import { useState } from "react"

const StartChat = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(true)

  const handleContactSelect = (contact) => {
    setInputValue(contact.name)
    setShowSuggestions(false)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    setShowSuggestions(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl h-[30rem] mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-5 rounded-lg border border-gray-400">
          <h2 className="text-xl font-bold text-gray-900">Start a Chat</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-7 h-7 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">To:</label>

          <div className="flex gap-4">
            {/* Input Field */}
            <div className="flex-1">
              <input
                value={inputValue}
                onChange={handleInputChange}
                placeholder=""
                className="w-full h-14 p-3 border border-gray-500 bg-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            
          </div>
        </div>
      </div>
    </div>
    )
}

export default StartChat
