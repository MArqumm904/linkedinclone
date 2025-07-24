import { useState } from "react";
import {
  Camera,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Users,
  TrendingUp,
  MessageCircle,
  Briefcase,
} from "lucide-react";
import logo from "../assets/images/logo.jpg";
import RegisterSecondStep from "./register_second_step";

const benefits = [
  { icon: Users, text: "Connect with professionals" },
  { icon: TrendingUp, text: "Grow your network" },
  { icon: MessageCircle, text: "Share your story" },
  { icon: Briefcase, text: "Discover new opportunities" },
];

const stats = [
  { number: "10K+", label: "Active Users" },
  { number: "50+", label: "Companies" },
  { number: "1000+", label: "Success Stories" },
];

const MainLogin = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactOrEmail: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.contactOrEmail.trim())
      newErrors.contactOrEmail = "Email or Phone is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(2);
    }
  };

  return step === 2 ? (
    <>
      <RegisterSecondStep />
    </>
  ) : (
    <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center p-4 overflow-x-hidden">
      <div className="bg-white rounded-[20px] shadow-2xl border border-[#d6dbe1] flex w-full max-w-5xl max-h-[700px] overflow-hidden relative overflow-y-auto">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-[#0017e7]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#0017e7]/5 rounded-full blur-2xl"></div>
        {/* Left Branding Section */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-[#f4f7fe] w-1/2 p-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-16 h-16 border-2 border-[#0017e7] rounded-full"></div>
            <div className="absolute top-32 right-20 w-12 h-12 border-2 border-[#0017e7] rounded-full"></div>
            <div className="absolute bottom-20 left-16 w-8 h-8 border-2 border-[#0017e7] rounded-full"></div>
            <div className="absolute bottom-40 right-12 w-6 h-6 bg-[#0017e7] rounded-full"></div>
          </div>
          {/* Logo Section */}
          <div className="relative z-10 text-center mb-4">
            <div className="w-24 h-24 rounded-full bg-white border-2 border-[#0017e7] flex items-center justify-center mb-4 mx-auto shadow-lg overflow-hidden">
              <img
                src={logo}
                alt="Ahmeed Logo"
                className="w-full h-full object-contain"
                style={{ display: "block" }}
              />
            </div>
            <h1 className="text-2xl font-bold text-[#0017e7] mb-2">
              Welcome to <span className="text-[#4bb547]">Ahmeed</span>{" "}
            </h1>
            <p className="text-[#444] text-[15px] mb-4">
              Join Pakistan's fastest growing professional network!
            </p>
          </div>
          {/* Benefits */}
          <div className="space-y-2 mb-4 w-full max-w-xs">
            {benefits.map((benefit, i) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 text-[#222] p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-[#d6dbe1]/50 hover:bg-white/70 transition-all duration-300 hover:shadow-md"
                >
                  <div className="w-2 h-2 bg-[#0017e7] rounded-full flex-shrink-0"></div>
                  <span className="text-[15px] font-medium">
                    {benefit.text}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Stats */}
          <div className="flex justify-between w-full max-w-xs text-center mt-2">
            {stats.map((stat, i) => (
              <div key={i} className="text-[#0017e7]">
                <div className="text-xl font-bold">{stat.number}</div>
                <div className="text-[#444] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Form Section */}
        <div className="flex-1 flex flex-col justify-center p-6 lg:p-8 relative z-10">
          {/* Mobile Logo for smaller screens */}
          <div className="lg:hidden text-center mb-4">
            <div className="w-12 h-12 rounded-full bg-[#e6eaff] border-4 border-[#0017e7] flex items-center justify-center mb-2 mx-auto shadow">
              <span className="text-lg font-bold text-[#0017e7]">A</span>
            </div>
            <h2 className="text-xl font-bold text-[#0017e7]">Join Ahmeed</h2>
          </div>
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative group cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-[#e6eaff] border-4 border-[#0017e7] flex items-center justify-center shadow group-hover:shadow-lg transition-all duration-300">
                <User className="w-6 h-6 text-[#0017e7]" />
                <div className="absolute inset-0 rounded-full bg-[#0017e7]/0 group-hover:bg-[#0017e7]/10 transition-colors duration-300 flex items-center justify-center">
                  <Camera className="w-4 h-4 text-[#0017e7] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
            <span className="text-[#888] text-[12px] mt-1 font-medium">
              <span className="text-[#4bb547]">Ahmeed</span> User
            </span>
            <h1 className="text-2xl font-semibold  text-gray-900 text-center mb-1 mt-4">
              Register Your Account
            </h1>
          </div>
          <div className="space-y-3">
            {/* Full Name Field */}
            <div className="relative">
              <label
                htmlFor="fullName"
                className="block text-[14px] font-medium text-[#444] mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <div
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "fullName"
                      ? "text-[#0017e7]"
                      : "text-[#bbb]"
                  }`}
                >
                  {" "}
                  <User className="w-5 h-5" />{" "}
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full pl-10 pr-3 py-2 border ${
                    errors.fullName ? "border-red-500" : "border-[#d6dbe1]"
                  } rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#0017e7] focus:border-transparent text-[14px] bg-white hover:border-[#0017e7]/30 transition-all duration-200`}
                  placeholder="Enter your full name"
                  autoComplete="off"
                />
              </div>
              {errors.fullName && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.fullName}
                </div>
              )}
            </div>
            {/* Contact Field */}
            <div className="relative">
              <label
                htmlFor="contactOrEmail"
                className="block text-[14px] font-medium text-[#444] mb-1"
              >
                Mobile Number or Email Address
              </label>
              <div className="relative">
                <div
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "contactOrEmail"
                      ? "text-[#0017e7]"
                      : "text-[#bbb]"
                  }`}
                >
                  {" "}
                  <Mail className="w-5 h-5" />{" "}
                </div>
                <input
                  type="text"
                  id="contactOrEmail"
                  name="contactOrEmail"
                  value={formData.contactOrEmail}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("contactOrEmail")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full pl-10 pr-3 py-2 border ${
                    errors.contactOrEmail
                      ? "border-red-500"
                      : "border-[#d6dbe1]"
                  } rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#0017e7] focus:border-transparent text-[14px] bg-white hover:border-[#0017e7]/30 transition-all duration-200`}
                  placeholder="Enter email or phone number"
                  autoComplete="off"
                />
              </div>
              {errors.contactOrEmail && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.contactOrEmail}
                </div>
              )}
            </div>
            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-[14px] font-medium text-[#444] mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "password"
                      ? "text-[#0017e7]"
                      : "text-[#bbb]"
                  }`}
                >
                  {" "}
                  <Lock className="w-5 h-5" />{" "}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full pl-10 pr-10 py-2 border ${
                    errors.password ? "border-red-500" : "border-[#d6dbe1]"
                  } rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#0017e7] focus:border-transparent text-[14px] bg-white hover:border-[#0017e7]/30 transition-all duration-200`}
                  placeholder="Create a strong password"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#bbb] hover:text-[#0017e7] transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.password}
                </div>
              )}
            </div>
            {/* Terms and Conditions */}
            <div className="text-[12px] text-[#444] text-center p-2 bg-[#f4f7fe] rounded-[8px] border border-[#d6dbe1]/50">
              <CheckCircle className="w-4 h-4 text-[#0017e7] mx-auto mb-2" />
              By clicking Next, you agree to Ahmeed's{" "}
              <a
                href="#"
                className="text-[#0017e7] hover:underline font-medium transition-colors duration-200"
              >
                User Agreement
              </a>
              ,{" "}
              <a
                href="#"
                className="text-[#0017e7] hover:underline font-medium transition-colors duration-200"
              >
                Privacy Policy
              </a>
              , and{" "}
              <a
                href="#"
                className="text-[#0017e7] hover:underline font-medium transition-colors duration-200"
              >
                Cookie Policy
              </a>
              .
            </div>
            {/* Create Account Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#0017e7] text-white py-2 px-4 rounded-full font-medium text-[15px] hover:bg-[#0033ff] focus:outline-none focus:ring-2 focus:ring-[#0017e7] focus:ring-offset-2 transition-all duration-200 shadow hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Next
            </button>
            {/* OR Divider */}
            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 h-px bg-[#d6dbe1]" />
              <span className="text-[#888] text-[14px] bg-white px-2">OR</span>
              <div className="flex-1 h-px bg-[#d6dbe1]" />
            </div>
            {/* Google Sign In Button */}
            <button
              type="button"
              className="w-full bg-[#f4f7fe] border-2 border-[#0017e7] text-[#0017e7] py-2 px-4 rounded-full font-medium text-[14px] hover:bg-[#e6eaff] focus:outline-none focus:ring-2 focus:ring-[#0017e7] focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 shadow hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="ml-1">Continue With Google</span>
            </button>
          </div>
          {/* Already on Ahmeed */}
          <div className="text-center text-[14px] text-black mt-4 p-2 bg-[#fafbfc] rounded-[8px] border border-[#d6dbe1]/30">
            Already on Ahmeed?{" "}
            <a
              href="/login"
              className="text-[#0017e7] hover:text-[#0033ff] font-medium hover:underline transition-colors duration-200"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLogin;
