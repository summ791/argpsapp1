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
      fileInputRef.current?.click();
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
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditData(prev => ({
        ...prev,
        imageUrl: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      <ScreenHeader />

      <div className="px-6 pt-8 flex flex-col items-center">
        {/* Profile Image */}
        <div
          className="relative mb-6 group cursor-pointer"
          onClick={handleImageInteraction}
        >
          <div
            className={`w-32 h-32 rounded-full p-1 ${
              isEditing ? 'bg-emerald-400' : 'bg-emerald-100'
            } relative overflow-hidden transition-all duration-300 shadow-md`}
          >
            <img
              src={isEditing ? editData.imageUrl : data.imageUrl}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-white"
            />

            {isEditing && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Camera className="text-white" size={28} />
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

        <h2 className="text-2xl font-bold text-slate-800 mb-1 text-center">
          Rithanya Gopinathan
        </h2>
        <p className="text-slate-600 text-lg mb-8">
          Wellness Consultant
        </p>

        {/* Edit buttons */}
        {isEditing && (
          <div className="flex space-x-4 mb-8">
            <button
              onClick={handleSave}
              className="bg-emerald-500 text-white px-5 py-2 rounded-full flex items-center space-x-2"
            >
              <Check size={16} />
              <span>Save Changes</span>
            </button>

            <button
              onClick={handleCancel}
              className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Details Card */}
        <div className="w-full max-w-sm bg-white border border-gray-100 rounded-3xl shadow-sm p-6 space-y-6">

          {/* ✅ Email - SYSTEM FONT */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">
              Email Address
            </label>
            <textarea
              rows={2}
              value={isEditing ? editData.email : data.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
              readOnly={!isEditing}
              className={`w-full px-4 py-3.5 rounded-xl border ${
                isEditing
                  ? 'border-emerald-400 ring-2 ring-emerald-100 bg-white'
                  : 'border-gray-200 bg-gray-50/50'
              } text-gray-700 focus:outline-none resize-none text-[16px]`}
            />
          </div>

          {/* ✅ Phone - SYSTEM FONT */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">
              Phone Number
            </label>
            <input
              type="tel"
              value={isEditing ? editData.phone : data.phone}
              onChange={(e) =>
                setEditData({ ...editData, phone: e.target.value })
              }
              readOnly={!isEditing}
              className={`w-full px-4 py-3.5 rounded-xl border ${
                isEditing
                  ? 'border-emerald-400 ring-2 ring-emerald-100 bg-white'
                  : 'border-gray-200 bg-gray-50/50'
              } text-gray-700 focus:outline-none text-[16px]`}
            />
          </div>

          {/* Password (unchanged) */}
          {isEditing && (
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Admin Password
              </label>

              <div className="relative">
                <input
                  type={showPasswordText ? 'text' : 'password'}
                  value={editData.password || ''}
                  onChange={(e) =>
                    setEditData({ ...editData, password: e.target.value })
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-emerald-400 ring-2 ring-emerald-100 text-gray-600 font-sans text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPasswordText(!showPasswordText)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPasswordText ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowPasswordModal(false)}
          />

          <div className="bg-white rounded-2xl p-6 w-full max-w-xs relative z-10">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute right-4 top-4 text-gray-400"
            >
              <X size={20} />
            </button>

            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-100 mb-2 font-sans text-sm"
                autoFocus
              />

              {errorMsg && (
                <p className="text-red-500 text-xs mb-2">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl"
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
