# Holap 🌴

Plan smarter, spend less. Holap maps your holiday end-to-end — hotels, activities, and transport — and finds the cheapest options automatically.

## Features

- **Smart Trip Planning** — Search flights, hotels, and activities in one place
- **Cheapest Combo Engine** — Automatically finds the lowest total price combination
- **Compare & Book** — Side-by-side comparison of all options
- **Budget Tracking** — See your total trip cost at a glance
- **API Ready** — Integrate with real booking APIs (Booking.com, Skyscanner, GetYourGuide)

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** React + Vite + Tailwind CSS
- **API:** RESTful endpoints for hotels, activities, and transport

## Quick Start

```bash
# Install dependencies
npm run install:all

# Start development (backend + frontend)
npm run dev

# Build for production
npm run build:client
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hotels?city=X` | Search hotels by city |
| GET | `/api/hotels/:id` | Get hotel details |
| GET | `/api/activities?city=X&category=culture` | Search activities |
| GET | `/api/transport?from=X&to=Y` | Search transport options |
| POST | `/api/plan` | Plan complete trip with cheapest combo |
| POST | `/api/compare` | Compare options for a destination |
| GET | `/health` | Health check |

## Production Deployment

All endpoints are free-tier compatible:

1. **Backend:** Deploy to Render, Railway, or Fly.io (free tier)
2. **Frontend:** Deploy to Vercel or Netlify (free tier)
3. **APIs:** Replace mock data with real provider APIs (free tiers available)

## Docker

```bash
docker build -t holap .
docker run -p 3000:3000 holap
```

## License

MIT