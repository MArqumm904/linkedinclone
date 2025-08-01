import { ChevronLeft, Dot, Search } from "lucide-react";
import DP from "../../assets/images/diddy.jpeg";
import newchat from "../../assets/images/newchat.png";
import {  useRef, useState } from "react";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const ChatList = forwardRef(({onSelectChat , onStartChat , isChatSelected}, ref) => {
  const conversations = [
    {
      id: 1,
      name: "Arshpixels",
      message: "Bro, is tomorrow's plan confirmed or not?",
      time: "2h",
      avatar: DP,
      isOnline: true,
    },
    {
      id: 2,
      name: "Sarah",
      message: "Send me that file when you're free.",
      time: "2h",
      avatar: DP,
      isOnline: false,
    },
    {
      id: 3,
      name: "Jaiwad singh",
      message: "It's been a long time since we met 😊.",
      time: "3h",
      avatar: DP,
      isOnline: true,
    },
    {
      id: 4,
      name: "Code By Rixa",
      message: "You are doing great work.",
      time: "4h",
      avatar: DP,
      isOnline: false,
    },
    {
      id: 5,
      name: "Arjit Designs",
      message: "The meeting is at 5, try to come a bit early.",
      time: "5h",
      avatar: DP,
      isOnline: false,
    },
    {
      id: 6,
      name: "NexusDesigns",
      message: "Is the internet slow or is it just me?",
      time: "2w",
      avatar: DP,
      isOnline: false,
    },
    {
      id: 7,
      name: "NexusDesigns",
      message: "Is the internet slow or is it just me?",
      time: "2w",
      avatar: DP,
      isOnline: false,
    },
    {
      id: 8,
      name: "NexusDesigns",
      message: "Is the internet slow or is it just me?",
      time: "2w",
      avatar: DP,
      isOnline: false,
    },
    {
      id: 9,
      name: "NexusDesigns",
      message: "Is the internet slow or is it just me?",
      time: "2w",
      avatar: DP,
      isOnline: false,
    },
  ];
  const [isSelected , setIsSelected] = useState(null);
  const firstChatRef = useRef(null);
  const navigate = useNavigate();
  const handleChatSelect = (chat) => {
    setIsSelected(chat.id);
  }

  const handleBack = () => {
    navigate('/');
  }

  return (
    <div className={`max-md:w-full md:w-[30%] flex flex-col ${isChatSelected ? "max-md:hidden" : ""}`}>
      {/* Header */}
      <div className="md:bg-white md:border md:border-[#28388F] rounded-md">
        <div className="flex items-center justify-between px-4 md:py-2 max-md:border-b max-md:border-gray-400 max-md:py-3">
          <ChevronLeft onClick={handleBack} className="md:hidden w-8 h-8"/>
          <h1 className="max-md:hidden text-2xl font-semibold text-gray-900">Messages</h1>
          <h1 className="md:hidden text-2xl font-semibold text-gray-900">Chats</h1>
          <button onClick={onStartChat} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <img src={newchat} className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-2 pb-3 max-md:mt-6 max-md:px-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#343F7B]" />
            <input
              type="text"
              placeholder="Search Conversations"
              className="w-full pl-10 pr-4 py-2.5 bg-[#EFEFF3] rounded-full border-0 focus:outline-none focus:ring-1 focus:ring-[#343F7B] text-gray-700 text-sm placeholder-[#343F7B]"
            />
          </div>
        </div>
      </div>
      {/* Conversations List */}
      <div ref={ref} className="md:bg-white md:border md:border-[#28388F] rounded-md flex-1 overflow-y-auto md:mt-6 hide-scrollbar">
        {conversations.map((conversation , index) => (
          <div
            ref={index === 0 ? firstChatRef : null}
            key={conversation.id}
            onClick={() => {
              onSelectChat(conversation);
              handleChatSelect(conversation);
            }}
            className={`flex items-center p-4 hover:bg-gray-50 ${isSelected === conversation.id ? "md:bg-[#EAEAEA]" : ""} cursor-pointer transition-colors border-b border-gray-50 last:border-b-0`}
          >
            <img
              src={conversation.avatar || "/placeholder.svg"}
              alt={conversation.name}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 truncate">
                  {conversation.name}
                </h3>
                {conversation.isOnline && (
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex items-center md:justify-between mt-1">
                <p
                  className={`text-sm ${
                    conversation.isOnline
                      ? "text-black font-semibold"
                      : "text-gray-600"
                  }
                        truncate`}
                >
                  {conversation.message}
                </p>
                <span className="flex items-center text-sm text-gray-500">
                <Dot className="w-3.5 h-3.5"/>
                  {conversation.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ChatList;
