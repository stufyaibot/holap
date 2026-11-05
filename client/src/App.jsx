import React, { useState } from 'react';
import { Search, MapPin, Plane, Hotel, Star, ArrowRight, Heart, Tag } from 'lucide-react';

const API_BASE = '/api';

// --- Components ---

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌴</span>
            <span className="text-2xl font-bold text-primary-600">Holap</span>
            <span className="hidden sm:block text-sm text-gray-500 ml-2">Plan smarter, spend less</span>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-primary-600 transition">Features</a>
            <a href="#how-it-works" className="hover:text-primary-600 transition">How it Works</a>
            <a href="#popular" className="hover:text-primary-600 transition">Popular Destinations</a>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Hero({ onSearch }) {
  const [destination, setDestination] = useState('');
  const [nights, setNights] = useState(3);
  
  return (
    <section className="relative bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20 px-4">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 50 Q25 30 50 50 T100 50 L100 100 L0 100 Z" fill="white" />
        </svg>
      </div>
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Your Perfect Holiday Awaits
        </h1>
        <p className="text-xl text-primary-100 mb-8">
          Compare hotels, activities, and transport — all in one place
        </p>
        
        <div className="bg-white rounded-2xl p-4 shadow-2xl max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Plane className="text-gray-400 w-5 h-5" />
              <select
                value={nights}
                onChange={(e) => setNights(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {[1,2,3,4,5,7,10,14,21].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'night' : 'nights'}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => onSearch(destination, nights)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-primary-100">
          <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-current" /> Best Price Guarantee</span>
          <span className="flex items-center gap-1"><Heart className="w-4 h-4 fill-current" /> Curated Experiences</span>
          <span className="flex items-center gap-1"><Tag className="w-4 h-4 fill-current" /> Budget Tracking</span>
        </div>
      </div>
    </section>
  );
}

function PopularDestinations({ onSelect }) {
  const destinations = [
    { name: 'Bali', country: 'Indonesia', price: 550, image: '🏝️', tag: 'Most Popular' },
    { name: 'Bangkok', country: 'Thailand', price: 420, image: '🛕', tag: 'Budget Pick' },
    { name: 'Paris', country: 'France', price: 850, image: '🗼', tag: 'Classic' },
    { name: 'Tokyo', country: 'Japan', price: 720, image: '⛩️', tag: 'New' },
    { name: 'Istanbul', country: 'Turkey', price: 480, image: '🕌', tag: 'Value' },
    { name: 'Barcelona', country: 'Spain', price: 590, image: '🎨', tag: 'Popular' },
  ];
  
  return (
    <section id="popular" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Destinations</h2>
        <p className="text-gray-500 mb-8">Start your journey with these trending spots</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {destinations.map((dest) => (
            <button
              key={dest.name}
              onClick={() => onSelect(dest.name)}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-center group"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition">{dest.image}</div>
              <div className="font-semibold text-gray-900">{dest.name}</div>
              <div className="text-sm text-gray-500">{dest.country}</div>
              <div className="mt-2 text-xs font-medium text-primary-600 bg-primary-50 inline-block px-2 py-1 rounded-full">
                From ${dest.price}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SearchResult({ results, onCompare, onAddToTrip }) {
  const [activeTab, setActiveTab] = useState('transport');
  
  const tabs = [
    { id: 'transport', label: 'Transport', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'activities', label: 'Activities', icon: Star },
  ];
  
  const renderResults = (type) => {
    const items = results?.[type] || [];
    
    if (items.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          No {type} found for this destination. Try adjusting your search.
        </div>
      );
    }
    
    if (type === 'transport') {
      return (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 transition">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                  <Plane className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{item.airline || item.operator}</div>
                  <div className="text-sm text-gray-500">{item.from} → {item.to} • {item.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-primary-600">${item.price}</span>
                <button
                  onClick={() => onAddToTrip(item, type)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm font-medium"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (type === 'hotels') {
      return (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 transition">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.city}, {item.country}</p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              <div className="flex gap-2 text-xs text-gray-500 mb-3">
                {item.amenities.slice(0, 3).map(a => (
                  <span key={a} className="bg-gray-100 px-2 py-1 rounded">{a}</span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-primary-600">${item.pricePerNight}<span className="text-sm text-gray-500 font-normal">/night</span></span>
                <button
                  onClick={() => onAddToTrip(item, type)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm font-medium"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (type === 'activities') {
      return (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 transition">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500 capitalize">{item.category} • {item.duration}h</p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-primary-600">${item.price}</span>
                <button
                  onClick={() => onAddToTrip(item, type)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm font-medium"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };
  
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <ArrowRight className="w-5 h-5 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Results for {results?.destination}
          </h2>
        </div>
        
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition ${
                activeTab === tab.id 
                  ? 'border-b-2 border-primary-600 text-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="bg-white rounded-2xl p-6">
          {renderResults(activeTab)}
        </div>
        
        <div className="mt-6 p-4 bg-primary-50 rounded-xl">
          <div className="flex items-center gap-2 text-primary-700">
            <Tag className="w-5 h-5" />
            <span className="font-medium">Cheapest Combo: ${results?.cheapestBreakdown?.total}</span>
          </div>
          <div className="text-sm text-primary-600 mt-1">
            Transport: ${results?.cheapestBreakdown?.transport} • 
            Hotels ({results?.nights} nights): ${results?.cheapestBreakdown?.hotels} • 
            Activities: ${results?.cheapestBreakdown?.activities}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌴</span>
            <span className="text-xl font-bold text-white">Holap</span>
          </div>
          <p className="text-sm">Plan smarter. Spend less. Explore more.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Features</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Price Comparison</a></li>
            <li><a href="#" className="hover:text-white transition">Trip Planning</a></li>
            <li><a href="#" className="hover:text-white transition">Budget Tracking</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">🐦</a>
            <a href="#" className="hover:text-white transition">📸</a>
            <a href="#" className="hover:text-white transition">💼</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-sm text-center">
        © 2026 Holap. All rights reserved.
      </div>
    </footer>
  );
}

export default function App() {
  const [results, setResults] = useState(null);
  const [trip, setTrip] = useState([]);
  const [savedDestinations, setSavedDestinations] = useState([]);
  
  const handleSearch = async (destination, nights) => {
    if (!destination) return;
    
    try {
      const response = await fetch(
        `${API_BASE}/plan?destination=${encodeURIComponent(destination)}&nights=${nights}&transport=true&activities=true&hotels=true`
      );
      const data = await response.json();
      
      if (data.success) {
        setResults({
          destination,
          nights,
          ...data.data
        });
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };
  
  const handleSelectDestination = (name) => {
    handleSearch(name, 3);
  };
  
  const handleAddToTrip = (item, type) => {
    setTrip(prev => [...prev, { ...item, type }]);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero onSearch={handleSearch} />
      <PopularDestinations onSelect={handleSelectDestination} />
      {results && <SearchResult results={results} onAddToTrip={handleAddToTrip} />}
      <Footer />
    </div>
  );
}