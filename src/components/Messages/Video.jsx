import lofa from "../../assets/images/lofa.png";
import lofalogo from "../../assets/images/lofalogo.png";
import videoicon from "../../assets/images/video_icon.png";

const Video = () => {
  return (
    <div className="flex justify-end">
      <div className="max-w-[250px] md:max-w-[300px] h-auto bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
        {/* Header Section */}
        <div className="flex items-center gap-3 p-3 bg-gray-100">
          <div className="w-10 h-10">
            <img className="w-full h-auto rounded-full" src={lofalogo} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-base">
              LOFA Consulting
            </h3>
            <div className="items-center text-gray-600 text-xs">
              <span>2 Days Ago</span>
            </div>
          </div>
        </div>

        {/* Main YouTube Promo Image */}
        <div className="relative">
          <img
            src={lofa}
            alt="Join JR Graphics on YouTube - 3D character with microphone promoting design tutorials"
            className="w-full h-[40vh] object-cover"
          />
          <img
            src={videoicon}
            alt="Post"
            className="w-10 h-10 absolute top-1 right-0"
          />
        </div>

        {/* Description Section */}
        <div className="p-3 bg-gray-100">
          <p className="text-gray-800 text-[12px] md:text-[10px] leading-tight font-medium">
            At LOFA Consulting, we believe that every bit of effort you put in
            today is...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video;
