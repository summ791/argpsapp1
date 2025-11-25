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
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);

  const [editData, setEditData] = useState<ProfileData>(data);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(data);
  };

  const handleImageInteraction = () => {
    if (isEditing) {
      if (fileInputRef.current) fileInputRef.current.click();
    } else {
      setShowPasswordModal(true);
      setPasswordInput('');
      setErrorMsg('');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPassword = data.password || 'argps2025';

    if (passwordInput === currentPassword) {
      setIsEditing(true);
      setEditData(data);
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

        <div className="relative mb-6 group cursor-pointer" onClick={handleImageInteraction}>
          <div className={`w-32 h-32 rounded-full p-1 ${isEditing ? 'bg-emerald-400' : 'bg-emerald-100'} relative overflow-hidden transition-all duration-300 shadow-md`}>
            <img
              src={isEditing ? editData.imageUrl : data.imageUrl}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-white"
            />
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

        <div className="w-full max-w-sm bg-white border border-gray-100 rounded-3xl shadow-sm p-6 space-y-6">

          {/* ✅ EMAIL FIELD - WRAPPING ENABLED */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Email Address</label>
            <textarea
              value={isEditing ? editData.email : data.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              readOnly={!isEditing}
              rows={2}
              className={`w-full px-4 py-3.5 rounded-xl border ${
                isEditing ? 'border-emerald-400 ring-2 ring-emerald-100 bg-white' : 'border-gray-200 bg-gray-50/50'
              } text-gray-600 focus:outline-none transition-all resize-none`}
              style={{
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: '700',
                fontSize: '12px',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            />
          </div>

          {/* ✅ PHONE FIELD */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Phone Number</label>
            <input
              type="tel"
              value={isEditing ? editData.phone : data.phone}
              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              readOnly={!isEditing}
              className={`w-full px-4 py-3.5 rounded-xl border ${
                isEditing ? 'border-emerald-400 ring-2 ring-emerald-100 bg-white' : 'border-gray-200 bg-gray-50/50'
              } text-gray-600 focus:outline-none transition-all`}
              style={{
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: '700',
                fontSize: '14px'
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
