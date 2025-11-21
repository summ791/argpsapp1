import React, { useState } from 'react';
import { Send, Calendar, Loader2, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ScreenHeader from '../components/ScreenHeader';

const BookScreen: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const timeSlots = [
    "Morning (9:00 AM - 10:00 AM)",
    "Evening (4:00 PM - 5:00 PM)",
    "Evening (5:00 PM - 6:00 PM)",
    "Evening (6:00 PM - 7:00 PM)"
  ];

  // Helper to validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handler to restrict phone input to numbers only and max 10 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    // Limit to 10 digits
    if (numericValue.length <= 10) {
      setPhone(numericValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic empty check
    if (!fullName || !email || !phone || !date || !time) {
      alert("Please fill in all fields");
      return;
    }

    // Strict Email Validation
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address (e.g., user@example.com)");
      return;
    }

    // Strict Phone Validation (Must be exactly 10 digits)
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    // --- EMAILJS CONFIGURATION (ADMIN ONLY) ---
    const serviceId = 'service_p4rnj4d';
    const templateId = 'template_j21xpja';
    const publicKey = 'MFNYuDPIGgrfQhb5C';

    // Capture form data for the email
    const templateParams = {
      to_name: "Rithanya Gopinathan",
      from_name: fullName,
      from_email: email,
      message: `New Booking Request from ARGPS App.
      
      Client Name: ${fullName}
      Client Email: ${email}
      Client Phone: ${phone}
      Requested Date: ${date}
      Requested Time: ${time}`,
      
      client_name: fullName,
      client_email: email,
      client_phone: phone,
      booking_date: date,
      booking_time: time
    };

    // 1. Send email in the background (Admin only)
    setIsSubmitting(true);
    
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        console.log('Booking email sent successfully');
        // 2. Show Success Modal only after successful send
        setShowSuccessModal(true);
        
        // 3. Reset form
        setFullName('');
        setEmail('');
        setPhone('');
        setDate('');
        setTime('');
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert("There was an error sending your booking. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      <ScreenHeader />
      
      <div className="px-6 pt-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Book Consultation</h2>
        <p className="text-slate-500 mb-8 text-center px-4">Schedule your Wellness Consultation with Rithanya Gopinathan</p>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all placeholder:text-gray-400 font-medium"
              required
              disabled={isSubmitting}
            />
          </div>
          
          {/* Email Address */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all placeholder:text-gray-400 font-medium"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
            <input 
              type="tel" 
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter 10-digit phone number"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all placeholder:text-gray-400 font-medium"
              required
              disabled={isSubmitting}
              maxLength={10}
              pattern="[0-9]{10}"
              inputMode="numeric"
            />
            <p className="text-xs text-slate-400 mt-1 text-right">{phone.length}/10</p>
          </div>
          
          {/* Preferred Date - Writable Text Input + Hidden Picker */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Date</label>
            <div className="relative">
              <input 
                type="text" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all font-medium text-slate-700 bg-white placeholder:text-gray-400 pr-12"
                placeholder="dd / mm / yyyy"
                required
                disabled={isSubmitting}
              />
              {/* Hidden Date Picker Trigger on Icon */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6">
                 <Calendar className="text-emerald-500 absolute pointer-events-none" size={24} />
                 <input 
                    type="date" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => setDate(e.target.value)}
                    tabIndex={-1}
                    disabled={isSubmitting}
                 />
              </div>
            </div>
          </div>

          {/* Preferred Time */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Time</label>
            <div className="relative">
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all font-medium text-slate-700 bg-white cursor-pointer appearance-none pr-12"
                required
                disabled={isSubmitting}
              >
                <option value="" disabled>Select preferred time</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {/* Custom chevron for select consistency */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full mt-4 font-bold py-4 rounded-xl shadow-lg shadow-emerald-100 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] duration-150 ${
              isSubmitting 
                ? 'bg-emerald-300 cursor-not-allowed text-white/90' 
                : 'bg-emerald-400 hover:bg-emerald-500 text-white'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send size={18} strokeWidth={2.5} />
                <span>Confirm Booking</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Success Modal Popup */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div className="bg-white rounded-3xl p-8 w-full max-w-xs relative z-10 flex flex-col items-center text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full border-[3px] border-emerald-400 flex items-center justify-center mb-5">
              <Check className="text-emerald-400" size={32} strokeWidth={3.5} />
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
              Booking Successful <span className="text-xl">🎉</span>
            </h3>
            
            {/* Body Text */}
            <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium">
              Thanks for trusting ARGPS Nutritious Lifestyle
              <br />
              Your consultation has been confirmed.
            </p>
            
            {/* OK Button */}
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-100 active:scale-95 duration-150"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookScreen;
