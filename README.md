# 🌤️ Weather App

A modern, responsive weather application built with React, TypeScript, and Vite. Get real-time weather data for any city worldwide with an intuitive interface featuring both hourly and weekly forecasts.

## ✨ Features

- **🔍 Smart City Search**: Powered by Google Places API with autocomplete suggestions
- **📊 Interactive Charts**: Weekly forecast visualization using AG Charts
- **📱 Responsive Design**: Optimized for both desktop and mobile devices
- **⏰ Hourly Forecast**: Scrollable gallery showing the next 48 hours of weather
- **📅 7-Day Forecast**: Interactive charts displaying temperature trends and precipitation
- **🌍 Global Coverage**: Weather data for cities worldwide via Open Meteo API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Maps API key (for city search functionality)

## 🛠️ Built With

### Core Technologies
- **[React 19](https://react.dev/)** - Modern UI library with hooks
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Swiper](https://swiperjs.com/)** - Touch slider for hourly forecast
- **[AG Charts](https://charts.ag-grid.com/)** - Interactive chart library

### APIs & Data
- **[Open Meteo API](https://open-meteo.com/)** - Free weather data
- **[Google Places API](https://developers.google.com/maps/documentation/places/web-service)** - City search and geocoding
- **[Luxon](https://moment.github.io/luxon/)** - Date/time manipulation

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[SVGR](https://react-svgr.com/)** - SVG to React components

## 📁 Project Structure

```
src/
├── api/
│   └── fetchWeather.ts          # Weather API integration
├── assets/                      # SVG icons (weather conditions)
├── components/
│   ├── AutocompleteDropdown.tsx # City search dropdown
│   ├── Gallery.tsx             # Hourly forecast carousel
│   └── WeeklyForecastChart.tsx # Weekly chart component
├── contexts/
│   └── SelectedPlaceContext.tsx # Global state for selected location
├── hooks/
│   ├── useFilteredHourlyData.ts # Process hourly weather data
│   ├── usePlacesAutocomplete.ts # Google Places integration
│   ├── useSelectPlace.ts       # Location selection logic
│   ├── useSelectedPlaceContext.ts # Context hook
│   └── useTransformWeeklyData.ts # Process weekly weather data
├── types/
│   └── svg.d.ts                # TypeScript SVG declarations
├── App.tsx                     # Main application component
├── main.tsx                    # Application entry point
└── index.css                   # Global styles and animations
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

### Weather Data (Open Meteo)
- **Current conditions**: Temperature, precipitation
- **Hourly forecast**: 48-hour detailed forecast
- **Daily forecast**: 7-day temperature and precipitation trends
- **Free tier**: No API key required

### Location Search (Google Places)
- **Autocomplete**: City suggestions as you type
- **Geocoding**: Convert city names to coordinates
- **Global coverage**: Cities worldwide

## 🎨 Key Features Explained

### Smart City Search
Type any city name and get instant suggestions powered by Google Places API. The app automatically geocodes your selection to fetch accurate weather data.

### Responsive Hourly Gallery
- **Mobile**: Vertical scrolling with 3 items visible
- **Tablet**: Horizontal scrolling with 4-5 items
- **Desktop**: Horizontal scrolling with 7+ items

### Interactive Weekly Chart
- **Temperature trends**: Area charts for min/max temperatures
- **Precipitation data**: Line overlay showing rain probability
- **Dark theme**: Optimized for the app's design

### Smart Data Filtering
- **Hourly data**: Shows only future hours from current time
- **Automatic updates**: Data refreshes when location changes
- **Error handling**: Graceful fallbacks for API failures

## 🎯 TypeScript Features

- **Strict type checking**: Full TypeScript configuration
- **Custom interfaces**: Typed API responses and component props
- **Generic hooks**: Reusable custom hooks with proper typing
- **SVG types**: Type-safe SVG icon imports

## 📱 Responsive Design

The app adapts to different screen sizes:
- **Mobile (< 640px)**: Vertical layout, touch-optimized
- **Tablet (640px - 1024px)**: Balanced layout with horizontal scrolling
- **Desktop (> 1024px)**: Full horizontal layout with all features

## 🔄 State Management

- **React Context**: Global state for selected location
- **Custom hooks**: Encapsulated business logic
- **Local state**: Component-specific data management

## 🚀 Performance Optimizations

- **React.useMemo**: Optimized data transformations
- **Lazy loading**: Components loaded as needed
- **Efficient API calls**: Single requests for all weather data
- **Responsive images**: Optimized assets for different screen sizes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Open Meteo](https://open-meteo.com/) for free weather data
- [Google Maps](https://developers.google.com/maps) for location services
- Weather icons and design inspiration from various sources

---

**Made with ❤️ using React, TypeScript, and modern web technologies**
