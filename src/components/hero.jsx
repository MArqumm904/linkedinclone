import ProfileCard from "./profilecard";
import Stories from "./storysec";
import CreatePost from "./createpost";
import RightSidebar from "./rightsidebar";
import SidebarMenu from "./sidebarmenu";
import Post from "./post";

export default function FacebookLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[83rem] mx-auto px-4 py-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <ProfileCard />
            <SidebarMenu />
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            <Stories />
            <CreatePost />
            <Post />
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
