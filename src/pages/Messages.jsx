
import { useRef, useState } from "react";
import ChatWelcome from "../components/Messages/ChatWelcome";
import ChatList from "../components/Messages/ChatList";
import StartChat from "../components/Messages/StartChat";
import ChatArea from "../components/Messages/ChatArea";
import Navbar from "../components/nav";


export default function Messages() {
  const [isStartChatOpen, setIsStartChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const chatListRef = useRef(null);

  const handleBackToChatList = () => {
    setSelectedChat(null);
    setTimeout(() => {
      if (chatListRef.current?.firstChatRef?.current) {
        chatListRef.current.firstChatRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 200);
  };

  return (
    <>

      <Navbar />
      <StartChat isOpen={isStartChatOpen} onClose={() => setIsStartChatOpen(false)} />

      <div className="w-full flex md:h-screen md:p-10 md:gap-6">
        {/* Left Sidebar - Messages */}
        <ChatList ref={chatListRef} onStartChat={() => setIsStartChatOpen(true)} onSelectChat={(chat) => setSelectedChat(chat)} isChatSelected={!!selectedChat} />
        {selectedChat ? (
          <ChatArea onStartChat={() => setIsStartChatOpen(true)} chat={selectedChat} onBack={handleBackToChatList} />
        ) : (
          <ChatWelcome onStartChat={() => setIsStartChatOpen(true)} />
        )}
      </div>
    </>
  );
}
