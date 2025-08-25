import React, { useState } from 'react';
import { 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  Search,
  Filter,
  Utensils,
  Book,
  Package,
  FileText,
  Heart,
  ShoppingBag
} from 'lucide-react';

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: Package },
    { id: 'food', name: 'Food', icon: Utensils },
    { id: 'stationery', name: 'Stationery', icon: Book },
    { id: 'essentials', name: 'Essentials', icon: Heart },
    { id: 'documents', name: 'Services', icon: FileText }
  ];

  const vendors = [
    {
      id: 'central-canteen',
      name: 'Central Canteen',
      category: 'food',
      rating: 4.5,
      reviews: 156,
      deliveryTime: '8-12 min',
      location: 'Academic Building',
      phone: '+880 1700 000001',
      image: 'https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Fresh meals, biryani, curry, and daily specials',
      popular: ['Chicken Biryani', 'Beef Curry', 'Rice Meals'],
      isOpen: true,
      priceRange: '৳30-150'
    },
    {
      id: 'varsity-store',
      name: 'Varsity Store',
      category: 'stationery',
      rating: 4.3,
      reviews: 89,
      deliveryTime: '5-10 min',
      location: 'Main Gate',
      phone: '+880 1700 000002',
      image: 'https://images.pexels.com/photos/1314410/pexels-photo-1314410.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Books, notebooks, pens, and all study materials',
      popular: ['Notebooks', 'Pens', 'Textbooks'],
      isOpen: true,
      priceRange: '৳10-500'
    },
    {
      id: 'tea-stall',
      name: 'Shahid Tea Stall',
      category: 'food',
      rating: 4.0,
      reviews: 234,
      deliveryTime: '3-5 min',
      location: 'Library Corner',
      phone: '+880 1700 000003',
      image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Fresh tea, coffee, snacks, and light refreshments',
      popular: ['Milk Tea', 'Coffee', 'Biscuits'],
      isOpen: true,
      priceRange: '৳5-30'
    },
    {
      id: 'print-shop',
      name: 'Quick Print & Copy',
      category: 'documents',
      rating: 4.4,
      reviews: 67,
      deliveryTime: '10-15 min',
      location: 'Computer Building',
      phone: '+880 1700 000004',
      image: 'https://images.pexels.com/photos/4154979/pexels-photo-4154979.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Printing, photocopying, binding, and document services',
      popular: ['Assignment Print', 'Photocopying', 'Binding'],
      isOpen: true,
      priceRange: '৳2-50'
    },
    {
      id: 'medicine-shop',
      name: 'Campus Pharmacy',
      category: 'essentials',
      rating: 4.7,
      reviews: 45,
      deliveryTime: '5-8 min',
      location: 'Medical Center',
      phone: '+880 1700 000005',
      image: 'https://images.pexels.com/photos/3683071/pexels-photo-3683071.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Medicines, first aid supplies, and health essentials',
      popular: ['Paracetamol', 'Band-aids', 'Pain Relief'],
      isOpen: false,
      priceRange: '৳5-200'
    },
    {
      id: 'mini-market',
      name: 'Campus Mini Market',
      category: 'essentials',
      rating: 4.2,
      reviews: 78,
      deliveryTime: '6-10 min',
      location: 'Student Center',
      phone: '+880 1700 000006',
      image: 'https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Groceries, snacks, personal care, and daily necessities',
      popular: ['Snacks', 'Toiletries', 'Beverages'],
      isOpen: true,
      priceRange: '৳10-100'
    }
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Campus Vendors</h1>
          <p className="mt-2 text-gray-600">Discover all the shops and services available for delivery</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search vendors, food, or items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-orange-100 text-orange-600 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 card-hover">
              <div className="relative">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-48 object-cover"
                />
                {!vendor.isOpen && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Currently Closed
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    vendor.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {vendor.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{vendor.name}</h3>
                    <p className="text-sm text-gray-600">{vendor.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{vendor.rating}</span>
                    <span>({vendor.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{vendor.deliveryTime}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-4 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{vendor.location}</span>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Popular Items:</p>
                  <div className="flex flex-wrap gap-1">
                    {vendor.popular.slice(0, 3).map((item, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{vendor.priceRange}</span>
                  <div className="flex space-x-2">
                    <a
                      href={`tel:${vendor.phone}`}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                    </a>
                    <button
                      disabled={!vendor.isOpen}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        vendor.isOpen
                          ? 'bg-orange-500 text-white hover:bg-orange-600'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag className="h-4 w-4 inline mr-1" />
                      {vendor.isOpen ? 'Order Now' : 'Closed'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No vendors found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Want to Partner with ঝটপট?</h3>
          <p className="text-blue-700 mb-4">
            Are you a campus vendor? Join our platform and reach more students with delivery services.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Become a Partner
          </button>
        </div>
      </div>
    </div>
  );
}