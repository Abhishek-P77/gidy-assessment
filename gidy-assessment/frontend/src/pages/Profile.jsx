import { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail, Download, MoreVertical, Plus, Building2, GraduationCap, Lock, Sparkles, ChevronDown, ChevronRight, Menu, User, LogOut, MessageSquare, Share2, Settings, TrendingUp, PlusSquare, ChevronDown as DropdownIcon, Award, Edit2, Trash2, Check } from 'lucide-react'
import { useAuth0 } from '@auth0/auth0-react'

export default function Profile() {
  const { logout, user } = useAuth0()

  const [currentView, setCurrentView] = useState('profile') // 'profile' | 'settings'
  const [deletionReason, setDeletionReason] = useState('')

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(null)
  
  // --- Profile State ---
  const [profile, setProfile] = useState({
    name: "Abhishek P",
    location: "Kozhikode",
    bio: "Motivated Associate Software Engineer specializing in the MERN stack (MongoDB, Express.js, React.js, Node.js). I have hands-on experience building scalable web applications like SaaS platforms and E-commerce sites. I am eager to learn, ready to take ownership of projects, and passionate about writing clean, maintainable code in a fast-paced environment.",
    avatarUrl: "https://ui-avatars.com/api/?name=Abhishek+P&background=1e293b&color=fff&rounded=true",
    
    socials: { 
      github: "https://github.com/Abhishek-P77", 
      linkedin: "https://www.linkedin.com/in/abhishek-p7/", 
      email: "abhishek200228@gmail.com" 
    },
    
    skills: ["MongoDB", "Express.js", "React", "Node.js", "JavaScript", "HTML", "CSS", "Bootstrap", "Tailwind", "REST APIs", "Git", "Github", "Debugging", "PostgreSQL", "Python", "Django", "MySQL"],
    
    careerVision: {
      describesYou: "Working Professional",
      longTermGoal: "Senior Engineering Manager",
      aspirationalField: "AI / ML Engineering",
      inspiration: "Kevin Systrom",
      shortTermGoal: "Entry Level Professional"
    },

    experience: [
      { id: 1, title: "Python Full Stack Developer", company: "Zoople Technologies, Kochi", location: "Kochi", startDate: "Aug 2024", endDate: "Feb 2025", rawDojExp: "2024-08-01", rawDoeExp: "2025-02-01", present: false },
      { id: 2, title: "Data Science Intern", company: "DataSpark, Kozhikode", location: "Kozhikode", startDate: "May 2023", endDate: "Jun 2023", rawDojExp: "2023-05-01", rawDoeExp: "2023-06-01", present: false },
      { id: 3, title: "Software Development Workshop", company: "Bridgeon, Kozhikode", location: "Kozhikode", startDate: "Jul 2024", endDate: "Aug 2024", rawDojExp: "2024-07-01", rawDoeExp: "2024-08-01", present: false }
    ],
    education: [
      { id: 1, degree: "Btech", course: "CSE", college: "Vedavyassa Institute of Technology", location: "Malappuram", startDate: "Oct 2020", endDate: "Apr 2024", rawDojEdu: "2020-10-01", rawDoeEdu: "2024-04-01", present: false }
    ],
    certifications: [],
    resumeUrl: null, 
    resumeName: null
  })

  // --- Modal States ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [modalFormData, setModalFormData] = useState({ firstName: '', lastName: '', email: '', location: '', bio: '' })
  const [previewAvatar, setPreviewAvatar] = useState("")
  const [resumeFile, setResumeFile] = useState(null)
  const [previewResumeUrl, setPreviewResumeUrl] = useState(null) 

  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false)
  const [editSkills, setEditSkills] = useState([])
  const [skillInputValue, setSkillInputValue] = useState("")

  const [isExpModalOpen, setIsExpModalOpen] = useState(false)
  const [expFormData, setExpFormData] = useState({ id: null, role: '', company: '', locExp: '', dojExp: '', doeExp: '', present: false })

  const [isEduModalOpen, setIsEduModalOpen] = useState(false)
  const [eduFormData, setEduFormData] = useState({ id: null, college: '', degree: '', course: '', locEdu: '', dojEdu: '', doeEdu: '', present: false })

  const [isCertModalOpen, setIsCertModalOpen] = useState(false)
  const [certFormData, setCertFormData] = useState({ id: null, certification: '', provider: '', url: '', certID: '', issuedDate: '', expDate: '', description: '' })

  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false)
  const [careerFormData, setCareerFormData] = useState({ describesYou: '', longTermGoal: '', aspirationalField: '', inspiration: '', shortTermGoal: '' })

  const [isSocialsModalOpen, setIsSocialsModalOpen] = useState(false)
  const [socialFormData, setSocialFormData] = useState({ github: '', linkedin: '' })

  // --- INNOVATION STATES ---
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [expViewMode, setExpViewMode] = useState('list');

  // --- Nav Dropdown States ---
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false)
  const navDropdownRef = useRef(null)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef(null)

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef(null)

  const [activeItemMenu, setActiveItemMenu] = useState(null)
  const [showCopyToast, setShowCopyToast] = useState(false);

  const gidyLogoUrl = "https://d2d0jobwzy0nc3.cloudfront.net/static/Gidy_logo_full_transparent"

  const handleLogout = (e) => {
    e.preventDefault();
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        name: user.name || prev.name,
        avatarUrl: user.picture || prev.avatarUrl,
        socials: { ...prev.socials, email: user.email || prev.socials.email }
      }))
    }

    const handleClickOutside = (event) => {
      if (navDropdownRef.current && !navDropdownRef.current.contains(event.target)) setIsNavDropdownOpen(false)
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) setIsProfileMenuOpen(false)
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) setIsMobileMenuOpen(false)
      if (!event.target.closest('.item-menu-container')) setActiveItemMenu(null);
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [user])

  // Custom Toast trigger
  const showToast = (message) => {
    setToastConfig({ visible: true, message });
    setTimeout(() => setToastConfig({ visible: false, message: '' }), 3000);
  }

  // --- INLINE EDITING LOGIC ---
  const handleEditToggle = () => {
    if (!isEditing) setFormData({ ...profile, skills: profile.skills.join(', ') })
    setIsEditing(!isEditing)
    setIsProfileMenuOpen(false) 
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'github' || name === 'linkedin' || name === 'email') {
      setFormData({ ...formData, socials: { ...formData.socials, [name]: value } })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSave = () => {
    if (formData) {
      setProfile({
        ...profile,
        ...formData,
        socials: { ...profile.socials, email: formData.socials.email }
      });
    }
    setIsEditing(false);
  }

  const handleProfileUpdate = async (dataToSave) => {
    try {
      setProfile(prev => ({ ...prev, ...dataToSave }));
      setIsEditModalOpen(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setShowCopyToast(true);
        setIsProfileMenuOpen(false);
        setTimeout(() => setShowCopyToast(false), 3000);
      })
      .catch(err => console.error('Failed to copy link: ', err));
  }

  const handleDeleteItem = (section, id) => {
    setProfile(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
    setActiveItemMenu(null);
  }

  const handleDeleteRequest = () => {
    if (!deletionReason.trim()) {
      alert("Please provide a reason for deletion.");
      return;
    }
    showToast('Account Deletion Request Submitted');
    setDeletionReason('');
  }

  // --- SOCIALS MODAL LOGIC ---
  const openSocialsModal = () => {
    setSocialFormData({
      github: profile.socials.github || '',
      linkedin: profile.socials.linkedin || ''
    });
    setIsSocialsModalOpen(true);
    setIsProfileMenuOpen(false);
  }

  const closeSocialsModal = () => setIsSocialsModalOpen(false);

  const handleSocialsInputChange = (e) => {
    setSocialFormData({ ...socialFormData, [e.target.name]: e.target.value });
  }

  const clearSocialField = (field) => {
    setSocialFormData({ ...socialFormData, [field]: '' });
  }

  const submitSocialsModal = () => {
    setProfile(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        github: socialFormData.github,
        linkedin: socialFormData.linkedin
      }
    }));
    setIsSocialsModalOpen(false);
  }

  const getUrl = (prefix, value) => {
    if (!value) return '#';
    return value.startsWith('http') ? value : `${prefix}${value}`;
  }

  // --- CAREER VISION MODAL LOGIC ---
  const openCareerModal = () => {
    setCareerFormData({ ...profile.careerVision });
    setIsCareerModalOpen(true);
    setIsProfileMenuOpen(false);
  }

  const closeCareerModal = () => setIsCareerModalOpen(false);

  const handleCareerInputChange = (e) => {
    setCareerFormData({ ...careerFormData, [e.target.name]: e.target.value });
  }

  const submitCareerModal = () => {
    setProfile(prev => ({
      ...prev,
      careerVision: { ...careerFormData }
    }));
    setIsCareerModalOpen(false);
  }

  // --- PROFILE MODAL LOGIC ---
  const openEditModal = () => {
    const safeName = profile?.name || "";
    const nameParts = safeName.split(' ');
    setModalFormData({ 
      firstName: nameParts[0] || '', 
      lastName: nameParts.slice(1).join(' ') || '',
      email: profile?.socials?.email || '',
      location: profile?.location || 'Kozhikode',
      bio: profile?.bio || ''
    });
    setPreviewAvatar(profile?.avatarUrl);
    setResumeFile(profile?.resumeName ? { name: profile.resumeName } : null);
    setPreviewResumeUrl(profile?.resumeUrl);
    setIsEditModalOpen(true);
    setIsProfileMenuOpen(false); 
  }

  const closeEditModal = () => setIsEditModalOpen(false);

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bio' && value.length > 500) return; 
    setModalFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  }

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setPreviewResumeUrl(URL.createObjectURL(file)); 
    }
  }

  const submitEditModal = () => {
    const updatedName = `${modalFormData.firstName} ${modalFormData.lastName}`.trim();
    setProfile(prev => ({
      ...prev,
      name: updatedName,
      location: modalFormData.location,
      bio: modalFormData.bio,
      avatarUrl: previewAvatar || prev.avatarUrl,
      socials: { ...prev.socials, email: modalFormData.email },
      resumeUrl: previewResumeUrl || prev.resumeUrl,
      resumeName: resumeFile ? resumeFile.name : prev.resumeName
    }));
    setIsEditModalOpen(false);
  }

  const handleDownloadResume = () => {
    if (!profile.resumeUrl) {
      alert("No resume has been uploaded yet!");
      return;
    }
    const link = document.createElement('a');
    link.href = profile.resumeUrl;
    link.setAttribute('download', profile.resumeName || 'Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // --- INNOVATION 1: AI Bio Generator Function ---
  const generateAIBio = () => {
    setIsGeneratingBio(true);
    setTimeout(() => {
      const topSkills = profile.skills.slice(0, 4).join(', ');
      const generatedText = `Highly motivated ${profile.careerVision.shortTermGoal || 'Professional'} with a passion for ${profile.careerVision.aspirationalField || 'technology'}. Experienced in building scalable applications using ${topSkills}. Constantly inspired by ${profile.careerVision.inspiration || 'industry leaders'} to write clean, maintainable code and take ownership of complex projects. Actively working towards becoming a ${profile.careerVision.longTermGoal || 'leader in the field'}.`;
      setModalFormData(prev => ({ ...prev, bio: generatedText.slice(0, 500) }));
      setIsGeneratingBio(false);
    }, 1000); 
  };

  // --- SKILLS MODAL LOGIC ---
  const openSkillsModal = () => {
    setEditSkills([...profile.skills]);
    setSkillInputValue("");
    setIsSkillsModalOpen(true);
  }

  const closeSkillsModal = () => setIsSkillsModalOpen(false);

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = skillInputValue.trim();
      if (val && !editSkills.includes(val)) {
        setEditSkills([...editSkills, val]);
        setSkillInputValue("");
      }
    } else if (e.key === 'Backspace' && skillInputValue === '') {
      if (editSkills.length > 0) setEditSkills(editSkills.slice(0, -1));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditSkills(editSkills.filter(s => s !== skillToRemove));
  };

  const submitSkillsModal = () => {
    let finalSkills = [...editSkills];
    if (skillInputValue.trim() && !finalSkills.includes(skillInputValue.trim())) {
      finalSkills.push(skillInputValue.trim());
    }
    setProfile(prev => ({ ...prev, skills: finalSkills }));
    setIsSkillsModalOpen(false);
  };

  // --- EXPERIENCE MODAL LOGIC ---
  const openExpModal = () => {
    setExpFormData({ id: null, role: '', company: '', locExp: '', dojExp: '', doeExp: '', present: false });
    setIsExpModalOpen(true);
  }

  const openEditExp = (exp) => {
    setExpFormData({
      id: exp.id,
      role: exp.title,
      company: exp.company,
      locExp: exp.location || '',
      dojExp: exp.rawDojExp || '',
      doeExp: exp.rawDoeExp || '',
      present: exp.present || false
    });
    setIsExpModalOpen(true);
    setActiveItemMenu(null);
  }

  const closeExpModal = () => setIsExpModalOpen(false);

  const handleExpInputChange = (e) => {
    setExpFormData({ ...expFormData, [e.target.name]: e.target.value });
  }

  const handleExpCheckboxChange = (e) => {
    setExpFormData({ ...expFormData, present: e.target.checked });
  }

  const submitExpModal = () => {
    if (!expFormData.role || !expFormData.company) return;
    
    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    const newExperience = {
      id: expFormData.id || Date.now(),
      title: expFormData.role,
      company: expFormData.company,
      location: expFormData.locExp,
      startDate: formatDate(expFormData.dojExp),
      endDate: expFormData.present ? 'Present' : formatDate(expFormData.doeExp),
      rawDojExp: expFormData.dojExp,
      rawDoeExp: expFormData.doeExp,
      present: expFormData.present
    };

    setProfile(prev => ({
      ...prev,
      experience: expFormData.id 
        ? prev.experience.map(e => e.id === expFormData.id ? newExperience : e)
        : [newExperience, ...prev.experience]
    }));
    
    setIsExpModalOpen(false);
  }

  // --- EDUCATION MODAL LOGIC ---
  const openEduModal = () => {
    setEduFormData({ id: null, college: '', degree: '', course: '', locEdu: '', dojEdu: '', doeEdu: '', present: false });
    setIsEduModalOpen(true);
  }

  const openEditEdu = (edu) => {
    setEduFormData({
      id: edu.id,
      college: edu.college,
      degree: edu.degree,
      course: edu.course,
      locEdu: edu.location || '',
      dojEdu: edu.rawDojEdu || '',
      doeEdu: edu.rawDoeEdu || '',
      present: edu.present || false
    });
    setIsEduModalOpen(true);
    setActiveItemMenu(null);
  }

  const closeEduModal = () => setIsEduModalOpen(false);

  const handleEduInputChange = (e) => {
    setEduFormData({ ...eduFormData, [e.target.name]: e.target.value });
  }

  const handleEduCheckboxChange = (e) => {
    setEduFormData({ ...eduFormData, present: e.target.checked });
  }

  const submitEduModal = () => {
    if (!eduFormData.college || !eduFormData.degree || !eduFormData.course) return;

    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    const newEducation = {
      id: eduFormData.id || Date.now(),
      college: eduFormData.college,
      degree: eduFormData.degree,
      course: eduFormData.course,
      location: eduFormData.locEdu,
      startDate: formatDate(eduFormData.dojEdu),
      endDate: eduFormData.present ? 'Present' : formatDate(eduFormData.doeEdu),
      rawDojEdu: eduFormData.dojEdu,
      rawDoeEdu: eduFormData.doeEdu,
      present: eduFormData.present
    };

    setProfile(prev => ({
      ...prev,
      education: eduFormData.id 
        ? prev.education.map(e => e.id === eduFormData.id ? newEducation : e)
        : [newEducation, ...prev.education]
    }));
    
    setIsEduModalOpen(false);
  }

  // --- CERTIFICATION MODAL LOGIC ---
  const openCertModal = () => {
    setCertFormData({ id: null, certification: '', provider: '', url: '', certID: '', issuedDate: '', expDate: '', description: '' });
    setIsCertModalOpen(true);
  }

  const openEditCert = (cert) => {
    setCertFormData({
      id: cert.id,
      certification: cert.name,
      provider: cert.provider,
      url: cert.url || '',
      certID: cert.certID || '',
      issuedDate: cert.rawIssuedDate || '',
      expDate: cert.rawExpDate || '',
      description: cert.description || ''
    });
    setIsCertModalOpen(true);
    setActiveItemMenu(null);
  }

  const closeCertModal = () => setIsCertModalOpen(false);

  const handleCertInputChange = (e) => {
    if (e.target.name === 'description' && e.target.value.length > 200) return;
    setCertFormData({ ...certFormData, [e.target.name]: e.target.value });
  }

  const submitCertModal = () => {
    if (!certFormData.certification || !certFormData.provider) return;

    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    const newCert = {
      id: certFormData.id || Date.now(),
      name: certFormData.certification,
      provider: certFormData.provider,
      issuedDate: formatDate(certFormData.issuedDate),
      expDate: formatDate(certFormData.expDate),
      url: certFormData.url,
      certID: certFormData.certID,
      description: certFormData.description,
      rawIssuedDate: certFormData.issuedDate,
      rawExpDate: certFormData.expDate
    };

    setProfile(prev => ({
      ...prev,
      certifications: certFormData.id 
        ? prev.certifications.map(c => c.id === certFormData.id ? newCert : c)
        : [newCert, ...(prev.certifications || [])]
    }));
    
    setIsCertModalOpen(false);
  }

  if (isLoading || !profile) return <div className="auth-loading-root"><div className="auth-loading-content"><span className="auth-loading-text">Loading...</span></div></div>

  const bioCharsLeft = 500 - (modalFormData.bio?.length || 0);

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#f6f7f9', paddingBottom: '40px' }}>
      
      <style>{`
        body { font-family: "Open Sans", sans-serif; margin: 0; box-sizing: border-box; background-color: #f6f7f9; }
        p, h1, h2, h3, h4 { margin: 0; }
        a { text-decoration: none; color: inherit; }

        .MuiGrid-root { display: flex; box-sizing: border-box; }
        .css-rfnosa { flex-direction: row; }
        .css-tgu552 { margin: 0px; font-family: "Open Sans", sans-serif; font-weight: 400; font-size: 1rem; line-height: 1.5; }
        .css-vubbuv { user-select: none; width: 1em; height: 1em; display: inline-block; fill: currentcolor; flex-shrink: 0; font-size: 1.5rem; transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1); }
        .MuiButtonBase-root { cursor: pointer; border: none; background: transparent; outline: none; display: inline-flex; align-items: center; justify-content: center; }
        
        /* Navbar CSS UPDATE */
        .top-navbar-main-div { height: 60px; width: 100%; display: flex; flex-direction: column; position: sticky; top: 0; z-index: 50; }
        .top-navbar-root-div { width: 100%; background-color: #fff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 2px 8px #0000000d; display: flex; justify-content: center; }
        .top-navbar-parent-div { align-items: center; display: flex; height: 60px; justify-content: space-between; padding: 0 10px; width: 100%; max-width: 95%; box-sizing: border-box; }
        
        .top-navbar-mobile-menu-icon { display: none; }
        .top-navbar-hamburger { color: #6b7280; cursor: pointer; transition: transform .2s ease; display: flex; align-items: center; }
        
        .top-navbar-gidy-logo-div { display: flex; align-items: center; }
        .top-navbar-gidy-logo { height: 34px; width: 84px; display: block; }
        .top-navbar-gidy-logo img { height: 100%; width: 100%; object-fit: contain; }
        
        .top-navbar-feature-list { align-items: center; display: flex; gap: 32px; justify-content: center; flex: 1; }
        .top-navbar-tab-link { color: #111827; font-size: 0.875rem; font-weight: 500; position: relative; transition: color .2s ease; }
        .top-navbar-tab-link:after { background-color: #06f; border-radius: 3px; bottom: -5px; content: ""; height: 2px; left: 0; position: absolute; transform: scaleX(0); transform-origin: left; transition: transform .3s ease; width: 100%; }
        .top-navbar-tab-link:hover { color: #06f; }
        .top-navbar-tab-link:hover:after { transform: scaleX(1); }
        
        .top-navbar-profile-logout { align-items: center; display: flex; gap: 5px; position: relative; }
        .top-navbar-profile-div { height: 30px; width: 30px; cursor: pointer; }
        .top-navbar-profile-div img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; border: 1px solid #9ca3af; }
        .top-navbar-profile-menu { display: inline-block; position: relative; }
        .top-navbar-drop-btn { background-color: initial; border: none; color: #9ca3af; cursor: pointer; transition: transform .2s ease; display: flex; align-items: center; outline: none; padding: 0; }

        /* Profile Containers & Grids */
        .profile-container { margin: 0 auto; max-width: 95%; padding: 15px 10px; width: 100%; box-sizing: border-box; }
        .profile-head-grid { background-color: #fff; border-radius: 15px; box-shadow: 0 8px 24px #959da533; margin-bottom: 5px; padding: 25px 15px 15px 25px; }
        
        .profile-name-grid { display: flex; justify-content: space-between; width: 100%; }
        .profile-name-socials { align-items: center; display: flex; gap: 16px; justify-content: center; }
        .profile-pic { border-radius: 50%; height: 60px; object-fit: cover; width: 60px; }
        .user-name { color: #111827; font-size: 18px; font-weight: 600 !important; word-break: break-word; }
        .user-location { color: #6b7280; font-size: 14px !important; font-weight: 500; margin-top: 2px; }
        
        .social-and-menu { display: flex; align-items: center; gap: 16px; }
        .socials-grid { display: flex; gap: 4px; }
        
        .profile-bio-grid { margin-top: 10px; width: 90%; }
        .user-bio { color: #111827; font-size: 14px !important; font-weight: 400; line-height: 1.6; }
        
        .profile-head-grid-4 { display: flex; justify-content: space-between; width: 100%; margin-top: 10px; }
        .profile-resume-grid { display: flex; flex-direction: column; width: auto; }
        .profile-email-grid { align-items: center; display: flex; margin: 5px 0; }
        .mail-icon { color: #06f; font-size: 20px; margin-right: 5px; }
        .user-email { color: #06f; font-size: 14px !important; font-weight: 400; word-break: break-word; }
        
        .rewards-section { display: flex; flex-direction: column !important; gap: 8px; }
        .profile-rewards { background-color: #f1f5f94d; border: .2px solid #e5e7eb; border-radius: 5px; display: flex; flex-direction: row; gap: 16px; justify-content: space-around; margin: 5px 0; padding: 5px 16px; align-items: center; }
        .rewards-grid { align-items: center; display: flex; flex-direction: column; gap: 4px; }
        .profile-rewards .reward-title { color: #6b7280; font-size: 12px; font-weight: 500; }
        .reward-detail { color: #111827; font-size: 14px; font-weight: 600; }
        .league-image { border-radius: 50%; height: 35px; object-fit: cover; width: 35px; }
        .view-rewards { align-items: center; display: flex; font-size: 14px; font-weight: 400; justify-content: flex-end; width: 100%; transition: opacity 0.3s ease; }
        .view-rewards:hover { opacity: 0.8; }
        .view-reward-text { color: #fdb100; font-size: 14px; font-weight: 500; margin-right: 4px; }
        .reward-arrow-icon { color: #fdb100; font-size: 22px; display: inline-block; fill: currentcolor; flex-shrink: 0; }

        /* Main Body Grids */
        .layout-container { display: flex; margin-bottom: 20px; margin-top: 5px; transition: all .3s ease-in-out; }
        .left { width: 35%; transition: width .3s ease-in-out; }
        .right { width: 65%; transition: width .3s ease-in-out; }
        
        .badges-grid, .certification-grid, .education-grid, .experience-grid, .progress-grid, .skills-grid { background-color: #fff; border-radius: 15px; box-shadow: 0 8px 24px #959da533; margin: 5px; padding: 15px; }
        
        .badges-headline-grid, .certification-headline-grid, .education-headline-grid, .experience-headline-grid, .progress-headline-grid { align-items: center; display: flex; justify-content: space-between; margin-bottom: 15px; }
        .sub-headings { color: #343434; font-size: 14px !important; font-weight: 600 !important; text-transform: capitalize !important; }
        .add-icon, .more-option-icon { color: grey; font-size: 24px; cursor: pointer; }
        
        .certification-details-grid, .education-details-grid, .experience-details-grid { display: flex; margin-top: 10px; width: 100%; }
        .certification-icon-grid, .experience-icon-grid { background-color: #4285f40d; border: 1px solid #4285f44d; border-radius: 5px; align-items: center; display: flex; height: 67px; justify-content: center; margin-right: 10px; width: 67px; flex-shrink: 0; }
        .education-icon-grid { background-color: #8080800d; border: 1px solid #8080804d; border-radius: 5px; align-items: center; display: flex; height: 67px; justify-content: center; margin-right: 10px; width: 67px; flex-shrink: 0; }
        
        .details-icon-blue { color: #4285ffcc; font-size: 25px; }
        .details-icon-gray { color: grey; font-size: 25px; }
        
        .details-grid { display: flex; justify-content: space-between; width: 100%; }
        .details-name { color: #343434; font-size: 14px !important; font-weight: 600 !important; text-transform: capitalize !important; }
        .details-name-location { color: #343434; font-size: 14px !important; font-weight: 500 !important; margin-top: 2px; }
        .details-date { color: #343434; font-size: 12px !important; font-weight: 400 !important; margin-top: 2px; }
        
        .no-details-grid { display: flex; justify-content: center; }
        .add-details-text { color: #343434; font-size: 12px !important; font-weight: 500 !important; display: flex; align-items: center; cursor: pointer; transition: color 0.3s; }
        .add-details-text:hover { color: #06f; }
        
        .skills-details-grid { display: flex; flex-wrap: wrap; }
        .skills-chip { align-items: center; background-color: #4285f40d; border: 1px solid #4285f44d; border-radius: 15px; color: #343434; display: flex; font-size: 12px; height: 25px; justify-content: center; margin-right: 5px; margin-top: 5px; padding: 0 10px; }
        
        .progress-details-grid { width: 100%; }
        .profile-completed-text { color: #343434; font-size: 12px !important; font-weight: 450 !important; }
        .progress-details { width: 100%; margin-top: 10px; }
        .profile-progress-bar { align-items: center; background-color: #80808080; border-radius: 10px; display: flex; height: 10px; margin-top: 6px; width: 100%; }
        .progress-level { background-color: #02b74b; border-radius: 10px; height: 10px; }
        
        .incomplete-task-container { margin-top: 10px; width: 100%; }
        .incomplete-task-grid { align-items: center; background-color: #f6f7f9; border: 1px solid #80808080; border-radius: 10px; display: flex; justify-content: space-between; margin-bottom: 5px; padding: 5px; width: 100%; }
        .incomplete-task-text-grid { padding: 10px; }
        .incomplete-task-headings { color: #343434; font-size: 12px !important; font-weight: 600 !important; }
        .incomplete-task-sub-text { color: #343434; font-size: 12px !important; font-weight: 400 !important; margin-top: 2px; }
        .percentage-text-green { color: #02b74b; font-size: 12px !important; font-weight: 550 !important; margin-left: 10px; }
        .complete-task-icon { color: #4285ffcc; font-size: 25px; cursor: pointer; }

        .MuiMenu-paper { border: 1px solid #e5e7eb; border-radius: 6px; box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12); padding: 8px 0; }
        .MuiMenuItem-root { padding: 8px 16px; font-size: 14px; color: #343434; display: flex; align-items: center; cursor: pointer; transition: background 0.2s; background: transparent; border: none; width: 100%; text-align: left; }
        .MuiMenuItem-root:hover { background-color: rgba(0,0,0,0.04); }
        .menu-icons { width: 18px; height: 18px; color: #6b7280; margin-right: 12px; }

        /* BUTTON CLASSES */
        .btn { align-items: center; border: none; border-radius: 8px; cursor: pointer; display: inline-flex; font-family: "Open Sans", sans-serif; font-size: 14px; font-weight: 600; justify-content: center; outline: none; transition: all 0.2s ease; letter-spacing: 0.3px; }
        .btn--sm { padding: 8px 20px; font-size: 14px; }
        .btn--md { padding: 10px 24px; }
        .btn--primary { background-color: #1e88ff; color: #fff; }
        .btn--primary:hover { background-color: #006fe6; box-shadow: 0 4px 12px rgba(30, 136, 255, 0.3); transform: translateY(-1px); }
        .btn--primary:active { transform: translateY(0); }
        .btn--outline { background-color: #fff; border: 1px solid #d1d5db !important; color: #374151; }
        .btn--outline:hover { background-color: #f3f4f6; }

        .btn--icon-only { background: transparent; border: none; cursor: pointer; padding: 5px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .btn--icon-only:hover { background-color: rgba(0,0,0,0.05); }

        .resume-btn { align-items: center; background-color: #cce0ff; border: 1px solid #4285f44d; border-radius: 5px; cursor: pointer; display: flex; justify-content: center; padding: 5px 15px; transition: .3s; outline: none; margin-top: 5px; font-family: "Open Sans", sans-serif; }
        .resume-btn:hover { background-color: #4285f433; }

        /* MODERN FORM FIELD CSS */
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; width: 100%; }
        .form-label { color: #6b7280; font-size: 13px; font-weight: 600; letter-spacing: .3px; }
        
        .form-input .MuiOutlinedInput-root { background: #fafbfc; border: 1.5px solid #e5e7eb; border-radius: 10px; transition: all .2s ease; display: flex; align-items: center; width: 100%; box-sizing: border-box; overflow: hidden; }
        .form-input .MuiOutlinedInput-root:hover { border-color: #d1d5db; }
        .form-input .MuiOutlinedInput-root:focus-within { border-color: #3b82f6; box-shadow: 0 0 0 3px #3b82f61a; background: #fff; }
        .form-input .MuiOutlinedInput-root.disabled { background-color: #f5f5f5; opacity: 0.7; pointer-events: none; }
        
        .form-input .MuiOutlinedInput-input { color: #0f172a; font-size: 14px; font-weight: 500; padding: 10px 14px; border: none; outline: none; background: transparent; width: 100%; box-sizing: border-box; font-family: "Open Sans", sans-serif; }
        .form-input .MuiOutlinedInput-input::placeholder { color: #9ca3af; font-weight: 400; opacity: 1; }

        /* Custom Checkbox */
        .custom-checkbox-container { display: flex; flex-direction: row; align-items: center; gap: 8px; cursor: pointer; user-select: none; width: 100%; padding-top: 4px; padding-bottom: 8px; }
        .custom-checkbox-container input { display: none; }
        .custom-checkbox { width: 18px; height: 18px; border: 2px solid #9ca3af; border-radius: 4px; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; background: #fff; }
        .custom-checkbox-container input:checked + .custom-checkbox { background: #1976d2; border-color: #1976d2; }
        .custom-checkbox svg { fill: #fff; width: 14px; height: 14px; opacity: 0; transform: scale(0.5); transition: all 0.2s ease; }
        .custom-checkbox-container input:checked + .custom-checkbox svg { opacity: 1; transform: scale(1); }
        .custom-checkbox-label { color: #6b7280; font-size: 13px; font-weight: 500; font-family: "Open Sans", sans-serif; }

        /* SKILLS MODAL CHIP CSS */
        .MuiAutocomplete-root { width: 100%; display: flex; flex-direction: column; position: relative; margin-top: 16px; }
        .MuiInput-root { position: relative; width: 100%; display: flex; flex-wrap: wrap; align-items: center; padding-bottom: 4px; border-bottom: 1px solid rgba(0, 0, 0, 0.42); transition: border-bottom-color 200ms; }
        .MuiInput-root:focus-within { border-bottom: 2px solid #1976d2; padding-bottom: 3px; }
        
        .css-1jufn2x { max-width: 95%; font-family: "Open Sans", sans-serif; font-size: 0.8125rem; display: inline-flex; align-items: center; justify-content: center; height: 32px; color: rgba(0, 0, 0, 0.87); background-color: rgba(0, 0, 0, 0.08); border-radius: 16px; white-space: nowrap; cursor: default; outline: 0; border: 0; padding: 0; vertical-align: middle; box-sizing: border-box; margin: 3px; }
        .MuiChip-label { overflow: hidden; text-overflow: ellipsis; padding-left: 12px; padding-right: 12px; white-space: nowrap; }
        .css-1jufn2x .MuiChip-deleteIcon { -webkit-tap-highlight-color: transparent; color: rgba(0, 0, 0, 0.26); font-size: 22px; cursor: pointer; margin: 0px 5px 0px -6px; transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; }
        .css-1jufn2x .MuiChip-deleteIcon:hover { color: rgba(0, 0, 0, 0.4); }
        
        .MuiAutocomplete-input { font: inherit; letter-spacing: inherit; color: currentColor; padding: 4px 0 5px; border: 0; box-sizing: content-box; background: none; height: 1.1876em; margin: 0; display: block; min-width: 30px; flex-grow: 1; text-overflow: ellipsis; opacity: 1; outline: 0; margin-left: 4px; }

        @media (max-width: 900px) {
          .top-navbar-feature-list { display: none; }
          .top-navbar-mobile-menu-icon { display: flex; }
        }
        @media (max-width: 768px) {
          .top-navbar-parent-div { gap: 0.5em; height: 60px; justify-content: space-between; }
          .layout-container { display: block; }
          .left, .right { width: 100%; }
        }
      `}</style>

      {/* --- Navigation --- */}
      <div className="top-navbar-main-div">
        <div className="top-navbar-root-div">
          <div className="top-navbar-parent-div">
            
            {/* LEFT GROUP: Hamburger (Mobile) + Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="top-navbar-mobile-menu-icon" ref={mobileMenuRef} style={{ position: 'relative' }}>
                <Menu className="top-navbar-hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

                {/* Mobile Navigation Dropdown */}
                <div className={`MuiMenu-paper absolute left-0 top-[130%] w-[180px] bg-white z-50 origin-top-left transition-all duration-200 ease-out ${isMobileMenuOpen ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible pointer-events-none'}`}>
                  <a className="MuiMenuItem-root" href="#">Jobs</a>
                  <a className="MuiMenuItem-root" href="#">Hackathons</a>
                  <a className="MuiMenuItem-root" href="#">Projects</a>
                  <a className="MuiMenuItem-root" href="#">Tasks</a>
                  <a className="MuiMenuItem-root" href="#">Organization</a>
                </div>

              </div>

              <div className="top-navbar-gidy-logo-div">
                <a href="/">
                  <img src={gidyLogoUrl} alt="Gidy Logo" className="top-navbar-gidy-logo" />
                </a>
              </div>
            </div>

            {/* CENTER GROUP: Desktop Links */}
            <div className="top-navbar-feature-list">
              <a className="top-navbar-tab-link" href="#">Jobs</a>
              <a className="top-navbar-tab-link" href="#">Hackathons</a>
              <a className="top-navbar-tab-link" href="#">Projects</a>
              <a className="top-navbar-tab-link" href="#">Tasks</a>
              <a className="top-navbar-tab-link" href="#">Organization</a>
            </div>

            {/* RIGHT GROUP: Profile & Dropdown */}
            <div className="top-navbar-profile-logout" ref={navDropdownRef}>
              <div className="top-navbar-profile-div" onClick={() => setIsNavDropdownOpen(!isNavDropdownOpen)}>
                {profile.avatarUrl.includes("ui-avatars") ? (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#0066ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: '600', border: '1px solid var(--text-color-subtle)' }}>
                    {profile.name.substring(0, 2).toUpperCase()}
                  </div>
                ) : (
                  <img src={profile.avatarUrl} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                )}
              </div>
              
              <div className="top-navbar-profile-menu">
                <button className="top-navbar-drop-btn" onClick={() => setIsNavDropdownOpen(!isNavDropdownOpen)}>
                   <DropdownIcon style={{width: '20px', height: '20px'}} />
                </button>

                <div className={`MuiMenu-paper absolute right-0 top-[130%] w-[140px] bg-white z-50 origin-top-right transition-all duration-200 ease-out ${isNavDropdownOpen ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible pointer-events-none'}`}>
                  <button className="MuiMenuItem-root" onClick={() => { setCurrentView('profile'); setIsNavDropdownOpen(false); }}>
                    <span style={{flexGrow: 1}}>Profile</span><User style={{width: '16px', height: '16px', color: '#06f'}} strokeWidth={2} />
                  </button>
                  <button className="MuiMenuItem-root">
                    <span style={{flexGrow: 1}}>Feedback</span><MessageSquare style={{width: '16px', height: '16px', color: '#a06bf5'}} strokeWidth={2} />
                  </button>
                  <button className="MuiMenuItem-root" onClick={() => { setCurrentView('settings'); setIsNavDropdownOpen(false); }}>
                    <span style={{flexGrow: 1}}>Settings</span><Settings style={{width: '16px', height: '16px', color: '#6b7280'}} strokeWidth={2} />
                  </button>
                  <button className="MuiMenuItem-root" onClick={handleLogout} style={{color: '#ef4444'}}>
                    <span style={{flexGrow: 1}}>Logout</span><LogOut style={{width: '16px', height: '16px'}} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- Dynamic Content Swap (Profile vs Settings) --- */}
      {currentView === 'profile' ? (
        <div className="profile-container">
          <div className="profile-head-grid">
            <div className="profile-name-grid">
              
              <div className="profile-name-socials">
                <label htmlFor="profilePreview" style={{cursor: 'pointer'}}>
                  {profile.avatarUrl.includes("ui-avatars") ? (
                    <div className="profile-pic" style={{ backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                      {profile.name.substring(0, 2).toUpperCase()}
                    </div>
                  ) : (
                    <img src={profile.avatarUrl} alt="profile" className="profile-pic" />
                  )}
                </label>
                
                <div>
                  {isEditing ? (
                    <input type="text" name="name" value={formData.name} onChange={handleChange} style={{border: '1px solid #e5e7eb', borderRadius: '5px', padding: '4px 8px', fontSize: '16px', fontWeight: 'bold', marginBottom: '4px', width: '100%', maxWidth: '250px', outline: 'none'}} />
                  ) : (
                    <p className="user-name">
                      {profile.name} <span style={{ fontSize: '12px', marginLeft: '10px', fontWeight: 'normal', color: '#6b7280' }}>( {profile.careerVision.describesYou} )</span>
                    </p>
                  )}
                  <p className="user-location">{profile.location || 'Kozhikode'}</p>
                </div>
              </div>
              
              <div className="social-and-menu">
                <div className="socials-grid">
                  <a href={getUrl('https://github.com/', profile.socials.github)} target="_blank" rel="noreferrer">
                    <button type="button" className="btn--icon-only">
                      <Github style={{ fontSize: '20px', color: 'rgb(128, 128, 128)' }} />
                    </button>
                  </a>
                  <a href={getUrl('https://linkedin.com/in/', profile.socials.linkedin)} target="_blank" rel="noreferrer">
                    <button type="button" className="btn--icon-only">
                      <Linkedin style={{ fontSize: '20px', color: 'rgb(128, 128, 128)' }} />
                    </button>
                  </a>
                </div>
                
                <div style={{ position: 'relative' }} ref={profileMenuRef}>
                  {isEditing ? (
                    <div style={{display: 'flex', gap: '8px'}}>
                      <button onClick={handleEditToggle} className="btn btn--outline btn--sm">Cancel</button>
                      <button onClick={handleSave} className="btn btn--primary btn--sm">Save</button>
                    </div>
                  ) : (
                    <button type="button" className="btn--icon-only" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                      <MoreVertical className="more-option-icon" />
                    </button>
                  )}

                  <div className={`MuiMenu-paper absolute right-0 mt-[4px] w-[180px] bg-white z-50 origin-top-right transition-all duration-[190ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${isProfileMenuOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-90 invisible pointer-events-none'}`}>
                    <button className="MuiMenuItem-root" onClick={openEditModal}>
                      <User className="menu-icons" /> Edit Profile
                    </button>
                    <button className="MuiMenuItem-root" onClick={handleShareProfile}>
                      <Share2 className="menu-icons" /> Share Profile
                    </button>
                    <button className="MuiMenuItem-root" onClick={openSocialsModal}>
                      <PlusSquare className="menu-icons" /> Add Socials
                    </button>
                    <button className="MuiMenuItem-root" onClick={openSocialsModal}>
                      <MessageSquare className="menu-icons" /> Edit Socials
                    </button>
                    <button className="MuiMenuItem-root" onClick={openCareerModal}>
                      <TrendingUp className="menu-icons" /> Career Vision
                    </button>
                    <button className="MuiMenuItem-root" onClick={() => { setCurrentView('settings'); setIsProfileMenuOpen(false); }}>
                      <Settings className="menu-icons" /> Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-bio-grid">
              {isEditing ? (
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" style={{width: '100%', border: '1px solid #e5e7eb', borderRadius: '5px', padding: '8px', fontSize: '14px', outline: 'none'}} />
              ) : (
                <p className="user-bio">{profile.bio}</p>
              )}
            </div>

            <div className="profile-head-grid-4">
              <div className="profile-resume-grid">
                {isEditing ? (
                   <input type="text" name="email" value={formData.socials.email} onChange={handleChange} style={{border: '1px solid #e5e7eb', borderRadius: '5px', padding: '4px 8px', fontSize: '14px', marginBottom: '8px', width: '100%', maxWidth: '250px', outline: 'none'}} />
                ) : (
                  <div className="profile-email-grid">
                    <Mail className="mail-icon" />
                    <p className="user-email">{profile.socials.email}</p>
                  </div>
                )}
                <button className="resume-btn" type="button" onClick={handleDownloadResume}>
                  <Download style={{width: '18px', height: '18px', color: '#06f'}} />
                  <p className="resume-name">Download Resume</p>
                </button>
              </div>
              
              {!isEditing && (
                <div className="rewards-section">
                  <div className="profile-rewards">
                    <img className="league-image" alt="league" src="https://gidy-content-p.s3.us-west-2.amazonaws.com/badges/Bronze-01.png" />
                    <div className="rewards-grid">
                      <p className="reward-title">League</p>
                      <p className="reward-detail">Bronze</p>
                    </div>
                    <div className="rewards-grid">
                      <p className="reward-title">Rank</p>
                      <p className="reward-detail">#</p>
                    </div>
                    <div className="rewards-grid">
                      <p className="reward-title">Points</p>
                      <p className="reward-detail">0</p>
                    </div>
                  </div>
                  
                  <a className="view-rewards" href="#" style={{ textDecoration: 'none' }}>
                    <p className="view-reward-text">View My Rewards</p>
                    <ChevronRight className="reward-arrow-icon" />
                  </a>
                </div>
              )}
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 8px 24px #959da533', padding: '15px', border: '1px solid #e5e7eb', position: 'relative', overflow: 'hidden', marginTop: '15px', margin: '5px' }}>
            <div style={{ position: 'absolute', top: '15px', right: '15px', width: '36px', height: '36px', backgroundColor: '#fefce8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles style={{ width: '18px', height: '18px', color: '#fdb100', fill: '#fdb100' }} />
            </div>
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>You're Career Vision</p>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', letterSpacing: '-0.02em', marginBottom: '24px' }}>{profile.careerVision.longTermGoal}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '15px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>What you're growing into right now</p>
                <p style={{ fontWeight: '500', color: '#111827', fontSize: '14px' }}>{profile.careerVision.shortTermGoal}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>The space you want to grow in</p>
                <p style={{ fontWeight: '500', color: '#111827', fontSize: '14px' }}>{profile.careerVision.aspirationalField}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Inspired by</p>
                <p style={{ fontWeight: '500', color: '#111827', fontSize: '14px' }}>{profile.careerVision.inspiration}</p>
              </div>
            </div>
          </div>

          <div className="layout-container">
            
            <div className="left">
              <div className="progress-grid">
                <div className="progress-headline-grid">
                   <h3 className="sub-headings">🎓 Level Up Profile</h3>
                </div>
                <div className="progress-details-grid">
                  <p className="profile-completed-text">Just a few clicks away from awesomeness, complete your profile!</p>
                  <div className="progress-details">
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4b5563', marginBottom: '6px', fontWeight: '500'}}>
                      <span>Progress: 80%</span>
                    </div>
                    <div className="profile-progress-bar">
                      <div className="progress-level" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="incomplete-task-container">
                  <div className="incomplete-task-grid">
                    <div className="incomplete-task-text-grid">
                      <p className="incomplete-task-headings">Upload Certificates 📜 <span className="percentage-text-green">(+20%)</span></p>
                      <p className="incomplete-task-sub-text">Boost your profile with relevant certifications and training.</p>
                    </div>
                    <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}}>
                      <Plus className="complete-task-icon" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="skills-grid">
                <div className="badges-headline-grid">
                  <h3 className="sub-headings">Skills</h3>
                  <Plus className="add-icon" onClick={openSkillsModal} />
                </div>
                <div className="skills-details-grid">
                  {profile.skills.map((skill, i) => (
                    <span key={i} className="skills-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="right">
              
              <div className="experience-grid">
                <div className="experience-headline-grid">
                  <h3 className="sub-headings">Experience</h3>
                  
                  {/* INNOVATION 2: Interactive Timeline View Toggle */}
                  <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                    <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '6px', padding: '2px' }}>
                      <button 
                        type="button" 
                        onClick={() => setExpViewMode('list')} 
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', background: expViewMode === 'list' ? '#fff' : 'transparent', color: expViewMode === 'list' ? '#06f' : '#6b7280', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: expViewMode === 'list' ? '600' : '500', boxShadow: expViewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s ease' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> List
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setExpViewMode('timeline')} 
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', background: expViewMode === 'timeline' ? '#fff' : 'transparent', color: expViewMode === 'timeline' ? '#06f' : '#6b7280', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: expViewMode === 'timeline' ? '600' : '500', boxShadow: expViewMode === 'timeline' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s ease' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Timeline
                      </button>
                    </div>
                    <Plus className="add-icon" onClick={openExpModal} />
                  </div>
                </div>
                
                {expViewMode === 'list' ? (
                  <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    {profile.experience.map((exp) => (
                      <div className="experience-details-grid" key={exp.id}>
                        <div className="experience-icon-grid">
                          <Building2 className="details-icon-blue" />
                        </div>
                        <div className="details-grid">
                          <div>
                            <h4 className="details-name">{exp.title}</h4>
                            <p className="details-name-location">{exp.company}</p>
                            <p className="details-date">Started: {exp.startDate} - Ended: {exp.endDate}</p>
                          </div>
                          
                          <div className="item-menu-container" style={{ position: 'relative' }}>
                            <MoreVertical 
                              className="more-option-icon" 
                              style={{ cursor: 'pointer' }}
                              onClick={() => setActiveItemMenu(activeItemMenu === `exp-${exp.id}` ? null : `exp-${exp.id}`)} 
                            />
                            {activeItemMenu === `exp-${exp.id}` && (
                              <div className="MuiMenu-paper" style={{ position: 'absolute', top: '100%', right: '0', width: '120px', backgroundColor: '#fff', zIndex: 50 }}>
                                <button className="MuiMenuItem-root" onClick={() => openEditExp(exp)}>
                                  <Edit2 className="menu-icons" style={{ width: '14px', height: '14px' }} /> Edit
                                </button>
                                <button className="MuiMenuItem-root" onClick={() => handleDeleteItem('experience', exp.id)} style={{ color: '#ef4444' }}>
                                  <Trash2 className="menu-icons" style={{ width: '14px', height: '14px', color: '#ef4444' }} /> Delete
                                </button>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', paddingLeft: '16px', borderLeft: '2px solid #e5e7eb', marginLeft: '12px', marginTop: '16px', marginBottom: '16px' }}>
                    {profile.experience.map((exp) => (
                      <div key={exp.id} style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '-22px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#06f', border: '2px solid #fff', boxShadow: '0 0 0 2px #06f' }}></div>
                        <div style={{ paddingLeft: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <h4 style={{ color: '#111827', fontSize: '15px', fontWeight: '600', margin: 0 }}>{exp.title}</h4>
                              <p style={{ color: '#06f', fontSize: '13px', marginTop: '2px', fontWeight: '500', margin: '2px 0 0 0' }}>{exp.company}</p>
                              <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px', backgroundColor: '#f1f5f9', display: 'inline-block', padding: '2px 8px', borderRadius: '12px', margin: '4px 0 0 0' }}>{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <div className="item-menu-container" style={{ position: 'relative' }}>
                               <MoreVertical className="more-option-icon" style={{ cursor: 'pointer', width: '18px' }} onClick={() => setActiveItemMenu(activeItemMenu === `exp-${exp.id}` ? null : `exp-${exp.id}`)} />
                               {activeItemMenu === `exp-${exp.id}` && (
                                 <div className="MuiMenu-paper" style={{ position: 'absolute', top: '100%', right: '0', width: '120px', backgroundColor: '#fff', zIndex: 50 }}>
                                   <button className="MuiMenuItem-root" onClick={() => openEditExp(exp)}>
                                     <Edit2 className="menu-icons" style={{ width: '14px', height: '14px' }} /> Edit
                                   </button>
                                   <button className="MuiMenuItem-root" onClick={() => handleDeleteItem('experience', exp.id)} style={{ color: '#ef4444' }}>
                                     <Trash2 className="menu-icons" style={{ width: '14px', height: '14px', color: '#ef4444' }} /> Delete
                                   </button>
                                 </div>
                               )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="education-grid">
                <div className="education-headline-grid">
                  <h3 className="sub-headings">Education</h3>
                  <Plus className="add-icon" onClick={openEduModal} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                  {profile.education.map((edu) => (
                    <div className="education-details-grid" key={edu.id}>
                      <div className="education-icon-grid">
                        <GraduationCap className="details-icon-gray" />
                      </div>
                      <div className="details-grid">
                        <div>
                          <h4 className="details-name">{edu.degree} - {edu.course}</h4>
                          <p className="details-name-location">{edu.college}{edu.location ? `, ${edu.location}` : ''}</p>
                          <p className="details-date">{edu.startDate} — {edu.endDate}</p>
                        </div>
                        
                        <div className="item-menu-container" style={{ position: 'relative' }}>
                          <MoreVertical 
                            className="more-option-icon" 
                            style={{ cursor: 'pointer' }}
                            onClick={() => setActiveItemMenu(activeItemMenu === `edu-${edu.id}` ? null : `edu-${edu.id}`)} 
                          />
                          {activeItemMenu === `edu-${edu.id}` && (
                            <div className="MuiMenu-paper" style={{ position: 'absolute', top: '100%', right: '0', width: '120px', backgroundColor: '#fff', zIndex: 50 }}>
                              <button className="MuiMenuItem-root" onClick={() => openEditEdu(edu)}>
                                <Edit2 className="menu-icons" style={{ width: '14px', height: '14px' }} /> Edit
                              </button>
                              <button className="MuiMenuItem-root" onClick={() => handleDeleteItem('education', edu.id)} style={{ color: '#ef4444' }}>
                                <Trash2 className="menu-icons" style={{ width: '14px', height: '14px', color: '#ef4444' }} /> Delete
                              </button>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="certification-grid">
                 <div className="certification-headline-grid">
                  <h3 className="sub-headings">Certification</h3>
                  <Plus className="add-icon" onClick={openCertModal} style={{ cursor: 'pointer' }} />
                </div>

                {profile.certifications && profile.certifications.length > 0 ? (
                  <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    {profile.certifications.map((cert) => (
                      <div className="certification-details-grid" key={cert.id}>
                        <div className="certification-icon-grid">
                          <Award className="details-icon-blue" />
                        </div>
                        <div className="details-grid">
                          <div>
                            <h4 className="details-name">{cert.name}</h4>
                            <p className="details-name-location">{cert.provider}</p>
                            {cert.issuedDate && (
                              <p className="details-date">
                                Issued: {cert.issuedDate} {cert.expDate ? ` - Expires: ${cert.expDate}` : ''}
                              </p>
                            )}
                          </div>

                          <div className="item-menu-container" style={{ position: 'relative' }}>
                            <MoreVertical 
                              className="more-option-icon" 
                              style={{ cursor: 'pointer' }}
                              onClick={() => setActiveItemMenu(activeItemMenu === `cert-${cert.id}` ? null : `cert-${cert.id}`)} 
                            />
                            {activeItemMenu === `cert-${cert.id}` && (
                              <div className="MuiMenu-paper" style={{ position: 'absolute', top: '100%', right: '0', width: '120px', backgroundColor: '#fff', zIndex: 50 }}>
                                <button className="MuiMenuItem-root" onClick={() => openEditCert(cert)}>
                                  <Edit2 className="menu-icons" style={{ width: '14px', height: '14px' }} /> Edit
                                </button>
                                <button className="MuiMenuItem-root" onClick={() => handleDeleteItem('certifications', cert.id)} style={{ color: '#ef4444' }}>
                                  <Trash2 className="menu-icons" style={{ width: '14px', height: '14px', color: '#ef4444' }} /> Delete
                                </button>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-details-grid">
                     <p className="add-details-text" onClick={openCertModal} style={{ cursor: 'pointer' }}>
                        <Lock style={{width: '14px', height: '14px', color: '#fdb100', marginRight: '5px'}} /> Add Your Certifications!
                     </p>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>
      ) : (
        /* --- SETTINGS VIEW (Request Account Deletion) --- */
        <div style={{ maxWidth: '100%', margin: '0 auto', padding: '24px 10px', width: '100%', minHeight: '80vh', backgroundColor: '#f6f7f9', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '16px' }}>
             <span style={{ cursor: 'pointer', color: '#111827', fontWeight: '500' }} onClick={() => setCurrentView('profile')}>Profile</span>
             <ChevronRight style={{ width: '14px', height: '14px', color: '#6b7280' }} />
             <span style={{ color: '#111827' }}>Settings</span>
          </div>
          
          <hr style={{ borderTop: '1px solid #e5e7eb', borderBottom: 'none', marginBottom: '40px' }} />

          <div style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#000', marginBottom: '16px' }}>Request Account Deletion</h1>

             <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
               If you request to delete your account, it will be removed from the application within 30 days. Please note that this action is irreversible.
             </p>

             <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
               Could you please tell us the reason for your account deletion? Your feedback helps us improve.
             </p>

             <div style={{ width: '100%', marginBottom: '24px' }}>
               <textarea
                 value={deletionReason}
                 onChange={(e) => setDeletionReason(e.target.value)}
                 maxLength={500}
                 placeholder="Enter your reason here"
                 style={{
                   width: '100%',
                   height: '140px',
                   padding: '16px',
                   borderRadius: '6px',
                   border: '1px solid #9ca3af',
                   outline: 'none',
                   resize: 'none',
                   fontFamily: '"Open Sans", sans-serif',
                   fontSize: '14px',
                   color: '#374151',
                   boxSizing: 'border-box'
                 }}
               />
               <div style={{ textAlign: 'right', fontSize: '13px', color: '#9ca3af', marginTop: '8px' }}>
                 {deletionReason.length}/500
               </div>
             </div>

             <button 
               onClick={handleDeleteRequest}
               style={{
                 backgroundColor: '#d32f2f',
                 color: '#fff',
                 border: 'none',
                 borderRadius: '6px',
                 padding: '12px 24px',
                 fontSize: '15px',
                 fontWeight: '600',
                 cursor: 'pointer',
                 boxShadow: '0 4px 6px rgba(211, 47, 47, 0.2)',
                 transition: 'all 0.2s ease',
                 letterSpacing: '0.5px'
               }}
             >
               SUBMIT REQUEST
             </button>
          </div>
        </div>
      )}

      {/* --- Profile Edit Modal (WITH INNOVATION 1) --- */}
      {isEditModalOpen && (
        <div style={{ position: 'fixed', zIndex: 1300, right: 0, bottom: 0, top: 0, left: 0 }}>
          <div onClick={closeEditModal} style={{ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', right: 0, bottom: 0, top: 0, left: 0, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}></div>
          
          <div style={{ height: '100%', outline: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fff', color: 'rgba(0, 0, 0, 0.87)', borderRadius: '16px', boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14)', margin: '32px', position: 'relative', display: 'flex', flexDirection: 'column', width: '500px', maxWidth: '100%', maxHeight: '90vh' }}>
              
              <div style={{ flex: '1 1 auto', overflowY: 'auto', padding: '60px 32px 20px 32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  
                  <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                    <div style={{ height: '100px', width: '100px', borderRadius: '50%', border: '4px solid #fff', backgroundColor: '#fff', cursor: 'pointer', position: 'relative', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                      <label htmlFor="modalProfilePreview" style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }}>
                        <img src={previewAvatar} alt="profile" style={{ height: '100%', width: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', backgroundColor: '#3b82f6', bottom: '0', right: '0', border: '2px solid #fff', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 2px 8px rgba(59,130,246,0.3)' }}>
                          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" style={{ fontSize: '14px', width: '14px', height: '14px', fill: 'currentColor' }}>
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"></path>
                          </svg>
                        </div>
                      </label>
                      <input id="modalProfilePreview" type="file" accept="image/jpeg, image/jpg, image/png" style={{ display: 'none' }} onChange={handleAvatarChange} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    
                    <div className="form-group">
                      <label className="form-label">First Name *</label>
                      <div className="form-input">
                        <div className="MuiOutlinedInput-root">
                          <input name="firstName" type="text" className="MuiOutlinedInput-input" value={modalFormData.firstName} onChange={handleModalInputChange} placeholder="First Name" />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Last Name *</label>
                      <div className="form-input">
                        <div className="MuiOutlinedInput-root">
                          <input name="lastName" type="text" className="MuiOutlinedInput-input" value={modalFormData.lastName} onChange={handleModalInputChange} placeholder="Last Name" />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email ID *</label>
                      <div className="form-input">
                        <div className="MuiOutlinedInput-root disabled">
                          <input name="email" type="text" className="MuiOutlinedInput-input" disabled value={modalFormData.email} />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <div className="form-input">
                        <div className="MuiOutlinedInput-root">
                          <input name="location" type="text" className="MuiOutlinedInput-input" value={modalFormData.location} onChange={handleModalInputChange} placeholder="e.g. San Francisco, CA" />
                        </div>
                      </div>
                    </div>

                    {/* INNOVATION 1: AI BIO GENERATOR */}
                    <div className="form-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4px' }}>
                        <label className="form-label" style={{ marginBottom: 0 }}>Bio</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ color: '#9ca3af', fontSize: '11px', fontWeight: '500' }}>max character (500 - {bioCharsLeft})</span>
                          <button 
                            type="button" 
                            onClick={generateAIBio}
                            disabled={isGeneratingBio}
                            style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef)', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', fontWeight: '600', cursor: isGeneratingBio ? 'wait' : 'pointer', transition: 'all 0.2s ease', opacity: isGeneratingBio ? 0.7 : 1 }}
                          >
                            <Sparkles size={12} /> {isGeneratingBio ? 'Generating...' : 'AI Auto-Write'}
                          </button>
                        </div>
                      </div>
                      <div className="form-input">
                        <div className="MuiOutlinedInput-root" style={{ padding: '0' }}>
                          <textarea name="bio" value={modalFormData.bio} onChange={handleModalInputChange} maxLength="500" className="MuiOutlinedInput-input" style={{ height: '80px', resize: 'none' }} placeholder="Tell us a little about yourself..."></textarea>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1.5px dashed #e5e7eb', borderRadius: '12px', padding: '24px', cursor: 'pointer', marginTop: '8px', backgroundColor: '#fafbfc', transition: 'all 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.borderColor = '#3b82f6'} onMouseOut={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}>
                      <label htmlFor="modalResumePreview" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', cursor: 'pointer' }}>
                        {resumeFile ? (
                          <p style={{ fontSize: '14px', color: '#111827', fontWeight: '600', textAlign: 'center', margin: '0 0 12px 0', fontFamily: '"Open Sans", sans-serif' }}>📄 {resumeFile.name}</p>
                        ) : (
                          <div style={{ backgroundColor: '#f0f7ff', padding: '12px', borderRadius: '50%', marginBottom: '12px', color: '#3b82f6' }}>
                             <Download style={{ width: '24px', height: '24px' }} />
                          </div>
                        )}
                        <div className="btn btn--primary btn--sm">
                          {resumeFile ? 'CHANGE RESUME' : 'UPLOAD RESUME'}
                        </div>
                      </label>
                      <input id="modalResumePreview" type="file" accept="application/pdf, .doc, .docx" style={{ display: 'none' }} onChange={handleResumeChange} />
                    </div>

                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 32px', gap: '12px', borderTop: '1px solid #f1f5f9' }}>
                <button type="button" onClick={closeEditModal} className="btn btn--outline btn--sm">Cancel</button>
                <button 
                  type="button" 
                  onClick={() => handleProfileUpdate({
                    name: `${modalFormData.firstName} ${modalFormData.lastName}`.trim(),
                    location: modalFormData.location,
                    bio: modalFormData.bio,
                    email: modalFormData.email
                  })} 
                  className="btn btn--primary btn--sm"
                >
                  Update
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- Edit Socials Modal --- */}
      {isSocialsModalOpen && (
        <div style={{ position: 'fixed', zIndex: 1300, right: 0, bottom: 0, top: 0, left: 0 }}>
          <div onClick={closeSocialsModal} style={{ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', right: 0, bottom: 0, top: 0, left: 0, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}></div>
          
          <div style={{ height: '100%', outline: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fff', color: 'rgba(0, 0, 0, 0.87)', borderRadius: '16px', boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14)', margin: '32px', position: 'relative', display: 'flex', flexDirection: 'column', width: '600px', maxWidth: '100%', maxHeight: '90vh' }}>
              
              <div style={{ padding: '32px', flex: '1 1 auto', overflowY: 'auto' }}>
                <h3 style={{ margin: '0 0 32px 0', color: 'rgb(141, 153, 174)', fontSize: '0.8em', fontWeight: '600', fontFamily: '"Open Sans", sans-serif' }}>
                  Edit Socials
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '20px' }}>
                  
                  {/* Github Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <label style={{ color: 'rgb(128, 128, 128)', fontWeight: 600, fontSize: '0.75em', width: '8em', fontFamily: '"Open Sans", sans-serif' }}>Github :</label>
                    <div className="form-input" style={{ flex: 1, maxWidth: '350px' }}>
                      <div className="MuiOutlinedInput-root" style={{ margin: 0, height: '36px' }}>
                        <input name="github" type="text" className="MuiOutlinedInput-input" value={socialFormData.github} onChange={handleSocialsInputChange} style={{ padding: '0 14px' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginLeft: '16px' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                        <Check style={{ color: 'rgb(46, 190, 99)', width: '18px', height: '18px' }} strokeWidth={3} />
                      </button>
                      <button onClick={() => clearSocialField('github')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                        <Trash2 style={{ color: 'rgb(253, 135, 136)', width: '18px', height: '18px' }} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  {/* LinkedIn Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <label style={{ color: 'rgb(128, 128, 128)', fontWeight: 600, fontSize: '0.75em', width: '8em', fontFamily: '"Open Sans", sans-serif' }}>LinkedIn :</label>
                    <div className="form-input" style={{ flex: 1, maxWidth: '350px' }}>
                      <div className="MuiOutlinedInput-root" style={{ margin: 0, height: '36px' }}>
                        <input name="linkedin" type="text" className="MuiOutlinedInput-input" value={socialFormData.linkedin} onChange={handleSocialsInputChange} style={{ padding: '0 14px' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginLeft: '16px' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                        <Check style={{ color: 'rgb(46, 190, 99)', width: '18px', height: '18px' }} strokeWidth={3} />
                      </button>
                      <button onClick={() => clearSocialField('linkedin')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                        <Trash2 style={{ color: 'rgb(253, 135, 136)', width: '18px', height: '18px' }} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 32px', gap: '12px' }}>
                <button type="button" onClick={closeSocialsModal} className="btn btn--outline btn--sm" style={{ textTransform: 'uppercase' }}>Cancel</button>
                <button type="button" onClick={submitSocialsModal} className="btn btn--primary btn--sm" style={{ textTransform: 'uppercase' }}>Done</button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- Career Vision Modal --- */}
      {isCareerModalOpen && (
        <div style={{ position: 'fixed', zIndex: 1300, right: 0, bottom: 0, top: 0, left: 0 }}>
          <div onClick={closeCareerModal} style={{ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', right: 0, bottom: 0, top: 0, left: 0, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}></div>
          
          <div style={{ height: '100%', outline: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fff', color: 'rgba(0, 0, 0, 0.87)', borderRadius: '16px', boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14)', margin: '32px', position: 'relative', display: 'flex', flexDirection: 'column', width: '500px', maxWidth: '100%', maxHeight: '90vh' }}>
              
              <div style={{ padding: '32px', flex: '1 1 auto', overflowY: 'auto' }}>
                <h3 style={{ margin: '0 0 24px 0', color: 'rgb(141, 153, 174)', fontSize: '0.8em', fontWeight: '600', fontFamily: '"Open Sans", sans-serif' }}>
                  Career Vision
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="describesYou">What best describes you? *</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root" style={{ position: 'relative' }}>
                        <input id="describesYou" name="describesYou" type="text" className="MuiOutlinedInput-input" style={{ paddingRight: '40px' }} placeholder="Select or type your category" value={careerFormData.describesYou} onChange={handleCareerInputChange} />
                        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }}>
                          <DropdownIcon size={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="longTermGoal">What is your long-term career aspiration?*</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root" style={{ position: 'relative' }}>
                        <input id="longTermGoal" name="longTermGoal" type="text" className="MuiOutlinedInput-input" style={{ paddingRight: '40px' }} placeholder="E.g., CEO, CTO, Founder" value={careerFormData.longTermGoal} onChange={handleCareerInputChange} />
                        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }}>
                          <DropdownIcon size={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="aspirationalField">Aspirational Field*</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root" style={{ position: 'relative' }}>
                        <input id="aspirationalField" name="aspirationalField" type="text" className="MuiOutlinedInput-input" style={{ paddingRight: '40px' }} placeholder="Select your field" value={careerFormData.aspirationalField} onChange={handleCareerInputChange} />
                        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }}>
                          <DropdownIcon size={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="inspiration">Who is your inspiration?*</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="inspiration" name="inspiration" type="text" className="MuiOutlinedInput-input" placeholder="Enter the name of your inspiration" value={careerFormData.inspiration} onChange={handleCareerInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="shortTermGoal">What Are You Aiming For Right Now?*</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root" style={{ position: 'relative' }}>
                        <input id="shortTermGoal" name="shortTermGoal" type="text" className="MuiOutlinedInput-input" style={{ paddingRight: '40px' }} placeholder="E.g., Developer, Designer, Engineer" value={careerFormData.shortTermGoal} onChange={handleCareerInputChange} />
                        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }}>
                          <DropdownIcon size={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 32px', gap: '12px', borderTop: '1px solid #f1f5f9' }}>
                <button type="button" onClick={closeCareerModal} className="btn btn--outline btn--sm" style={{ textTransform: 'uppercase' }}>Cancel</button>
                <button type="button" onClick={submitCareerModal} className="btn btn--primary btn--sm" style={{ textTransform: 'uppercase' }}>Update</button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- Skills Modal --- */}
      {isSkillsModalOpen && (
        <div style={{ position: 'fixed', zIndex: 1300, right: 0, bottom: 0, top: 0, left: 0 }}>
          <div onClick={closeSkillsModal} style={{ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', right: 0, bottom: 0, top: 0, left: 0, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}></div>
          
          <div style={{ height: '100%', outline: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fff', color: 'rgba(0, 0, 0, 0.87)', borderRadius: '16px', boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14)', margin: '32px', position: 'relative', display: 'flex', flexDirection: 'column', width: '500px', maxWidth: '100%' }}>
              
              <div style={{ padding: '32px', flex: '1 1 auto', overflowY: 'auto' }}>
                <div style={{ width: '100%', flexDirection: 'column' }}>
                  
                  <h3 style={{ margin: '0 0 20px 0', color: '#111827', fontSize: '20px', fontWeight: '700', fontFamily: '"Open Sans", sans-serif' }}>Skills</h3>

                  <div className="MuiAutocomplete-root">
                    <div style={{ width: '100%' }}>
                      <div className="MuiInputBase-root MuiInput-root MuiInput-underline">
                        
                        {editSkills.map((skill, index) => (
                          <div key={index} className="css-1jufn2x">
                            <span className="MuiChip-label">{skill}</span>
                            <svg className="MuiChip-deleteIcon" fill="currentColor" onClick={() => handleRemoveSkill(skill)} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CancelIcon">
                              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                            </svg>
                          </div>
                        ))}

                        <input 
                          aria-invalid="false" 
                          autoComplete="off" 
                          id="tags-standard" 
                          placeholder={editSkills.length === 0 ? "Type a skill and hit Enter" : ""} 
                          type="text" 
                          className="MuiAutocomplete-input" 
                          value={skillInputValue}
                          onChange={(e) => setSkillInputValue(e.target.value)}
                          onKeyDown={handleSkillKeyDown}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 32px', gap: '12px', borderTop: '1px solid #f1f5f9' }}>
                <button type="button" onClick={closeSkillsModal} className="btn btn--outline btn--sm">Cancel</button>
                <button type="button" onClick={submitSkillsModal} className="btn btn--primary btn--sm">Update</button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- Add Experience Modal --- */}
      {isExpModalOpen && (
        <div style={{ position: 'fixed', zIndex: 1300, right: 0, bottom: 0, top: 0, left: 0 }}>
          <div onClick={closeExpModal} style={{ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', right: 0, bottom: 0, top: 0, left: 0, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}></div>
          
          <div style={{ height: '100%', outline: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fff', color: 'rgba(0, 0, 0, 0.87)', borderRadius: '16px', boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14)', margin: '32px', position: 'relative', display: 'flex', flexDirection: 'column', width: '500px', maxWidth: '100%', maxHeight: '90vh' }}>
              
              <div style={{ padding: '32px', flex: '1 1 auto', overflowY: 'auto' }}>
                <h3 style={{ margin: '0 0 24px 0', color: '#111827', fontSize: '20px', fontWeight: '700', fontFamily: '"Open Sans", sans-serif' }}>
                  {expFormData.id ? 'Edit Experience' : 'Add Experience'}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="role">Role *</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="role" name="role" type="text" className="MuiOutlinedInput-input" placeholder="e.g. Full Stack Developer" value={expFormData.role} onChange={handleExpInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="company">Company Name *</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="company" name="company" type="text" className="MuiOutlinedInput-input" placeholder="e.g. Google" value={expFormData.company} onChange={handleExpInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="locExp">Location</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="locExp" name="locExp" type="text" className="MuiOutlinedInput-input" placeholder="e.g. San Francisco, CA" value={expFormData.locExp} onChange={handleExpInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="dojExp">Date of joining</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="dojExp" name="dojExp" type="date" className="MuiOutlinedInput-input" value={expFormData.dojExp} onChange={handleExpInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '8px' }}>
                    <label className="form-label" htmlFor="doeExp">Date of leaving</label>
                    <div className="form-input">
                      <div className={`MuiOutlinedInput-root ${expFormData.present ? 'disabled' : ''}`}>
                        <input id="doeExp" name="doeExp" type="date" disabled={expFormData.present} className="MuiOutlinedInput-input" value={expFormData.doeExp} onChange={handleExpInputChange} />
                      </div>
                    </div>
                  </div>

                  <label className="custom-checkbox-container">
                    <input name="present" type="checkbox" checked={expFormData.present} onChange={handleExpCheckboxChange} />
                    <div className="custom-checkbox">
                      <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                    </div>
                    <span className="custom-checkbox-label">Currently working in this role</span>
                  </label>

                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 32px', gap: '12px', borderTop: '1px solid #f1f5f9' }}>
                <button type="button" onClick={closeExpModal} className="btn btn--outline btn--sm" style={{ textTransform: 'uppercase' }}>Cancel</button>
                <button type="button" onClick={submitExpModal} className="btn btn--primary btn--sm" style={{ textTransform: 'uppercase' }}>
                  {expFormData.id ? 'Update' : 'Add'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- Add Education Modal --- */}
      {isEduModalOpen && (
        <div style={{ position: 'fixed', zIndex: 1300, right: 0, bottom: 0, top: 0, left: 0 }}>
          <div onClick={closeEduModal} style={{ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', right: 0, bottom: 0, top: 0, left: 0, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}></div>
          
          <div style={{ height: '100%', outline: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fff', color: 'rgba(0, 0, 0, 0.87)', borderRadius: '16px', boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14)', margin: '32px', position: 'relative', display: 'flex', flexDirection: 'column', width: '500px', maxWidth: '100%', maxHeight: '90vh' }}>
              
              <div style={{ padding: '32px', flex: '1 1 auto', overflowY: 'auto' }}>
                <h3 style={{ margin: '0 0 24px 0', color: 'rgb(141, 153, 174)', fontSize: '0.8em', fontWeight: '600', fontFamily: '"Open Sans", sans-serif' }}>
                  {eduFormData.id ? 'Edit Education' : 'Add Your Education'}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="college">College *</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root" style={{ position: 'relative' }}>
                        <input id="college" name="college" type="text" className="MuiOutlinedInput-input" style={{ paddingRight: '40px' }} value={eduFormData.college} onChange={handleEduInputChange} />
                        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }}>
                          <DropdownIcon size={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="degree">Degree *</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="degree" name="degree" type="text" className="MuiOutlinedInput-input" value={eduFormData.degree} onChange={handleEduInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="course">Field of Study *</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="course" name="course" type="text" className="MuiOutlinedInput-input" value={eduFormData.course} onChange={handleEduInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="locEdu">Location *</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="locEdu" name="locEdu" type="text" className="MuiOutlinedInput-input" value={eduFormData.locEdu} onChange={handleEduInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="dojEdu">Date of joining *</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="dojEdu" name="dojEdu" type="date" className="MuiOutlinedInput-input" value={eduFormData.dojEdu} onChange={handleEduInputChange} />
                      </div>
                    </div>
                  </div>

                  <label className="custom-checkbox-container" style={{ paddingBottom: '16px' }}>
                    <input name="present" type="checkbox" checked={eduFormData.present} onChange={handleEduCheckboxChange} />
                    <div className="custom-checkbox">
                      <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                    </div>
                    <span className="custom-checkbox-label">Currently studying here / not completed *</span>
                  </label>

                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '16px' }}>
                    <span style={{ color: '#9ca3af', fontWeight: 600, fontSize: '13px', fontFamily: '"Open Sans", sans-serif' }}>OR</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="doeEdu">Date of completion *</label>
                    <div className="form-input">
                      <div className={`MuiOutlinedInput-root ${eduFormData.present ? 'disabled' : ''}`}>
                        <input id="doeEdu" name="doeEdu" type="date" disabled={eduFormData.present} className="MuiOutlinedInput-input" value={eduFormData.doeEdu} onChange={handleEduInputChange} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 32px', gap: '12px', borderTop: '1px solid #f1f5f9' }}>
                <button type="button" onClick={closeEduModal} className="btn btn--outline btn--sm" style={{ textTransform: 'capitalize' }}>Cancel</button>
                <button type="button" onClick={submitEduModal} className="btn btn--primary btn--sm" style={{ textTransform: 'capitalize' }}>
                  {eduFormData.id ? 'Update' : 'Add'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- Add / Edit Certification Modal --- */}
      {isCertModalOpen && (
        <div style={{ position: 'fixed', zIndex: 1300, right: 0, bottom: 0, top: 0, left: 0 }}>
          <div onClick={closeCertModal} style={{ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', right: 0, bottom: 0, top: 0, left: 0, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}></div>
          
          <div style={{ height: '100%', outline: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fff', color: 'rgba(0, 0, 0, 0.87)', borderRadius: '16px', boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14)', margin: '32px', position: 'relative', display: 'flex', flexDirection: 'column', width: '500px', maxWidth: '100%', maxHeight: '90vh' }}>
              
              <div style={{ padding: '32px', flex: '1 1 auto', overflowY: 'auto' }}>
                <h3 style={{ margin: '0 0 24px 0', color: 'rgb(141, 153, 174)', fontSize: '0.8em', fontWeight: '600', fontFamily: '"Open Sans", sans-serif' }}>
                  {certFormData.id ? 'Edit Certification' : 'Add Certification'}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="certification">Certification *</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="certification" name="certification" type="text" className="MuiOutlinedInput-input" value={certFormData.certification} onChange={handleCertInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="provider">Provider *</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="provider" name="provider" type="text" className="MuiOutlinedInput-input" value={certFormData.provider} onChange={handleCertInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="url">Certificate Url</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="url" name="url" type="text" className="MuiOutlinedInput-input" value={certFormData.url} onChange={handleCertInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="certID">Certificate ID</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="certID" name="certID" type="text" className="MuiOutlinedInput-input" value={certFormData.certID} onChange={handleCertInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="issuedDate">Issued Date</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="issuedDate" name="issuedDate" type="date" className="MuiOutlinedInput-input" value={certFormData.issuedDate} onChange={handleCertInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="expDate">Expiry Date</label>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root">
                        <input id="expDate" name="expDate" type="date" className="MuiOutlinedInput-input" value={certFormData.expDate} onChange={handleCertInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '8px' }}>
                      <label className="form-label" htmlFor="description">Description</label>
                      <span style={{ color: '#9ca3af', fontSize: '11px', fontWeight: '500' }}>max character (200 - {certFormData.description ? certFormData.description.length : 0})</span>
                    </div>
                    <div className="form-input">
                      <div className="MuiOutlinedInput-root" style={{ padding: '0' }}>
                        <textarea id="description" name="description" value={certFormData.description} onChange={handleCertInputChange} maxLength="200" className="MuiOutlinedInput-input" style={{ height: '80px', resize: 'none' }}></textarea>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 32px', gap: '12px', borderTop: '1px solid #f1f5f9' }}>
                <button type="button" onClick={closeCertModal} className="btn btn--outline btn--sm" style={{ textTransform: 'uppercase' }}>Cancel</button>
                <button type="button" onClick={submitCertModal} className="btn btn--primary btn--sm" style={{ textTransform: 'uppercase' }}>
                  {certFormData.id ? 'Update' : 'Add'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- Success Toast Notification --- */}
      {showCopyToast && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 2000, display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '12px 24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', border: '1px solid #e5e7eb', animation: 'slideIn 0.3s ease-out' }}>
          <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
          <div style={{ width: '24px', height: '24px', backgroundColor: '#5ece4b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <span style={{ color: '#343434', fontSize: '16px', fontWeight: '500', fontFamily: '"Open Sans", sans-serif' }}>Profile Link Copied Successfully</span>
        </div>
      )}
    </div>
  )
}