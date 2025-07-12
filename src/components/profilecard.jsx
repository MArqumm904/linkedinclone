import Person1 from "../assets/images/person-1.png";

const ProfileCard = () => {
  return (
    <div className="bg-white rounded-lg shadow border border-[#6974b1] p-6 mb-4">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-3">
          <img 
            src={Person1} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-sf font-semibold text-gray-900" >The Ransom</h3>
          <p className="text-sm text-gray-500">UI/UX Designer</p>
          <p className="text-xs text-gray-400">Lahore, Pakistan</p>
        </div>
      </div>
      
      <div className="flex justify-between text-center border-t pt-3">
        <div>
          <div className="font-bold font text-gray-900 text-lg">90</div>
          <div className="text-xs text-gray-500 font-sf">Posts</div>
        </div>
        <div>
          <div className="font-bold text-gray-900 text-lg">250</div>
          <div className="text-xs text-gray-500 font-sf">Followers</div>
        </div>
        <div>
          <div className="font-bold text-gray-900 text-lg">160</div>
          <div className="text-xs text-gray-500 font-sf">Following</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard