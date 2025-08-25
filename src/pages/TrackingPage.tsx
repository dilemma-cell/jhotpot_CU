import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  MapPin, 
  Clock, 
  CheckCircle, 
  Package, 
  Truck, 
  Star,
  Phone,
  MessageCircle,
  Navigation,
  User
} from 'lucide-react';

export default function TrackingPage() {
  const { user } = useAuth();
  const [activeOrder, setActiveOrder] = useState(null);

  // Mock tracking data
  const trackingData = {
    orderId: '1001',
    status: 'in_progress',
    customer: user?.name || 'Ahmed Rahman',
    items: 'Chicken Biryani, Cold Drinks',
    vendor: 'Central Canteen',
    total: 170,
    deliveryFee: 20,
    estimatedTime: '5-8 min',
    rider: {
      name: 'Karim Hassan',
      phone: '+880 1700 000001',
      rating: 4.8,
      vehicle: 'Red Motorcycle',
      avatar: 'KH'
    },
    timeline: [
      { 
        status: 'placed', 
        time: '12:45 PM', 
        title: 'Order Placed', 
        description: 'Your order has been received',
        completed: true 
      },
      { 
        status: 'accepted', 
        time: '12:46 PM', 
        title: 'Order Accepted', 
        description: 'Karim has accepted your order',
        completed: true 
      },
      { 
        status: 'pickup', 
        time: '12:50 PM', 
        title: 'Picked Up', 
        description: 'Order collected from Central Canteen',
        completed: true 
      },
      { 
        status: 'delivery', 
        time: 'Now', 
        title: 'On the Way', 
        description: 'Karim is coming to your location',
        completed: false,
        active: true 
      },
      { 
        status: 'delivered', 
        time: '~12:58 PM', 
        title: 'Delivered', 
        description: 'Order will be delivered soon',
        completed: false 
      }
    ],
    location: {
      pickup: 'Central Canteen',
      delivery: 'Boys Hostel - Room 305',
      currentLocation: 'Near Library'
    }
  };

  const recentOrders = [
    { 
      id: '1001', 
      status: 'in_progress', 
      items: 'Chicken Biryani, Cold Drinks',
      time: '5 min ago',
      rider: 'Karim Hassan'
    },
    { 
      id: '1000', 
      status: 'delivered', 
      items: 'Tea + Biscuit',
      time: '2 hours ago',
      rider: 'Sadia Khan'
    },
    { 
      id: '999', 
      status: 'delivered', 
      items: 'Notebook Set',
      time: '1 day ago',
      rider: 'Rahman Ahmed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  useEffect(() => {
    // Set active order to the first in-progress order
    const inProgressOrder = recentOrders.find(order => order.status === 'in_progress');
    if (inProgressOrder) {
      setActiveOrder(inProgressOrder.id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="mt-2 text-gray-600">Stay updated on your delivery progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order List */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Orders</h2>
            
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div 
                  key={order.id}
                  onClick={() => setActiveOrder(order.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    activeOrder === order.id 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">#{order.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status === 'in_progress' ? 'Active' : 'Completed'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{order.items}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{order.time}</span>
                    <span>By {order.rider}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Order Details */}
          <div className="lg:col-span-2">
            {activeOrder === '1001' ? (
              <div className="space-y-6">
                {/* Order Status Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Order #{trackingData.orderId}</h2>
                      <p className="text-gray-600">{trackingData.items}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <Truck className="w-4 h-4 mr-1" />
                        On the Way
                      </span>
                      <p className="text-sm text-gray-500 mt-1">ETA: {trackingData.estimatedTime}</p>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-6">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Live tracking map</p>
                      <p className="text-sm text-gray-400">Rider is {trackingData.location.currentLocation}</p>
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800">Pickup Location</p>
                        <p className="text-sm text-green-700">{trackingData.location.pickup}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800">Delivery Location</p>
                        <p className="text-sm text-red-700">{trackingData.location.delivery}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-gray-600">Items:</span>
                      <span className="font-medium">৳{trackingData.total - trackingData.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-gray-600">Delivery Fee:</span>
                      <span className="font-medium">৳{trackingData.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>৳{trackingData.total}</span>
                    </div>
                  </div>
                </div>

                {/* Rider Info */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Your Rider</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="font-medium text-orange-600">{trackingData.rider.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{trackingData.rider.name}</h4>
                        <p className="text-sm text-gray-600">{trackingData.rider.vehicle}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{trackingData.rider.rating}</span>
                          <span className="text-sm text-gray-500">rating</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="p-3 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors">
                        <Phone className="h-5 w-5" />
                      </button>
                      <button className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                        <MessageCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Order Timeline</h3>
                  
                  <div className="space-y-4">
                    {trackingData.timeline.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-green-100 text-green-600' 
                            : step.active 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : step.active ? (
                            <Truck className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${
                              step.completed || step.active ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {step.title}
                            </h4>
                            <span className="text-sm text-gray-500">{step.time}</span>
                          </div>
                          <p className={`text-sm mt-1 ${
                            step.completed || step.active ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {activeOrder ? 'Order Completed' : 'Select an Order'}
                </h3>
                <p className="text-gray-500">
                  {activeOrder 
                    ? 'This order has been successfully delivered' 
                    : 'Choose an order from the list to view tracking details'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}