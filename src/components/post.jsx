import { useState, useEffect, useRef } from "react";
import {
  Search,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Forward,
} from "lucide-react";
import PostProfile from "../assets/images/postprofile.jpg";
import PostImage from "../assets/images/postimage.png";
import PostComment from "../components/post_comment";
import PostShare from "../components/post_share";
import bookmark from "../assets/images/bookmark 1.png";
import avatorr from "../assets/images/avatorr.png";
import error from "../assets/images/error.png";
import addtostory from "../assets/images/addtostory.png";
import PostStory from "./homecomponents/poststory";
import HomePostTab from "./homecomponents/homeposts";

const Post = () => {
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showStoryCreator, setShowStoryCreator] = useState(false);
  const [storyType, setStoryType] = useState("photo");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [textBoxes, setTextBoxes] = useState([]);
  const [showFullText, setShowFullText] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Post data arrays
  const textPosts = [
    {
      id: 1,
      type: "text",
      content: "Just finished an amazing UI/UX project! Really excited about the results.",
      timestamp: "2024-01-15T10:30:00Z",
      likes: 25,
      comments: 5,
    },
    {
      id: 2,
      type: "text",
      content: "Working on some new design patterns today. The creative process never stops!",
      timestamp: "2024-01-14T14:20:00Z",
      likes: 18,
      comments: 3,
    },
  ];

  const imagePosts = [
    {
      id: 3,
      type: "image",
      content: "Check out this new design mockup I created",
      image: PostImage,
      timestamp: "2024-01-13T16:45:00Z",
      likes: 42,
      comments: 8,
    },
  ];

  const videoPosts = [
    {
      id: 4,
      type: "video",
      content: "Behind the scenes of my design process",
      video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: PostImage,
      timestamp: "2024-01-12T09:15:00Z",
      likes: 67,
      comments: 12,
    },
  ];

  const handleLike = () => {
    if (!isLiked) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 600);
    }
    setIsLiked(!isLiked);
  };

  const [reactions, setReactions] = useState({
    like: 0,
    love: 0,
    laugh: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  });

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  // Story related handlers
  const handleAddToStory = () => {
    setShowStoryCreator(false);
    setSelectedImage(null);
    setSelectedVideo(null);
    setPostContent("");
    setTextBoxes([]);
    alert("Post added to your story successfully!");
  };

  const closeStoryCreator = () => {
    setShowStoryCreator(false);
    setSelectedImage(null);
    setSelectedVideo(null);
    setPostContent("");
    setTextBoxes([]);
  };

  const handleAddText = () => {
    const newTextBox = {
      id: Date.now(),
      text: "Add text here",
      x: 50,
      y: 50,
      editing: true,
      fontSize: "16px",
      color: "white",
    };
    setTextBoxes([...textBoxes, newTextBox]);
  };

  const handleTextClick = (id) => {
    setTextBoxes(
      textBoxes.map((box) =>
        box.id === id ? { ...box, editing: true } : { ...box, editing: false }
      )
    );
  };

  const handleTextChange = (id, newText) => {
    setTextBoxes(
      textBoxes.map((box) => (box.id === id ? { ...box, text: newText } : box))
    );
  };

  const handleRemoveText = (id) => {
    setTextBoxes(textBoxes.filter((box) => box.id !== id));
  };

  const handleMouseDown = (e, textBox) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggedText(textBox.id);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const [draggedText, setDraggedText] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (draggedText) {
      const container = e.currentTarget.getBoundingClientRect();
      const newX = e.clientX - container.left - dragOffset.x;
      const newY = e.clientY - container.top - dragOffset.y;

      setTextBoxes(
        textBoxes.map((box) =>
          box.id === draggedText
            ? {
                ...box,
                x: Math.max(0, Math.min(newX, container.width - 100)),
                y: Math.max(0, Math.min(newY, container.height - 30)),
              }
            : box
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggedText(null);
  };

  const handleAddToStoryFromMenu = (post) => {
    setShowMenu(false);
    
    // Reset all states
    setSelectedImage(null);
    setSelectedVideo(null);
    setPostContent("");
    
    if (post.type === "image") {
      setStoryType("postphotostory");
      setSelectedImage(post.image || PostImage);
    } else if (post.type === "video") {
      setStoryType("postvideostory");
      setSelectedVideo(post.video);
    } else if (post.type === "text") {
      setStoryType("posttextstory");
      setPostContent(post.content);
    }
    
    setShowStoryCreator(true);
  };

  useEffect(() => {
    if (showCommentPopup || showSharePopup || showStoryCreator) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showCommentPopup, showSharePopup, showStoryCreator]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="mx-auto space-y-4">
        <HomePostTab 
          text_posts_data={textPosts}
          image_posts_data={imagePosts}
          video_posts_data={videoPosts}
          onAddToStory={handleAddToStoryFromMenu}
        />
      </div>
      
      <PostStory
        showStoryCreator={showStoryCreator}
        closeStoryCreator={closeStoryCreator}
        storyType={storyType}
        selectedImage={selectedImage}
        selectedVideo={selectedVideo}
        postContent={postContent}
        textBoxes={textBoxes}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        handleMouseDown={handleMouseDown}
        handleTextClick={handleTextClick}
        handleTextChange={handleTextChange}
        handleAddText={handleAddText}
        handleAddToStory={handleAddToStory}
        setTextBoxes={setTextBoxes}
        handleRemoveText={handleRemoveText}
      />
    </>
  );
};

export default Post;