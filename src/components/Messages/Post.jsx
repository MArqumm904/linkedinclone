import YT from "../../assets/images/yt.png";
import ytLogo from "../../assets/images/ytlogo.png";
import square from "../../assets/images/square.png";

const Post = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[250px] md:max-w-[300px] h-auto bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
        {/* Header Section */}
        <div className="flex items-center gap-3 p-3 bg-gray-100">
          <div className="w-10 h-10">
            <img className="w-full h-auto rounded-full" src={ytLogo} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-base">
              JR Graphics
            </h3>
            <div className="items-center text-gray-600 text-xs">
              <span>2 Days Ago</span>
            </div>
          </div>
        </div>

        {/* Main YouTube Promo Image */}
        <div className="relative">
          <img
            src={YT}
            alt="Join JR Graphics on YouTube - 3D character with microphone promoting design tutorials"
            className="w-full h-[40vh] object-cover"
          />
          <img
            src={square}
            alt="Post"
            className="w-10 h-10 absolute top-1 right-0"
          />
        </div>

        {/* Description Section */}
        <div className="p-3 bg-gray-100">
          <p className="text-gray-800 text-[12px] md:text-[10px] leading-tight font-medium">
            Join JR Graphics on YouTube for powerful design tutorials,
            creative...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
