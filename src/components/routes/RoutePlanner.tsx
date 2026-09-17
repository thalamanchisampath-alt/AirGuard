import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CleanAirRoute, TravelMode } from '../../types';
import { AQI_CATEGORIES } from '../../data/mockData';
import {
  POPULAR_INDIAN_ROUTE_PRESETS,
  generateTurnByTurnSteps,
} from '../../data/indiaLocationsData';
import { IndiaLocationSelectorModal } from './IndiaLocationSelectorModal';
import { NavigationRouteView } from './NavigationRouteView';
import { InteractiveNavigationMap } from './InteractiveNavigationMap';
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
  ArrowUpDown,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Compass,
  Layers,
  Map,
  SplitSquareVertical
} from 'lucide-react';

export const RoutePlanner: React.FC = () => {
  const { showToast, currentLocation, locations } = useApp();

  const [origin, setOrigin] = useState<string>(
    () => `${currentLocation.name}, ${currentLocation.city || 'Delhi'}, ${currentLocation.state || 'Delhi (NCT)'}`
  );
  const [destination, setDestination] = useState<string>(
    'Lodhi Gardens Heritage Eco Track, New Delhi / Central Delhi, Delhi (NCT)'
  );

  const [modalTarget, setModalTarget] = useState<'origin' | 'destination' | null>(null);
  const [travelMode, setTravelMode] = useState<TravelMode>('cycling');
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-cleanest');
  const [activeViewTab, setActiveViewTab] = useState<'nav-map' | 'turn-by-turn' | 'map-preview'>('nav-map');
  const [activeNavStep, setActiveNavStep] = useState<number>(0);
  const [isNavSimulating, setIsNavSimulating] = useState<boolean>(false);

  // Quick swap origin and destination
  const handleSwapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    showToast('Swapped starting point and destination', 'info');
  };

  // Preset selector
  const handleApplyPreset = (preset: typeof POPULAR_INDIAN_ROUTE_PRESETS[0]) => {
    setOrigin(preset.origin);
    setDestination(preset.destination);
    showToast(`Loaded route: ${preset.city} (${preset.tag})`, 'success');
  };

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

    const cleanestSteps = generateTurnByTurnSteps(origin, destination, 'cleanest', travelMode);
    const fastestSteps = generateTurnByTurnSteps(origin, destination, 'fastest', travelMode);
    const balancedSteps = generateTurnByTurnSteps(origin, destination, 'balanced', travelMode);

    return [
      {
        id: 'route-cleanest',
        type: 'cleanest',
        title: 'Lowest Pollution Route (Eco Greenway)',
        distanceKm: baseDist + 1.2,
        durationMins: Math.round(((baseDist + 1.2) / modeSpeedKmH) * 60) + 3,
        exposureScore: 28, // Significantly lower exposure!
        averageAqi: 48,
        aqiCategory: 'Good',
        description:
          'Circumnavigates riverbank tree canopies, residential buffered cycle paths, and urban botanical belts. 68% lower lung particulate inhalation!',
        keyFeature: 'RECOMMENDED • 68% Lower Lung Inhalation',
        routeHighlights: [
          'Canopy shaded bike expressway',
          'Riverfront clean air barrier',
          'Protected from commercial diesel corridors',
        ],
        co2Grams: Math.round((baseDist + 1.2) * modeCo2GramsPerKm),
        steps: cleanestSteps,
        treeCanopyCoverage: 78,
        lungDamageIndex: 'Minimal',
        pm25AvoidedPercent: 68,
      },
      {
        id: 'route-balanced',
        type: 'balanced',
        title: 'Balanced Route (Boulevard Transit)',
        distanceKm: baseDist + 0.4,
        durationMins: Math.round(((baseDist + 0.4) / modeSpeedKmH) * 60) + 1,
        exposureScore: 52,
        averageAqi: 94,
        aqiCategory: 'Satisfactory',
        description:
          'Balances travel speed and environmental exposure using inner tree-lined avenues and public transit right-of-ways.',
        keyFeature: 'Optimal Compromise • Moderate Exposure',
        routeHighlights: [
          'Tree-lined median boulevards',
          'Smooth transit flow',
          '38% lower particulate inhalation than highway',
        ],
        co2Grams: Math.round((baseDist + 0.4) * modeCo2GramsPerKm),
        steps: balancedSteps,
        treeCanopyCoverage: 45,
        lungDamageIndex: 'Low',
        pm25AvoidedPercent: 38,
      },
      {
        id: 'route-fastest',
        type: 'fastest',
        title: 'Fastest Route (Arterial Highway)',
        distanceKm: baseDist,
        durationMins: Math.round((baseDist / modeSpeedKmH) * 60),
        exposureScore: 84, // Higher exposure
        averageAqi: 182,
        aqiCategory: 'Moderate',
        description:
          'Direct transit along the multi-lane ring corridor. Fast travel time but high roadside diesel soot, NO₂, and resuspension.',
        keyFeature: 'Shortest Distance • Elevated PM2.5 Inhalation',
        routeHighlights: [
          'Direct expressway corridor',
          'Heavy signalized choke intersections',
          'Direct exposure to diesel particulates',
        ],
        co2Grams: Math.round(baseDist * modeCo2GramsPerKm),
        steps: fastestSteps,
        treeCanopyCoverage: 12,
        lungDamageIndex: 'High',
        pm25AvoidedPercent: 0,
      },
    ];
  };

  const routes = generateRoutes();
  const activeRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  const handleCalculateRoutes = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin.trim().toLowerCase() === destination.trim().toLowerCase()) {
      showToast('Starting location and destination cannot be identical', 'warning');
      return;
    }
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      showToast('Clean-air navigation path successfully analyzed and re-routed!', 'success');
    }, 400);
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
              Smart Clean Air Route Planner & Navigation
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pan-India state-wise and city-wise location search with turn-by-turn clean air navigation
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 shrink-0">
          <Leaf className="w-4 h-4 text-emerald-500" />
          <span>All 36 States & UTs Monitored</span>
        </div>
      </div>

      {/* Preset Popular Indian Corridors */}
      <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Popular Clean Air Routes in India (1-Click Load)</span>
          </span>
          <span className="text-[11px] text-slate-400">Select to auto-populate</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {POPULAR_INDIAN_ROUTE_PRESETS.map((preset) => (
            <button
              type="button"
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-semibold whitespace-nowrap shadow-sm transition-all hover:scale-[1.01]"
            >
              <span>{preset.tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form & Mode Selection */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleCalculateRoutes} className="space-y-5">
          {/* Origin and Destination with Swap Button */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Origin */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Starting Point (Origin)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setModalTarget('origin')}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Select State & City</span>
                </button>
              </div>

              <div
                onClick={() => setModalTarget('origin')}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium cursor-pointer hover:border-emerald-500 transition-colors flex items-center justify-between gap-2"
              >
                <span className="truncate">{origin}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shrink-0">
                  Change
                </span>
              </div>
            </div>

            {/* Middle Swap Button (Absolute on desktop) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <button
                type="button"
                onClick={handleSwapLocations}
                className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:scale-110 transition-all"
                title="Swap starting point and destination"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>

            {/* Destination */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                  <span>Destination Point</span>
                </label>
                <button
                  type="button"
                  onClick={() => setModalTarget('destination')}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Select State & City</span>
                </button>
              </div>

              <div
                onClick={() => setModalTarget('destination')}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium cursor-pointer hover:border-rose-500 transition-colors flex items-center justify-between gap-2"
              >
                <span className="truncate">{destination}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 shrink-0">
                  Change
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Swap Button */}
          <div className="flex md:hidden justify-center -my-2">
            <button
              type="button"
              onClick={handleSwapLocations}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Swap Origin & Destination</span>
            </button>
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
              <span>{isCalculating ? 'Analyzing Micro-Corridors...' : 'Calculate Clean Air Navigation Route'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3 Comparative Route Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Computed Alternative Routes ({travelMode.toUpperCase()})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select an option below to update navigation directions and visual trajectory
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {routes.map((route) => {
            const isCleanest = route.type === 'cleanest';
            const isSelected = route.id === activeRoute.id;
            const catMeta = AQI_CATEGORIES[route.aqiCategory] || AQI_CATEGORIES.Good;

            return (
              <div
                key={route.id}
                onClick={() => setSelectedRouteId(route.id)}
                className={`cursor-pointer relative p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-2 border-emerald-600 dark:border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Recommended Green Badge on Cleanest Route */}
                {isCleanest && (
                  <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>RECOMMENDED CLEAN AIR PATH</span>
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
                        className="text-sm font-bold"
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
                    CO₂: {route.co2Grams}g • {route.steps?.length || 5} Turns
                  </span>
                  <span
                    className={`text-xs font-bold flex items-center gap-1 ${
                      isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span>{isSelected ? 'Active Route' : 'Select'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation & Map Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
        <button
          type="button"
          onClick={() => setActiveViewTab('nav-map')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeViewTab === 'nav-map'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-emerald-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Navigation className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Interactive Navigation Map</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveViewTab('turn-by-turn')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeViewTab === 'turn-by-turn'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-emerald-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Turn-by-Turn Directions Itinerary</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveViewTab('map-preview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeViewTab === 'map-preview'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-emerald-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Map className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Microclimate Corridor Diagram</span>
        </button>
      </div>

      {/* View Content based on active tab */}
      {activeViewTab === 'nav-map' ? (
        <InteractiveNavigationMap
          route={activeRoute}
          origin={origin}
          destination={destination}
          travelMode={travelMode}
          activeStepIndex={activeNavStep}
          onStepChange={(stepIdx) => setActiveNavStep(stepIdx)}
          isSimulatingNav={isNavSimulating}
          onToggleSimulation={() => setIsNavSimulating(!isNavSimulating)}
        />
      ) : activeViewTab === 'turn-by-turn' ? (
        <NavigationRouteView
          route={activeRoute}
          origin={origin}
          destination={destination}
          travelMode={travelMode}
          activeStepIndex={activeNavStep}
          onStepChange={(stepIdx) => setActiveNavStep(stepIdx)}
          isNavigating={isNavSimulating}
          onToggleNavigation={() => setIsNavSimulating(!isNavSimulating)}
        />
      ) : (
        /* Visual Corridor Trajectory Preview */
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Corridor Trajectory: {activeRoute.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Overlay of urban vegetation buffers, water cooling zones, and diesel highway choke points
              </p>
            </div>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full text-white self-start sm:self-auto"
              style={{
                backgroundColor:
                  activeRoute.type === 'cleanest'
                    ? '#10B981'
                    : activeRoute.type === 'fastest'
                    ? '#EF4444'
                    : '#F59E0B',
              }}
            >
              {activeRoute.type.toUpperCase()} CORRIDOR
            </span>
          </div>

          {/* Path Canvas */}
          <div className="w-full aspect-[21/9] bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800 flex items-center justify-center">
            <svg viewBox="0 0 800 260" className="w-full h-full">
              <defs>
                <pattern id="routeGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="greenGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
              </defs>
              <rect width="800" height="260" fill="#0b1329" />
              <rect width="800" height="260" fill="url(#routeGrid)" />

              {/* Water Body (River / Lake) */}
              <path
                d="M 220,0 C 270,110 250,170 330,260 L 380,260 C 300,170 320,110 270,0 Z"
                fill="#0284c7"
                opacity="0.3"
              />
              <text x="320" y="240" fill="#38bdf8" fontSize="10" opacity="0.6" fontWeight="bold">
                Waterfront Cooling Belt
              </text>

              {/* Urban Green Belts */}
              <circle cx="490" cy="75" r="65" fill="#059669" opacity="0.3" />
              <text x="490" y="80" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">
                Botanical Buffer Zone
              </text>

              {/* High Pollution Arterial Highway */}
              <path d="M 60,195 L 740,195" stroke="#475569" strokeWidth="12" strokeDasharray="10 5" opacity="0.4" />
              <text x="620" y="215" fill="#f87171" fontSize="10" fontWeight="bold">
                ⚠️ Arterial Diesel Choke (195 AQI)
              </text>

              {/* Route Trajectory based on active option */}
              {activeRoute.type === 'fastest' ? (
                <path
                  d="M 120,170 L 680,170"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              ) : activeRoute.type === 'cleanest' ? (
                <path
                  d="M 120,170 C 240,45 420,35 540,75 S 620,150 680,170"
                  fill="none"
                  stroke="url(#greenGlow)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M 120,170 C 260,115 470,105 680,170"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              )}

              {/* Waypoint markers along clean route */}
              {activeRoute.type === 'cleanest' && (
                <>
                  <circle cx="280" cy="65" r="4" fill="#34D399" />
                  <circle cx="490" cy="75" r="4" fill="#34D399" />
                  <circle cx="610" cy="135" r="4" fill="#34D399" />
                </>
              )}

              {/* Origin Pin */}
              <g transform="translate(120, 170)">
                <circle r="12" fill="#10B981" opacity="0.3" className="animate-ping" />
                <circle r="7" fill="#10B981" stroke="#ffffff" strokeWidth="2" />
                <text y="24" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                  {origin.split(',')[0].slice(0, 18)}
                </text>
              </g>

              {/* Destination Pin */}
              <g transform="translate(680, 170)">
                <circle r="12" fill="#EF4444" opacity="0.3" className="animate-ping" />
                <circle r="7" fill="#EF4444" stroke="#ffffff" strokeWidth="2" />
                <text y="24" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                  {destination.split(',')[0].slice(0, 18)}
                </text>
              </g>
            </svg>

            {/* Milestones bar */}
            <div className="absolute bottom-3 left-4 right-4 bg-slate-900/90 backdrop-blur-md rounded-lg p-2.5 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
              <span className="font-semibold text-white">Trajectory Protection:</span>
              {activeRoute.routeHighlights.map((hl, i) => (
                <span key={i} className="flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{hl}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* State & City Location Selector Modal */}
      {modalTarget && (
        <IndiaLocationSelectorModal
          isOpen={true}
          title={
            modalTarget === 'origin'
              ? 'Select Starting Point (All-India States & Cities)'
              : 'Select Destination Point (All-India States & Cities)'
          }
          currentValue={modalTarget === 'origin' ? origin : destination}
          onClose={() => setModalTarget(null)}
          onSelectLocation={(fullLocationName) => {
            if (modalTarget === 'origin') {
              setOrigin(fullLocationName);
            } else {
              setDestination(fullLocationName);
            }
            setModalTarget(null);
          }}
        />
      )}
    </div>
  );
};
