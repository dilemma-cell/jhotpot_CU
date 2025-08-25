import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Shield, 
  Gift,
  Settings,
  Bell,
  CreditCard,
  Star,
  Award,
  Check
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    studentId: user?.studentId || ''
  });

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const achievements = [
    { 
      id: 1, 
      title: 'First Order', 
      description: 'Placed your first ঝটপট order', 
      icon: '🎉', 
      earned: true,
      date: 'Jan 2024'
    },
    { 
      id: 2, 
      title: 'Regular Customer', 
      description: 'Completed 10 orders', 
      icon: '📦', 
      earned: true,
      date: 'Feb 2024'
    },
    { 
      id: 3, 
      title: 'Loyal Patron', 
      description: 'Completed 25 orders', 
      icon: '⭐', 
      earned: true,
      date: 'Mar 2024'
    },
    { 
      id: 4, 
      title: 'Campus Legend', 
      description: 'Complete 50 orders', 
      icon: '🏆', 
      earned: false,
      progress: '24/50'
    }
  ];

  const referralStats = {
    totalReferred: 3,
    bonusEarned: 150,
    pendingReferrals: 1
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
                <p className="text-gray-600 mt-1">{user?.studentId}</p>
                <div className="flex items-center justify-center mt-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user?.verified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user?.verified ? (
                      <>
                        <Check className="h-4 w-4 inline mr-1" />
                        Verified Student
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 inline mr-1" />
                        Pending Verification
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>4.9 Customer Rating</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Award className="h-4 w-4 text-purple-400" />
                  <span>24 Orders Completed</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Gift className="h-4 w-4 text-green-400" />
                  <span>3 Friends Referred</span>
                </div>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-6 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                {isEditing && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{user?.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{user?.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{user?.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Shield className="h-4 w-4 inline mr-2" />
                    Student ID
                  </label>
                  <p className="text-gray-900 py-2">{user?.studentId}</p>
                  <p className="text-xs text-gray-500">Cannot be changed</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`p-4 rounded-lg border-2 ${
                    achievement.earned 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          achievement.earned ? 'text-green-900' : 'text-gray-700'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm mt-1 ${
                          achievement.earned ? 'text-green-700' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                        {achievement.earned ? (
                          <p className="text-xs text-green-600 mt-2">Earned {achievement.date}</p>
                        ) : (
                          <p className="text-xs text-gray-500 mt-2">Progress: {achievement.progress}</p>
                        )}
                      </div>
                      {achievement.earned && (
                        <Check className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Referral Program */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Referral Program</h3>
                  <p className="text-purple-100 mb-4">
                    Invite friends and earn ৳50 for each successful referral
                  </p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div>
                      <p className="font-semibold">{referralStats.totalReferred}</p>
                      <p className="text-purple-200">Friends Referred</p>
                    </div>
                    <div>
                      <p className="font-semibold">৳{referralStats.bonusEarned}</p>
                      <p className="text-purple-200">Bonus Earned</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mt-4">
                    <code className="bg-white bg-opacity-20 px-3 py-1 rounded text-sm font-mono">
                      {user?.studentId?.replace('CU-', '').substring(0, 6)}REF
                    </code>
                    <button className="bg-white text-purple-600 px-4 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
                      Copy Code
                    </button>
                  </div>
                </div>
                <Gift className="h-16 w-16 text-purple-200" />
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Push Notifications</h4>
                    <p className="text-sm text-gray-500">Get notified about order updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Email Updates</h4>
                    <p className="text-sm text-gray-500">Receive weekly summaries and offers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Location Sharing</h4>
                    <p className="text-sm text-gray-500">Help riders find you more easily</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}