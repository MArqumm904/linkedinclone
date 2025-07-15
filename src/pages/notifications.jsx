import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import SidebarMenu from "../components/sidebarmenu";
import ProfileCard from "../components/profilecard";
import NavbarReplica from "../components/nav";
import cross from "../assets/images/cross_icon.png";

const Notifications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const notifications = [
    {
      id: 1,
      type: "today",
      user: "Counter",
      action: "uploaded your confirmation letter.",
      time: "Just Now",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      hasActions: false,
      hasViewButton: true,
      buttonText: "View Document",
    },
    {
      id: 2,
      type: "today",
      user: "Janus",
      action: "approved your membership.",
      time: "30m ago",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      hasActions: false,
      hasViewButton: true,
      buttonText: "View",
    },
    {
      id: 3,
      type: "today",
      user: "Ayesha Malik",
      action: "requested to join your company.",
      time: "9m ago",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      hasActions: true,
      hasViewButton: false,
    },
    {
      id: 4,
      type: "today",
      user: "Ahsan Rehman",
      action: "sent you an agent request.",
      time: "5m ago",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      hasActions: true,
      hasViewButton: false,
    },
    // Yesterday notifications
    {
      id: 5,
      type: "yesterday",
      user: "Firdos",
      action: "rejected your membership request.",
      time: "10hrs ago",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      hasActions: false,
      hasViewButton: false,
    },
    {
      id: 6,
      type: "yesterday",
      user: "Ali Raza",
      action: "sent you a follow request.",
      time: "12hrs ago",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      hasActions: true,
      hasViewButton: false,
    },
    {
      id: 7,
      type: "yesterday",
      user: "Sara Tariq",
      action: "started following you.",
      time: "20hrs ago",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      hasActions: false,
      hasViewButton: false,
    },
  ];

  const onBackToHome = () => {
    navigate("/");
  };

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedNotifications = {
    today: filteredNotifications.filter((n) => n.type === "today"),
    yesterday: filteredNotifications.filter((n) => n.type === "yesterday"),
    thisweek: filteredNotifications.filter((n) => n.type === "thisweek"),
  };

  const renderNotificationItem = (notification) => (
    <div
      key={notification.id}
      className="bg-white border border-[#bcbcbc] rounded-lg p-4 mb-3 shadow-sm"
    >
      <div className="flex items-center gap-3 relative">
        {/* Avatar */}
        <img
          src={notification.avatar}
          alt={notification.user}
          className="w-20 h-20 rounded-full flex-shrink-0"
        />

        {/* Content */}
        <div className="flex-0 min-w-0 mt-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-md text-gray-900 font-sf">
                  <span className="font-semibold">{notification.user}</span>{" "}
                  {notification.action}
                </p>
                {/* Time aligned with user name */}
                <span
                  className={`text-xs font-semibold ml-3 flex-shrink-0 ${
                    notification.time === "Just Now"
                      ? "text-[#0017e7]"
                      : "text-[#707070]"
                  }`}
                >
                  {notification.time}
                </span>
              </div>
            </div>
          </div>

          {notification.hasViewButton && (
            <button className="font-sf mt-2 px-4 py-2 bg-[#0017e7] text-white text-xs rounded-md hover:bg-[#0015db] transition-colors">
              📄 {notification.buttonText}
            </button>
          )}

          {/* Action Buttons */}
          {notification.hasActions && (
            <div className="flex gap-2 mt-3">
              <button className="font-sf px-4 py-1 bg-gradient-to-b from-green-400 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-400 hover:to-green-700 transition-all duration-200 flex items-center gap-2 shadow-sm">
                ✓ Approve
              </button>
              <button className="font-sf px-6 py-1 bg-gradient-to-b from-red-400 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-400 hover:to-red-800 transition-all duration-200 flex items-center gap-2 shadow-sm">
                <img src={cross} className="w-3 h-3" alt="" /> Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <NavbarReplica />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-[86rem] mx-auto px-0 md:px-4 py-0 md:py-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Sidebar - Hidden on mobile */}
            <div className="hidden md:block md:col-span-3">
              <ProfileCard />
              <SidebarMenu />
            </div>

            {/* Main Content */}
            <div className="col-span-1 md:col-span-9">
              <div className="bg-white rounded-lg shadow-sm border border-[#6974b1] p-4 mx-auto">
                {/* Header */}
                <div className="flex items-center mb-6">
                  <button
                    onClick={onBackToHome}
                    className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                  </button>
                  <h1 className="text-2xl font-semibold font-sf text-gray-900">
                    Notification
                  </h1>
                </div>

                {/* Notifications Content */}
                <div className="space-y-6">
                  {/* Today Section */}
                  {groupedNotifications.today.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-3 font-sf">
                        Today
                      </h2>
                      <div className="bg-white  rounded-lg overflow-hidden">
                        {groupedNotifications.today.map(renderNotificationItem)}
                      </div>
                    </div>
                  )}

                  {/* Yesterday Section */}
                  {groupedNotifications.yesterday.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-3 font-sf">
                        Yesterday
                      </h2>
                      <div className="bg-white  rounded-lg overflow-hidden">
                        {groupedNotifications.yesterday.map(
                          renderNotificationItem
                        )}
                      </div>
                    </div>
                  )}

                  {/* This Week Section */}
                  {groupedNotifications.thisweek.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-3 font-sf">
                        This Week
                      </h2>
                      <div className="bg-white rounded-lg overflow-hidden">
                        {groupedNotifications.thisweek.map(
                          renderNotificationItem
                        )}
                      </div>
                    </div>
                  )}

                  {/* No notifications found */}
                  {filteredNotifications.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500 font-sf">
                        No notifications found matching your search.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Main Content ends */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;