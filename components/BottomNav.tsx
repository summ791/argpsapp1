import React from 'react';
import { Home, Calendar, User } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, setCurrentScreen }) => {
  const navItems = [
    { id: 'home' as Screen, label: 'Home', icon: Home },
    { id: 'book' as Screen, label: 'Book', icon: Calendar },
    { id: 'profile' as Screen, label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 safe-bottom">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`flex flex-col items-center justify-center space-y-1 w-16 ${
              isActive ? 'text-emerald-500' : 'text-gray-400'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
