
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface UserProfile {
  name: string;
  email: string;
  notificationsEnabled: boolean;
  emailDigest: boolean;
  soundEffects: boolean;
}

interface UserContextProps {
  userProfile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const defaultProfile: UserProfile = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  notificationsEnabled: true,
  emailDigest: false,
  soundEffects: true
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
  });
  
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const updateProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...profile };
      return updated;
    });
    
    toast({
      title: "Profile updated",
      description: "Your profile settings have been saved",
    });
  };

  return (
    <UserContext.Provider value={{ userProfile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
