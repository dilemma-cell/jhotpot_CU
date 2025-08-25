import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp,
  Eye,
  UserCheck,
  UserX,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  Bell
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const dashboardStats = {
    totalUsers: 524,
    activeRiders: 48,
    todayOrders: 156,
    monthlyRevenue: 12480,
    avgDeliveryTime: '12 min',
    platformCommission: 2496
  };

  const recentOrders = [
    { id: '1001', customer: 'Fatima Ahmed', rider: 'Karim Hassan', status: 'delivered', amount: 170, time: '5 min ago' },
    { id: '1002', customer: 'Rahman Hasan', rider: 'Sadia Khan', status: 'in_progress', amount: 85, time: '12 min ago' },
    { id: '1003', customer: 'Nusrat Jahan', rider: 'Pending...', status: 'pending', amount: 125, time: '18 min ago' }
  ];

  const pendingRiders = [
    { id: '1', name: 'Abir Rahman', studentId: 'CU-2023-045', phone: '+880 1700 000001', applied: '2 hours ago' },
    { id: '2', name: 'Tasnia Khan', studentId: 'CU-2022-078', phone: '+880 1700 000002', applied: '5 hours ago' },
    { id: '3', name: 'Rakib Ahmed', studentId: 'CU-2023-112', phone: '+880 1700 000003', applied: '1 day ago' }
  ];

  const monthlyData = [
    { month: 'Jan', orders: 1200, revenue: 24000 },
    { month: 'Feb', orders: 1350, revenue: 27000 },
    { month: 'Mar', orders: 1500, revenue: 30000 },
    { month: 'Apr', orders: 1680, revenue: 33600 },
    { month: 'May', orders: 1850, revenue: 37000 },
    { month: 'Jun', orders: 2100, revenue: 42000 }
  ];

  const quickStats = [
    { 
      label: 'Total Users', 
      value: dashboardStats.totalUsers.toString(), 
      icon: Users, 
      color: 'bg-blue-100 text-blue-600',
      change: '+12%'
    },
    { 
      label: 'Active Riders', 
      value: dashboardStats.activeRiders.toString(), 
      icon: UserCheck, 
      color: 'bg-green-100 text-green-600',
      change: '+5'
    },
    { 
      label: "Today's Orders", 
      value: dashboardStats.todayOrders.toString(), 
      icon: Package, 
      color: 'bg-purple-100 text-purple-600',
      change: '+18%'
    },
    { 
      label: 'Revenue (Month)', 
      value: `৳${dashboardStats.monthlyRevenue}`, 
      icon: DollarSign, 
      color: 'bg-yellow-100 text-yellow-600',
      change: '+23%'
    }
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
          <Package className="w-3 h-3 mr-1" />
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
            Admin Dashboard 👨‍💼
          </h1>
          <p className="mt-2 text-gray-600">
            Overview of ঝটপট platform operations and performance
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'orders', name: 'Orders', icon: Package },
                { id: 'riders', name: 'Riders', icon: Users },
                { id: 'settings', name: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-medium text-gray-900">#{order.id}</span>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-gray-600">{order.customer} → {order.rider}</p>
                      <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">৳{order.amount}</p>
                      <button className="text-orange-600 hover:text-orange-700 text-sm">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Performance */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Performance</h2>
              <div className="space-y-4">
                {monthlyData.slice(-3).map((data) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 w-12">{data.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{data.orders} orders</span>
                        <span>৳{data.revenue}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                          style={{ width: `${(data.orders / 2500) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">৳{dashboardStats.platformCommission}</p>
                  <p className="text-sm text-green-800">Platform Revenue</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-lg font-bold text-blue-600">{dashboardStats.avgDeliveryTime}</p>
                  <p className="text-sm text-blue-800">Avg Delivery Time</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'riders' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Pending Rider Applications</h2>
              <span className="text-sm text-gray-500">{pendingRiders.length} pending</span>
            </div>

            <div className="space-y-4">
              {pendingRiders.map((rider) => (
                <div key={rider.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="font-medium text-orange-600">
                        {rider.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{rider.name}</h3>
                      <p className="text-sm text-gray-600">{rider.studentId}</p>
                      <p className="text-sm text-gray-500">{rider.phone} • {rider.applied}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-1">
                      <UserX className="h-4 w-4" />
                      <span>Reject</span>
                    </button>
                    <button className="bg-green-100 text-green-600 px-3 py-1.5 rounded-lg hover:bg-green-200 transition-colors flex items-center space-x-1">
                      <UserCheck className="h-4 w-4" />
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Platform Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Fee
                  </label>
                  <input
                    type="number"
                    defaultValue="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Flat delivery fee in ৳</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Commission
                  </label>
                  <input
                    type="number"
                    defaultValue="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Percentage of delivery fee</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Delivery Distance
                  </label>
                  <input
                    type="number"
                    defaultValue="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum delivery distance in km</p>
                </div>

                <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">System Maintenance</p>
                      <p className="text-sm text-yellow-700">Scheduled for tonight 2-4 AM</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Daily Backup</p>
                      <p className="text-sm text-green-700">Completed successfully</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800">New Feature</p>
                      <p className="text-sm text-blue-700">Group orders now available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}