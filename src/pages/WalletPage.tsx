import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Wallet, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard,
  Smartphone,
  Gift,
  History,
  TrendingUp,
  DollarSign
} from 'lucide-react';

export default function WalletPage() {
  const { user, updateUser } = useAuth();
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('bkash');

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', icon: '📱', color: 'bg-pink-100 text-pink-600' },
    { id: 'nagad', name: 'Nagad', icon: '💳', color: 'bg-orange-100 text-orange-600' },
    { id: 'rocket', name: 'Rocket', icon: '🚀', color: 'bg-purple-100 text-purple-600' }
  ];

  const transactions = [
    { 
      id: '1', 
      type: 'debit', 
      amount: 170, 
      description: 'Order #1001 - Chicken Biryani', 
      time: '2 hours ago',
      status: 'completed'
    },
    { 
      id: '2', 
      type: 'credit', 
      amount: 200, 
      description: 'Wallet top-up via bKash', 
      time: '3 hours ago',
      status: 'completed'
    },
    { 
      id: '3', 
      type: 'debit', 
      amount: 45, 
      description: 'Order #999 - Tea + Biscuit', 
      time: '1 day ago',
      status: 'completed'
    },
    { 
      id: '4', 
      type: 'credit', 
      amount: 50, 
      description: 'Referral bonus - Ahmed signed up', 
      time: '2 days ago',
      status: 'completed'
    },
    { 
      id: '5', 
      type: 'debit', 
      amount: 220, 
      description: 'Order #998 - Notebook Set', 
      time: '3 days ago',
      status: 'completed'
    }
  ];

  const quickTopUpAmounts = [50, 100, 200, 500];

  const handleTopUp = () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) return;
    
    const amount = parseFloat(topUpAmount);
    updateUser({ walletBalance: (user?.walletBalance || 0) + amount });
    setTopUpAmount('');
    setShowTopUp(false);
    
    // Add success message here
  };

  const monthlySpending = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyTopUp = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wallet 💰</h1>
          <p className="mt-2 text-gray-600">Manage your ঝটপট wallet and payment methods</p>
        </div>

        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 mb-2">Current Balance</p>
              <h2 className="text-4xl font-bold">৳{user?.walletBalance || 0}</h2>
              <p className="text-orange-100 mt-2">Available to spend</p>
            </div>
            <Wallet className="h-16 w-16 text-orange-200" />
          </div>
          
          <div className="flex items-center space-x-4 mt-8">
            <button
              onClick={() => setShowTopUp(true)}
              className="bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2 font-medium"
            >
              <Plus className="h-5 w-5" />
              <span>Add Money</span>
            </button>
            <button className="border border-white border-opacity-30 text-white px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors flex items-center space-x-2">
              <History className="h-5 w-5" />
              <span>History</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <ArrowDownLeft className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month Spending</p>
                <p className="text-2xl font-bold text-gray-900">৳{monthlySpending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ArrowUpRight className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month Added</p>
                <p className="text-2xl font-bold text-gray-900">৳{monthlyTopUp}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg per Order</p>
                <p className="text-2xl font-bold text-gray-900">৳{Math.round(monthlySpending / 3)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Promotional Offers */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Special Offer! 🎉</h3>
              <p className="text-purple-100">Add ৳200 or more and get ৳20 bonus credit</p>
              <p className="text-sm text-purple-200 mt-1">Valid until next week</p>
            </div>
            <Gift className="h-12 w-12 text-purple-200" />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === 'credit' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowDownLeft className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}৳{transaction.amount}
                  </p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Up Modal */}
        {showTopUp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Add Money to Wallet</h3>
              
              <div className="space-y-6">
                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Amount
                  </label>
                  <input
                    type="number"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-lg"
                  />
                </div>

                {/* Quick Amount Buttons */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Quick Select</p>
                  <div className="grid grid-cols-4 gap-2">
                    {quickTopUpAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setTopUpAmount(amount.toString())}
                        className="py-2 px-3 border border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 text-sm font-medium transition-colors"
                      >
                        ৳{amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Payment Method</p>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                          selectedMethod === method.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          value={method.id}
                          checked={selectedMethod === method.id}
                          onChange={(e) => setSelectedMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`p-2 rounded ${method.color} mr-3`}>
                          <span className="text-lg">{method.icon}</span>
                        </div>
                        <span className="font-medium text-gray-900">{method.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowTopUp(false)}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTopUp}
                    disabled={!topUpAmount || parseFloat(topUpAmount) <= 0}
                    className="flex-1 py-3 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add ৳{topUpAmount || '0'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}