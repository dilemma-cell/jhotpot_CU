import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  MapPin, 
  Clock, 
  DollarSign,
  Search,
  Filter,
  Star,
  Utensils,
  Book,
  Package,
  FileText,
  Heart
} from 'lucide-react';

export default function OrderPage() {
  const { user } = useAuth();
  const { items, addToCart, updateQuantity, removeFromCart, total } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', icon: Package },
    { id: 'food', name: 'Food', icon: Utensils },
    { id: 'stationery', name: 'Stationery', icon: Book },
    { id: 'essentials', name: 'Essentials', icon: Heart },
    { id: 'documents', name: 'Documents', icon: FileText }
  ];

  const vendors = [
    { id: 'all', name: 'All Vendors' },
    { id: 'central-canteen', name: 'Central Canteen' },
    { id: 'varsity-store', name: 'Varsity Store' },
    { id: 'tea-stall', name: 'Tea Stall' },
    { id: 'print-shop', name: 'Print Shop' },
    { id: 'medicine-shop', name: 'Medicine Shop' }
  ];

  const menuItems = [
    {
      id: '1',
      name: 'Chicken Biryani',
      vendor: 'Central Canteen',
      vendorId: 'central-canteen',
      category: 'food',
      price: 120,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Aromatic basmati rice with tender chicken'
    },
    {
      id: '2',
      name: 'Beef Curry + Rice',
      vendor: 'Central Canteen',
      vendorId: 'central-canteen',
      category: 'food',
      price: 100,
      rating: 4.3,
      image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Spicy beef curry with steamed rice'
    },
    {
      id: '3',
      name: 'Tea + Biscuit',
      vendor: 'Tea Stall',
      vendorId: 'tea-stall',
      category: 'food',
      price: 15,
      rating: 4.0,
      image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Fresh milk tea with local biscuits'
    },
    {
      id: '4',
      name: 'Notebook Set',
      vendor: 'Varsity Store',
      vendorId: 'varsity-store',
      category: 'stationery',
      price: 200,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1314410/pexels-photo-1314410.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: '5 notebooks with premium paper quality'
    },
    {
      id: '5',
      name: 'Pen Set (10pcs)',
      vendor: 'Varsity Store',
      vendorId: 'varsity-store',
      category: 'stationery',
      price: 150,
      rating: 4.2,
      image: 'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Blue ink pens, smooth writing'
    },
    {
      id: '6',
      name: 'Paracetamol (Strip)',
      vendor: 'Medicine Shop',
      vendorId: 'medicine-shop',
      category: 'essentials',
      price: 12,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3683071/pexels-photo-3683071.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Pain relief medication - 10 tablets'
    },
    {
      id: '7',
      name: 'Assignment Print',
      vendor: 'Print Shop',
      vendorId: 'print-shop',
      category: 'documents',
      price: 25,
      rating: 4.4,
      image: 'https://images.pexels.com/photos/4154979/pexels-photo-4154979.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'A4 paper, double sided printing'
    },
    {
      id: '8',
      name: 'Chicken Sandwich',
      vendor: 'Central Canteen',
      vendorId: 'central-canteen',
      category: 'food',
      price: 60,
      rating: 4.1,
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Fresh sandwich with grilled chicken'
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesVendor = selectedVendor === 'all' || item.vendorId === selectedVendor;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesVendor && matchesSearch;
  });

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Food & Items</h1>
          <p className="mt-2 text-gray-600">Choose from our campus vendors and get delivered in minutes</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for food, items, or vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 bg-white"
            >
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </select>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{item.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{item.vendor}</p>
                    <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">৳{item.price}</span>
                      
                      {items.find(cartItem => cartItem.id === item.id) ? (
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, items.find(cartItem => cartItem.id === item.id)!.quantity - 1)}
                            className="p-1 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-medium">
                            {items.find(cartItem => cartItem.id === item.id)?.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, items.find(cartItem => cartItem.id === item.id)!.quantity + 1)}
                            className="p-1 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            vendor: item.vendor,
                            category: item.category
                          })}
                          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingCart className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-gray-900">Your Order ({cartItemCount})</h3>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500">{item.vendor}</p>
                          <p className="text-sm font-semibold text-gray-900">৳{item.price} × {item.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">৳{total}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Delivery Fee:</span>
                      <span className="font-semibold">৳20</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>৳{total + 20}</span>
                    </div>
                  </div>

                  <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium mt-4">
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}