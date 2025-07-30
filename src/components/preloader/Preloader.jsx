import React from 'react'; 

const Preloader = () => { 
  return ( 
    <div className="fixed  inset-0 bg-gray-50 overflow-hidden z-50"> 
      <div className="min-h-screen">
        {/* Header skeleton - matches the top navigation bar */}
        <div className="bg-white shadow-sm px-4 py-3 border-b">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Left side - Logo and Search */}
            <div className="flex items-center space-x-4">
              {/* Green logo placeholder */}
              <div className="w-10 h-10 bg-green-500 rounded animate-pulse"></div>
              {/* Search bar */}
              <div className="w-64 h-10 bg-gray-200 rounded-full animate-pulse flex items-center px-4">
                <div className="w-4 h-4 bg-gray-400 rounded mr-2 animate-pulse"></div>
                <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
            
            {/* Center - Navigation icons */}
            <div className="flex items-center space-x-8">
              {/* Home icon (highlighted blue) */}
              <div className="w-8 h-8 bg-blue-500 rounded animate-pulse"></div>
              {/* Store icon */}
              <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
              {/* Settings icon */}
              <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
            </div>
            
            {/* Right side - Add Friends button and profile */}
            <div className="flex items-center space-x-4">
              <div className="w-24 h-8 bg-blue-500 rounded animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="max-w-8xl mx-auto flex gap-6 p-4">
          {/* Left Sidebar */}
          <div className="w-80 space-y-4">
            {/* User Profile Card - matches the "tahoor" profile card */}
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="w-20 h-5 bg-gray-300 rounded animate-pulse mb-1"></div>
                  <div className="w-12 h-3 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
              {/* Stats row - 90 Posts, 250 Followers, 160 Following */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="w-8 h-5 bg-gray-300 rounded animate-pulse mx-auto mb-1"></div>
                  <div className="w-16 h-3 bg-gray-300 rounded animate-pulse mx-auto"></div>
                </div>
                <div>
                  <div className="w-12 h-5 bg-gray-300 rounded animate-pulse mx-auto mb-1"></div>
                  <div className="w-20 h-3 bg-gray-300 rounded animate-pulse mx-auto"></div>
                </div>
                <div>
                  <div className="w-10 h-5 bg-gray-300 rounded animate-pulse mx-auto mb-1"></div>
                  <div className="w-16 h-3 bg-gray-300 rounded animate-pulse mx-auto"></div>
                </div>
              </div>
            </div>

            {/* Menu Items with notification badges */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
              {[
                { name: "Messages", badge: "2" },
                { name: "Friends", badge: "5" },
                { name: "Notifications", badge: "3" },
                { name: "Video/Reels", badge: null },
                { name: "Create Post", badge: null },
                { name: "Saved", badge: null },
                { name: "Groups", badge: null },
                { name: "Pages", badge: null }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border-b border-gray-100 last:border-b-0">
                  <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                  <div className="flex-1">
                    <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  {item.badge && (
                    <div className="w-5 h-5 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Stories Section - horizontal row of circular profiles */}
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex space-x-4">
                {[
                  "Your Story",
                  "Archime...",
                  "jahved si...",
                  "Coderlytics",
                  "ArjitDesi..."
                ].map((story, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse border-2 border-gray-200"></div>
                    <div className="w-16 h-3 bg-gray-300 rounded animate-pulse text-center text-xs"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Post Section - matches the "What's on your mind?" area */}
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="flex-1 h-12 bg-gray-200 rounded-full animate-pulse flex items-center px-4">
                  <div className="w-40 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
              {/* Post creation options - Photo, Video (highlighted), Document */}
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded animate-pulse"></div>
                  <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded animate-pulse"></div>
                  <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Post Feed - matches the "Design Foundation" post */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
              {/* Post Header */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                    <div>
                      <div className="w-32 h-4 bg-gray-300 rounded animate-pulse mb-1"></div>
                      <div className="w-20 h-3 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                </div>
                
                {/* Post Content - "Just finished an amazing UI/UX project!" */}
                <div className="space-y-2 mb-4">
                  <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Post Actions and Engagement */}
              <div className="p-4 border-t">
                {/* Engagement metrics - 25 Likes, 5 Comments, 0 Views */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-5 h-5 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-16 h-3 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-3 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-16 h-3 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
                
                {/* Action buttons - Like, Comment, Share */}
                <div className="flex justify-between pt-2 border-t">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-8 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-10 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - "YOUR PAGE" section */}
          <div className="w-80 space-y-4">
            {/* "YOUR PAGE" header */}
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="w-24 h-5 bg-gray-300 rounded animate-pulse mb-4"></div>
              
              {/* First page card - "Get a Notification Scholarship" */}
              <div className="space-y-3 mb-4">
                <div className="w-full h-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="w-32 h-4 bg-gray-300 rounded animate-pulse mb-1"></div>
                    <div className="w-20 h-3 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="w-full h-8 bg-blue-500 rounded animate-pulse"></div>
              </div>
              
              {/* Second page card - "Web Development Service" */}
              <div className="space-y-3">
                <div className="w-full h-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="w-28 h-4 bg-gray-300 rounded animate-pulse mb-1"></div>
                    <div className="w-32 h-3 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="w-full h-8 bg-blue-500 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Central Loading Spinner */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 w-12 h-12 border-3 border-gray-400 rounded-full opacity-20"></div>
            <div 
              className="absolute inset-0 w-12 h-12 border-3 border-transparent rounded-full animate-spin"
              style={{
                borderTopColor: '#1877F2',
                borderRightColor: '#1877F2',
                animationDuration: '1s',
                animationTimingFunction: 'linear'
              }}
            ></div>
          </div>
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }
          
          .animate-pulse {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200px 100%;
            animation: shimmer 1.5s infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  ); 
}; 

export default Preloader;