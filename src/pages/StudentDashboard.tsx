import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Package, 
  Clock, 
  MapPin, 
  Star, 
  TrendingUp,
  ShoppingCart,
  Wallet,
  Gift,
  Users,
  Bell,
  CheckCircle,
  AlertCircle,
  Truck
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const recentOrders = [
    {
      id: '1',
      status: 'delivered',
      items: 'Chicken Biryani, Cold Drinks',
      vendor: 'Central Canteen',
      time: '2 hours ago',
      amount: 150,
      deliveryFee: 20
    },
    {
      id: '2',
      status: 'in_progress',
      items: 'Notebook, Pens',
      vendor: 'Varsity Store',
      time: '30 minutes ago',
      amount: 85,
      deliveryFee: 20
    },
    {
      id: '3',
      status: 'pending',
      items: 'Assignment Printout',
      vendor: 'Print Shop',
      time: '1 hour ago',
      amount: 25,
      deliveryFee: 20
    }
  ];

  const favoriteItems = [
    { name: 'Chicken Biryani', vendor: 'Central Canteen', orders: 12, price: 120 },
    { name: 'Tea + Biscuit', vendor: 'Tea Stall', orders: 8, price: 15 },
    { name: 'Notebook Set', vendor: 'Varsity Store', orders: 5, price: 200 }
  ];

  const quickStats = [
    { label: 'Total Orders', value: '24', icon: Package, color: 'bg-blue-100 text-blue-600' },
    { label: 'This Month', value: '8', icon: TrendingUp, color: 'bg-green-100 text-green-600' },
    { label: 'Saved Money', value: '৳240', icon: Wallet, color: 'bg-purple-100 text-purple-600' },
    { label: 'Rating', value: '4.9', icon: Star, color: 'bg-yellow-100 text-yellow-600' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Delivered
        </span>;
      case 'in_progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Truck className="w-3 h-3 mr-1" />
          In Progress
        </span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name.split(' ')[0]}! 👋
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your orders and ঝটপট account
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color} mr-4`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/order"
              className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <ShoppingCart className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Order Now</span>
            </Link>

            <Link
              to="/tracking"
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <MapPin className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Track Order</span>
            </Link>

            <Link
              to="/wallet"
              className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Wallet className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">My Wallet</span>
            </Link>

            <Link
              to="/profile"
              className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Gift className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Rewards</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <Link to="/orders" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{order.items}</p>
                      <p className="text-sm text-gray-500">{order.vendor} • {order.time}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      Items: ৳{order.amount} + Delivery: ৳{order.deliveryFee}
                    </span>
                    <span className="font-semibold text-gray-900">
                      ৳{order.amount + order.deliveryFee}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Items */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Favorites</h2>
            <div className="space-y-4">
              {favoriteItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.vendor}</p>
                    <p className="text-xs text-gray-400">Ordered {item.orders} times</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">৳{item.price}</p>
                    <button className="text-sm text-orange-600 hover:text-orange-700">
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Refer Friends & Earn!</h3>
              <p className="text-orange-100 mb-4">
                Get ৳50 credit for each friend who signs up using your referral code
              </p>
              <div className="flex items-center space-x-3">
                <code className="bg-white bg-opacity-20 px-3 py-1 rounded text-sm font-mono">
                  {user?.studentId?.replace('CU-', '').substring(0, 6)}REF
                </code>
                <button className="bg-white text-orange-600 px-4 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
                  Copy Code
                </button>
              </div>
            </div>
            <Users className="h-16 w-16 text-orange-200" />
          </div>
        </div>
      </div>
    </div>
  );
}