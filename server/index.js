const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from client build
app.use(express.static(path.join(__dirname, '../client/dist')));

// --- Mock Data Store (replace with real APIs in production) ---
// In production, integrate with:
// - Hotels: Booking.com API, Hotels.com API, or Hostelworld API
// - Activities: GetYourGuide API, Viator API, or Airbnb Experiences
// - Transport: Skyscanner API, Kiwi.com, or Google Flights API

const DB = {
  hotels: [
    { id: 'h1', name: 'Sunset Beach Hotel', city: 'Bali', country: 'Indonesia', rating: 4.5, pricePerNight: 85, latitude: -8.4, longitude: 115.1, amenities: ['wifi', 'pool', 'breakfast'] },
    { id: 'h2', name: 'Mountain View Lodge', city: 'Ubud', country: 'Indonesia', rating: 4.3, pricePerNight: 65, latitude: -8.5, longitude: 115.3, amenities: ['wifi', 'pool'] },
    { id: 'h3', name: 'City Center Hostel', city: 'Bangkok', country: 'Thailand', rating: 4.0, pricePerNight: 25, latitude: 13.75, longitude: 100.5, amenities: ['wifi', 'breakfast'] },
    { id: 'h4', name: 'Budget Stay Bangkok', city: 'Bangkok', country: 'Thailand', rating: 3.8, pricePerNight: 18, latitude: 13.76, longitude: 100.53, amenities: ['wifi'] },
    { id: 'h5', name: 'Paris Luxury Hotel', city: 'Paris', country: 'France', rating: 4.8, pricePerNight: 320, latitude: 48.85, longitude: 2.35, amenities: ['wifi', 'pool', 'spa', 'breakfast'] },
    { id: 'h6', name: 'Affordable Paris Hostel', city: 'Paris', country: 'France', rating: 4.2, pricePerNight: 45, latitude: 48.86, longitude: 2.34, amenities: ['wifi', 'breakfast'] },
  ],
  activities: [
    { id: 'a1', name: 'Temple Tour', city: 'Bali', country: 'Indonesia', category: 'culture', price: 35, duration: 4, rating: 4.6 },
    { id: 'a2', name: 'Surf Lesson', city: 'Bali', country: 'Indonesia', category: 'adventure', price: 50, duration: 2, rating: 4.8 },
    { id: 'a3', name: 'Street Food Tour', city: 'Bangkok', country: 'Thailand', category: 'food', price: 25, duration: 3, rating: 4.7 },
    { id: 'a4', name: 'Temple & Canal Tour', city: 'Bangkok', country: 'Thailand', category: 'culture', price: 30, duration: 5, rating: 4.5 },
    { id: 'a5', name: 'Eiffel Tower Entry', city: 'Paris', country: 'France', category: 'landmark', price: 15, duration: 1, rating: 4.9 },
    { id: 'a6', name: 'Louvre Museum', city: 'Paris', country: 'France', category: 'culture', price: 22, duration: 4, rating: 4.8 },
    { id: 'a7', name: 'Segway City Tour', city: 'Paris', country: 'France', category: 'adventure', price: 60, duration: 3, rating: 4.4 },
  ],
  transport: [
    { id: 't1', type: 'flight', from: 'Sydney', to: 'Bali', price: 650, duration: '6h', airline: 'Qantas' },
    { id: 't2', type: 'flight', from: 'Singapore', to: 'Bali', price: 180, duration: '2h', airline: 'Scoot' },
    { id: 't3', type: 'flight', from: 'Melbourne', to: 'Bangkok', price: 420, duration: '5h', airline: 'Jetstar' },
    { id: 't4', type: 'flight', from: 'London', to: 'Paris', price: 85, duration: '1.5h', airline: 'EasyJet' },
    { id: 't5', type: 'train', from: 'Paris', to: 'Lyon', price: 45, duration: '2h', operator: 'SNCF' },
    { id: 't6', type: 'bus', from: 'Bangkok', to: 'Chiang Mai', price: 25, duration: '10h', operator: 'GreenBus' },
  ]
};

// --- API Routes ---

// Search hotels by city
app.get('/api/hotels', (req, res) => {
  const { city, minPrice, maxPrice, minRating } = req.query;
  let results = DB.hotels;
  
  if (city) results = results.filter(h => h.city.toLowerCase() === city.toLowerCase() || h.country.toLowerCase() === city.toLowerCase());
  if (minPrice) results = results.filter(h => h.pricePerNight >= Number(minPrice));
  if (maxPrice) results = results.filter(h => h.pricePerNight <= Number(maxPrice));
  if (minRating) results = results.filter(h => h.rating >= Number(minRating));
  
  // Sort by price (cheapest first)
  results.sort((a, b) => a.pricePerNight - b.pricePerNight);
  
  res.json({ success: true, data: results });
});

// Get hotel by ID
app.get('/api/hotels/:id', (req, res) => {
  const hotel = DB.hotels.find(h => h.id === req.params.id);
  if (!hotel) return res.status(404).json({ success: false, message: 'Hotel not found' });
  res.json({ success: true, data: hotel });
});

// Search activities by city and optional category
app.get('/api/activities', (req, res) => {
  const { city, category, minRating } = req.query;
  let results = DB.activities;
  
  if (city) results = results.filter(a => a.city.toLowerCase() === city.toLowerCase() || a.country.toLowerCase() === city.toLowerCase());
  if (category) results = results.filter(a => a.category.toLowerCase() === category.toLowerCase());
  if (minRating) results = results.filter(a => a.rating >= Number(minRating));
  
  // Sort by price (cheapest first)
  results.sort((a, b) => a.price - b.price);
  
  res.json({ success: true, data: results });
});

// Get activity by ID
app.get('/api/activities/:id', (req, res) => {
  const activity = DB.activities.find(a => a.id === req.params.id);
  if (!activity) return res.status(404).json({ success: false, message: 'Activity not found' });
  res.json({ success: true, data: activity });
});

// Search transport by from/to location
app.get('/api/transport', (req, res) => {
  const { from, to, type } = req.query;
  let results = DB.transport;
  
  if (from) results = results.filter(t => t.from.toLowerCase() === from.toLowerCase());
  if (to) results = results.filter(t => t.to.toLowerCase() === to.toLowerCase());
  if (type) results = results.filter(t => t.type.toLowerCase() === type.toLowerCase());
  
  // Sort by price (cheapest first)
  results.sort((a, b) => a.price - b.price);
  
  res.json({ success: true, data: results });
});

// Get transport by ID
app.get('/api/transport/:id', (req, res) => {
  const transport = DB.transport.find(t => t.id === req.params.id);
  if (!transport) return res.status(404).json({ success: false, message: 'Transport not found' });
  res.json({ success: true, data: transport });
});

// Plan a complete trip with cheapest options
app.post('/api/plan', (req, res) => {
  const { destination, nights, startDate, preferences } = req.query;
  const { transport: includeTransport, activities: includeActivities, hotels: includeHotels } = req.body || {};
  
  const plan = {
    destination,
    nights: nights || 3,
    startDate: startDate || new Date().toISOString().split('T')[0],
    options: {
      transport: [],
      hotels: [],
      activities: []
    },
    totalPrice: 0,
    cheapestBreakdown: {}
  };
  
  // Search each component
  if (includeTransport !== false) {
    const transport = DB.transport.filter(t => t.to.toLowerCase() === destination.toLowerCase());
    plan.options.transport = transport.sort((a, b) => a.price - b.price).slice(0, 5);
  }
  
  if (includeHotels !== false) {
    const hotels = DB.hotels.filter(h => h.city.toLowerCase() === destination.toLowerCase() || h.country.toLowerCase() === destination.toLowerCase());
    plan.options.hotels = hotels.sort((a, b) => a.pricePerNight - b.pricePerNight).slice(0, 5);
  }
  
  if (includeActivities !== false) {
    const activities = DB.activities.filter(a => a.city.toLowerCase() === destination.toLowerCase() || a.country.toLowerCase() === destination.toLowerCase());
    plan.options.activities = activities.sort((a, b) => a.price - b.price).slice(0, 5);
  }
  
  // Calculate cheapest total
  const n = parseInt(nights) || 3;
  plan.cheapestBreakdown = {
    transport: plan.options.transport[0]?.price || 0,
    hotels: (plan.options.hotels[0]?.pricePerNight || 0) * n,
    activities: plan.options.activities.reduce((sum, a) => sum + a.price, 0),
    total: 0
  };
  plan.cheapestBreakdown.total = Object.values(plan.cheapestBreakdown).reduce((a, b) => a + b, 0);
  
  res.json({ success: true, data: plan });
});

// Compare options (for a specific component type)
app.post('/api/compare', (req, res) => {
  const { type, query } = req.body;
  let data = [];
  
  if (type === 'hotels') {
    data = DB.hotels.filter(h => h.city.toLowerCase() === query.toLowerCase() || h.country.toLowerCase() === query.toLowerCase());
    data.sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (type === 'activities') {
    data = DB.activities.filter(a => a.city.toLowerCase() === query.toLowerCase() || a.country.toLowerCase() === query.toLowerCase());
    data.sort((a, b) => a.price - b.price);
  } else if (type === 'transport') {
    data = DB.transport.filter(t => t.to.toLowerCase() === query.toLowerCase());
    data.sort((a, b) => a.price - b.price);
  }
  
  res.json({ success: true, data: data.slice(0, 10) });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'holap', timestamp: new Date().toISOString() });
});

// Fallback for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌴 Holap Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 API docs: http://localhost:${PORT}/api`);
});