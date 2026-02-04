"use client";

import React, { useState, useEffect } from 'react';
import { useUser, Profile } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, User, Upload } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface ProfileEditorProps {
  onSave: () => void;
}

const ProfileEditor = ({ onSave }: ProfileEditorProps) => {
  const { user, auth } = useUser();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    location: '',
    bio: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username,
        location: user.location,
        bio: user.bio,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const uploadAvatar = async (userId: string, file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    // 1. Upload the file
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true, // Overwrite existing file
      });

    if (uploadError) {
      console.error("Supabase Storage Upload Error:", uploadError);
      showError("Failed to upload avatar image.");
      return null;
    }

    // 2. Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !user) return;

    setIsSubmitting(true);
    let newAvatarUrl = user.avatarUrl;

    try {
      // 1. Handle Avatar Upload if a new file is selected
      if (avatarFile) {
        const url = await uploadAvatar(auth.id, avatarFile);
        if (url) {
          newAvatarUrl = url;
        } else {
          // If upload failed, stop submission
          setIsSubmitting(false);
          return;
        }
      }

      // 2. Update Profile Data in the database
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          location: formData.location,
          bio: formData.bio,
          avatar_url: newAvatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', auth.id);

      if (updateError) {
        console.error("Supabase Profile Update Error:", updateError);
        showError("Failed to save profile changes.");
      } else {
        showSuccess("Profile updated successfully!");
        onSave(); // Close the editor and trigger profile re-fetch
      }
    } catch (error) {
      console.error("Profile submission error:", error);
      showError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const avatarPreviewUrl = avatarFile ? URL.createObjectURL(avatarFile) : user?.avatarUrl;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative h-24 w-24 rounded-full border-4 border-secondary p-1 bg-white shadow-lg overflow-hidden">
          <img 
            src={avatarPreviewUrl} 
            alt="Avatar Preview" 
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        <Label htmlFor="avatar-upload" className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          <Upload size={16} />
          {avatarFile ? 'Change Image' : 'Upload New Avatar'}
        </Label>
        <Input 
          id="avatar-upload" 
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input 
            id="firstName" 
            value={formData.firstName}
            onChange={handleChange}
            className="rounded-lg border-gray-300 focus:border-secondary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input 
            id="lastName" 
            value={formData.lastName}
            onChange={handleChange}
            className="rounded-lg border-gray-300 focus:border-secondary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input 
          id="username" 
          value={formData.username}
          onChange={handleChange}
          className="rounded-lg border-gray-300 focus:border-secondary"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input 
          id="location" 
          value={formData.location}
          onChange={handleChange}
          className="rounded-lg border-gray-300 focus:border-secondary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea 
          id="bio" 
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          className="rounded-lg border-gray-300 focus:border-secondary"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full rounded-lg bg-primary hover:bg-primary/90 text-white h-10 font-bold shadow-lg shadow-primary/40 transition-all"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save size={16} className="mr-2" />
        )}
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
};

export default ProfileEditor;