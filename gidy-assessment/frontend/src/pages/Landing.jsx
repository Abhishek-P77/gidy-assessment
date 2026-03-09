import { useState, useEffect } from 'react'
import { Rocket, ArrowRight, Briefcase, Trophy, Folder, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Landing() {
  const gidyLogoUrl = "https://d2d0jobwzy0nc3.cloudfront.net/static/Gidy_logo_full_transparent"

  // Logic to show scroller only when user has started scrolling down
  const [showScroller, setShowScroller] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls down more than 50px, show the arrow
      if (window.scrollY > 50) {
        setShowScroller(true)
      } else {
        setShowScroller(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#f6f7f9] to-[#f0f2f8] text-[#343434] overflow-x-hidden w-full"
      style={{ fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');

        /* Sped up mascot float (2s) */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 2s ease-in-out infinite; 
        }
        
        /* Sped up arrow bounce (1.2s) */
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
        .animate-bounce-custom {
          animation: bounce 1.2s infinite; 
        }

        /* Sped up badge pulse (1.2s) */
        @keyframes pulse-dot {
          0% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.6); }
          70% { box-shadow: 0 0 0 6px rgba(66, 133, 244, 0); }
          100% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0); }
        }
        .animate-pulse-dot {
          animation: pulse-dot 1.2s ease-in-out infinite; 
        }

        .custom-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 48px;
        }
        @media (max-width: 768px) { .custom-features-grid { gap: 24px; } }
        @media (max-width: 480px) { .custom-features-grid { gap: 20px; grid-template-columns: 1fr; } }

        .purpose-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
        }
        @media (max-width: 768px) { .purpose-grid { gap: 24px; } }
        @media (max-width: 480px) { .purpose-grid { gap: 20px; grid-template-columns: 1fr; } }
      `}</style>

      {/* --- Top Navigation --- */}
      <nav className="sticky top-0 z-50 w-full bg-[#fffffff2] backdrop-blur-[10px] border-b border-[#0000000d] shadow-[0_2px_8px_#00000014] transition-all duration-300">
        <div className="flex justify-between items-center h-[72px] md:h-[98px] w-full max-w-[1643px] mx-auto px-[20px] sm:px-[24px] md:px-[60px] lg:px-[80px]">
          <div className="flex items-center">
             <img src={gidyLogoUrl} alt="Gidy Logo" className="h-[38px] min-[481px]:h-[45px] md:h-[55px] w-auto object-contain transition-all duration-300" />
          </div>
          <Link to="/login" className="group inline-flex items-center justify-center gap-[6px] md:gap-[8px] bg-gradient-to-br from-[#4285f4] to-[#1967d2] text-white px-[16px] py-[10px] min-[481px]:px-[20px] min-[481px]:py-[12px] rounded-[10px] text-[14px] min-[481px]:text-[16px] font-[600] shadow-[0_4px_12px_rgba(66,133,244,0.3)] hover:-translate-y-[2px] hover:shadow-[0_6px_16px_rgba(66,133,244,0.4)] transition-all duration-300 cursor-pointer">
            <span>Login</span>
            <svg className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
               <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57c-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83zm6.48-2.19c-2.29 2.04-5.58 3.44-5.89 3.57L13.31 22l4.05-4.05c.47-.47.68-1.15.55-1.81zM9 18c0 .83-.34 1.58-.88 2.12C6.94 21.3 2 22 2 22s.7-4.94 1.88-6.12C4.42 15.34 5.17 15 6 15c1.66 0 3 1.34 3 3m4-9c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2"></path>
            </svg>
          </Link>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <div className="w-full max-w-[1800px] mx-auto px-[20px] sm:px-[32px] md:px-[60px] lg:px-[75px] min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-98px)] pt-[60px] pb-[100px] lg:pt-[100px] lg:pb-[140px] flex flex-col lg:grid lg:grid-cols-2 gap-[40px] lg:gap-[60px] items-center relative z-10 bg-[#f8faff]">
        
        {/* Left Side Content - Further reduced mobile text sizes */}
        <div className="flex flex-col items-start text-left w-full m-0 p-0 mt-[20px] sm:mt-[40px] lg:mt-[60px]">
          <div className="group relative overflow-hidden inline-flex items-center gap-[8px] md:gap-[14px] px-[12px] py-[6px] md:px-[24px] md:py-[11px] bg-gradient-to-br from-[#fffffff2] to-[#f8faffe6] backdrop-blur-[8px] border-[1.5px] border-[#4285f44d] rounded-full text-[#1967d2] text-[11px] md:text-[14px] font-[600] shadow-[0_4px_16px_#4285f41f,inset_0_1px_0_#ffffff80] mb-[16px] md:mb-[31px] w-fit transition-all duration-300">
            <span className="w-[6px] h-[6px] md:w-[8px] md:h-[8px] flex-shrink-0 rounded-full bg-gradient-to-br from-[#4285f4] to-[#1967d2] animate-pulse-dot"></span>
            <span>Welcome To Gidy</span>
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-full transition-all duration-[600ms] ease-out pointer-events-none"></div>
          </div>
          
          {/* Title: Starts at 24px for very small screens, scaling up to 62px */}
          <h1 className="text-[24px] min-[400px]:text-[28px] sm:text-[34px] md:text-[48px] lg:text-[62px] font-[700] leading-[1.2] lg:leading-[1.1] tracking-tight w-full m-0 mb-[12px] md:mb-[44px] text-transparent bg-clip-text bg-gradient-to-br from-[#0f172a] to-[#1967d2]">
            Find Jobs. Compete in<br className="hidden lg:block" /> Hackathons.
          </h1>
          
          {/* Subtitle: Reduced to 13px on mobile */}
          <p className="text-[13px] sm:text-[15px] md:text-[18px] lg:text-[22px] text-[#475569] font-[500] leading-[1.6] mt-0 mb-[16px] md:mb-[28px] w-full max-w-[800px]">
            Discover jobs, compete in hackathons, and showcase real-world projects all in one unified platform.
          </p>

          <div className="flex flex-col gap-[10px] mb-[20px] md:mb-[40px] w-full max-w-[800px]">
            {/* Description: Reduced to 13px on mobile */}
            <p className="text-[13px] sm:text-[15px] md:text-[18px] text-[#64748b] leading-[1.8] m-0 p-0">
              Whether you're preparing for your next job, proving your skills through projects, or standing out in hackathons, Gidy helps you turn your work into real career opportunities.
            </p>
          </div>

          <Link to="/login" className="group inline-flex items-center justify-center gap-[6px] md:gap-[10px] bg-gradient-to-br from-[#4285f4] to-[#1967d2] text-white px-[18px] py-[8px] md:px-[32px] md:py-[14px] rounded-[10px] text-[12px] md:text-[16px] font-[600] shadow-[0_8px_20px_rgba(66,133,244,0.3)] transition-all duration-300 w-fit cursor-pointer">
            <span>Get Started</span>
            <svg className="w-[14px] h-[14px] md:w-[20px] md:h-[20px] fill-current transition-transform duration-300 group-hover:translate-x-1" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
               <path d="m15 5-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7z"></path>
            </svg>
          </Link>
        </div>

        {/* Mascot Container */}
        <div className="w-full flex items-center justify-center [perspective:1000px] mt-[20px] lg:mt-0">
          <img src="/cat-mascot.png" alt="Gidy Mascot" className="w-full max-w-[180px] sm:max-w-[260px] md:max-w-[320px] lg:max-w-50%] xl:max-w-[50%] h-auto animate-float drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] block" />
        </div>

        {/* Responsive Scroller */}
        <div 
          className={`absolute bottom-[15px] left-[50%] flex items-center justify-center p-[8px] text-[#4285f4] text-[18px] md:text-[24px] rounded-full cursor-pointer transition-all duration-700 animate-bounce-custom z-20 hover:bg-[#4285f41a] ${showScroller ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
          title="Scroll down"
          onClick={() => {
            const nextSection = document.getElementById('explore-section');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <svg className="w-[20px] h-[20px] md:w-[28px] md:h-[28px] fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDownwardIcon">
            <path d="m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8z"></path>
          </svg>
        </div>
      </div>

      {/* --- Explore What Gidy Offers --- */}
      <section id="explore-section" className="bg-white border-t border-[#0000000d] pt-[106px] pb-[100px] px-[20px] md:max-[768px]:pt-[70px] md:max-[768px]:pb-[60px] max-[480px]:pt-[50px] max-[480px]:pb-[40px] max-[480px]:px-[16px] w-full">
        <div className="max-w-[1560px] mx-auto">
          
          <h2 className="text-[#0f172a] font-[700] text-center text-[47px] mb-[60px] md:max-[768px]:text-[32px] md:max-[768px]:mb-[40px] max-[480px]:text-[24px] max-[480px]:mb-[30px]">
            Explore What Gidy Offers
          </h2>
          
          <div className="custom-features-grid">
            
            {/* Card 1: Job Portal */}
            <div className="group relative flex flex-col gap-[20px] bg-gradient-to-br from-white to-[#f8faff] border border-[#4285f41a] rounded-[16px] overflow-hidden p-[40px_32px] md:max-[768px]:p-[32px_28px] max-[480px]:p-[26px_20px] transition-all duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] hover:-translate-y-[5px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)]">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4285f4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center justify-center w-[64px] h-[64px] rounded-[14px] bg-[#4285f41f] text-[#1967d2] transition-transform duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:-rotate-12 group-hover:scale-110">
                <svg className="w-[34px] h-[34px] fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2M10 4h4v2h-4z"></path>
                </svg>
              </div>
              <h3 className="m-0 text-[22px] max-[480px]:text-[20px] font-[700] text-[#0f172a]">Job Portal</h3>
              <p className="m-0 flex-grow text-[15px] max-[480px]:text-[14px] text-[#64748b] leading-[1.8]">Discover and apply for exciting opportunities from top companies. Build your resume and connect with recruiters worldwide.</p>
            </div>

            {/* Card 2: Hackathons */}
            <div className="group relative flex flex-col gap-[20px] bg-gradient-to-br from-white to-[#f8faff] border border-[#4285f41a] rounded-[16px] overflow-hidden p-[40px_32px] md:max-[768px]:p-[32px_28px] max-[480px]:p-[26px_20px] transition-all duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] hover:-translate-y-[5px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)]">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4285f4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center justify-center w-[64px] h-[64px] rounded-[14px] bg-[#22c55e1f] text-[#16a34a] transition-transform duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:-rotate-12 group-hover:scale-110">
                <svg className="w-[34px] h-[34px] fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2M5 8V7h2v3.82C5.84 10.4 5 9.3 5 8m14 0c0 1.3-.84 2.4-2 2.82V7h2z"></path>
                </svg>
              </div>
              <h3 className="m-0 text-[22px] max-[480px]:text-[20px] font-[700] text-[#0f172a]">Hackathons</h3>
              <p className="m-0 flex-grow text-[15px] max-[480px]:text-[14px] text-[#64748b] leading-[1.8]">Compete in global hackathons, win prizes, and showcase your problem-solving skills. Connect with fellow developers.</p>
            </div>

            {/* Card 3: Projects */}
            <div className="group relative flex flex-col gap-[20px] bg-gradient-to-br from-white to-[#f8faff] border border-[#4285f41a] rounded-[16px] overflow-hidden p-[40px_32px] md:max-[768px]:p-[32px_28px] max-[480px]:p-[26px_20px] transition-all duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] hover:-translate-y-[5px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)]">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4285f4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center justify-center w-[64px] h-[64px] rounded-[14px] bg-[#a855f71f] text-[#a855f7] transition-transform duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:-rotate-12 group-hover:scale-110">
                <svg className="w-[34px] h-[34px] fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m0 12H4V8h16z"></path>
                </svg>
              </div>
              <h3 className="m-0 text-[22px] max-[480px]:text-[20px] font-[700] text-[#0f172a]">Projects</h3>
              <p className="m-0 flex-grow text-[15px] max-[480px]:text-[14px] text-[#64748b] leading-[1.8]">Showcase your work, collaborate with teammates, and build an impressive portfolio that impresses employers.</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- Why Choose Gidy? --- */}
      <section className="bg-[#f8fafc] border-t border-[#0000000d] py-[100px] px-[20px] w-full">
        <div className="max-w-[1560px] mx-auto">
          <h2 className="text-[#0f172a] font-[700] text-center text-[47px] mb-[60px]">Why Choose Gidy?</h2>
          <div className="purpose-grid">
            {[
              { num: "01", title: "Comprehensive Platform", desc: "All your career development needs in one place - jobs, competitions, and portfolio building." },
              { num: "02", title: "Community Driven", desc: "Connect, collaborate, and learn from thousands of developers and tech enthusiasts worldwide." },
              { num: "03", title: "Curated Jobs", desc: "Access handpicked job opportunities matched to your skills and experience. Connect with companies actively seeking talent like you." },
              { num: "04", title: "Career Opportunities", desc: "Direct access to job opportunities and visibility to top companies actively hiring talent." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col bg-white border border-[#4285f41a] rounded-[16px] gap-[16px] p-[40px] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-lg">
                <div className="text-[36px] font-[700] bg-clip-text text-transparent bg-gradient-to-br from-[#4285f4] to-[#1967d2]">{item.num}</div>
                <h4 className="text-[19px] font-[700] text-[#0f172a] m-0">{item.title}</h4>
                <p className="text-[15px] text-[#64748b] leading-[1.8] m-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="relative w-full overflow-hidden text-center text-white bg-gradient-to-br from-[#4285f4] to-[#1967d2] py-[80px] px-[20px]">
        <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,#ffffff1a_0,transparent_70%)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col mx-auto max-w-[800px] gap-[24px]">
          <h2 className="m-0 font-[700] text-[48px]">Ready to Level Up Your Career?</h2>
          <p className="m-0 text-[22px] opacity-[0.95]">Join thousands of developers already on Gidy</p>
          <Link to="/login" className="group inline-flex items-center w-fit mx-auto gap-[10px] bg-white text-[#1967d2] rounded-[10px] shadow-md text-[18px] font-[650] px-[36px] py-[16px] transition-all duration-300 hover:-translate-y-[4px] hover:shadow-xl">
            <span>Start Your Journey</span> 
            <svg className="w-[22px] h-[22px] fill-current group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24"><path d="m 15 5 l -1.41 1.41 L 18.17 11 H 2 v 2 h 16.17 l -4.59 4.59 L 15 19 l 7 -7 Z"></path></svg>
          </Link>
        </div>
      </section>

      {/* --- Footer Links --- */}
      <footer className="bg-white border-t border-[#e2e8f0] py-[40px] px-[20px] max-[480px]:py-[30px] max-[480px]:px-[16px] w-full">
        <div className="max-w-[1560px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[40px]">
            
          {/* Left Side: Company Name & Links */}
          <div className="flex flex-col items-start text-left gap-[12px] w-full">
            <h4 className="text-[16px] font-[600] text-[#0f172a] m-0">Gidy by CStream Solutions Private Ltd.india</h4>
            <div className="text-[14px] text-[#64748b] m-0">
              <a href="#" className="text-[#4285f4] hover:underline cursor-pointer">Terms of Use</a>
              <span className="px-[8px]">and</span>
              <a href="#" className="text-[#4285f4] hover:underline cursor-pointer">Privacy Policy</a>
            </div>
            <div className="text-[14px] text-[#64748b] m-0 mt-[12px]">
              Need Help?{' '}
              <a href="mailto:gidy@gidy.ai" className="text-[#4285f4] font-[600] hover:underline cursor-pointer">gidy@gidy.ai</a>
            </div>
          </div>

          {/* Right Side: Follow Us & Social Icons */}
          <div className="flex flex-col items-start text-left gap-[12px] w-full">
            <p className="text-[16px] font-[600] text-[#0f172a] m-0">Find Us</p>
            <div className="flex justify-start gap-[16px]">
              <a href="https://www.instagram.com/gidy.ai?igsh=MXVrYjM1YXB1czJzcw==" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-[8px] bg-[#4285f414] text-[#4285f4] transition-all duration-300 hover:bg-[#4285f4] hover:text-white hover:-translate-y-[3px]">
                <svg className="w-[26px] h-[26px] fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/gidy/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-[8px] bg-[#4285f414] text-[#4285f4] transition-all duration-300 hover:bg-[#4285f4] hover:text-white hover:-translate-y-[3px]">
                <svg className="w-[26px] h-[26px] fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                </svg>
              </a>
              <a href="https://youtube.com/@gidyai?si=Nfeb419gxhhPgTQi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-[8px] bg-[#4285f414] text-[#4285f4] transition-all duration-300 hover:bg-[#4285f4] hover:text-white hover:-translate-y-[3px]">
                <svg className="w-[26px] h-[26px] fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"></path>
                </svg>
              </a>
              <a href="mailto:gidy@gidy.ai?subject=Inquiry&body=Hello! I want help to get started in Gidy.!" rel="noopener noreferrer" className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-[8px] bg-[#4285f414] text-[#4285f4] transition-all duration-300 hover:bg-[#4285f4] hover:text-white hover:-translate-y-[3px]">
                <svg className="w-[26px] h-[26px] fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5-8-5zm0 12H4V8l8 5 8-5z"></path>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  )
}