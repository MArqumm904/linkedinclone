import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
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
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
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

  const handleSecondStepComplete = async (secondStepData) => {
    setLoading(true);
    setApiError("");
    setSuccess("");
    const payload = {
      name: formData.fullName,
      password: formData.password,
      email: formData.contactOrEmail.includes("@")
        ? formData.contactOrEmail
        : undefined,
      phone: !formData.contactOrEmail.includes("@")
        ? formData.contactOrEmail
        : undefined,
      skills: secondStepData.skills,
      dob: secondStepData.dob,
      location: secondStepData.location,
    };
    try {
      const res = await fetch("http://127.0.0.1:8000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message);
        setFormData({
          fullName: "",
          contactOrEmail: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setApiError(data.error || "Registration failed!");
        setStep(1);
        setTimeout(() => setApiError(""), 3000);
      }
    } catch {
      setApiError("Registration failed! Server error.");
      setStep(1);
      setTimeout(() => setApiError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (step === 2) {
    return (
      <RegisterSecondStep
        onComplete={handleSecondStepComplete}
        successMessage={success}
        errorMessage={apiError}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center p-4 overflow-x-hidden">
      <div className="bg-white rounded-[20px] shadow-2xl border border-[#d6dbe1] flex w-full max-w-5xl max-h-[700px] overflow-hidden relative overflow-y-auto">
        {/* Left Branding Section */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-[#f4f7fe] w-1/2 p-6 relative overflow-hidden">
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
              Welcome to <span className="text-[#4bb547]">Ahmeed</span>
            </h1>
            <p className="text-[#444] text-[15px] mb-4">
              Join Pakistan's fastest growing professional network!
            </p>
          </div>
          {/* Benefits */}
          <div className="space-y-2 mb-4 w-full max-w-xs">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-[#222] p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-[#d6dbe1]/50 hover:bg-white/70 transition-all duration-300 hover:shadow-md"
              >
                <div className="w-2 h-2 bg-[#0017e7] rounded-full flex-shrink-0"></div>
                <span className="text-[15px] font-medium">
                  {benefit.text}
                </span>
              </div>
            ))}
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
          {/* Register Title */}
          <div className="flex flex-col items-center mb-4">
            <span className="text-[#888] text-[12px] mt-1 font-medium">
              <span className="text-[#4bb547]">Ahmeed</span> User
            </span>
            <h1 className="text-2xl font-semibold text-gray-900 text-center mb-1 mt-4">
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
                  <User className="w-5 h-5" />
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
                  <Mail className="w-5 h-5" />
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
                  <Lock className="w-5 h-5" />
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
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#bbb] hover:text-[#0017e7] transition-colors duration-200"
                  tabIndex={-1}
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
              disabled={loading}
            >
              {loading ? "Processing..." : "Next"}
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
          {apiError && (
            <div className="text-red-500 text-center mb-2">{apiError}</div>
          )}
          {success && (
            <div className="text-green-600 text-center mb-2">
              {success} Redirecting to login...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainLogin;
