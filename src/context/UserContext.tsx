"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';
import { User, MOCK_USERS } from '@/data/mockData';
import { showSuccess, showError } from '@/utils/toast';

interface UserContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateUserCollection: (cameraId: string, type: 'owned' | 'wishlist', action: 'add' | 'remove') => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    // Mock authentication logic
    const foundUser = MOCK_USERS.find(u => u.username === username);

    // Since we are mocking, we only check username and a fixed password
    if (foundUser && password === 'password') {
      setCurrentUser(foundUser);
      showSuccess(`Welcome back, ${foundUser.username}!`);
      return true;
    } else {
      showError("Invalid username or password.");
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    showSuccess("Logged out successfully.");
  };

  const updateUserCollection = (cameraId: string, type: 'owned' | 'wishlist', action: 'add' | 'remove') => {
    if (!currentUser) return;

    setCurrentUser(prevUser => {
      if (!prevUser) return null;

      const listKey = type === 'owned' ? 'ownedCameraIds' : 'wishlistCameraIds';
      let updatedList = [...prevUser[listKey]];

      if (action === 'add' && !updatedList.includes(cameraId)) {
        updatedList.push(cameraId);
        showSuccess(`${type === 'owned' ? 'Added to collection' : 'Added to wishlist'}!`);
      } else if (action === 'remove' && updatedList.includes(cameraId)) {
        updatedList = updatedList.filter(id => id !== cameraId);
        showSuccess(`${type === 'owned' ? 'Removed from collection' : 'Removed from wishlist'}.`);
      } else {
        return prevUser; // No change
      }

      return {
        ...prevUser,
        [listKey]: updatedList,
      };
    });
  };

  const value = useMemo(() => ({
    user: currentUser,
    login,
    logout,
    updateUserCollection,
  }), [currentUser]);

  return (
    <UserContext.Provider value={value}>
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