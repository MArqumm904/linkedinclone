import profile from "../../assets/images/profile.png";
import send from "../../assets/images/send.png";
import EmojiPicker from "emoji-picker-react";

import {
  MoreVertical,
  Plus,
  Smile,
  Send,
  Mic,
  Shield,
  Trash2,
  Paperclip,
  ImageIcon,
  FileText,
  Camera,
  Ban,
  CirclePlus,
  SendHorizontal,
  CircleX,
  Clock,
  Play,
  ChevronLeft,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import VoiceRecorder from "./VoiceRecorder";
import VoiceMessage from "./VoiceMessage";
import Post from "./Post";
import Video from "./Video";
import TextPost from "./TextPost";
import Reel from "./Reel";
import Page from "./Page";
import Group from "./Group";

export default function ChatArea({ chat, onBack }) {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const audioChunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);
  const [recordingTime, setRecordingTime] = useState(0); // Starting at 4 seconds to match image
  const [isRecording, setIsRecording] = useState(true);
  const MAX_RECORDING_TIME = 10;
  const messagesEndRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const generateId = () => Math.floor(Math.random() * 1000000);

  useEffect(() => {
    // Use setTimeout to ensure scrolling happens after render
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [messages, chat]);

  useEffect(() => {
    let interval;

    if (isRecording && recordingTime < MAX_RECORDING_TIME) {
      interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= MAX_RECORDING_TIME - 1) {
            setIsRecording(false);
            clearInterval(interval);
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, recordingTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }

      setIsRecording(false);
      setRecordingTime(0);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      setRecordingTime(0);
      setIsRecording(true);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Create a mock "saved" file path (in real app, you'd upload to server)
        const mockFilePath = `/voices/recording-${Date.now()}.webm`;
        const audioContext = new AudioContext();
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const actualDuration = Math.floor(audioBuffer.duration);

        // Add message with random isOwn (true/false)
        const isOwn = Math.random() > 0.5;

        const newVoiceMessage = {
          id: generateId(),
          type: "voice",
          audioUrl: audioUrl,
          duration: actualDuration, // Simple duration estimate
          isOwn: isOwn,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newVoiceMessage]);
        setShowVoiceRecorder(false);
      };

      mediaRecorderRef.current.start();

      setShowVoiceRecorder(true);
    } catch (err) {
      console.error("Error starting recording:", err);
      alert("Could not start recording. Please check microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
      setRecordingTime(0);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "text",
        content: message,
        isOwn: true,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const progressPercentage = Math.min(
    (recordingTime / MAX_RECORDING_TIME) * 100,
    100
  );

  const handleOptionsClick = () => {
    setShowOptionsMenu(!showOptionsMenu);
    setShowAttachMenu(false);
  };

  const handleAttachClick = () => {
    setShowAttachMenu(!showAttachMenu);
    setShowOptionsMenu(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
    setShowOptionsMenu(false);
    setShowAttachMenu(false);
  };

  return (
    <div
      className={`relative w-full md:w-[70%] h-full md:flex flex-col bg-white rounded-md border border-[#28388F] md:overflow-hidden ${
        !chat ? "max-md:hidden" : " "
      }`}
    >
      <div className="sticky top-0 z-30 flex items-center justify-between py-3 md:p-4 border-b border-gray-400 bg-white">
        <div className="flex items-center">
          <button onClick={onBack}>
            <ChevronLeft className="md:hidden w-10 h-10 md:hidden max-md:mr-2" />
          </button>
          <img
            src={profile || "/placeholder.svg"}
            alt="Jaiwad singh"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-3">
            <h2 className="font-semibold text-gray-900">{chat.name}</h2>
            <div className="flex items-center">
              <span
                className={`text-sm ${
                  chat.isOnline ? "text-green-600" : "text-gray-600"
                }`}
              >
                {chat.isOnline ? "online" : `${chat.time} ago`}
              </span>
              <div
                className={`w-2 h-2 bg-green-500 ${
                  chat.isOnline ? "" : "hidden"
                } rounded-full ml-2`}
              ></div>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={handleOptionsClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-7 h-7 text-gray-600" />
          </button>

          {showOptionsMenu && (
            <div className="absolute right-4 top-12 bg-white border border-[#28388F] rounded-xl shadow-lg py-2 w-44 z-30">
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors">
                <Ban className="w-4 h-4 mr-2 text-[#0017E7]" />
                Block this Profile
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors">
                <Trash2 className="w-4 h-4 mr-3 text-[#0017E7]" />
                Clear Chat
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="flex flex-col items-center py-8">
          <img
            src={profile || "/placeholder.svg"}
            alt="Jaiwad singh"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Jaiwad singh
          </h3>
          <p className="text-gray-600 mb-4">102 Likes | 9 Posts</p>
          <button className="bg-[#0017E7] hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
            View Profile
          </button>
          <p className="md:hidden text-gray-600 mt-12">Wed 9:41 PM</p>
        </div>

        <div className="p-6 space-y-6 md:space-y-4 pb-6">
          <Post />
          <Video />
          <TextPost />
          <Reel />
          <Page />
          <Group />
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
            >
              {msg.type === "text" ? (
                <div
                  className={`px-4 py-2 rounded-2xl w-auto ${
                    msg.isOwn
                      ? "bg-[#0017E7] text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <span className="text-wrap">{msg.content}</span>
                </div>
              ) : (
                <VoiceMessage
                  audioUrl={msg.audioUrl}
                  duration={msg.duration}
                  isOwn={msg.isOwn}
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 relative z-[99999]">
        {showVoiceRecorder ? (
          <div className="relative flex items-center bg-gray-200 rounded-full py-2 px-4">
            <button
              onClick={stopRecording}
              className="p-2 rounded-full flex-shrink-0"
            >
              <CircleX className="text-[#0017E7]" />
            </button>

            {/* Recording waveform/progress bar - large blue section */}
            <div className="flex-1">
              <div className="w-full bg-[#0017E7]/75 rounded-full h-10 flex items-center px-4 relative overflow-hidden">
                {/* Dark blue filled portion (simulating recording progress) */}
                <div
                  className="absolute left-0 top-0 h-full bg-[#0017E7] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }} // Simulating 30% recorded
                ></div>

                <div className="absolute left-2 rounded-full p-1.5 bg-white">
                  <div className="w-3.5 h-3.5 bg-[#0017E7] rounded-sm"></div>
                </div>
              </div>
            </div>

            {/* Timer display */}
            <div className="absolute right-14 bg-white rounded-full px-4 py-0.5 flex-shrink-0">
              <span className="text-[#0017E7] text-sm font-medium">
                {formatTime(recordingTime)}
              </span>
            </div>

            {/* Send/Stop button - square with rounded corners */}
            <button onClick={stopRecording} className="">
              <img src={send} className="w-8 h-8" />
            </button>
          </div>
        ) : (
          <div className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="w-full px-20 py-3 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-500"
            />

            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <div className="relative">
                <button
                  onClick={handleAttachClick}
                  className="p-2 rounded-full"
                >
                  <CirclePlus className="w-5 h-5 text-[#0017E7]" />
                </button>

                {showAttachMenu && (
                  <div className="absolute bottom-14 left-0 bg-white border border-[#28388F] rounded-lg shadow-lg py-2 w-48 z-30">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors">
                      <Paperclip className="w-4 h-4 mr-3 text-[#0017E7]" />
                      Attach Files
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors">
                      <ImageIcon className="w-4 h-4 mr-3 text-[#0017E7]" />
                      Images
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors">
                      <FileText className="w-4 h-4 mr-3 text-[#0017E7]" />
                      Documents
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors">
                      <Camera className="w-4 h-4 mr-3 text-[#0017E7]" />
                      Camera
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute left-10 top-1/2 transform -translate-y-1/2">
              <button onClick={toggleEmojiPicker} className="p-2 rounded-full">
                <Smile className="w-5 h-5 text-[#0017E7]" />
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-12 left-0 z-30">
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    width={300}
                    height={350}
                  />
                </div>
              )}
            </div>

            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <button
                onClick={message.trim() ? handleSendMessage : startRecording}
                className="p-2 rounded-full"
              >
                {message.trim() ? (
                  <img src={send} className="w-7 h-7" />
                ) : (
                  <Mic className="w-5 h-5 text-[#0017E7]" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* <AudioAnalyzer isRecording={isRecording} onAnalyzerData={handleAnalyzerData} /> */}

      {(showOptionsMenu || showAttachMenu || showEmojiPicker) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowOptionsMenu(false);
            setShowAttachMenu(false);
            setShowEmojiPicker(false);
          }}
        />
      )}
    </div>
  );
}
