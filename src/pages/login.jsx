import React, { useState, useEffect } from 'react';

const LoginAccount = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    console.log('Login clicked:', formData);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleSendResetEmail = () => {
    console.log('Reset email sent to:', forgotPasswordEmail);
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
        window.location.href = '/login';
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
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleConfirmOtp = () => {
    const otpCode = otpValues.join('');
    console.log('OTP entered:', otpCode);
    setShowResetPassword(true);
  };

  const handleResendCode = () => {
    if (!isResendDisabled) {
      startCountdown();
      console.log('Resending code...');
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setShowOtpScreen(false);
    setShowResetPassword(false);
    setForgotPasswordEmail('');
    setOtpValues(['', '', '', '', '', '']);
    setNewPassword('');
    setConfirmPassword('');
    setCountdown(0);
    setIsResendDisabled(false);
  };

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('New password saved:', newPassword);
    handleBackToLogin();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border">
        {showResetPassword ? (
          <>
            {/* Reset Password Screen */}
            <div className="space-y-6">
              {/* New Password Field */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-500 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="334455"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showNewPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-500 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="334455"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showConfirmPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <button
                type="button"
                onClick={handleSavePassword}
                className="w-full bg-[#0017e7] text-white py-3 px-4 rounded-full font-medium hover:bg-[#0014c9] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Save
              </button>
            </div>
          </>
        ) : !showForgotPassword ? (
          <>
            {/* Header */}
            <h1 className="text-xl font-semibold text-gray-900 text-center mb-8">
              Login Account
            </h1>

            <div className="space-y-6">
              {/* Email or Username Field */}
              <div>
                <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 mb-2">
                  Email or Username
                </label>
                <input
                  type="text"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-left">
                <button 
                  onClick={handleForgotPassword}
                  className="text-sm text-[#0017e7] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-[#0017e7] text-white py-3 px-4 rounded-full font-medium hover:bg-[#0014c9] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Login
              </button>

              {/* OR Divider */}
              <div className="text-center text-gray-500 text-sm">
                OR
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-full font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue With Google
              </button>
            </div>
          </>
        ) : !showOtpScreen ? (
          <>
            {/* Forgot Password Screen */}
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="forgotEmail" className="block text-sm font-sf font-medium text-gray-500 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="forgotEmail"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  placeholder="ransom.ux@gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Send Button */}
              <button
                type="button"
                onClick={handleSendResetEmail}
                className="w-full bg-[#0017e7] text-white py-3 px-4 rounded font-medium hover:bg-[#0014c9] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
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
                <h2 className="text-lg font-medium text-gray-900 mb-4">OTP</h2>
                
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
                    className={`text-sm ${isResendDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-[#0017e7] hover:underline'}`}
                  >
                    Resend code {isResendDisabled && `${countdown}s`}
                  </button>
                </div>

                {/* Confirm Button */}
                <button
                  type="button"
                  onClick={handleConfirmOtp}
                  className="w-full bg-[#0017e7] text-white py-3 px-4 rounded-full font-medium hover:bg-[#0014c9] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                >
                  Confirm
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginAccount;