import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { AQI_CATEGORIES } from '../../data/mockData';
import { CityLocation, PollutionReport } from '../../types';
import {
  MapPin,
  Layers,
  Search,
  Filter,
  AlertTriangle,
  Flame,
  HardHat,
  Car,
  Factory,
  CheckCircle2,
  Info,
  Navigation,
  Wind,
  Shield,
  Eye,
  PlusCircle,
  Sparkles,
  LayoutGrid,
  Map as MapIcon,
  ArrowRight,
  TrendingUp,
  Thermometer,
  Compass
} from 'lucide-react';

export const LiveAQIMap: React.FC = () => {
  const {
    locations,
    currentLocation,
    setCurrentLocation,
    searchAndSelectIndianLocation,
    reports,
    setActiveTab,
    showToast
  } = useApp();

  const [selectedStation, setSelectedStation] = useState<CityLocation>(currentLocation);
  const [selectedLayer, setSelectedLayer] = useState<'overall' | 'traffic' | 'industrial' | 'construction'>('overall');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('map');
  const [selectedReport, setSelectedReport] = useState<PollutionReport | null>(null);
  const [showCitizenReports, setShowCitizenReports] = useState(true);

  // Extract unique Indian states from locations
  const availableStates = useMemo(() => {
    const states = new Set<string>();
    locations.forEach((l) => {
      if (l.state) states.add(l.state);
    });
    return Array.from(states).sort();
  }, [locations]);

  // Filter stations based on search, region, state, and category
  const filteredStations = useMemo(() => {
    return locations.filter((station) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        station.name.toLowerCase().includes(q) ||
        (station.city && station.city.toLowerCase().includes(q)) ||
        (station.state && station.state.toLowerCase().includes(q)) ||
        (station.cpcbStationCode && station.cpcbStationCode.toLowerCase().includes(q)) ||
        station.district.toLowerCase().includes(q);

      const matchesRegion = selectedRegion === 'All' || station.region === selectedRegion;
      const matchesState = selectedState === 'All' || station.state === selectedState;
      const matchesCategory = selectedCategory === 'All' || station.category === selectedCategory;

      return matchesSearch && matchesRegion && matchesState && matchesCategory;
    });
  }, [locations, searchQuery, selectedRegion, selectedState, selectedCategory]);

  // Marker coloring based on layer
  const getMarkerColor = (station: CityLocation) => {
    if (selectedLayer === 'traffic') {
      if (station.mainSource === 'Traffic Emissions') return '#EF4444';
      return station.no2 > 40 ? '#F59E0B' : '#10B981';
    }
    if (selectedLayer === 'industrial') {
      if (station.mainSource === 'Industrial Zone' || station.mainSource === 'Port Marine') return '#EF4444';
      return station.so2 > 15 ? '#F59E0B' : '#10B981';
    }
    if (selectedLayer === 'construction') {
      if (station.mainSource === 'Construction Dust') return '#EF4444';
      return station.pm10 > 100 ? '#F59E0B' : '#10B981';
    }
    return AQI_CATEGORIES[station.category]?.color || '#10B981';
  };

  const getStationValueByLayer = (station: CityLocation) => {
    if (selectedLayer === 'traffic') return `${station.no2} ppb NO₂`;
    if (selectedLayer === 'industrial') return `${station.so2} ppb SO₂`;
    if (selectedLayer === 'construction') return `${station.pm10} µg PM10`;
    return `${station.aqi} AQI`;
  };

  const handleCustomSearchLookup = () => {
    if (!searchQuery.trim()) return;
    const resolved = searchAndSelectIndianLocation(searchQuery.trim());
    if (resolved) {
      setSelectedStation(resolved);
      showToast(`Located telemetry for ${resolved.name} in India CPCB Grid!`, 'success');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Layer Toolbar */}
      <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                All-India CPCB Air Quality Live Map
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
                Pan-India CAAQMS Grid
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Continuous Ambient Air Quality Monitoring Stations across all Indian states & Union Territories
            </p>
          </div>

          {/* View Mode Toggle & Layer Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'map'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 text-emerald-500" />
                <span>India Map</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-cyan-500" />
                <span>Station Grid ({filteredStations.length})</span>
              </button>
            </div>

            {/* Layer Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <span className="text-[11px] font-semibold text-slate-400 px-2 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> Layer:
              </span>
              <select
                value={selectedLayer}
                onChange={(e) =>
                  setSelectedLayer(
                    e.target.value as 'overall' | 'traffic' | 'industrial' | 'construction'
                  )
                }
                className="bg-white dark:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 px-2.5 py-1.5 rounded-lg border-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="overall">Overall CPCB AQI</option>
                <option value="traffic">Traffic Pollution (NO₂)</option>
                <option value="industrial">Industrial Chemical (SO₂)</option>
                <option value="construction">Construction Dust (PM10)</option>
              </select>
            </div>

            {/* Citizen Reports Overlay Toggle */}
            <button
              onClick={() => setShowCitizenReports(!showCitizenReports)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                showCitizenReports
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Citizen Reports ({reports.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row: Region Tabs + State Dropdown + AQI Pill + Search */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-semibold text-slate-400 mr-1 shrink-0 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> Region:
            </span>
            {(['All', 'North India', 'West India', 'South India', 'East India', 'Central India', 'North-East'] as const).map(
              (reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap font-medium transition-all ${
                    selectedRegion === reg
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {reg === 'All' ? 'All India' : reg}
                </button>
              )
            )}
          </div>

          {/* Search & State Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {/* State selector */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="text-xs font-semibold py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="All">All States & UTs</option>
              {availableStates.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            {/* AQI Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-semibold py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="All">All AQI Levels</option>
              <option value="Good">Good (0-50)</option>
              <option value="Satisfactory">Satisfactory (51-100)</option>
              <option value="Moderate">Moderate (101-200)</option>
              <option value="Poor">Poor (201-300)</option>
              <option value="Very Poor">Very Poor (301-400)</option>
              <option value="Severe">Severe (401-500)</option>
            </select>

            {/* Search Box */}
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search any Indian city/station..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCustomSearchLookup();
                }}
                className="pl-8 pr-7 py-1.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 w-48 sm:w-60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Custom Lookup Banner if search produced no pre-cached matches */}
        {searchQuery.trim().length > 1 && filteredStations.length === 0 && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/60 dark:border-emerald-700 flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <p className="text-xs text-emerald-900 dark:text-emerald-200">
                "{searchQuery}" is not in the cached list. Query and add this Indian location to the telemetry grid?
              </p>
            </div>
            <button
              onClick={handleCustomSearchLookup}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
            >
              Add & Inspect "{searchQuery}"
            </button>
          </div>
        )}
      </div>

      {/* Main Map / Grid Visualization and Station Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map / Grid Container */}
        <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 relative shadow-md">
          {/* Top Map Floating Badge */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-slate-900/90 text-white px-3 py-1.5 rounded-xl border border-slate-700 backdrop-blur-md text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold">India CAAQMS Grid</span>
            <span className="text-[10px] text-slate-400">| Active Stations: {filteredStations.length}</span>
            <span className="text-[10px] text-emerald-400 font-mono">| {selectedRegion}</span>
          </div>

          {viewMode === 'map' ? (
            /* Interactive SVG India Geographic Map */
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden select-none">
              <svg
                viewBox="0 0 1000 800"
                className="w-full h-full object-cover"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  {/* Oceanic Waters Gradients */}
                  <linearGradient id="oceanGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#082f49" />
                    <stop offset="100%" stopColor="#0c4a6e" />
                  </linearGradient>

                  {/* India Landmass Subtle Gradient */}
                  <linearGradient id="indiaLandGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="50%" stopColor="#132035" />
                    <stop offset="100%" stopColor="#0b1329" />
                  </linearGradient>

                  {/* River Gradient */}
                  <linearGradient id="riverGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
                  </linearGradient>

                  {/* Coordinate Grid Pattern */}
                  <pattern id="indiaGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="2 4" />
                  </pattern>

                  {/* Atmospheric Heatmap Filter */}
                  <filter id="blurHeatIndia" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="30" />
                  </filter>
                </defs>

                {/* Background Ocean Waters */}
                <rect width="1000" height="800" fill="url(#oceanGradient)" />
                <rect width="1000" height="800" fill="url(#indiaGrid)" />

                {/* Maritime Labels */}
                <text x="75" y="580" fill="#38bdf8" fontSize="13" fontWeight="700" letterSpacing="3" opacity="0.35" transform="rotate(-20 75 580)">
                  ARABIAN SEA
                </text>
                <text x="700" y="600" fill="#38bdf8" fontSize="13" fontWeight="700" letterSpacing="3" opacity="0.35" transform="rotate(15 700 600)">
                  BAY OF BENGAL
                </text>
                <text x="350" y="785" fill="#38bdf8" fontSize="12" fontWeight="700" letterSpacing="3" opacity="0.35">
                  INDIAN OCEAN
                </text>

                {/* Tropic of Cancer reference dashed line */}
                <line x1="80" y1="410" x2="920" y2="410" stroke="#334155" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
                <text x="90" y="405" fill="#64748b" fontSize="9" fontWeight="600" opacity="0.6">
                  Tropic of Cancer (23.5° N)
                </text>

                {/* Authentic India Landmass Silhouette SVG */}
                <path
                  d="M 300,45 
                     C 330,40 370,60 380,105 
                     C 390,135 375,175 425,205 
                     C 475,230 550,250 600,255 
                     C 625,245 640,225 650,250 
                     C 675,250 710,250 725,240 
                     C 760,200 840,195 875,225 
                     C 895,245 885,275 870,295 
                     C 860,320 865,370 840,405 
                     C 815,395 780,380 745,360 
                     C 730,340 705,370 690,410 
                     C 670,440 685,465 670,480 
                     C 635,510 595,550 560,590 
                     C 520,630 460,675 435,710 
                     C 410,740 365,765 340,765 
                     C 320,745 285,670 255,600 
                     C 240,550 205,510 195,450 
                     C 170,440 120,445 105,410 
                     C 90,375 125,350 160,340 
                     C 115,320 120,280 155,250 
                     C 180,220 220,180 250,140 
                     C 270,110 280,70 300,45 Z"
                  fill="url(#indiaLandGradient)"
                  stroke="#334155"
                  strokeWidth="2"
                  opacity="0.95"
                />

                {/* Major Rivers of India (Ganga, Yamuna, Brahmaputra) */}
                <path
                  d="M 360,210 Q 430,230 500,260 T 630,330 T 680,410"
                  fill="none"
                  stroke="url(#riverGradient)"
                  strokeWidth="2.5"
                  opacity="0.6"
                />
                <text x="460" y="248" fill="#38bdf8" fontSize="9" opacity="0.5" transform="rotate(18 460 248)">
                  Ganga-Yamuna River Basin
                </text>

                {/* Brahmaputra river */}
                <path
                  d="M 740,240 Q 820,215 865,245 T 790,320"
                  fill="none"
                  stroke="url(#riverGradient)"
                  strokeWidth="2"
                  opacity="0.5"
                />

                {/* Island Territories */}
                {/* Andaman & Nicobar */}
                <g opacity="0.75">
                  <ellipse cx="820" cy="620" rx="6" ry="16" fill="#1e293b" stroke="#334155" />
                  <ellipse cx="828" cy="670" rx="5" ry="12" fill="#1e293b" stroke="#334155" />
                  <text x="838" y="640" fill="#64748b" fontSize="8" fontWeight="600">
                    Andaman & Nicobar
                  </text>
                </g>

                {/* Lakshadweep */}
                <g opacity="0.75">
                  <circle cx="210" cy="650" r="4" fill="#1e293b" stroke="#334155" />
                  <circle cx="205" cy="670" r="3.5" fill="#1e293b" stroke="#334155" />
                  <text x="140" y="660" fill="#64748b" fontSize="8" fontWeight="600">
                    Lakshadweep
                  </text>
                </g>

                {/* Simulated Atmospheric Heatmap Overlay based on selected layer */}
                <g filter="url(#blurHeatIndia)" opacity="0.6">
                  {filteredStations.map((st) => {
                    const x = (st.coordinates.x / 100) * 1000;
                    const y = (st.coordinates.y / 100) * 800;
                    const color = getMarkerColor(st);
                    const radius = st.aqi > 250 ? 80 : st.aqi > 100 ? 55 : 35;
                    return (
                      <circle
                        key={`heat-${st.id}`}
                        cx={x}
                        cy={y}
                        r={radius}
                        fill={color}
                      />
                    );
                  })}
                </g>

                {/* Clickable Sensor Stations */}
                {filteredStations.map((station) => {
                  const x = (station.coordinates.x / 100) * 1000;
                  const y = (station.coordinates.y / 100) * 800;
                  const isSelected = station.id === selectedStation.id;
                  const isCurrent = station.id === currentLocation.id;
                  const color = getMarkerColor(station);

                  return (
                    <g
                      key={station.id}
                      onClick={() => {
                        setSelectedStation(station);
                        setSelectedReport(null);
                      }}
                      className="cursor-pointer group"
                    >
                      {/* Pulsing ring for active/selected */}
                      {isSelected && (
                        <circle
                          cx={x}
                          cy={y}
                          r="26"
                          fill="none"
                          stroke={color}
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          className="animate-spin"
                          style={{ transformOrigin: `${x}px ${y}px`, animationDuration: '6s' }}
                        />
                      )}

                      {/* Outer glow ring */}
                      <circle
                        cx={x}
                        cy={y}
                        r="16"
                        fill={color}
                        opacity="0.3"
                        className="group-hover:scale-125 transition-transform"
                        style={{ transformOrigin: `${x}px ${y}px` }}
                      />

                      {/* Center Core Marker */}
                      <circle
                        cx={x}
                        cy={y}
                        r="9"
                        fill={color}
                        stroke="#ffffff"
                        strokeWidth="2"
                      />

                      {/* Location Badge (Shows city and AQI) */}
                      <g transform={`translate(${x}, ${y - 16})`}>
                        <rect
                          x="-45"
                          y="-16"
                          width="90"
                          height="18"
                          rx="9"
                          fill="#0f172ae6"
                          stroke={isSelected ? '#10b981' : isCurrent ? '#38bdf8' : '#334155'}
                          strokeWidth={isSelected || isCurrent ? '2' : '1'}
                        />
                        <text
                          x="0"
                          y="-3"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="9.5"
                          fontWeight="700"
                          className="pointer-events-none"
                        >
                          {station.city || station.name.split(' ')[0]} ({station.aqi})
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* Citizen Reported Hazards (If toggled) */}
                {showCitizenReports &&
                  reports.map((rep) => {
                    if (!rep.coordinates) return null;
                    const x = (rep.coordinates.x / 100) * 1000;
                    const y = (rep.coordinates.y / 100) * 800;

                    return (
                      <g
                        key={rep.id}
                        onClick={() => setSelectedReport(rep)}
                        className="cursor-pointer group"
                      >
                        <circle
                          cx={x}
                          cy={y}
                          r="12"
                          fill="#f59e0b"
                          opacity="0.3"
                          className="animate-ping"
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r="7"
                          fill="#f59e0b"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />
                        <g transform={`translate(${x}, ${y + 18})`}>
                          <rect
                            x="-40"
                            y="0"
                            width="80"
                            height="15"
                            rx="7.5"
                            fill="#451a03e6"
                            stroke="#f59e0b"
                            strokeWidth="1"
                          />
                          <text
                            x="0"
                            y="10"
                            textAnchor="middle"
                            fill="#fef3c7"
                            fontSize="8.5"
                            fontWeight="700"
                          >
                            ⚠ {rep.type.split(' ')[0]}
                          </text>
                        </g>
                      </g>
                    );
                  })}
              </svg>
            </div>
          ) : (
            /* National Station Grid Matrix View */
            <div className="p-4 max-h-[580px] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredStations.map((station) => {
                  const cat = AQI_CATEGORIES[station.category];
                  const isSelected = station.id === selectedStation.id;
                  const isCurrent = station.id === currentLocation.id;

                  return (
                    <div
                      key={station.id}
                      onClick={() => {
                        setSelectedStation(station);
                        setSelectedReport(null);
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-950/20 shadow-md ring-1 ring-emerald-500'
                          : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-white truncate">
                              {station.name}
                            </h4>
                            {isCurrent && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/50">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {station.city}, {station.state}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400 font-mono">
                            <span>Code: {station.cpcbStationCode || 'IND'}</span>
                            <span>•</span>
                            <span>{station.region}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span
                            className="inline-block text-xs font-black px-2.5 py-1 rounded-lg text-white shadow-xs"
                            style={{ backgroundColor: cat.color }}
                          >
                            {station.aqi} AQI
                          </span>
                          <span className="block text-[10px] font-semibold text-slate-400 mt-1">
                            {station.category}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                        <span>PM2.5: <strong className="text-slate-200">{station.pm25} µg</strong></span>
                        <span>NO₂: <strong className="text-slate-200">{station.no2} ppb</strong></span>
                        <span>Driver: <strong className="text-slate-200">{station.mainSource}</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Map Color Legend Footer */}
          <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-300">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold text-white uppercase text-[10px]">CPCB AQI Scale:</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span>0-50 Good</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]" />
                <span>51-100 Satisfactory</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                <span>101-200 Moderate</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]" />
                <span>201-300 Poor</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <span>301-400 Very Poor</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7f1d1d]" />
                <span>401-500 Severe</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-amber-400 font-medium text-[11px]">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Crowdsourced Ground Hazard Pins</span>
            </div>
          </div>
        </div>

        {/* Station / Citizen Report Detail Side Panel */}
        <div className="lg:col-span-4 space-y-4">
          {/* Selected Station Card */}
          {selectedStation && !selectedReport && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      CPCB Telemetry Node
                    </span>
                    {selectedStation.cpcbStationCode && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                        {selectedStation.cpcbStationCode}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
                    {selectedStation.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {selectedStation.city}, {selectedStation.state} • {selectedStation.region}
                  </p>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm shrink-0"
                  style={{
                    backgroundColor: AQI_CATEGORIES[selectedStation.category]?.color || '#10b981',
                  }}
                >
                  {selectedStation.category}
                </div>
              </div>

              {/* Big AQI Callout */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Air Quality Index</span>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mt-0.5">
                    {selectedStation.aqi}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Dominant: <strong>{selectedStation.dominantPollutant}</strong>
                  </span>
                </div>
                <div className="text-right text-xs space-y-1">
                  <div>
                    <span className="text-slate-400">Layer View: </span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {getStationValueByLayer(selectedStation)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Temp: </span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {selectedStation.temp}°C
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Wind: </span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {selectedStation.windSpeed} km/h
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Humidity: </span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {selectedStation.humidity}%
                    </strong>
                  </div>
                </div>
              </div>

              {/* Pollutants details */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">PM2.5 (Fine Soot)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {selectedStation.pm25} µg/m³
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">PM10 (Dust & Silt)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {selectedStation.pm10} µg/m³
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">NO₂ (Vehicle Diesel)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {selectedStation.no2} ppb
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">SO₂ (Industrial)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {selectedStation.so2} ppb
                  </span>
                </div>
              </div>

              {/* Primary Pollution Source */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Main Source Driver:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  {selectedStation.mainSource === 'Traffic Emissions' && <Car className="w-3.5 h-3.5 text-blue-500" />}
                  {selectedStation.mainSource === 'Industrial Zone' && <Factory className="w-3.5 h-3.5 text-rose-500" />}
                  {selectedStation.mainSource === 'Construction Dust' && <HardHat className="w-3.5 h-3.5 text-amber-500" />}
                  {selectedStation.mainSource === 'Agricultural Stubble' && <Flame className="w-3.5 h-3.5 text-orange-500" />}
                  {selectedStation.mainSource}
                </span>
              </div>

              {/* Set as Active Dashboard Location Button */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    setCurrentLocation(selectedStation);
                    showToast(`Updated active city telemetry to ${selectedStation.name} (${selectedStation.city})!`, 'success');
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    currentLocation.id === selectedStation.id
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/40'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {currentLocation.id === selectedStation.id
                      ? 'Currently Active Dashboard Station'
                      : `Set as Active Dashboard Station`}
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setCurrentLocation(selectedStation);
                      setActiveTab('routes');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Plan Route Here</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentLocation(selectedStation);
                      setActiveTab('health');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
                  >
                    <Shield className="w-3.5 h-3.5 text-rose-500" />
                    <span>Health Advice</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Citizen Report Modal Preview if a citizen marker was clicked */}
          {selectedReport && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-400 dark:border-amber-600 shadow-lg space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Citizen Report Active
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedReport.id}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedReport.location}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕ Close
                </button>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Hazard Type:</span>
                  <strong className="text-slate-900 dark:text-white">{selectedReport.type}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Severity:</span>
                  <span className="font-bold text-rose-600">{selectedReport.severity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                    {selectedReport.status}
                  </span>
                </div>
                <p className="pt-1 text-slate-700 dark:text-slate-300 italic border-t border-amber-200/40">
                  "{selectedReport.description}"
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors"
              >
                View in Citizen Reports Hub
              </button>
            </div>
          )}

          {/* Quick Citizen Reporting CTA */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-500/10 border border-emerald-500/20 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Spot a local smoke plume or stubble fire?
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Log a photo report to add incident warnings directly to this live India map.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('report');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shrink-0 flex items-center gap-1 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
