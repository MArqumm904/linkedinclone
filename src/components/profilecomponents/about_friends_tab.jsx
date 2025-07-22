import React from 'react';

const friends = [
  {
    name: 'Lina Ashraf',
    subtitle: 'UX Research, Wireframing, Figma',
    profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
    coverImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=120&fit=crop',
  },
  {
    name: 'Junaid Farooq',
    subtitle: 'UI Design, Prototyping, Adobe XD',
    profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
    coverImage: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300&h=120&fit=crop',
  },
  {
    name: 'Alina Qureshi',
    subtitle: 'Node.js, Express, MongoDB',
    profilePic: 'https://randomuser.me/api/portraits/women/68.jpg',
    coverImage: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=300&h=120&fit=crop',
  },
  {
    name: 'Taimoor Siddiqui',
    subtitle: 'TypeScript, Next.js, GraphQL',
    profilePic: 'https://randomuser.me/api/portraits/men/65.jpg',
    coverImage: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=300&h=120&fit=crop',
  },
];

const AboutFriendsTab = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-full mx-auto mt-4 border border-[#7c87bc]">
      <h2 className="text-3xl font-bold mb-8 font-sf">Freinds</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {friends.map((friend, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden flex flex-col items-center">
            {/* Cover Image */}
            <div className="w-full h-28 bg-gray-200 relative">
              <img src={friend.coverImage} alt="Cover" className="w-full h-full object-cover" />
              {/* Profile Pic */}
              <div className="absolute left-1/2 -bottom-14 transform -translate-x-1/2">
                <img src={friend.profilePic} alt={friend.name} className="w-24 h-24 rounded-full border-4 border-white object-cover " />
              </div>
            </div>
            <div className="pt-16 pb-6 px-4 flex flex-col items-center w-full">
              <h3 className="font-bold text-lg text-gray-900 mb-1 font-sf">{friend.name}</h3>
              <p className="text-sm text-gray-500 mb-4 text-center font-sf">{friend.subtitle}</p>
            </div>
            <div className="w-full px-3 pb-3">
              <button
                className="w-full bg-[#0017e7] text-white rounded-lg py-2 font-semibold font-sf hover:bg-[#0012b7] transition-colors"  
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutFriendsTab;