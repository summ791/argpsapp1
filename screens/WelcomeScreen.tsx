import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Screen } from '../types';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    // Changed h-screen to h-[100dvh] to prevent address bar overlap on mobile
    <div className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Content Card */}
      <div className="relative z-10 w-[85%] max-w-md bg-white rounded-[2rem] p-8 flex flex-col items-center text-center shadow-2xl">
        <h1 className="text-3xl font-bold text-slate-800 mb-1 leading-tight">
          ARGPS
        </h1>
        <h2 className="text-3xl font-bold text-slate-800 mb-4 leading-tight">
          Nutritious<br/>Lifestyle
        </h2>
        
        {/* Green divider line */}
        <div className="w-16 h-1.5 bg-emerald-400 rounded-full mb-8"></div>
        
        <div className="mb-10">
          <p className="text-lg font-semibold text-slate-700">Rithanya Gopinathan</p>
          <p className="text-slate-500 text-sm font-medium mt-1">Wellness Consultant</p>
        </div>
        
        <button
          onClick={onGetStarted}
          className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-emerald-100"
        >
          <span>Get Started</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
