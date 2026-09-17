import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CleanAirRoute, TravelMode } from '../../types';
import { AQI_CATEGORIES } from '../../data/mockData';
import {
  Navigation,
  Footprints,
  Bike,
  Car,
  Bus,
  ShieldCheck,
  Zap,
  Leaf,
  Clock,
  MapPin,
  ArrowRight,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const RoutePlanner: React.FC = () => {
  const { showToast } = useApp();

  const [origin, setOrigin] = useState('Central Metro Terminal');
  const [destination, setDestination] = useState('Green Lake Botanical Garden');
  const [travelMode, setTravelMode] = useState<TravelMode>('cycling');
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-cleanest');

  // Locations options
  const locationOptions = [
    'Central Metro Terminal',
    'Green Lake Botanical Garden',
    'Silicon Corridor Hi-Tech Hub',
    'Sunrise Industrial Estate',
    'Heritage Old Town Square',
    'Port Riverside Logistics Gate',
    'AeroHub International Station',
    'Civic University Medical Campus',
  ];

  // Dynamic route generator based on origin, dest, mode
  const generateRoutes = (): CleanAirRoute[] => {
    let modeSpeedKmH = 15; // cycling
    let modeCo2GramsPerKm = 0;
    if (travelMode === 'walking') {
      modeSpeedKmH = 4.5;
      modeCo2GramsPerKm = 0;
    } else if (travelMode === 'cycling') {
      modeSpeedKmH = 16;
      modeCo2GramsPerKm = 0;
    } else if (travelMode === 'two-wheeler') {
      modeSpeedKmH = 32;
      modeCo2GramsPerKm = 48;
    } else if (travelMode === 'car') {
      modeSpeedKmH = 28;
      modeCo2GramsPerKm = 142;
    } else if (travelMode === 'public-transport') {
      modeSpeedKmH = 24;
      modeCo2GramsPerKm = 28;
    }

    // Baseline distance approx 7.4 km
    const baseDist = 7.4;

    return [
      {
        id: 'route-fastest',
        type: 'fastest',
        title: 'Fastest Route (Arterial Highway)',
        distanceKm: baseDist,
        durationMins: Math.round((baseDist / modeSpeedKmH) * 60),
        exposureScore: 84, // Higher exposure
        averageAqi: 182,
        aqiCategory: 'Moderate',
        description: 'Direct transit along the 6-lane ring corridor. Fast travel time but high roadside diesel soot and NO₂ plumes.',
        keyFeature: 'Lowest transit time • High PM2.5',
        routeHighlights: ['Direct expressway corridor', '4 signalized choke intersections', 'Elevated particulate exposure'],
        co2Grams: Math.round(baseDist * modeCo2GramsPerKm),
      },
      {
        id: 'route-cleanest',
        type: 'cleanest',
        title: 'Lowest Pollution Route (Eco Greenway)',
        distanceKm: baseDist + 1.2,
        durationMins: Math.round(((baseDist + 1.2) / modeSpeedKmH) * 60) + 4,
        exposureScore: 28, // Significantly lower exposure!
        averageAqi: 48,
        aqiCategory: 'Good',
        description: 'Circumnavigates the riverbank tree canopy, residential buffered cyclepaths, and urban botanical belts. 67% less particulate inhalation!',
        keyFeature: 'Recommended • 67% Lower Lung Exposure',
        routeHighlights: ['Canopy shaded bike expressway', 'Riverfront clean air barrier', 'Protected from diesel corridors'],
        co2Grams: Math.round((baseDist + 1.2) * modeCo2GramsPerKm),
      },
      {
        id: 'route-balanced',
        type: 'balanced',
        title: 'Balanced Route (Boulevard Transit)',
        distanceKm: baseDist + 0.4,
        durationMins: Math.round(((baseDist + 0.4) / modeSpeedKmH) * 60) + 2,
        exposureScore: 52,
        averageAqi: 94,
        aqiCategory: 'Satisfactory',
        description: 'Balances travel speed and environmental exposure using inner tree-lined avenues and public transit right-of-ways.',
        keyFeature: 'Optimal compromise • Moderate AQI',
        routeHighlights: ['Tree-lined median boulevards', 'Smooth transit flow', 'Medium respiratory exposure'],
        co2Grams: Math.round((baseDist + 0.4) * modeCo2GramsPerKm),
      },
    ];
  };

  const routes = generateRoutes();
  const activeRoute = routes.find((r) => r.id === selectedRouteId) || routes[1];

  const handleCalculateRoutes = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin === destination) {
      showToast('Starting location and destination cannot be identical', 'warning');
      return;
    }
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      showToast('Optimal clean-air transit paths computed successfully!', 'success');
    }, 500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Navigation className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Smart Clean Air Route Planner
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time exposure-optimized routing to protect respiratory health during urban commutes
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <Leaf className="w-4 h-4 text-emerald-500" />
          <span>Eco Path Optimization Active</span>
        </div>
      </div>

      {/* Input Form & Mode Selection */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleCalculateRoutes} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Origin */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Starting Point</span>
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {locationOptions.map((loc) => (
                  <option key={`orig-${loc}`} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>Destination Point</span>
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {locationOptions.map((loc) => (
                  <option key={`dest-${loc}`} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Travel Mode Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Select Commute Mode
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { mode: 'walking', label: 'Walking', icon: Footprints },
                { mode: 'cycling', label: 'Cycling', icon: Bike },
                { mode: 'two-wheeler', label: 'Two-Wheeler', icon: Zap },
                { mode: 'car', label: 'Car', icon: Car },
                { mode: 'public-transport', label: 'Public Transit', icon: Bus },
              ].map(({ mode, label, icon: Icon }) => (
                <button
                  type="button"
                  key={mode}
                  onClick={() => setTravelMode(mode as TravelMode)}
                  className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    travelMode === mode
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              id="find-cleanest-route-btn"
              disabled={isCalculating}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <Navigation className={`w-4 h-4 ${isCalculating ? 'animate-spin' : ''}`} />
              <span>{isCalculating ? 'Analyzing Pollution Corridors...' : 'Find Cleanest Route'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3 Comparative Route Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Available Route Alternatives ({travelMode.toUpperCase()})
          </h3>
          <span className="text-xs text-slate-400">
            Click a route to view itinerary highlights
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {routes.map((route) => {
            const isCleanest = route.type === 'cleanest';
            const isSelected = route.id === activeRoute.id;
            const catMeta = AQI_CATEGORIES[route.aqiCategory];

            return (
              <div
                key={route.id}
                onClick={() => setSelectedRouteId(route.id)}
                className={`cursor-pointer relative p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isCleanest
                    ? 'border-2 border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-md shadow-emerald-600/10'
                    : isSelected
                    ? 'border-2 border-slate-900 dark:border-white bg-white dark:bg-slate-900 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Recommended Green Badge on Cleanest Route */}
                {isCleanest && (
                  <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>RECOMMENDED: CLEAN AIR ROUTE</span>
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between gap-2 mt-1 mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {route.title}
                      </h4>
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                        {route.keyFeature}
                      </span>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold text-white shrink-0"
                      style={{ backgroundColor: catMeta.color }}
                    >
                      {route.averageAqi} AQI
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {route.description}
                  </p>

                  {/* Distance / Duration / Exposure Metrics */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 text-center text-xs mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Distance</span>
                      <strong className="text-slate-900 dark:text-white text-sm">
                        {route.distanceKm} km
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Travel Time</span>
                      <strong className="text-slate-900 dark:text-white text-sm">
                        {route.durationMins} mins
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Exposure</span>
                      <strong
                        className="text-sm"
                        style={{
                          color: isCleanest ? '#10B981' : route.type === 'fastest' ? '#EF4444' : '#F59E0B',
                        }}
                      >
                        {route.exposureScore}/100
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Bottom Route Details Button */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    CO₂ Impact: {route.co2Grams}g
                  </span>
                  <span
                    className={`text-xs font-bold flex items-center gap-1 ${
                      isCleanest ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{isSelected ? 'Selected' : 'Select Path'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Route Visual Map Preview */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Simulated Route Corridor Visualizer: {activeRoute.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Trajectory overlay through urban micro-environments from {origin} to {destination}
            </p>
          </div>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full text-white"
            style={{
              backgroundColor:
                activeRoute.type === 'cleanest'
                  ? '#10B981'
                  : activeRoute.type === 'fastest'
                  ? '#EF4444'
                  : '#F59E0B',
            }}
          >
            {activeRoute.type.toUpperCase()} OPTION
          </span>
        </div>

        {/* Path Canvas */}
        <div className="w-full aspect-[21/8] bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800 flex items-center justify-center">
          <svg viewBox="0 0 800 240" className="w-full h-full">
            {/* Background grid */}
            <defs>
              <pattern id="routeGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="800" height="240" fill="#0b1329" />
            <rect width="800" height="240" fill="url(#routeGrid)" />

            {/* Simulated River */}
            <path
              d="M 200,0 C 260,100 240,160 320,240 L 360,240 C 280,160 300,100 240,0 Z"
              fill="#0369a1"
              opacity="0.35"
            />
            {/* Simulated Green Belt */}
            <circle cx="480" cy="80" r="60" fill="#065f46" opacity="0.35" />
            {/* Simulated Highway */}
            <path d="M 60,180 L 740,180" stroke="#334155" strokeWidth="8" strokeDasharray="8 4" opacity="0.5" />

            {/* Route Path based on active option */}
            {activeRoute.type === 'fastest' ? (
              // Straight highway path (fastest, red/orange)
              <path
                d="M 120,160 L 700,160"
                fill="none"
                stroke="#EF4444"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ) : activeRoute.type === 'cleanest' ? (
              // Curved scenic path bypassing pollution (green)
              <path
                d="M 120,160 C 250,50 420,40 540,80 S 640,140 700,160"
                fill="none"
                stroke="#10B981"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ) : (
              // Balanced path (amber)
              <path
                d="M 120,160 C 280,120 480,110 700,160"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="5"
                strokeLinecap="round"
              />
            )}

            {/* Origin Pin */}
            <g transform="translate(120, 160)">
              <circle r="12" fill="#10B981" opacity="0.25" className="animate-ping" />
              <circle r="7" fill="#10B981" stroke="#ffffff" strokeWidth="2" />
              <text y="22" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                Origin
              </text>
            </g>

            {/* Destination Pin */}
            <g transform="translate(700, 160)">
              <circle r="12" fill="#EF4444" opacity="0.25" className="animate-ping" />
              <circle r="7" fill="#EF4444" stroke="#ffffff" strokeWidth="2" />
              <text y="22" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                Destination
              </text>
            </g>
          </svg>

          {/* Floating itinerary highlights */}
          <div className="absolute bottom-3 left-4 right-4 bg-slate-900/90 backdrop-blur-md rounded-lg p-2.5 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
            <span className="font-semibold text-white">Route Milestones:</span>
            {activeRoute.routeHighlights.map((hl, i) => (
              <span key={i} className="flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{hl}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
