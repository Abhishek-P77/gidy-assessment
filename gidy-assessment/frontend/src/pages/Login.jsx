import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react'; // 1. Import Auth0 hook

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 2. Extract loginWithRedirect from Auth0
  const { loginWithRedirect } = useAuth0();

  const gidyLogoSmall = "https://gidy-content-p.s3.us-west-2.amazonaws.com/Png/Gidy_logo_small_white_bg.png";

  // 3. Create the Google Login Handler
  const handleGoogleLogin = async () => {
    await loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2' // This tells Auth0 to open Google directly
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!email.trim()) {
      setEmailError('Please enter an email address');
      hasError = true;
    } else setEmailError('');

    if (!password.trim()) {
      setPasswordError('Password is required');
      hasError = true;
    } else setPasswordError('');

    if (!hasError) {
      // NOTE: If you are using Auth0's Universal Login, 
      // you usually don't build a custom email/password form here.
      // Instead, you just call loginWithRedirect() without connection params.
      // However, if you are using Auth0's "Resource Owner Password Grant" to keep 
      // users on this exact UI, you would make an API call to Auth0 here.
      console.log('Attempting custom login with:', email);
    }
  };

  const ErrorIcon = () => (
    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-[2px]">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334z" fill="#d03c38" stroke="#d03c38" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8 4.583a.75.75 0 0 1 .75.75V8a.75.75 0 0 1-1.5 0V5.333a.75.75 0 0 1 .75-.75z" fill="#fff"/>
      <path d="M8.667 10.667a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0z" fill="#fff"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center font-sans text-[#1e212a]">
      <main className="w-full max-w-[440px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-[5px] p-8 sm:p-12 flex flex-col items-center border-[0px] border-[#c9cace]">
        
        <header className="text-center w-full mb-8">
          <img src={gidyLogoSmall} alt="GIDY" className="h-[52px] mx-auto mb-6 object-contain" />
          <h1 className="text-[1.5rem] font-medium text-[#1e212a] mb-1">Welcome</h1>
          <p className="text-[0.875rem] text-[#1e212a]">Log in to GIDY!</p>
        </header>

        <div className="w-full flex flex-col">
          
          {/* 4. Attach the onClick handler to the Google button */}
          <button 
            type="button" 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-[#c9cace] py-3 rounded-[3px] text-[1rem] font-medium hover:bg-gray-50 transition-all mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="w-full flex items-center gap-4 mb-8">
            <div className="flex-grow h-[1px] bg-[#c9cace]"></div>
            <span className="text-[0.75rem] text-[#65676e] font-semibold uppercase tracking-widest">Or</span>
            <div className="flex-grow h-[1px] bg-[#c9cace]"></div>
          </div>

          <form className="w-full flex flex-col" onSubmit={handleSubmit} noValidate>
            <div className="relative mb-5">
              <label className={`absolute left-3 top-[-10px] bg-white px-1 text-[0.875rem] font-medium z-10 transition-colors ${emailError ? 'text-[#d03c38]' : 'text-[#65676e]'}`}>
                Email address <span className="text-[#d03c38]">*</span>
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => { setEmail(e.target.value); if(emailError) setEmailError(''); }}
                className={`w-full px-4 py-3.5 border rounded-[3px] text-[1rem] outline-none transition-all ${
                  emailError ? 'border-[#d03c38] focus:ring-1 focus:ring-[#d03c38]' : 'border-[#c9cace] focus:border-[#635dff] focus:ring-1 focus:ring-[#635dff]'
                }`}
              />
              {emailError && (
                <div className="flex items-start gap-2 mt-2 text-[#d03c38] text-[12px] leading-[1.4]"><ErrorIcon /><span>{emailError}</span></div>
              )}
            </div>

            <div className="relative mb-4">
              <label className={`absolute left-3 top-[-10px] bg-white px-1 text-[0.875rem] font-medium z-10 transition-colors ${passwordError ? 'text-[#d03c38]' : 'text-[#65676e]'}`}>
                Password <span className="text-[#d03c38]">*</span>
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if(passwordError) setPasswordError(''); }}
                  className={`w-full px-4 py-3.5 border rounded-[3px] text-[1rem] outline-none transition-all ${
                    passwordError ? 'border-[#d03c38] focus:ring-1 focus:ring-[#d03c38]' : 'border-[#c9cace] focus:border-[#635dff] focus:ring-1 focus:ring-[#635dff]'
                  }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#65676e] hover:text-[#1e212a]">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && (
                <div className="flex items-start gap-2 mt-2 text-[#d03c38] text-[12px] leading-[1.4]"><ErrorIcon /><span>{passwordError}</span></div>
              )}
            </div>

            <a href="#" className="text-[0.875rem] text-[#635dff] font-bold hover:underline w-fit mb-6">Forgot password?</a>

            <button type="submit" className="w-full bg-[#4285f4] text-white py-3.5 rounded-[3px] text-[1rem] font-semibold shadow-sm hover:bg-[#3367d6] transition-all mb-4">
              Continue
            </button>
          </form>

          <p className="text-center text-[0.875rem] text-[#1e212a] mt-2">
            Don't have an account? <a href="#" className="text-[#635dff] font-bold hover:underline">Sign up</a>
          </p>
        </div>
      </main>
    </div>
  );
}