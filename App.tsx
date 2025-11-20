import React, { useState } from 'react';
import { Screen, ProfileData } from './types';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [profileData, setProfileData] = useState<ProfileData>({
    email: 'rithanya@example.com',
    phone: '',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  });

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomeScreen />;
      case 'book':
        return <BookScreen />;
      case 'profile':
        return (
          <ProfileScreen 
            data={profileData} 
            onUpdate={setProfileData} 
          />
        );
      default:
        return <WelcomeScreen onGetStarted={() => setCurrentScreen('home')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {renderScreen()}
      {currentScreen !== 'welcome' && (
        <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      )}
    </div>
  );
};

export default App;