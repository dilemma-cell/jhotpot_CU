import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Clock, 
  Shield, 
  DollarSign, 
  Users, 
  Smartphone, 
  MapPin, 
  Star,
  ArrowRight,
  Package,
  Utensils,
  Book,
  FileText,
  Heart
} from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  const features = [
    {
      icon: Clock,
      title: 'ঝটপট Delivery',
      description: 'Super fast delivery within campus - order and get it in minutes!'
    },
    {
      icon: Shield,
      title: 'Verified Riders',
      description: 'All riders are CU students with verified IDs for your safety'
    },
    {
      icon: DollarSign,
      title: 'Flat ৳20 Rate',
      description: 'No surge pricing, no hidden fees - just ৳20 for any delivery'
    },
    {
      icon: Users,
      title: 'By Students, For Students',
      description: 'Built by CU students who understand your campus life needs'
    }
  ];

  const services = [
    {
      icon: Utensils,
      title: 'Food Delivery',
      description: 'Canteen meals, snacks, and café items delivered hot',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Book,
      title: 'Stationery',
      description: 'Books, pens, notebooks from nearby shops',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Heart,
      title: 'Essentials',
      description: 'Medicines, groceries, and daily necessities',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: FileText,
      title: 'Documents',
      description: 'Assignments, printouts, and photocopies',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Package,
      title: 'Parcels',
      description: 'Exchange items between dorms and departments',
      color: 'bg-red-100 text-red-600'
    }
  ];

  const stats = [
    { number: '500+', label: 'Happy Students' },
    { number: '50+', label: 'Active Riders' },
    { number: '1000+', label: 'Deliveries Made' },
    { number: '4.8★', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">ঝটপট</span> Campus Delivery
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Lightning-fast delivery across Chittagong University campus
            </p>
            <p className="text-lg mb-10 text-gray-200 max-w-2xl mx-auto">
              Order food, stationery, essentials, or send parcels - all delivered by trusted CU student riders in minutes!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link
                  to="/order"
                  className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <span>Order Now</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/login"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">{stat.number}</div>
                  <div className="text-gray-200 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ঝটপট?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're built specifically for campus life, by students who understand your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-2xl hover:shadow-lg transition-shadow bg-gray-50 hover:bg-white"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need, delivered right to your location on campus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 rounded-lg ${service.color} flex items-center justify-center mb-6`}>
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and reliable - just 3 steps to get your order
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Place Order</h3>
              <p className="text-gray-600">
                Choose what you need and set your delivery location on campus
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rider Accepts</h3>
              <p className="text-gray-600">
                A verified CU student rider picks up your order and starts delivery
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Receive & Pay</h3>
              <p className="text-gray-600">
                Get your order delivered and pay just ৳20 delivery fee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience ঝটপট Speed?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Join hundreds of CU students who are already enjoying fast, reliable campus delivery
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Sign Up as Student
              </Link>
              <Link
                to="/signup"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors"
              >
                Become a Rider
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}