import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Settings, Edit3, MoreHorizontal, MapPin } from "lucide-react";
import NavbarReplica from "../components/nav";
import Person1 from "../assets/images/person-1.png";
import PostTab from "../components/profilecomponents/post_tab";
import { usePosts } from "../components/contexts/PostsContext";

const Profile = () => {
  const { state } = usePosts();
  const [activeTab, setActiveTab] = useState("Posts");
  const tabs = [
    "Posts",
    "About",
    "Media",
    "Friends",
    "My Work",
    "My Agencies",
    "My Badges",
    "Verified Memberships",
  ];

  const suggestedPeople = [
    {
      id: 1,
      name: "Arshpixels",
      role: "UI/UX Product Designer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    },
    {
      id: 2,
      name: "Jaiwad singh",
      role: "WebApp Developer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
    },
    {
      id: 3,
      name: "Code By Rixa",
      role: "QR Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
    },
    {
      id: 4,
      name: "Arjit Designs",
      role: "Graphic Designer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    },
    {
      id: 5,
      name: "NexusDesigns",
      role: "Brand Photographer",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop",
    },
  ];

  const onBackToHome = () => {
    console.log("Navigate to home");
  };

  // const totalPosts =
  //   number_of_text_posts + number_of_image_posts + number_of_video_posts;

  return (
    <>
      <NavbarReplica />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-[86rem] mx-auto px-0 md:px-4 py-0 md:py-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Main Profile Section */}
            <div className="col-span-1 md:col-span-8">
              <div className="bg-white rounded-lg border border-[#7c87bc] shadow-lg overflow-hidden">
                {/* Cover Photo */}
                <div className="relative h-48 bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?_gl=1*1ssvgvw*_ga*MzkyNzI2MjYwLjE3NDY2MzYwNzY.*_ga_8JE65Q40S6*czE3NTI2OTA2MDckbzE5JGcxJHQxNzUyNjkwNjYyJGo1JGwwJGgw"
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-4 right-4 border border-[#707070] bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all">
                    <Edit3 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Profile Info */}
                <div className="px-10 pb-6">
                  {/* Profile Picture */}
                  <div className="relative -mt-16 mb-4">
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
                      <img
                        src={Person1}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-2 -right-5 bg-white border border-[#707070] p-2 rounded-full hover:bg-gray-50 transition-colors">
                      <Edit3 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="relative mb-7 bg-white rounded-md mt-5">
                    {/* Edit Button */}
                    <button className="absolute top-10 -right-5 bg-white border border-[#707070] p-2 rounded-full hover:bg-gray-50 transition-colors">
                      <Edit3 className="w-4 h-4 text-gray-600" />
                    </button>

                    {/* Name and Title */}
                    <h1 className="text-3xl font-bold font-sf text-gray-900 mb-2">
                      The Ransom
                    </h1>

                    <div className="flex items-center text-[#636363] mb-2">
                      <Settings className="w-5 h-5 mr-2" />
                      <span className="text-lg">UI/UX Designer at Kerone</span>

                      <div className="flex items-center text-gray-600 ms-5">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className="text-lg">Karachi, Pakistan</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex space-x-7 mb-8">
                    <div className="flex items-center space-x-1 font-sf">
                      <span className="text-lg font-semibold text-gray-900">
                        {/* {totalPosts} */}
                        90
                      </span>
                      <span className="text-md text-gray-500 font-sf font-medium">
                        post
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 font-sf">
                      <span className="text-lg font-semibold text-gray-900">
                        250
                      </span>
                      <span className="text-md font-medium text-gray-500 font-sf">
                        followers
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 font-sf">
                      <span className="text-lg font-semibold text-gray-900">
                        160
                      </span>
                      <span className="text-md text-gray-500 font-sf font-medium">
                        following
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className=" bg-[#0017e7] text-white py-2.5 px-6 rounded-md hover:bg-[#0012b7] transition-colors  font-sf">
                      Request Membership
                    </button>
                    <button className="px-6 py-2.5 border border-black text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-sf font-medium">
                      Add a post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Suggested For You */}
            <div className="hidden md:block md:col-span-4">
              <div className="bg-white rounded-lg border border-[#7c87bc] shadow-lg">
                <div className="p-5 border-b border-[#7c87bc]">
                  <h2 className="text-md font-medium font-sf text-[#707070]">
                    Suggested For You
                  </h2>
                </div>

                <div className="p-5">
                  <div className="space-y-5">
                    {suggestedPeople.map((person) => (
                      <div
                        key={person.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={person.image}
                            alt={person.name}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900 text-md font-sf">
                              {person.name}
                            </h3>
                            <p className="text-xs text-gray-500 font-sf">
                              {person.role}
                            </p>
                          </div>
                        </div>
                        <button className="text-[#0017e7] text-sm font-medium hover:text-[#0012b7] transition-colors">
                          • Connect
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs - Full Width Below Grid */}
          <div className="mt-4">
            <div className="col-span-12">
              <div className="bg-white rounded-lg border border-[#7c87bc] shadow-lg overflow-hidden">
                <div className="px-6 py-5 pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-10">
                      {tabs.map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`text-lg font-sf font-medium transition-colors relative ${
                            activeTab === tab
                              ? "text-[#0017e7] border-b-2 border-[#0017e7] pb-4"
                              : "text-gray-500 hover:text-gray-700 pb-4"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal className="w-5 h-5 mb-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "Posts" && (
            <PostTab
              number_of_text_posts={state.textPosts.length}
              number_of_image_posts={state.imagePosts.length}
              number_of_video_posts={state.videoPosts.length}
              text_posts_data={state.textPosts}
              image_posts_data={state.imagePosts}
              video_posts_data={state.videoPosts}
            />
          )}
          {activeTab === "About" && (
            <div className="bg-white rounded-lg border border-[#7c87bc] shadow-lg mt-4">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">About</h3>
                <p className="text-gray-700">About content will go here...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
