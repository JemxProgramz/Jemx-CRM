import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAppStore } from '../store/useAppStore';
import { useToastStore } from '../store/useToastStore';
import { Camera } from 'lucide-react';
import logoUrl from '../assets/logo.jpg';

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  role: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordForm = z.infer<typeof passwordSchema>;

export function Settings() {
  const { user, updateUser } = useAppStore();
  const addToast = useToastStore(state => state.addToast);

  const { register: registerProfile, handleSubmit: handleProfileSubmit, formState: { errors: profileErrors, isSubmitting: isProfileSubmitting } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      company: 'Jemx CRM Inc.',
      role: user?.role || '',
    }
  });

  const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting }, reset: resetPassword } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema)
  });

  const onProfileSave = async (data: ProfileForm) => {
    updateUser({ name: data.name, email: data.email, role: data.role });
    addToast({ type: 'success', message: 'Profile updated successfully!' });
  };

  const onPasswordSave = async (data: PasswordForm) => {
    addToast({ type: 'success', message: 'Password updated successfully!' });
    resetPassword();
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Settings</h1>
        <p className="text-text-muted">Manage your account preferences and settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-2">
          <h3 className="font-semibold text-lg">Profile Information</h3>
          <p className="text-sm text-text-muted">Update your account's profile information and email address.</p>
        </div>
        
        <Card className="md:col-span-2">
          <form onSubmit={handleProfileSubmit(onProfileSave)} className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-white text-3xl font-medium shadow-[var(--shadow-clay-sm)] overflow-hidden border border-black/5 dark:border-white/5">
                  <img src={logoUrl} alt="Avatar" className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <div>
                <input 
                  type="file" 
                  id="avatar-upload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={() => addToast({ type: 'success', message: 'Avatar updated successfully!' })}
                />
                <Button 
                  type="button" 
                  variant="secondary" 
                  size="sm"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                >
                  Change Avatar
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Full Name</label>
                <Input {...registerProfile("name")} placeholder="Alex Doe" />
                {profileErrors.name && <p className="text-danger text-xs">{profileErrors.name.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Email Address</label>
                <Input {...registerProfile("email")} type="email" placeholder="alex@company.com" />
                {profileErrors.email && <p className="text-danger text-xs">{profileErrors.email.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Company</label>
                <Input {...registerProfile("company")} placeholder="Jemx CRM Inc." />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Role</label>
                <Input {...registerProfile("role")} placeholder="Admin" />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isProfileSubmitting}>
                {isProfileSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <hr className="border-black/5 dark:border-white/5 my-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-2">
          <h3 className="font-semibold text-lg">Update Password</h3>
          <p className="text-sm text-text-muted">Ensure your account is using a long, random password to stay secure.</p>
        </div>
        
        <Card className="md:col-span-2">
          <form onSubmit={handlePasswordSubmit(onPasswordSave)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Current Password</label>
              <Input {...registerPassword("currentPassword")} type="password" />
              {passwordErrors.currentPassword && <p className="text-danger text-xs">{passwordErrors.currentPassword.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">New Password</label>
              <Input {...registerPassword("newPassword")} type="password" />
              {passwordErrors.newPassword && <p className="text-danger text-xs">{passwordErrors.newPassword.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Confirm Password</label>
              <Input {...registerPassword("confirmPassword")} type="password" />
              {passwordErrors.confirmPassword && <p className="text-danger text-xs">{passwordErrors.confirmPassword.message}</p>}
            </div>
            
            <div className="flex justify-end pt-2">
              <Button type="submit" variant="secondary" disabled={isPasswordSubmitting}>
                {isPasswordSubmitting ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
