import React from 'react';

export type Screen = 'welcome' | 'home' | 'book' | 'profile';

export interface NavItem {
  id: Screen;
  label: string;
  icon: React.ComponentType<any>;
}

export interface ProfileData {
  email: string;
  phone: string;
  imageUrl: string;
}