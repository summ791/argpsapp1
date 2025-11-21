import React, { useState, useRef, useEffect } from 'react';
import { Send, Calendar, Loader2, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
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
  
  // Calendar State
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  // --- Modern Calendar Logic ---
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    
    const days = [];
    // Add empty slots for days before the 1st
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (selectedDate: Date) => {
    const day = selectedDate.getDate().toString().padStart(2, '0');
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = selectedDate.getFullYear();
    
    setDate(`${day} / ${month} / ${year}`);
    setShowCalendar(false);
  };

  const handleClearDate = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent opening calendar if clicking X
    setDate('');
    setShowCalendar(false);
  };

  const isToday = (d: Date) => {
    const today = new Date();
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  };

  const isSelected = (d: Date) => {
    if (!date) return false;
    // Parse the current date string (DD / MM / YYYY)
    const parts = date.split(' / ');
    if (parts.length !== 3) return false;
    
    const dDay = parseInt(parts[0], 10);
    const dMonth = parseInt(parts[1], 10);
    const dYear = parseInt(parts[2], 10);
    
    return d.getDate() === dDay && (d.getMonth() + 1) === dMonth && d.getFullYear() === dYear;
  };
  // ---------------------------

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
        <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Book Consultation</h2>
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
          
          {/* Preferred Date - Modern Custom Calendar (Centered Modal) */}
          <div className="relative">
            <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Date</label>
            <div 
              className="relative cursor-pointer"
              onClick={() => !isSubmitting && setShowCalendar(true)}
            >
              <input 
                type="text" 
                value={date}
                readOnly
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all font-medium text-slate-700 bg-white placeholder:text-gray-400 pr-12 cursor-pointer"
                placeholder="DD / MM / YYYY"
                required
                disabled={isSubmitting}
              />
              
              {/* Clear Button (X) or Calendar Icon */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                {date ? (
                   <button 
                     type="button"
                     onClick={handleClearDate}
                     className="text-gray-400 hover:text-red-500 transition-colors p-1"
                   >
                     <X size={20} />
                   </button>
                ) : (
                   <div className="text-emerald-500 pointer-events-none">
                     <Calendar size={24} />
                   </div>
                )}
              </div>
            </div>

            {/* Calendar Modal (Fixed Center) */}
            {showCalendar && (
              <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
                {/* Backdrop */}
                <div 
                  className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" 
                  onClick={() => setShowCalendar(false)}
                ></div>
                
                {/* Calendar Card */}
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 w-[280px] relative z-10 animate-in fade-in zoom-in-95 duration-200">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3">
                    <button 
                      type="button"
                      onClick={handlePrevMonth}
                      className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="font-bold text-slate-800 text-base">
                      {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </span>
                    <button 
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Days Header */}
                  <div className="grid grid-cols-7 mb-1">
                    {weekDays.map(day => (
                      <div key={day} className="text-center text-[10px] font-bold text-slate-400 py-1">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-3">
                    {getDaysInMonth(currentMonth).map((d, index) => (
                      <div key={index} className="aspect-square">
                        {d ? (
                          <button
                            type="button"
                            onClick={() => handleDateClick(d)}
                            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                              isSelected(d)
                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100'
                                : isToday(d)
                                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                  : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {d.getDate()}
                          </button>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Clear Option inside Calendar */}
                  <div className="border-t border-slate-100 pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleClearDate()}
                      className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors py-1"
                    >
                      Clear Selection
                    </button>
                  </div>

                </div>
              </div>
            )}
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
