"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseAuthUser } from '@supabase/supabase-js';
import { showSuccess, showError } from '@/utils/toast';
import { useNavigate, useLocation } from 'react-router-dom';

// Define the Profile structure based on the Supabase table (using camelCase for frontend)
export interface Profile {
  id: string;
  username: string;
  email: string; // Derived from auth.user
  location: string;
  bio: string;
  avatarUrl: string;
  ownedCameraIds: string[];
  wishlistCameraIds: string[];
}

interface UserContextType {
  session: Session | null;
  auth: SupabaseAuthUser | null;
  user: Profile | null; // Exposes the fetched profile data
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserCollection: (cameraId: string, type: 'owned' | 'wishlist', action: 'add' | 'remove') => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const mapSupabaseProfileToFrontend = (data: any, authUser: SupabaseAuthUser | null): Profile => ({
  id: data.id,
  username: data.username || authUser?.email?.split('@')[0] || 'User',
  email: authUser?.email || '',
  location: data.location || 'Earth',
  bio: data.bio || 'A new Digi-Dreamer!',
  avatarUrl: data.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
  ownedCameraIds: data.owned_camera_ids || [],
  wishlistCameraIds: data.wishlist_camera_ids || [],
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [authUser, setAuthUser] = useState<SupabaseAuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Fetch Profile Data
  const fetchProfile = async (userId: string, currentAuthUser: SupabaseAuthUser) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
    } else if (data) {
      const mappedProfile = mapSupabaseProfileToFrontend(data, currentAuthUser);
      setProfile(mappedProfile);
    }
    setIsLoading(false);
  };

  // 2. Session Management
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        const user = currentSession?.user ?? null;
        setAuthUser(user);
        setIsLoading(true);

        if (user) {
          // User signed in or session refreshed
          fetchProfile(user.id, user);
          if (location.pathname === '/login') {
            navigate('/profile', { replace: true });
          }
        } else {
          // User signed out
          setProfile(null);
          setIsLoading(false);
          if (location.pathname === '/profile') {
            navigate('/login', { replace: true });
          }
        }
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      const user = initialSession?.user ?? null;
      setAuthUser(user);
      if (user) {
        fetchProfile(user.id, user);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [location.pathname, navigate]);

  // 3. Auth Actions
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showError(error.message);
      setIsLoading(false);
    } else {
      showSuccess("Logged in successfully!");
      // Profile fetching handled by onAuthStateChange listener
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError("Failed to log out.");
    } else {
      showSuccess("Logged out successfully.");
      setProfile(null);
      navigate('/login');
    }
  };

  // 4. Profile Data Update (Collection)
  const updateUserCollection = async (cameraId: string, type: 'owned' | 'wishlist', action: 'add' | 'remove') => {
    if (!authUser || !profile) {
      showError("You must be logged in to update your collection.");
      return;
    }

    const listKey = type === 'owned' ? 'ownedCameraIds' : 'wishlistCameraIds';
    const dbListKey = type === 'owned' ? 'owned_camera_ids' : 'wishlist_camera_ids';
    
    let updatedList = [...profile[listKey]];

    if (action === 'add' && !updatedList.includes(cameraId)) {
      updatedList.push(cameraId);
    } else if (action === 'remove' && updatedList.includes(cameraId)) {
      updatedList = updatedList.filter(id => id !== cameraId);
    } else {
      return; // No change needed
    }

    const { error } = await supabase
      .from('profiles')
      .update({ [dbListKey]: updatedList, updated_at: new Date().toISOString() })
      .eq('id', authUser.id);

    if (error) {
      console.error("Error updating collection:", error);
      showError(`Failed to ${action} camera from ${type}.`);
    } else {
      // Optimistically update local state
      setProfile(prevProfile => prevProfile ? { ...prevProfile, [listKey]: updatedList } : null);
      showSuccess(`${type === 'owned' ? 'Collection' : 'Wishlist'} updated successfully!`);
    }
  };

  const value = useMemo(() => ({
    session,
    auth: authUser,
    user: profile, // Expose profile as 'user' for existing components
    isLoading,
    login,
    logout,
    updateUserCollection,
  }), [session, authUser, profile, isLoading]);

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