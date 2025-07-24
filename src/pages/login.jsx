import React, { useState, useEffect } from "react";
import {
  User,
  Users,
  TrendingUp,
  MessageCircle,
  Briefcase,
  Camera,
} from "lucide-react";
import logo from "../assets/images/logo.jpg";

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

const LoginAccount = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    console.log("Login clicked:", formData);
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleSendResetEmail = () => {
    console.log("Reset email sent to:", forgotPasswordEmail);
    setShowOtpScreen(true);
    startCountdown();
  };

  const startCountdown = () => {
    setCountdown(60);
    setIsResendDisabled(true);
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && isResendDisabled) {
      setIsResendDisabled(false);
      if (showOtpScreen) {
        window.location.href = "/login";
      }
    }
    return () => clearTimeout(timer);
  }, [countdown, isResendDisabled, showOtpScreen]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleConfirmOtp = () => {
    const otpCode = otpValues.join("");
    console.log("OTP entered:", otpCode);
    setShowResetPassword(true);
  };

  const handleResendCode = () => {
    if (!isResendDisabled) {
      startCountdown();
      console.log("Resending code...");
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setShowOtpScreen(false);
    setShowResetPassword(false);
    setForgotPasswordEmail("");
    setOtpValues(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setCountdown(0);
    setIsResendDisabled(false);
  };

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("New password saved:", newPassword);
    handleBackToLogin();
  };

  return (
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
              Welcome Back to <span className="text-[#4bb547]">Ahmeed</span>{" "}
            </h1>
            <p className="text-[#444] text-[15px] mb-4">
              The Pakistan's fastest growing professional network!
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
          {/* Header */}
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
          </div>
          <h1 className="text-2xl font-semibold  text-gray-900 text-center mb-8">
            Login Account
          </h1>
          {showResetPassword ? (
            <>
              {/* Reset Password Screen */}
              <div className="space-y-6">
                {/* New Password Field */}
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-500 mb-2"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="334455"
                      className="w-full pl-3 pr-3 py-2 border border-[#d6dbe1] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#0017e7] focus:border-transparent text-[14px] bg-white hover:border-[#0017e7]/30 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {showNewPassword ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-500 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="334455"
                      className="w-full pl-3 pr-3 py-2 border border-[#d6dbe1] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#0017e7] focus:border-transparent text-[14px] bg-white hover:border-[#0017e7]/30 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {showConfirmPassword ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Save Button */}
                <button
                  type="button"
                  onClick={handleSavePassword}
                  className="w-full bg-[#0017e7] text-white py-2 px-4 rounded-full font-medium text-[15px] hover:bg-[#0033ff] focus:outline-none focus:ring-2 focus:ring-[#0017e7] focus:ring-offset-2 transition-all duration-200 shadow hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Save
                </button>
              </div>
            </>
          ) : !showForgotPassword ? (
            <>
              {/* Email or Username Field */}
              <div>
                <label
                  htmlFor="emailOrUsername"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mobile Number or Email Address
                </label>
                <input
                  type="text"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  value={formData.emailOrUsername}
                  placeholder="+92 30 01234567 OR ransom.ux@gmail.com"
                  onChange={handleChange}
                  className="w-full pl-3 pr-3 py-2 border border-[#d6dbe1] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#0017e7] focus:border-transparent text-[14px] bg-white hover:border-[#0017e7]/30 transition-all duration-200"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2  mt-4"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="**************"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-3 pr-3 py-2 border border-[#d6dbe1] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#0017e7] focus:border-transparent text-[14px] bg-white hover:border-[#0017e7]/30 transition-all duration-200"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-left">
                <button
                  onClick={handleForgotPassword}
                  className="text-sm text-[#0017e7] hover:underline mt-5 mb-5"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-[#0017e7] text-white py-2 px-4 rounded-full font-medium text-[15px] hover:bg-[#0033ff] focus:outline-none focus:ring-2 focus:ring-[#0017e7] focus:ring-offset-2 transition-all duration-200 shadow hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Login
              </button>

              {/* OR Divider */}
              <div className="flex items-center gap-2 my-1 mt-5 mb-5">
                <div className="flex-1 h-px bg-[#d6dbe1]" />
                <span className="text-[#888] text-[14px] bg-white px-2">
                  OR
                </span>
                <div className="flex-1 h-px bg-[#d6dbe1]" />
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
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
                Continue With Google
              </button>
            </>
          ) : !showOtpScreen ? (
            <>
              {/* Forgot Password Screen */}
              <div className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="forgotEmail"
                    className="block text-sm font-sf font-medium text-gray-500 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="forgotEmail"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    placeholder="ransom.ux@gmail.com"
                    className="w-full pl-3 pr-3 py-2 border border-[#d6dbe1] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#0017e7] focus:border-transparent text-[14px] bg-white hover:border-[#0017e7]/30 transition-all duration-200"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="button"
                  onClick={handleSendResetEmail}
                  className="w-full bg-[#0017e7] text-white py-2 px-4 rounded-full font-medium text-[15px] hover:bg-[#0033ff] focus:outline-none focus:ring-2 focus:ring-[#0017e7] focus:ring-offset-2 transition-all duration-200 shadow hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send
                </button>

                {/* Back to Login */}
                <div className="text-center">
                  <button
                    onClick={handleBackToLogin}
                    className="text-sm text-[#0017e7] hover:underline"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* OTP Screen */}
              <div className="space-y-6">
                {/* OTP Header */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    OTP
                  </h2>

                  {/* OTP Input Boxes */}
                  <div className="flex gap-3 justify-center mb-4">
                    {otpValues.map((value, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={value}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-14 h-14 text-center text-4xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength="1"
                      />
                    ))}
                  </div>

                  {/* Check Email Message */}
                  <p className="text-sm text-gray-600 mb-4">
                    Check your email! We've just sent you a code.
                  </p>

                  {/* Resend Code */}
                  <div className="mb-4">
                    <button
                      onClick={handleResendCode}
                      disabled={isResendDisabled}
                      className={`text-sm ${
                        isResendDisabled
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-[#0017e7] hover:underline"
                      }`}
                    >
                      Resend code {isResendDisabled && `${countdown}s`}
                    </button>
                  </div>

                  {/* Confirm Button */}
                  <button
                    type="button"
                    onClick={handleConfirmOtp}
                    className="w-full bg-[#0017e7] text-white py-2 px-4 rounded-full font-medium text-[15px] hover:bg-[#0033ff] focus:outline-none focus:ring-2 focus:ring-[#0017e7] focus:ring-offset-2 transition-all duration-200 shadow hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginAccount;
