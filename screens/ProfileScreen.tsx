import React, { useState, useRef } from 'react';
import { Camera, Lock, X, Check, Eye, EyeOff } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';
import { ProfileData } from '../types';

interface ProfileScreenProps {
  data: ProfileData;
  onUpdate: (data: ProfileData) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ data, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  
  // Temporary state for editing before saving
  const [editData, setEditData] = useState<ProfileData>(data);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(data); // Reset to original data
  };

  // Interaction Handlers for Profile Photo
  const handleStartPress = () => {
    if (isEditing) return;
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setShowPasswordModal(true);
      setPasswordInput('');
      setErrorMsg('');
    }, 5000);
  };

  const handleEndPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    if (isEditing) {
      // If in edit mode, clicking image triggers file upload
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else {
      // If it was a long press, do nothing (modal already triggered)
      if (isLongPress.current) return;
      
      // Normal tap: Open View-Only Preview
      setShowImagePreview(true);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use the dynamic password from data, default to 'argps2025' if somehow missing
    const currentPassword = data.password || 'argps2025';
    
    if (passwordInput === currentPassword) { 
      setIsEditing(true);
      setEditData(data); // Sync temp state
      setShowPasswordModal(false);
    } else {
      setErrorMsg('Incorrect password. Please try again.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      <ScreenHeader />
      
      <div className="px-6 pt-8 flex flex-col items-center">
        {/* Profile Image */}
        <div 
          className="relative mb-6 group cursor-pointer select-none"
          onMouseDown={handleStartPress}
          onMouseUp={handleEndPress}
          onMouseLeave={handleEndPress}
          onTouchStart={handleStartPress}
          onTouchEnd={handleEndPress}
          onClick={handleImageClick}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className={`w-32 h-32 rounded-full p-1 ${isEditing ? 'bg-emerald-400' : 'bg-emerald-100'} relative overflow-hidden transition-all duration-300 shadow-md`}>
             <img 
               src={isEditing ? editData.imageUrl : data.imageUrl} 
               alt="Profile" 
               className="w-full h-full rounded-full object-cover border-4 border-white"
             />
             
             {/* Edit Mode Overlay */}
             {isEditing && (
               <div className="absolute inset-0 bg-black/30 flex items-center justify-center animate-in fade-in">
                 <Camera className="text-white drop-shadow-md" size={28} />
               </div>
             )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-1 text-center">Rithanya Gopinathan</h2>
        <p className="text-slate-600 text-lg mb-8">Wellness Consultant</p>
        
        {/* Action Buttons - Only visible in edit mode */}
        {isEditing && (
          <div className="flex items-center space-x-4 mb-8 animate-in fade-in slide-in-from-top-2 duration-200">
            <button 
              onClick={handleSave}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2 rounded-full flex items-center space-x-1.5 transition-colors shadow-md shadow-emerald-100"
            >
              <Check size={16} />
              <span>Save Changes</span>
            </button>
            
            <button 
                onClick={handleCancel}
                className="text-slate-500 hover:text-slate-700 text-sm font-medium px-3 py-2 transition-colors bg-slate-100 rounded-full"
            >
                Cancel
            </button>
          </div>
        )}

        {/* Card-like form container */}
        <div className="w-full max-w-sm bg-white border border-gray-100 rounded-3xl shadow-sm p-6 space-y-6">
           <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Email Address</label>
            {/* Textarea used here for text wrapping */}
            <textarea 
              value={isEditing ? editData.email : data.email}
              onChange={(e) => setEditData({...editData, email: e.target.value})}
              readOnly={!isEditing}
              rows={2}
              className={`w-full px-4 py-3.5 rounded-xl border ${
                  isEditing ? 'border-emerald-400 ring-2 ring-emerald-100 bg-white' : 'border-gray-200 bg-gray-50/50'
              } text-gray-600 focus:outline-none transition-all resize-none`}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Phone Number</label>
            <input 
              type="tel" 
              placeholder={isEditing ? "Enter phone number" : ""}
              value={isEditing ? editData.phone : data.phone}
              onChange={(e) => setEditData({...editData, phone: e.target.value})}
              readOnly={!isEditing}
               className={`w-full px-4 py-3.5 rounded-xl border ${
                  isEditing ? 'border-emerald-400 ring-2 ring-emerald-100 bg-white' : 'border-gray-200 bg-gray-50/50'
              } text-gray-600 focus:outline-none transition-all placeholder:text-gray-400`}
            />
          </div>

          {/* Password Field - Only visible when editing */}
          {isEditing && (
             <div className="animate-in fade-in slide-in-from-top-1 pt-2 border-t border-gray-100">
              <label className="block text-sm font-bold text-slate-700 mb-3">Admin Password</label>
              <div className="relative">
                <input 
                  type={showPasswordText ? "text" : "password"}
                  value={editData.password || ''}
                  onChange={(e) => setEditData({...editData, password: e.target.value})}
                  placeholder="Set new password"
                  className="w-full px-4 py-3.5 rounded-xl border border-emerald-400 ring-2 ring-emerald-100 bg-white text-gray-600 focus:outline-none transition-all font-sans text-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPasswordText(!showPasswordText)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500"
                >
                  {showPasswordText ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-emerald-600 mt-2 ml-1 font-medium">
                * Update this to change your access password
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal (New) */}
      {showImagePreview && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowImagePreview(false)}
        >
          <button 
            onClick={() => setShowImagePreview(false)}
            className="absolute right-6 top-6 text-white/70 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
          <img 
            src={data.imageUrl} 
            alt="Profile Full View" 
            className="max-w-[90vw] max-h-[80vh] object-contain rounded-full border-4 border-emerald-500 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPasswordModal(false)}></div>
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs relative z-10 shadow-2xl animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowPasswordModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                <Lock className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Admin Access</h3>
              <p className="text-sm text-slate-500 text-center mt-1">Enter password to unlock</p>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none mb-2 font-sans text-sm"
              />
              {errorMsg && <p className="text-red-500 text-xs mb-3 ml-1 font-medium">{errorMsg}</p>}
              
              <button 
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-100"
              >
                Unlock Profile
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfileScreen;
