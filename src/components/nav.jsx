import { Search, House, Store, Settings, User } from "lucide-react";
import Logo from "../assets/images/logo.jpg";
import Homeicon from "../assets/images/home.png";
import Marketplace from "../assets/images/market.png";
import Hand from "../assets/images/hand.png";

export default function NavbarReplica() {
  return (
    <div className="w-full bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between relative">
          {/* Left Section - Logo and Search */}
          <div className="flex items-center space-x-6">
            {/* Logo - Multi-colored diamond shape */}
            <div className="flex items-center">
              <div className="w-10 h-10">
                <img
                  src={Logo}
                  alt="Custom Icon"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center bg-[#efeff3] rounded-full px-4 py-3 w-72">
                <Search className="w-5 h-5 text-[#333f7d] mr-3" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent outline-none text-[#333f7d] placeholder-[#333f7d] text-sm w-full"
                />
              </div>
            </div>
          </div>

          {/* Center Section - Navigation Icons */}
          <div className="flex items-center space-x-12 absolute left-1/2 transform -translate-x-1/2">
            {/* Home Icon - Active */}
            <div className="flex flex-col items-center cursor-pointer relative">
              <img
                src={Homeicon}
                alt="Custom Icon"
                className="w-9 h-full object-cover"
              />
              <div className="absolute -bottom-6 w-12 h-[3px] bg-blue-600 rounded-full"></div>
            </div>

            {/* Users Icon */}
            <div className="flex flex-col items-center cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors">
              <img
                src={Marketplace}
                alt="Custom Icon"
                className="w-9 h-full object-cover"
              />
            </div>

            {/* Hand Heart Icon */}
            <div className="flex flex-col items-center cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors">
              <img
                src={Hand}
                alt="Custom Icon"
                className="w-9 h-full object-cover"
              />
            </div>
          </div>

          {/* Right Section - Add Friends Button and Profile */}
          <div className="flex items-center space-x-4">
            {/* Add Friends Button */}
            <button className="bg-[#efeff3] border border-[#333f7d] rounded-full px-5 py-2 text-[#333f7d] text-sm font-medium hover:bg-[#e5e5e9] transition-colors shadow-sm">
              Add Friends
            </button>

            {/* Profile Icon */}
            <div className="w-9 h-9 bg-[#e4e4e4] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e4e4e4] transition-colors">
              <User className="w-5 h-5 text-[#333f7d]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
