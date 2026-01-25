'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { usersApi } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { User } from '@/types';

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, isAuthenticated } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchProfile();
  }, [isAuthenticated, router]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await usersApi.getProfile();
      const userData = response.data;
      setUser(userData);
      setFormData({
        name: userData.name || '',
        email: userData.email,
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await usersApi.updateProfile(formData);
      toast.success('Profile updated successfully!');
      fetchProfile();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">My Profile</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {user && 'stats' in user && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold mb-4">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold">{(user as any).stats?.orders || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Cart Items</p>
                    <p className="text-2xl font-bold">{(user as any).stats?.cartItems || 0}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-900 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
