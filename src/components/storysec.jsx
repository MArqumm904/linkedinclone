import Person1 from "../assets/images/person-1.png";

const Stories = () => {
  const stories = [
    {
      name: "Your Story",
      avatar: Person1,
      isYour: true,
    },
    {
      name: "Archimedes",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: "jahved singh",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: "Coderlytics",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: "ArjitDesigns",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: "ArjitDesigns",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: "ArjitDesigns",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow border border-[#6974b1] p-5 mb-4">
      <div className="flex space-x-7 overflow-x-auto ms-2">
        {stories.map((story, index) => (
          <div key={index} className="flex-shrink-0 text-center">
            <div className="relative cursor-pointer">
              <div
                className={`w-14 h-14 rounded-full overflow-hidden border-2 p-0.5 ${
                  story.isYour ? "border-gray-400" : "border-blue-500"
                }`}
              >
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {story.isYour && (
                <div className="absolute -bottom-0 -right-0 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs  mb-1">+</span>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-1 max-w-[60px] truncate cursor-pointer  font-sf">
              {story.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
