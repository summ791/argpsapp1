import React, { useState, useMemo } from 'react';
import { Lightbulb, Apple, CheckCircle2, Sparkles } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';
import { wellnessTips, healthBites, dailyBenefits } from '../data/dailyContent';

const HomeScreen: React.FC = () => {
  
  // Helper to get a stable daily integer seed based on 7:00 AM switch
  // This uses LOCAL time to ensure the switch happens exactly when the user sees 7:00 AM on their clock.
  const getDailySeed = () => {
    const now = new Date();
    
    // If it is before 7:00 AM, we treat it as the previous day for content rotation
    if (now.getHours() < 7) {
      now.setDate(now.getDate() - 1);
    }

    // Create a unique integer for the date (YYYYMMDD format is sufficient for unique daily index)
    // This ensures 1-to-1 mapping with the calendar day (relative to 7am start)
    const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    return seed;
  };

  const dailySeed = useMemo(() => getDailySeed(), []);

  // Select 1 daily tip, bite, and benefit based on the seed
  const dailyTip = useMemo(() => wellnessTips[dailySeed % wellnessTips.length], [dailySeed]);
  const dailyBite = useMemo(() => healthBites[dailySeed % healthBites.length], [dailySeed]);
  const dailyBenefit = useMemo(() => dailyBenefits[dailySeed % dailyBenefits.length], [dailySeed]);

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      <ScreenHeader />
      
      <div className="px-6 pt-4">
        <h2 className="text-2xl font-bold text-slate-800">Welcome to ARGPS Nutritious Lifestyle</h2>
        <p className="text-slate-500 mt-1 mb-6 text-sm">Your journey to a healthier lifestyle starts here</p>
        
        {/* Daily Wellness Tip Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-white">
              <Lightbulb size={20} fill="currentColor" className="text-white" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Daily Wellness Tip</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">
            {dailyTip.text}
          </p>
        </div>

        {/* Health Bite Card */}
        <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
              <Apple size={20} fill="currentColor" className="text-white" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Health Bite</h3>
          </div>
          <p className="text-slate-700 leading-relaxed">
            <span className="font-bold">Health Fact:</span> {dailyBite.fact}
          </p>
        </div>

        {/* Daily Nutrition Spotlight (Text Only) */}
        <div className="mb-6">
          <h3 className="font-bold text-slate-800 text-lg mb-4">Daily Nutrition Spotlight</h3>
          
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
            {/* Header Section */}
            <div className="bg-emerald-500 p-6 relative overflow-hidden">
              {/* Decorative subtle background element */}
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2 text-emerald-100">
                  <Sparkles size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Superfood of the Day</span>
                </div>
                <h4 className="text-3xl font-bold text-white tracking-tight">
                  {dailyBenefit.name}
                </h4>
              </div>
            </div>

            {/* Benefits List */}
            <div className="p-6 bg-slate-50/50">
              <h5 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Key Benefits</h5>
              <ul className="space-y-3">
                {dailyBenefit.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    </div>
                    <span className="text-slate-700 text-sm leading-relaxed font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
