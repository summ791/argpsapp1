import React, { useState, useEffect } from 'react';
import { Screen, ProfileData } from './types';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';
import { supabase } from './utils/supabaseClient';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  
  // Default initial state
  const [profileData, setProfileData] = useState<ProfileData>({
    email: 'argpsnutritiouslifestyle25@gmail.com',
    phone: '',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    password: 'argps2025'
  });

  // Load data from Supabase when app starts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Use maybeSingle() to avoid error if row doesn't exist yet
        const { data, error } = await supabase
          .from('admin_profile')
          .select('*')
          .eq('id', 1)
          .maybeSingle();

        if (error) {
          console.warn('Supabase fetch warning:', error.message);
          return;
        }

        if (data) {
          // If data exists, load it, including the password
          setProfileData({
            email: data.email || 'argpsnutritiouslifestyle25@gmail.com',
            phone: data.phone || '',
            imageUrl: data.image_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
            password: data.password || 'argps2025'
          });
        } else {
           // If row missing, auto-create the default row
           const defaultProfile = {
             id: 1,
             email: 'argpsnutritiouslifestyle25@gmail.com',
             phone: '',
             image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
             password: 'argps2025'
           };
           
           const { error: insertError } = await supabase
             .from('admin_profile')
             .insert([defaultProfile]);
             
           if (insertError) {
             console.warn('Could not auto-create initial profile:', insertError.message);
           } else {
             console.log('Initialized default profile in database.');
           }
        }
      } catch (err: any) {
        console.error('Unexpected error loading profile:', err.message || err);
      }
    };

    fetchProfile();
  }, []);

  // Save updates to Supabase
  const handleProfileUpdate = async (newData: ProfileData) => {
    // 1. Update local UI immediately
    setProfileData(newData);

    // 2. Update Supabase database
    try {
      const { error } = await supabase
        .from('admin_profile')
        .upsert({ 
          id: 1, 
          email: newData.email, 
          phone: newData.phone, 
          image_url: newData.imageUrl,
          password: newData.password 
        });
      
      if (error) {
        console.error('Error saving to Supabase:', error.message);
        alert('Failed to save changes. Please ensure you ran the SQL command to create the table.');
      } else {
        console.log('Profile updated successfully in Supabase');
      }
    } catch (err: any) {
      console.error('Unexpected error saving profile:', err.message || err);
    }
  };

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
            onUpdate={handleProfileUpdate} 
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
