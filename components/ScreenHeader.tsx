import React from 'react';

const ScreenHeader: React.FC = () => {
  return (
    <div className="bg-white pt-12 pb-4 px-4 sticky top-0 z-40 border-b border-slate-50">
      <div className="flex items-center justify-center space-x-3">
        <img 
          src="https://raw.githubusercontent.com/summ791/argpsapp2/main/logo.jpg" 
          alt="ARGPS Logo" 
          className="w-8 h-8 rounded-full object-cover shadow-sm"
        />
        <h1 className="text-lg font-bold text-slate-800 tracking-tight">
          ARGPS Nutritious Lifestyle
        </h1>
      </div>
    </div>
  );
};

export default ScreenHeader;
