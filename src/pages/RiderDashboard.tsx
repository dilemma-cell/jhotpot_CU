import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  DollarSign, 
  Package, 
  Clock, 
  Star, 
  TrendingUp,
  MapPin,
  CheckCircle,
  X,
  Phone,
  Navigation,
  AlertTriangle,
  Trophy,
  Target
} from 'lucide-react';

export default function RiderDashboard() {
  const { user } = useAuth();
  const [activeOrders, setActiveOrders] = useState([
    {
      id: '1',
      customer: 'Fatima Ahmed',
      phone: '+880 1700 000001',
      pickup: 'Central Canteen',
      delivery: 'Girls Hostel - Room 205',
      items: 'Chicken Biryani, Cold Drinks',
      amount: 150,
      deliveryFee: 20,
      distance: '0.8 km',
      estimatedTime: '8 min',
      status: 'accepted'
    },
    {
      id: '2',
      customer: 'Rahman Hasan',
      phone: '+880 1700 000002',
      pickup: 'Print Shop',
      delivery: 'Computer Science Building',
      items: 'Assignment Printout (10 pages)',
      amount: 25,
      deliveryFee: 20,
      distance: '0.5 km',
      estimatedTime: '5 min',
      status: 'new'
    }
  ]);

  const [todayStats] = useState({
    earnings: 180,
    deliveries: 9,
    rating: 4.8,
    onlineHours: 4.5
  });

  const [weeklyEarnings] = useState([
    { day: 'Mon', amount: 160 },
    { day: 'Tue', amount: 200 },
    { day: 'Wed', amount: 180 },
    { day: 'Thu', amount: 220 },
    { day: 'Fri', amount: 240 },
    { day: 'Sat', amount: 300 },
    { day: 'Sun', amount: 180 }
  ]);

  const handleAcceptOrder = (orderId: string) => {
    setActiveOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: 'accepted' }
          : order
      )
    );
  };

  const handleRejectOrder = (orderId: string) => {
    setActiveOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const handleCompleteOrder = (orderId: string) => {
    setActiveOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const quickStats = [
    { 
      label: "Today's Earnings", 
      value: `৳${todayStats.earnings}`, 
      icon: DollarSign, 
      color: 'bg-green-100 text-green-600',
      change: '+15%'
    },
    { 
      label: 'Deliveries', 
      value: todayStats.deliveries.toString(), 
      icon: Package, 
      color: 'bg-blue-100 text-blue-600',
      change: '+3'
    },
    { 
      label: 'Rating', 
      value: todayStats.rating.toString(), 
      icon: Star, 
      color: 'bg-yellow-100 text-yellow-600',
      change: '↑'
    },
    { 
      label: 'Online Hours', 
      value: `${todayStats.onlineHours}h`, 
      icon: Clock, 
      color: 'bg-purple-100 text-purple-600',
      change: 'Active'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Rider Dashboard 🏍️
              </h1>
              <p className="mt-2 text-gray-600">
                Welcome back, {user?.name.split(' ')[0]}! Ready to earn some money?
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Online
              </span>
              <button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
                Go Offline
              </button>
            </div>
          </div>
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

        {/* Active Orders */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Available Orders</h2>
            <span className="text-sm text-gray-500">{activeOrders.length} orders</span>
          </div>

          {activeOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Right Now</h3>
              <p className="text-gray-500">New orders will appear here when available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{order.customer}</h3>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Phone className="h-4 w-4" />
                        </button>
                        {order.status === 'new' && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            New Order
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{order.items}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-green-600 mr-2" />
                          <span>Pickup: {order.pickup}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-red-600 mr-2" />
                          <span>Drop: {order.delivery}</span>
                        </div>
                        <div className="flex items-center">
                          <Navigation className="h-4 w-4 text-blue-600 mr-2" />
                          <span>{order.distance} • {order.estimatedTime}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                          <span>Earning: ৳{order.deliveryFee}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 text-right">
                      <p className="text-lg font-bold text-gray-900 mb-2">৳{order.deliveryFee}</p>
                      <p className="text-sm text-gray-500">Delivery fee</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    {order.status === 'new' ? (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleAcceptOrder(order.id)}
                          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={() => handleRejectOrder(order.id)}
                          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
                        >
                          <X className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-3">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Navigate
                        </button>
                        <button
                          onClick={() => handleCompleteOrder(order.id)}
                          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Mark Complete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Earnings Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Earnings</h2>
            <div className="space-y-3">
              {weeklyEarnings.map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 w-10">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${(day.amount / 300) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-16 text-right">৳{day.amount}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <TrendingUp className="h-4 w-4 inline mr-1" />
                You earned ৳1,480 this week - 12% more than last week!
              </p>
            </div>
          </div>

          {/* Achievements & Tips */}
          <div className="space-y-6">
            {/* Recent Achievement */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Achievement</h3>
              <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                <Trophy className="h-10 w-10 text-yellow-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Speed Demon</h4>
                  <p className="text-sm text-gray-600">Completed 5 deliveries in under 30 minutes!</p>
                </div>
              </div>
            </div>

            {/* Daily Goal */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Goal</h3>
              <div className="flex items-center space-x-4">
                <Target className="h-8 w-8 text-blue-600" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span>9 of 15 deliveries</span>
                    <span>60%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">6 more to reach your daily goal!</p>
                </div>
              </div>
            </div>

            {/* Safety Reminder */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Safety Reminder</h3>
              <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm text-red-800 font-medium mb-1">Always wear your helmet</p>
                  <p className="text-xs text-red-600">Safety first - it's required for all ঝটপট riders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}